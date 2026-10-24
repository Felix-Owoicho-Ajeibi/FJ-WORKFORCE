/**
 * F&J Workforce Limited - Supabase Integration Client
 * Production-ready connection to Supabase PostgreSQL, Authentication, and Storage.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  JobVacancy,
  JobApplication,
  EmployerEnquiry,
  ContactMessage,
  FAQItem
} from '../types';

// Provided Production Supabase Credentials
export const DEFAULT_SUPABASE_URL = 'https://fcnzicxjxbwsnvhwtaes.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjbnppY3hqeGJ3c252aHd0YWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NTA1MzUsImV4cCI6MjEwODQyNjUzNX0.nNCrmdURgCTuFX1RRZvckBp4vj18I_mW0i-m-3hn7n4';

/**
 * Normalizes Supabase project URL by trimming trailing slashes and removing /rest/v1 if included.
 */
export function normalizeSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  let url = rawUrl.trim();
  // Strip trailing /rest/v1 or /rest/v1/
  url = url.replace(/\/rest\/v1\/?$/, '');
  // Strip trailing slash
  url = url.replace(/\/+$/, '');
  return url;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  projectRef: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

  const url = normalizeSupabaseUrl(envUrl || DEFAULT_SUPABASE_URL);
  const anonKey = (envKey || DEFAULT_SUPABASE_ANON_KEY).trim();

  // Extract project ref (e.g., https://fcnzicxjxbwsnvhwtaes.supabase.co -> fcnzicxjxbwsnvhwtaes)
  let projectRef = 'fcnzicxjxbwsnvhwtaes';
  try {
    const parsed = new URL(url);
    const hostParts = parsed.hostname.split('.');
    if (hostParts.length > 0) {
      projectRef = hostParts[0];
    }
  } catch {
    // Keep default
  }

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http')),
    projectRef
  };
}

const config = getSupabaseConfig();

// Initialize the singleton Supabase Client
export const supabase: SupabaseClient = createClient(config.url, config.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// ============================================================================
// HEALTH & DIAGNOSTICS HELPERS
// ============================================================================

export interface ConnectionHealthResult {
  connected: boolean;
  projectUrl: string;
  projectRef: string;
  latencyMs: number;
  tables: {
    jobsCount?: number | string;
    applicationsCount?: number | string;
    enquiriesCount?: number | string;
    messagesCount?: number | string;
  };
  error?: string;
  migrationStatus: 'ready' | 'needs_migration' | 'error';
}

/**
 * Tests live connection to the Supabase instance and queries row counts.
 */
export async function testSupabaseConnection(): Promise<ConnectionHealthResult> {
  const start = performance.now();
  const res: ConnectionHealthResult = {
    connected: false,
    projectUrl: config.url,
    projectRef: config.projectRef,
    latencyMs: 0,
    tables: {},
    migrationStatus: 'ready'
  };

  try {
    // 1. Try querying jobs table
    const { data: jobsData, count: jobsCount, error: jobsErr } = await supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true });

    res.latencyMs = Math.round(performance.now() - start);

    if (jobsErr) {
      // Table doesn't exist yet or permissions issue
      if (jobsErr.code === '42P01' || jobsErr.message?.includes('does not exist')) {
        res.connected = true;
        res.migrationStatus = 'needs_migration';
        res.error = 'Supabase responded, but tables have not been created yet. Run supabase/migrations/20261022_init.sql in your Supabase SQL Editor.';
        return res;
      }
      res.error = jobsErr.message;
      return res;
    }

    res.connected = true;
    res.tables.jobsCount = jobsCount ?? (jobsData?.length ?? 0);

    // 2. Query applications count
    try {
      const { count: appCount } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true });
      res.tables.applicationsCount = appCount ?? 0;
    } catch {
      res.tables.applicationsCount = 'N/A';
    }

    // 3. Query employer enquiries count
    try {
      const { count: enqCount } = await supabase
        .from('employer_enquiries')
        .select('id', { count: 'exact', head: true });
      res.tables.enquiriesCount = enqCount ?? 0;
    } catch {
      res.tables.enquiriesCount = 'N/A';
    }

    // 4. Query contact messages count
    try {
      const { count: msgCount } = await supabase
        .from('contact_messages')
        .select('id', { count: 'exact', head: true });
      res.tables.messagesCount = msgCount ?? 0;
    } catch {
      res.tables.messagesCount = 'N/A';
    }

    return res;
  } catch (err: any) {
    res.latencyMs = Math.round(performance.now() - start);
    res.error = err?.message || 'Unknown network error connecting to Supabase';
    return res;
  }
}

// ============================================================================
// DATA OPERATIONS HELPERS
// ============================================================================

/**
 * Fetches published jobs from Supabase
 */
export async function fetchJobsFromSupabase(): Promise<JobVacancy[] | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Could not fetch jobs from Supabase:', error?.message);
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      department: row.department,
      industry: row.industry,
      employmentType: row.employment_type,
      workLocation: row.work_location,
      workArrangement: row.work_arrangement,
      salaryMin: row.salary_min ? Number(row.salary_min) : undefined,
      salaryMax: row.salary_max ? Number(row.salary_max) : undefined,
      currency: row.currency || 'NGN',
      summary: row.summary,
      description: row.description,
      responsibilities: row.responsibilities || [],
      qualifications: row.qualifications || [],
      experienceRequirements: row.experience_requirements,
      skills: row.skills || [],
      applicationDeadline: row.application_deadline,
      status: row.status,
      publishedAt: row.published_at,
      createdBy: row.created_by,
      hiringOrganization: row.hiring_organization,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  } catch (e) {
    console.warn('Supabase fetchJobs error:', e);
    return null;
  }
}

