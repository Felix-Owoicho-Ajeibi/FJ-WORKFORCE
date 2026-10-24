-- ====================================================================
-- F&J WORKFORCE LIMITED - COMPLETE SUPABASE SETUP SCRIPT
-- Migration: 20261022_init.sql
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Roles Table (candidate, recruiter, admin)
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
    profile_completion INTEGER DEFAULT 25,
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
    work_arrangement TEXT NOT NULL CHECK (work_arrangement IN ('On-site', 'Hybrid', 'Remote', 'Shift')),
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
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'closed')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_by TEXT DEFAULT 'F&J Admin',
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
    cv_file_name TEXT,
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
-- PERFORMANCE INDEXES
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

-- Security helper function: is_admin
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
DROP POLICY IF EXISTS "Public profiles can be viewed by anyone" ON public.profiles;
CREATE POLICY "Public profiles can be viewed by anyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can edit own profile" ON public.profiles;
CREATE POLICY "Users can edit own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Jobs Policies
DROP POLICY IF EXISTS "Anyone can view published active jobs" ON public.jobs;
CREATE POLICY "Anyone can view published active jobs" ON public.jobs FOR SELECT
    USING (status = 'published' OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage jobs" ON public.jobs;
CREATE POLICY "Admins can manage jobs" ON public.jobs FOR ALL
    USING (public.is_admin());

-- Candidate Profiles Policies
DROP POLICY IF EXISTS "Candidates manage own profile" ON public.candidate_profiles;
CREATE POLICY "Candidates manage own profile" ON public.candidate_profiles FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- Applications Policies
DROP POLICY IF EXISTS "Candidates can create own application" ON public.applications;
CREATE POLICY "Candidates can create own application" ON public.applications FOR INSERT
    WITH CHECK (auth.uid() = candidate_id);

DROP POLICY IF EXISTS "Candidates can view own application" ON public.applications;
CREATE POLICY "Candidates can view own application" ON public.applications FOR SELECT
    USING (auth.uid() = candidate_id OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage applications" ON public.applications;
CREATE POLICY "Admins manage applications" ON public.applications FOR ALL
    USING (public.is_admin());

-- Recruiter Notes Policies
DROP POLICY IF EXISTS "Only recruiters and admins access notes" ON public.application_notes;
CREATE POLICY "Only recruiters and admins access notes" ON public.application_notes FOR ALL
    USING (public.is_admin());

-- Status History Policies
DROP POLICY IF EXISTS "Candidates view status history of own applications" ON public.application_status_history;
CREATE POLICY "Candidates view status history of own applications" ON public.application_status_history FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.applications a
        WHERE a.id = application_id AND (a.candidate_id = auth.uid() OR public.is_admin())
    ));

DROP POLICY IF EXISTS "Only recruiters/admins insert history" ON public.application_status_history;
CREATE POLICY "Only recruiters/admins insert history" ON public.application_status_history FOR INSERT
    WITH CHECK (public.is_admin());

-- Employer Requisitions Policies
DROP POLICY IF EXISTS "Anyone can submit employer requisition" ON public.employer_enquiries;
CREATE POLICY "Anyone can submit employer requisition" ON public.employer_enquiries FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins view and manage employer requisitions" ON public.employer_enquiries;
CREATE POLICY "Only admins view and manage employer requisitions" ON public.employer_enquiries FOR ALL
    USING (public.is_admin());

-- Contact Messages Policies
DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins manage contact messages" ON public.contact_messages;
CREATE POLICY "Only admins manage contact messages" ON public.contact_messages FOR ALL
    USING (public.is_admin());

-- Services & FAQs Public Read
DROP POLICY IF EXISTS "Public read published services" ON public.services;
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage services" ON public.services;
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Public read published faqs" ON public.faqs;
CREATE POLICY "Public read published faqs" ON public.faqs FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage faqs" ON public.faqs;
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL USING (public.is_admin());

-- Audit Logs
DROP POLICY IF EXISTS "Only admins view audit logs" ON public.audit_logs;
CREATE POLICY "Only admins view audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin());

