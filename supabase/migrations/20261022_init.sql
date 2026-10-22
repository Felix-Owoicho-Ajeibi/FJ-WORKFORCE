-- ====================================================================
-- F&J WORKFORCE LIMITED - PRODUCTION SUPABASE DATABASE SCHEMA
-- Migration: 20261022_init.sql
-- Description: Complete schema with RLS, triggers, indexes, and policies
-- ====================================================================

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('candidate', 'recruiter', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- 3. Candidate Profiles Table
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    headline TEXT,
    professional_summary TEXT,
    location TEXT,
    education JSONB DEFAULT '[]'::jsonb,
    work_experience JSONB DEFAULT '[]'::jsonb,
    skills TEXT[] DEFAULT '{}',
    preferred_locations TEXT[] DEFAULT '{}',
    preferred_employment_types TEXT[] DEFAULT '{}',
    cv_storage_path TEXT,
    cv_file_name TEXT,
    profile_completion INTEGER DEFAULT 20,
    saved_jobs UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Jobs Vacancy Table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    industry TEXT NOT NULL,
    employment_type TEXT NOT NULL CHECK (employment_type IN ('Full-time', 'Contract', 'Permanent', 'Temporary', 'Shift')),
    work_location TEXT NOT NULL,
    work_arrangement TEXT NOT NULL CHECK (work_arrangement IN ('On-site', 'Hybrid', 'Remote')),
    salary_min NUMERIC(12, 2),
    salary_max NUMERIC(12, 2),
    currency TEXT DEFAULT 'NGN',
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    qualifications TEXT[] NOT NULL DEFAULT '{}',
    experience_requirements TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    application_deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
    published_at TIMESTAMPTZ,
    created_by TEXT,
    hiring_organization TEXT,
    open_positions INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number TEXT NOT NULL UNIQUE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    candidate_name TEXT NOT NULL,
    candidate_email TEXT NOT NULL,
    candidate_phone TEXT NOT NULL,
    candidate_location TEXT,
    cv_storage_path TEXT NOT NULL,
    cover_letter TEXT,
    screening_answers JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'Submitted' CHECK (
        status IN ('Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interviewed', 'Offered', 'Hired', 'Rejected', 'Withdrawn')
    ),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(job_id, candidate_id)
);

-- 6. Application Notes Table (Private Recruiter Notes)
CREATE TABLE IF NOT EXISTS public.application_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES auth.users(id),
    author_name TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Application Status History Table
CREATE TABLE IF NOT EXISTS public.application_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    previous_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    changed_by UUID NOT NULL REFERENCES auth.users(id),
    changed_by_name TEXT NOT NULL,
    reason TEXT,
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Employer Enquiries Table
CREATE TABLE IF NOT EXISTS public.employer_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT NOT NULL,
    service_requested TEXT NOT NULL,
    workers_required INTEGER NOT NULL,
    job_roles TEXT NOT NULL,
    location TEXT NOT NULL,
    expected_start_date DATE NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Contacted', 'Proposal Sent', 'Fulfilled', 'Archived')),
    assigned_to TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Read', 'Replied', 'Archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Services CMS Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_summary TEXT NOT NULL,
    hero_headline TEXT,
    overview TEXT NOT NULL,
    business_problem JSONB DEFAULT '[]'::jsonb,
    process JSONB DEFAULT '[]'::jsonb,
    target_clients JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 1,
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. FAQs CMS Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Candidates', 'Employers', 'Recruitment & Verification', 'General')),
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL,
    actor_name TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('job', 'application', 'candidate', 'enquiry', 'content', 'auth')),
    entity_id TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_jobs_status_slug ON public.jobs(status, slug);
CREATE INDEX IF NOT EXISTS idx_jobs_deadline ON public.jobs(application_deadline);
CREATE INDEX IF NOT EXISTS idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.employer_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper security function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'recruiter')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles can be viewed by anyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Jobs Policies
CREATE POLICY "Anyone can view published active jobs" ON public.jobs FOR SELECT
    USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins can manage jobs" ON public.jobs FOR ALL
    USING (public.is_admin());

-- Candidate Profiles Policies
CREATE POLICY "Candidates manage own profile" ON public.candidate_profiles FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- Applications Policies
CREATE POLICY "Candidates can create own application" ON public.applications FOR INSERT
    WITH CHECK (auth.uid() = candidate_id);
CREATE POLICY "Candidates can view own application" ON public.applications FOR SELECT
    USING (auth.uid() = candidate_id OR public.is_admin());
CREATE POLICY "Admins manage applications" ON public.applications FOR UPDATE
    USING (public.is_admin());

-- Recruiter Notes Policies
CREATE POLICY "Only recruiters and admins access notes" ON public.application_notes FOR ALL
    USING (public.is_admin());

-- Status History Policies
CREATE POLICY "Candidates view status history of own applications" ON public.application_status_history FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.applications a
        WHERE a.id = application_id AND (a.candidate_id = auth.uid() OR public.is_admin())
    ));
CREATE POLICY "Only recruiters/admins insert history" ON public.application_status_history FOR INSERT
    WITH CHECK (public.is_admin());

-- Employer Requisitions Policies
CREATE POLICY "Anyone can submit employer requisition" ON public.employer_enquiries FOR INSERT
    WITH CHECK (true);
CREATE POLICY "Only admins view and manage employer requisitions" ON public.employer_enquiries FOR ALL
    USING (public.is_admin());

-- Contact Messages Policies
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT
    WITH CHECK (true);
CREATE POLICY "Only admins manage contact messages" ON public.contact_messages FOR ALL
    USING (public.is_admin());

-- Services & FAQs Public Read
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Public read published faqs" ON public.faqs FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL USING (public.is_admin());

-- Audit Logs
CREATE POLICY "Only admins view audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin());