/**
 * Inserts a new job vacancy into Supabase
 */
export async function createJobInSupabase(job: JobVacancy) {
  try {
    const { data, error } = await supabase.from('jobs').insert([
      {
        id: job.id.startsWith('job-') ? undefined : job.id, // Let UUID generate if client ID is mock
        title: job.title,
        slug: job.slug,
        department: job.department,
        industry: job.industry,
        employment_type: job.employmentType,
        work_location: job.workLocation,
        work_arrangement: job.workArrangement,
        salary_min: job.salaryMin,
        salary_max: job.salaryMax,
        currency: job.currency,
        summary: job.summary,
        description: job.description,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        experience_requirements: job.experienceRequirements,
        skills: job.skills,
        application_deadline: job.applicationDeadline,
        status: job.status,
        published_at: job.publishedAt,
        created_by: job.createdBy,
        hiring_organization: job.hiringOrganization
      }
    ]);

    if (error) {
      console.warn('Supabase createJob warning:', error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn('Supabase createJob exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Submits an application directly to Supabase
 */
export async function submitApplicationToSupabase(app: JobApplication) {
  try {
    const { data, error } = await supabase.from('applications').insert([
      {
        reference_number: app.referenceNumber,
        job_id: app.jobId.startsWith('job-') ? undefined : app.jobId,
        candidate_name: app.candidateName,
        candidate_email: app.candidateEmail,
        candidate_phone: app.candidatePhone,
        candidate_location: app.candidateLocation,
        cv_storage_path: app.cvStoragePath,
        cv_file_name: app.cvFileName,
        cover_letter: app.coverLetter,
        screening_answers: app.screeningAnswers,
        status: app.status
      }
    ]);

    if (error) {
      console.warn('Supabase submitApplication notice:', error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn('Supabase submitApplication exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Submits an employer requisition to Supabase
 */
export async function submitEmployerEnquiryToSupabase(enquiry: EmployerEnquiry) {
  try {
    const { data, error } = await supabase.from('employer_enquiries').insert([
      {
        reference_number: enquiry.referenceNumber,
        company_name: enquiry.companyName,
        contact_name: enquiry.contactName,
        email: enquiry.email,
        phone: enquiry.phone,
        industry: enquiry.industry,
        service_requested: enquiry.serviceRequested,
        workers_required: enquiry.workersRequired,
        job_roles: enquiry.jobRoles,
        location: enquiry.location,
        expected_start_date: enquiry.expectedStartDate,
        requirements: enquiry.requirements,
        status: enquiry.status
      }
    ]);

    if (error) {
      console.warn('Supabase submitEmployerEnquiry notice:', error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn('Supabase submitEmployerEnquiry exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Submits a contact inquiry to Supabase
 */
export async function submitContactMessageToSupabase(msg: ContactMessage) {
  try {
    const { data, error } = await supabase.from('contact_messages').insert([
      {
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        subject: msg.subject,
        message: msg.message,
        status: msg.status
      }
    ]);

    if (error) {
      console.warn('Supabase submitContactMessage notice:', error.message);
    }
    return { data, error };
  } catch (err: any) {
    console.warn('Supabase submitContactMessage exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Uploads a candidate resume to Supabase Storage ('resumes' bucket)
 */
export async function uploadResumeToSupabase(
  userId: string,
  file: File
): Promise<{ path?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('resumes').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

    if (error) {
      return { error: error.message };
    }

    return { path: filePath };
  } catch (err: any) {
    return { error: err?.message || 'Failed to upload CV to Supabase' };
  }
}

/**
 * Helper to push initial mock vacancies to Supabase tables if empty
 */
export async function seedInitialDataToSupabase(jobs: JobVacancy[], faqs: FAQItem[]) {
  try {
    // Insert jobs
    const jobsToInsert = jobs.map((j) => ({
      title: j.title,
      slug: j.slug,
      department: j.department,
      industry: j.industry,
      employment_type: j.employmentType,
      work_location: j.workLocation,
      work_arrangement: j.workArrangement,
      salary_min: j.salaryMin,
      salary_max: j.salaryMax,
      currency: j.currency,
      summary: j.summary,
      description: j.description,
      responsibilities: j.responsibilities,
      qualifications: j.qualifications,
      experience_requirements: j.experienceRequirements,
      skills: j.skills,
      application_deadline: j.applicationDeadline,
      status: j.status,
      published_at: j.publishedAt,
      created_by: j.createdBy,
      hiring_organization: j.hiringOrganization
    }));

    const { error: jobErr } = await supabase.from('jobs').upsert(jobsToInsert, { onConflict: 'slug' });
    if (jobErr) console.warn('Supabase jobs seed note:', jobErr.message);

    // Insert FAQs
    const faqsToInsert = faqs.map((f, idx) => ({
      question: f.question,
      answer: f.answer,
      category: f.category,
      display_order: idx + 1,
      is_published: true
    }));

    const { error: faqErr } = await supabase.from('faqs').upsert(faqsToInsert, { onConflict: 'question' });
    if (faqErr) console.warn('Supabase faqs seed note:', faqErr.message);

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}