-- ====================================================================
-- AUTOMATED USER REGISTRATION TRIGGER
-- Automatically creates public.profiles, public.user_roles, and public.candidate_profiles
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.email),
        COALESCE(new.raw_user_meta_data->>'phone', '')
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'candidate')
    ON CONFLICT (user_id, role) DO NOTHING;

    INSERT INTO public.candidate_profiles (user_id, headline, professional_summary, location)
    VALUES (new.id, '', '', 'Lagos, Nigeria')
    ON CONFLICT (user_id) DO NOTHING;

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ====================================================================
-- STORAGE BUCKET FOR RESUMES / CVS
-- ====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Candidates can upload own CV" ON storage.objects;
CREATE POLICY "Candidates can upload own CV"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Candidates and Admins view CVs" ON storage.objects;
CREATE POLICY "Candidates and Admins view CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'resumes' AND (
        (storage.foldername(name))[1] = auth.uid()::text OR public.is_admin()
    )
);

-- ====================================================================
-- SEED DATA: 6 CORE SERVICES
-- ====================================================================
INSERT INTO public.services (slug, title, short_summary, hero_headline, overview, business_problem, process, target_clients, benefits, is_published, sort_order, badge)
VALUES
(
    'recruitment',
    'Recruitment & Talent Acquisition',
    'End-to-end recruitment matching vetted, qualified professionals with specialized organizational requirements.',
    'Strategic Recruitment Tailored to Your Industry Standards',
    'F&J Workforce Limited delivers precision talent acquisition across technical, managerial, and administrative disciplines in Lagos.',
    '["Costly hiring mistakes resulting from unverified credentials.", "Protracted time-to-hire leading to lost productivity.", "Scarcity of vetted technical personnel across Lagos State."]'::jsonb,
    '[{"step": "01", "title": "Role Scoping", "description": "Consultation to define competencies."}, {"step": "02", "title": "Sourcing", "description": "Candidate mining across Ibeju-Lekki."}, {"step": "03", "title": "Screening", "description": "Technical & trade competency tests."}, {"step": "04", "title": "Shortlisting", "description": "Top 3 candidate dossiers."}, {"step": "05", "title": "Placement", "description": "90-day retention warranty."}]'::jsonb,
    '["Multinational and indigenous corporations.", "Growing enterprises seeking managerial talent.", "Industrial operations in Lagos State."]'::jsonb,
    '["Reduced hiring cycle by over 60%.", "Rigorous background checks compliant with NDPA 2023.", "Dedicated recruitment specialists.", "90-day candidate warranty."]'::jsonb,
    true,
    1,
    'Core Solution'
),
(
    'contract-staffing',
    'Temporary & Contract Staffing',
    'Agile workforce deployment for seasonal peaks, specialized projects, and fluctuating production cycles.',
    'Flexible, Ready-to-Deploy Contract Workers on Demand',
    'Respond swiftly to fluctuating business demands, turnkey operations, and planned maintenance shutdowns without expanding permanent payroll.',
    '["Inflexibility of permanent headcount during seasonal demand.", "Urgent project delivery deadlines requiring rapid deployment.", "High administrative burden managing short-term contracts."]'::jsonb,
    '[{"step": "01", "title": "Capacity Planning", "description": "Assessing workforce timeline and shift rotations."}, {"step": "02", "title": "Rapid Mobilization", "description": "48-72h worker deployment."}, {"step": "03", "title": "Statutory Onboarding", "description": "Employment contracts and safety briefing."}, {"step": "04", "title": "On-Site Supervision", "description": "Designated field liaisons to manage attendance."}]'::jsonb,
    '["Manufacturing facilities and packaging plants.", "Logistics centers and container terminals.", "Construction and civil engineering contractors."]'::jsonb,
    '["Optimized operational expenditure.", "Rapid ramp-up and ramp-down capability.", "Zero statutory compliance headaches.", "Dedicated on-site coordinators."]'::jsonb,
    true,
    2,
    'High Demand'
),
(
    'permanent-placement',
    'Permanent Placement',
    'Securing long-term strategic personnel invested in your organization’s growth and operational success.',
    'Building Long-Term Leadership and Core Operational Teams',
    'Finding professionals who align with your organizational culture and possess the technical acumen to lead your business forward.',
    '["High staff attrition rates caused by poor cultural fit.", "Difficulty attracting top-tier passive talent.", "Reputational risk from disorganized recruitment campaigns."]'::jsonb,
    '[{"step": "01", "title": "Culture Mapping", "description": "Understanding company values and goals."}, {"step": "02", "title": "Executive Headhunting", "description": "Discreetly engaging high-performing talent."}, {"step": "03", "title": "Competency Assessment", "description": "Psychological and skill evaluations."}, {"step": "04", "title": "Transition", "description": "Managing notice periods and onboarding."}]'::jsonb,
    '["Corporate headquarters and financial institutions.", "Industrial and manufacturing plant leadership.", "Technology and supply chain operators."]'::jsonb,
    '["Long-term candidate retention backed by warranty.", "Access to exclusive passive candidate networks.", "Thorough educational and employment vetting."]'::jsonb,
    true,
    3,
    'Executive & Core'
),
(
    'industrial-workforce',
    'Industrial & Factory Workforce Solutions',
    'Specialized plant, refinery, warehouse, and production workforce solutions in the Ibeju-Lekki and Lagos industrial corridor.',
    'Powering Nigeria’s Premier Industrial and Manufacturing Hubs',
    'Located directly on Eleko Beach Road, Ibeju-Lekki, F&J Workforce is positioned at the heart of the Lekki Free Trade Zone, Dangote industrial hub, and Deep Sea Port corridor.',
    '["Localized community relations and labor dynamics in Lekki-Epe.", "Stringent HSE compliance requirements in factory environments.", "Managing high-volume shift patterns and industrial absenteeism."]'::jsonb,
    '[{"step": "01", "title": "HSE Alignment", "description": "Auditing plant safety policies and PPE standards."}, {"step": "02", "title": "Trade Testing", "description": "Practical evaluations for machinists and operators."}, {"step": "03", "title": "Host Liaison", "description": "Engaging host communities for harmonious relations."}, {"step": "04", "title": "Shift Management", "description": "Medical fitness testing and shift coordination."}]'::jsonb,
    '["Refineries and petrochemical complexes.", "FMCG manufacturing and food packaging plants.", "Lekki Deep Sea Port terminals and maritime logistics."]'::jsonb,
    '["Strategic physical proximity to Ibeju-Lekki industrial parks.", "Expertise in community labor relations.", "100% pre-deployment safety induction.", "Scalable labor pool exceeding 1,000+ vetted hands."]'::jsonb,
    true,
    4,
    'Ibeju-Lekki Specialty'
),
(
    'workforce-outsourcing',
    'Workforce Outsourcing',
    'Complete operational outsourcing transferring employment liability, payroll, and HR administration to F&J.',
    'Transfer Employment Liabilities and Focus on Your Core Business',
    'Allow your executive management to focus on commercial growth while F&J Workforce assumes full legal employer responsibility for support personnel.',
    '["Escalating overhead and payroll processing complexities.", "Labor disputes and trade union negotiations.", "Strict statutory compliance penalties (PAYE, NSITF, Pension)."]'::jsonb,
    '[{"step": "01", "title": "Staff Due Diligence", "description": "Seamless novation of existing support personnel."}, {"step": "02", "title": "Payroll Architecture", "description": "Automated payroll processing and statutory filings."}, {"step": "03", "title": "Welfare Administration", "description": "Tiered healthcare HMO and group life insurance."}, {"step": "04", "title": "SLA Reporting", "description": "Monthly KPI dashboards for executives."}]'::jsonb,
    '["Financial institutions outsourcing branch support.", "Telecommunications companies with field teams.", "Conglomerates seeking consolidated HR management."]'::jsonb,
    '["Full transfer of third-party employment risk.", "100% error-free statutory compliance (LIRS, PenCom, ITF, NSITF).", "Unified monthly invoice simplifying accounting."]'::jsonb,
    true,
    5,
    'Enterprise Solution'
),
(
    'hr-support',
    'HR & Workforce Management Support',
    'Strategic human resource advisory, policy formulation, job grading, and labor compliance consultation.',
    'Institutionalize Robust HR Structures and Compliance Frameworks',
    'We support growing enterprises to build professional HR governance structures, employee handbooks, and competitive compensation benchmarks.',
    '["Lack of formal employee handbooks and legally sound contracts.", "Ad-hoc performance appraisals causing staff turnover.", "Uncertainty regarding Nigerian Labor Act provisions."]'::jsonb,
    '[{"step": "01", "title": "HR Compliance Audit", "description": "Examining employment contracts and workplace policies."}, {"step": "02", "title": "Policy Formulation", "description": "Drafting tailored employee handbooks."}, {"step": "03", "title": "Appraisal Setup", "description": "Designing balanced scorecards and KPI systems."}, {"step": "04", "title": "Leadership Training", "description": "Workshops for team leads on conflict resolution."}]'::jsonb,
    '["SMEs transitioning into structured medium enterprises.", "International businesses establishing Nigerian operations.", "Organizations undergoing restructuring."]'::jsonb,
    '["Shield your business against costly labor tribunal awards.", "Clear job descriptions driving productivity.", "Tailored compensation surveys reflecting Lagos market rates."]'::jsonb,
    true,
    6,
    'Advisory & Governance'
)
ON CONFLICT (slug) DO NOTHING;

-- ====================================================================
-- SEED DATA: FAQS (WITH APPLICATION FEE NOTICE)
-- ====================================================================
INSERT INTO public.faqs (question, answer, category, is_published, sort_order)
VALUES
(
    'How do I register as a job seeker with F&J Workforce Limited?',
    'You can create an account by clicking the "Register" button in the top navigation. Enter your full name, email, phone number, and a secure password. Once registered, log into your Candidate Dashboard to complete your professional profile and upload your CV in PDF or DOCX format.',
    'Candidates',
    true,
    1
),
(
    'What is the application fee for job seekers applying through F&J Workforce?',
    'Notice: Recruitment at F&J Workforce is 100% paid. An application fee of 5,000 Naira = $3.8 is applied per application to cover priority screening, technical competency reviews, and credential verification.',
    'Candidates',
    true,
    2
),
(
    'How does F&J Workforce support employers in Ibeju-Lekki and the Lekki Free Zone?',
    'We maintain our primary operations directly along Eleko Beach Road, Ibeju-Lekki. This physical presence gives us unique access to localized talent pools, deep relationships with host communities, and rapid mobilization capabilities for factories, refineries, logistics hubs, and deep sea port contractors along the entire Lekki-Epe corridor.',
    'Employers',
    true,
    3
),
(
    'What is the typical turnaround time for staffing requests?',
    'For temporary and industrial contract staffing, we maintain pre-vetted worker pools capable of mobilization within 48 to 72 hours. For specialized technical, permanent, or executive search positions, our standard shortlisting timeline is between 7 and 14 business days.',
    'Employers',
    true,
    4
),
(
    'How does F&J Workforce verify candidate credentials and backgrounds?',
    'Every candidate considered for final placement undergoes multi-layer screening: educational credential verification with issuing tertiary institutions, previous employer reference checks, criminal history vetting, and practical trade competency assessments for technical personnel.',
    'Recruitment & Verification',
    true,
    5
),
(
    'Where is F&J Workforce Limited physically located?',
    'Our corporate office is situated on Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria. We welcome visits by appointment during standard business hours (Monday to Friday, 8:00 AM – 5:00 PM). You can also contact us on 09116176563 or 09022542150.',
    'General',
    true,
    6
)
ON CONFLICT DO NOTHING;

-- ====================================================================
-- SEED DATA: INITIAL JOBS
-- ====================================================================
INSERT INTO public.jobs (title, slug, department, industry, employment_type, work_location, work_arrangement, salary_min, salary_max, currency, summary, description, responsibilities, qualifications, experience_requirements, skills, application_deadline, status, hiring_organization, open_positions)
VALUES
(
    'Logistics Operations Supervisor',
    'logistics-operations-supervisor',
    'Supply Chain & Logistics',
    'Logistics & Supply Chain',
    'Full-time',
    'Ibeju-Lekki, Lagos',
    'On-site',
    350000,
    480000,
    'NGN',
    'Lead warehouse and distribution operations for a premier FMCG distribution hub servicing the Lekki-Epe corridor.',
    'Oversee fleet dispatch, inventory accuracy, container offloading, and warehouse health and safety protocols across our client''s Ibeju-Lekki hub.',
    ARRAY['Oversee daily inbound and outbound logistics workflows across a 5,000 sq. meter warehouse facility.', 'Manage a team of 25+ warehouse assistants and forklift operators.', 'Maintain inventory reconciliation exceeding 99.2% accuracy using ERP systems.', 'Enforce strict adherence to safety protocols and PPE usage.'],
    ARRAY['Bachelor’s Degree or HND in Logistics, Supply Chain Management, or Business Administration.', 'Minimum of 4 years verifiable experience in warehouse supervision.', 'Proficiency in SAP, Oracle SCM, or modern ERP systems.'],
    '4 - 6 years of supervisory experience in industrial logistics or manufacturing distribution.',
    ARRAY['Warehouse Operations', 'Fleet Dispatch', 'Inventory Control', 'ERP / SAP', 'HSE Compliance', 'Team Leadership'],
    '2026-11-25',
    'published',
    'Leading FMCG Distribution Partner',
    2
),
(
    'Industrial Plant Maintenance Technician',
    'industrial-plant-maintenance-technician',
    'Engineering & Maintenance',
    'Manufacturing',
    'Full-time',
    'Lekki Free Zone, Ibeju-Lekki, Lagos',
    'Shift',
    280000,
    380000,
    'NGN',
    'Perform preventive and reactive electro-mechanical maintenance on high-speed automated packaging machinery.',
    'Maintain production line uptime, diagnose equipment faults, and execute scheduled overhauls in the Lekki Free Trade Zone.',
    ARRAY['Execute preventive maintenance routines on pneumatic, hydraulic, and mechanical production lines.', 'Troubleshoot electrical and mechanical breakdowns rapidly to minimize downtime.', 'Inspect conveyor belts, gearboxes, motors, and PLC systems.', 'Comply strictly with LOTO procedures and industrial safety regulations.'],
    ARRAY['OND or Technical Diploma in Mechanical, Electrical, or Mechatronics Engineering.', '3+ years practical hands-on experience in high-volume manufacturing.', 'Competence in reading schematics and electrical diagrams.'],
    '3+ years in a fast-paced manufacturing or assembly plant.',
    ARRAY['Mechanical Maintenance', 'Electrical Troubleshooting', 'Pneumatics & Hydraulics', 'LOTO Safety', 'PLC Diagnostics'],
    '2026-11-30',
    'published',
    'Free Zone Manufacturing Corporation',
    4
),
(
    'Certified Heavy Equipment & Forklift Operator',
    'certified-heavy-equipment-forklift-operator',
    'Heavy Machinery & Operations',
    'Industrial & Factory',
    'Contract',
    'Eleko / Ibeju-Lekki, Lagos',
    'On-site',
    180000,
    240000,
    'NGN',
    'Operate counterbalanced and reach forklifts in an active industrial yard with heavy freight handling.',
    'Urgent contract requirement for certified forklift operators with proven records in container stuffing, stacking, and heavy equipment maneuvering in Ibeju-Lekki.',
    ARRAY['Safely maneuver 3-ton to 7-ton forklift equipment across high-density storage aisles.', 'Conduct daily pre-trip equipment checks including fluids, brakes, and hydraulics.', 'Verify shipping bills against physically loaded pallet counts.', 'Ensure zero incidents of cargo damage through disciplined operating speeds.'],
    ARRAY['Valid National Drivers License with Class E/G endorsements.', 'Recognized Forklift Operator Certification from accredited institute.', 'At least 3 years verifiable accident-free operating history.'],
    '3+ years operating forklifts in high-traffic logistics or factory yards.',
    ARRAY['Forklift Operation', 'Cargo Handling', 'Yard Safety', 'Pre-Trip Inspection', 'Pallet Stacking'],
    '2026-11-15',
    'published',
    'Industrial Logistics & Port Yard Services',
    6
),
(
    'HSE Safety Officer (Industrial & Petrochemical)',
    'hse-safety-officer-industrial-petrochemical',
    'Health, Safety & Environment',
    'Oil & Gas / Refinery',
    'Permanent',
    'Ibeju-Lekki Industrial Corridor, Lagos',
    'On-site',
    400000,
    550000,
    'NGN',
    'Maintain zero-incident safety standards, hazard identification, and statutory safety audits in an industrial plant.',
    'Lead toolbox talks, conduct job hazard analyses (JHA), and inspect operational permits to work (PTW) for a major petrochemical subcontractor in Ibeju-Lekki.',
    ARRAY['Conduct daily site inspections and ensure 100% compliance with safety apparel and hazard controls.', 'Lead morning safety briefings and specialized toolbox training for operational crews.', 'Review and authorize Permits to Work (Hot Work, Confined Space, Heights).', 'Investigate incidents and formulate corrective/preventative actions (CAPA).'],
    ARRAY['Bachelor’s Degree in Science, Engineering, or Environmental Health.', 'NEBOSH International General Certificate (IGC) or ISPON certification is mandatory.', 'Minimum of 4 years field HSE experience in oil & gas or heavy industrial plants.'],
    '4+ years of industrial field safety management.',
    ARRAY['NEBOSH / ISPON', 'Job Hazard Analysis (JHA)', 'Permit to Work (PTW)', 'Incident Investigation', 'Toolbox Talks'],
    '2026-11-28',
    'published',
    'Petrochemical Infrastructure Services',
    2
)
ON CONFLICT (slug) DO NOTHING;
