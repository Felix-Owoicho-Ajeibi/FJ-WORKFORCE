import { useState, useEffect } from 'react';
import {
  User,
  JobVacancy,
  JobApplication,
  CandidateProfile,
  EmployerEnquiry,
  ContactMessage,
  ServiceDetail,
  FAQItem,
  AuditLog,
  ApplicationStatusHistory,
  ApplicationNote,
  ApplicationStatus,
  EnquiryStatus
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_JOBS,
  INITIAL_FAQS,
  INITIAL_USER,
  INITIAL_CANDIDATE_PROFILE,
  INITIAL_ADMIN_USER,
  INITIAL_APPLICATIONS,
  INITIAL_STATUS_HISTORY,
  INITIAL_EMPLOYER_ENQUIRIES,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_AUDIT_LOGS
} from './initialData';

const STORAGE_KEYS = {
  CURRENT_USER: 'fjw_current_user',
  ALL_USERS: 'fjw_users',
  JOBS: 'fjw_jobs',
  APPLICATIONS: 'fjw_applications',
  STATUS_HISTORY: 'fjw_status_history',
  APPLICATION_NOTES: 'fjw_app_notes',
  CANDIDATE_PROFILES: 'fjw_candidate_profiles',
  EMPLOYER_ENQUIRIES: 'fjw_employer_enquiries',
  CONTACT_MESSAGES: 'fjw_contact_messages',
  SERVICES: 'fjw_services',
  FAQS: 'fjw_faqs',
  AUDIT_LOGS: 'fjw_audit_logs'
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading key ${key} from storage:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving key ${key} to storage:`, e);
  }
}

// Global in-memory state initialized from storage
let currentUserState: User | null = loadFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USER);
let usersState: User[] = loadFromStorage<User[]>(STORAGE_KEYS.ALL_USERS, [INITIAL_USER, INITIAL_ADMIN_USER]);
let jobsState: JobVacancy[] = loadFromStorage<JobVacancy[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
let applicationsState: JobApplication[] = loadFromStorage<JobApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
let statusHistoryState: ApplicationStatusHistory[] = loadFromStorage<ApplicationStatusHistory[]>(STORAGE_KEYS.STATUS_HISTORY, INITIAL_STATUS_HISTORY);
let applicationNotesState: ApplicationNote[] = loadFromStorage<ApplicationNote[]>(STORAGE_KEYS.APPLICATION_NOTES, []);
let candidateProfilesState: Record<string, CandidateProfile> = loadFromStorage<Record<string, CandidateProfile>>(
  STORAGE_KEYS.CANDIDATE_PROFILES,
  { [INITIAL_USER.id]: INITIAL_CANDIDATE_PROFILE }
);
let employerEnquiriesState: EmployerEnquiry[] = loadFromStorage<EmployerEnquiry[]>(STORAGE_KEYS.EMPLOYER_ENQUIRIES, INITIAL_EMPLOYER_ENQUIRIES);
let contactMessagesState: ContactMessage[] = loadFromStorage<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, INITIAL_CONTACT_MESSAGES);
let servicesState: ServiceDetail[] = loadFromStorage<ServiceDetail[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
let faqsState: FAQItem[] = loadFromStorage<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
// Sync updated fee notice FAQ
if (faqsState) {
  const targetFaq = INITIAL_FAQS.find((f) => f.id === 'faq-2');
  if (targetFaq) {
    faqsState = faqsState.map((f) => (f.id === 'faq-2' ? targetFaq : f));
  }
}
let auditLogsState: AuditLog[] = loadFromStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);

// Listeners
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Helper to record audit log
  const logAudit = (
    action: string,
    entityType: AuditLog['entityType'],
    entityId: string,
    metadata?: Record<string, any>
  ) => {
    const actor = currentUserState || { id: 'anonymous', fullName: 'Public User' };
    const newLog: AuditLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      actorId: actor.id,
      actorName: actor.fullName,
      action,
      entityType,
      entityId,
      metadata,
      createdAt: new Date().toISOString()
    };
    auditLogsState = [newLog, ...auditLogsState];
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, auditLogsState);
    notify();
  };

  // Auth actions
  const login = (email: string, role?: 'candidate' | 'admin' | 'recruiter'): { success: boolean; message?: string } => {
    const user = usersState.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Auto-register convenience or fail
      return { success: false, message: 'Invalid credentials or user does not exist.' };
    }
    currentUserState = user;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUserState);
    logAudit(`User logged in: ${user.fullName} (${user.role})`, 'auth', user.id);
    notify();
    return { success: true };
  };

  const registerCandidate = (data: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
  }): { success: boolean; message?: string; user?: User } => {
    const existing = usersState.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }

    const newUser: User = {
      id: 'cand-' + Date.now().toString(36),
      email: data.email.trim(),
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      role: 'candidate',
      createdAt: new Date().toISOString()
    };

    const newProfile: CandidateProfile = {
      id: 'cp-' + Date.now().toString(36),
      userId: newUser.id,
      headline: '',
      professionalSummary: '',
      location: 'Lagos, Nigeria',
      education: [],
      workExperience: [],
      skills: [],
      preferredLocations: ['Ibeju-Lekki', 'Lagos'],
      preferredEmploymentTypes: ['Full-time'],
      savedJobIds: [],
      profileCompletion: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    usersState = [...usersState, newUser];
    candidateProfilesState = { ...candidateProfilesState, [newUser.id]: newProfile };
    currentUserState = newUser;

    saveToStorage(STORAGE_KEYS.ALL_USERS, usersState);
    saveToStorage(STORAGE_KEYS.CANDIDATE_PROFILES, candidateProfilesState);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUserState);

    logAudit(`New candidate registered: ${newUser.fullName}`, 'candidate', newUser.id);
    notify();
    return { success: true, user: newUser };
  };

  const logout = () => {
    if (currentUserState) {
      logAudit(`User logged out: ${currentUserState.fullName}`, 'auth', currentUserState.id);
    }
    currentUserState = null;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, null);
    notify();
  };

  const switchAccount = (role: 'candidate' | 'admin') => {
    if (role === 'admin') {
      currentUserState = INITIAL_ADMIN_USER;
    } else {
      currentUserState = INITIAL_USER;
    }
    saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUserState);
    logAudit(`Switched active view session to ${currentUserState.fullName} (${currentUserState.role})`, 'auth', currentUserState.id);
    notify();
  };

  // Job management
  const getJobBySlug = (slug: string): JobVacancy | undefined => {
    return jobsState.find((j) => j.slug === slug);
  };

  const createJob = (jobData: Omit<JobVacancy, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newId = 'job-' + Date.now().toString(36);
    const newJob: JobVacancy = {
      ...jobData,
      id: newId,
      createdBy: currentUserState?.fullName || 'F&J Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: jobData.status === 'published' ? new Date().toISOString() : undefined
    };
    jobsState = [newJob, ...jobsState];
    saveToStorage(STORAGE_KEYS.JOBS, jobsState);
    logAudit(`Created job vacancy: "${newJob.title}"`, 'job', newId);
    notify();
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<JobVacancy>) => {
    jobsState = jobsState.map((j) => {
      if (j.id === id) {
        const updated = {
          ...j,
          ...updates,
          updatedAt: new Date().toISOString(),
          publishedAt: updates.status === 'published' && !j.publishedAt ? new Date().toISOString() : j.publishedAt
        };
        return updated;
      }
      return j;
    });
    saveToStorage(STORAGE_KEYS.JOBS, jobsState);
    logAudit(`Updated job vacancy: ${id}`, 'job', id);
    notify();
  };

  const deleteJob = (id: string) => {
    const job = jobsState.find((j) => j.id === id);
    jobsState = jobsState.filter((j) => j.id !== id);
    saveToStorage(STORAGE_KEYS.JOBS, jobsState);
    logAudit(`Deleted job vacancy: "${job?.title || id}"`, 'job', id);
    notify();
  };

  // Application management
  const applyForJob = (applicationData: {
    jobId: string;
    coverLetter?: string;
    screeningAnswers: { question: string; answer: string }[];
    cvFileName?: string;
    cvStoragePath?: string;
  }): { success: boolean; message?: string; application?: JobApplication } => {
    if (!currentUserState) {
      return { success: false, message: 'You must be logged in as a candidate to apply.' };
    }

    const job = jobsState.find((j) => j.id === applicationData.jobId);
    if (!job) {
      return { success: false, message: 'Vacancy not found.' };
    }

    if (job.status !== 'published') {
      return { success: false, message: 'This vacancy is no longer accepting applications.' };
    }

    const isPastDeadline = new Date(job.applicationDeadline).getTime() < new Date().setHours(0, 0, 0, 0);
    if (isPastDeadline) {
      return { success: false, message: 'The application deadline for this vacancy has expired.' };
    }

    // Check duplicate
    const existing = applicationsState.find(
      (a) => a.jobId === job.id && a.candidateId === currentUserState!.id
    );
    if (existing) {
      return {
        success: false,
        message: `You have already submitted an application for this position on ${new Date(existing.submittedAt).toLocaleDateString()}. Duplicate applications are not permitted.`
      };
    }

    const candidateProfile = candidateProfilesState[currentUserState.id];
    const cvFile = applicationData.cvFileName || candidateProfile?.cvFileName || 'Candidate_Resume.pdf';
    const cvPath = applicationData.cvStoragePath || candidateProfile?.cvStoragePath || `resumes/${currentUserState.id}/${cvFile}`;

    const refNum = `FJW-APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: JobApplication = {
      id: 'app-' + Date.now().toString(36),
      referenceNumber: refNum,
      jobId: job.id,
      jobTitle: job.title,
      jobSlug: job.slug,
      candidateId: currentUserState.id,
      candidateName: currentUserState.fullName,
      candidateEmail: currentUserState.email,
      candidatePhone: currentUserState.phone,
      candidateLocation: candidateProfile?.location || 'Lagos, Nigeria',
      cvFileName: cvFile,
      cvStoragePath: cvPath,
      coverLetter: applicationData.coverLetter,
      screeningAnswers: applicationData.screeningAnswers,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const initialHistory: ApplicationStatusHistory = {
      id: 'sh-' + Date.now().toString(36),
      applicationId: newApp.id,
      previousStatus: 'Submitted',
      newStatus: 'Submitted',
      changedBy: currentUserState.id,
      changedByName: currentUserState.fullName,
      changedAt: new Date().toISOString(),
      reason: 'Application submitted via F&J candidate portal.'
    };

    applicationsState = [newApp, ...applicationsState];
    statusHistoryState = [initialHistory, ...statusHistoryState];

    saveToStorage(STORAGE_KEYS.APPLICATIONS, applicationsState);
    saveToStorage(STORAGE_KEYS.STATUS_HISTORY, statusHistoryState);

    logAudit(`New application received for "${job.title}" from ${currentUserState.fullName} (${refNum})`, 'application', newApp.id);
    notify();

    return { success: true, application: newApp };
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: ApplicationStatus,
    reason?: string
  ) => {
    const app = applicationsState.find((a) => a.id === applicationId);
    if (!app) return;

    const prevStatus = app.status;
    app.status = newStatus;
    app.updatedAt = new Date().toISOString();

    const historyEntry: ApplicationStatusHistory = {
      id: 'sh-' + Date.now().toString(36),
      applicationId,
      previousStatus: prevStatus,
      newStatus,
      changedBy: currentUserState?.id || 'admin-001',
      changedByName: currentUserState?.fullName || 'F&J Recruiter',
      changedAt: new Date().toISOString(),
      reason: reason || `Status updated from ${prevStatus} to ${newStatus}`
    };

    applicationsState = [...applicationsState];
    statusHistoryState = [historyEntry, ...statusHistoryState];

    saveToStorage(STORAGE_KEYS.APPLICATIONS, applicationsState);
    saveToStorage(STORAGE_KEYS.STATUS_HISTORY, statusHistoryState);

    logAudit(`Updated application ${app.referenceNumber} status to "${newStatus}"`, 'application', applicationId);
    notify();
  };

  const addApplicationNote = (applicationId: string, noteText: string) => {
    const newNote: ApplicationNote = {
      id: 'note-' + Date.now().toString(36),
      applicationId,
      authorId: currentUserState?.id || 'admin-001',
      authorName: currentUserState?.fullName || 'F&J Recruiter',
      note: noteText.trim(),
      createdAt: new Date().toISOString()
    };
    applicationNotesState = [newNote, ...applicationNotesState];
    saveToStorage(STORAGE_KEYS.APPLICATION_NOTES, applicationNotesState);
    logAudit(`Added internal note to application ${applicationId}`, 'application', applicationId);
    notify();
  };

  // Candidate Profile actions
  const getCandidateProfile = (userId: string): CandidateProfile | undefined => {
    return candidateProfilesState[userId];
  };

  const updateCandidateProfile = (userId: string, updates: Partial<CandidateProfile>) => {
    const current = candidateProfilesState[userId] || {
      id: 'cp-' + Date.now().toString(36),
      userId,
      headline: '',
      professionalSummary: '',
      location: 'Lagos, Nigeria',
      education: [],
      workExperience: [],
      skills: [],
      preferredLocations: [],
      preferredEmploymentTypes: [],
      savedJobIds: [],
      profileCompletion: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Recalculate completion
    const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };
    let score = 20; // baseline
    if (merged.headline) score += 15;
    if (merged.professionalSummary) score += 15;
    if (merged.workExperience && merged.workExperience.length > 0) score += 20;
    if (merged.education && merged.education.length > 0) score += 15;
    if (merged.skills && merged.skills.length > 0) score += 10;
    if (merged.cvFileName) score += 20;
    merged.profileCompletion = Math.min(100, score);

    candidateProfilesState = {
      ...candidateProfilesState,
      [userId]: merged
    };

    saveToStorage(STORAGE_KEYS.CANDIDATE_PROFILES, candidateProfilesState);
    logAudit(`Updated candidate profile`, 'candidate', userId);
    notify();
  };

  const uploadCV = (userId: string, fileName: string, fileSize: number) => {
    updateCandidateProfile(userId, {
      cvFileName: fileName,
      cvFileSize: fileSize,
      cvStoragePath: `resumes/${userId}/${fileName}`,
      cvUploadedAt: new Date().toISOString()
    });
    logAudit(`Uploaded new CV: ${fileName}`, 'candidate', userId);
  };

  const removeCV = (userId: string) => {
    const current = candidateProfilesState[userId];
    if (current) {
      updateCandidateProfile(userId, {
        cvFileName: undefined,
        cvFileSize: undefined,
        cvStoragePath: undefined,
        cvUploadedAt: undefined
      });
      logAudit(`Removed CV`, 'candidate', userId);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    if (!currentUserState) return;
    const profile = candidateProfilesState[currentUserState.id];
    if (!profile) return;

    const saved = profile.savedJobIds || [];
    const isSaved = saved.includes(jobId);
    const newSaved = isSaved ? saved.filter((id) => id !== jobId) : [...saved, jobId];

    updateCandidateProfile(currentUserState.id, { savedJobIds: newSaved });
  };

  // Employer Enquiries
  const submitEmployerEnquiry = (enquiryData: Omit<EmployerEnquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const refNum = `FJW-REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: EmployerEnquiry = {
      ...enquiryData,
      id: 'enq-' + Date.now().toString(36),
      referenceNumber: refNum,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    employerEnquiriesState = [newEnquiry, ...employerEnquiriesState];
    saveToStorage(STORAGE_KEYS.EMPLOYER_ENQUIRIES, employerEnquiriesState);
    logAudit(`New staffing request submitted by "${newEnquiry.companyName}" (${refNum})`, 'enquiry', newEnquiry.id);
    notify();
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, internalNotes?: string, assignedTo?: string) => {
    employerEnquiriesState = employerEnquiriesState.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          status,
          internalNotes: internalNotes !== undefined ? internalNotes : e.internalNotes,
          assignedTo: assignedTo !== undefined ? assignedTo : e.assignedTo,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYER_ENQUIRIES, employerEnquiriesState);
    logAudit(`Updated employer requisition status for ${id} to ${status}`, 'enquiry', id);
    notify();
  };

  // Contact Messages
  const sendContactMessage = (msgData: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: 'msg-' + Date.now().toString(36),
      status: 'New',
      createdAt: new Date().toISOString()
    };
    contactMessagesState = [newMsg, ...contactMessagesState];
    saveToStorage(STORAGE_KEYS.CONTACT_MESSAGES, contactMessagesState);
    logAudit(`New contact inquiry from ${newMsg.name}`, 'content', newMsg.id);
    notify();
    return newMsg;
  };

  const updateContactMessageStatus = (id: string, status: ContactMessage['status']) => {
    contactMessagesState = contactMessagesState.map((m) => (m.id === id ? { ...m, status } : m));
    saveToStorage(STORAGE_KEYS.CONTACT_MESSAGES, contactMessagesState);
    notify();
  };

  // CMS: Services and FAQs
  const updateService = (id: string, updates: Partial<ServiceDetail>) => {
    servicesState = servicesState.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveToStorage(STORAGE_KEYS.SERVICES, servicesState);
    logAudit(`Updated service content: ${id}`, 'content', id);
    notify();
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFAQ: FAQItem = {
      ...faq,
      id: 'faq-' + Date.now().toString(36)
    };
    faqsState = [...faqsState, newFAQ];
    saveToStorage(STORAGE_KEYS.FAQS, faqsState);
    logAudit(`Added new FAQ item`, 'content', newFAQ.id);
    notify();
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    faqsState = faqsState.map((f) => (f.id === id ? { ...f, ...updates } : f));
    saveToStorage(STORAGE_KEYS.FAQS, faqsState);
    logAudit(`Updated FAQ item: ${id}`, 'content', id);
    notify();
  };

  const deleteFAQ = (id: string) => {
    faqsState = faqsState.filter((f) => f.id !== id);
    saveToStorage(STORAGE_KEYS.FAQS, faqsState);
    logAudit(`Deleted FAQ item: ${id}`, 'content', id);
    notify();
  };

  const resetAllDataToSeed = () => {
    localStorage.clear();
    currentUserState = INITIAL_USER;
    usersState = [INITIAL_USER, INITIAL_ADMIN_USER];
    jobsState = INITIAL_JOBS;
    applicationsState = INITIAL_APPLICATIONS;
    statusHistoryState = INITIAL_STATUS_HISTORY;
    applicationNotesState = [];
    candidateProfilesState = { [INITIAL_USER.id]: INITIAL_CANDIDATE_PROFILE };
    employerEnquiriesState = INITIAL_EMPLOYER_ENQUIRIES;
    contactMessagesState = INITIAL_CONTACT_MESSAGES;
    servicesState = INITIAL_SERVICES;
    faqsState = INITIAL_FAQS;
    auditLogsState = INITIAL_AUDIT_LOGS;
    notify();
  };

  return {
    currentUser: currentUserState,
    allUsers: usersState,
    jobs: jobsState,
    applications: applicationsState,
    statusHistory: statusHistoryState,
    applicationNotes: applicationNotesState,
    candidateProfiles: candidateProfilesState,
    employerEnquiries: employerEnquiriesState,
    contactMessages: contactMessagesState,
    services: servicesState,
    faqs: faqsState,
    auditLogs: auditLogsState,

    // Methods
    login,
    registerCandidate,
    logout,
    switchAccount,
    getJobBySlug,
    createJob,
    updateJob,
    deleteJob,
    applyForJob,
    updateApplicationStatus,
    addApplicationNote,
    getCandidateProfile,
    updateCandidateProfile,
    uploadCV,
    removeCV,
    toggleSaveJob,
    submitEmployerEnquiry,
    updateEnquiryStatus,
    sendContactMessage,
    updateContactMessageStatus,
    updateService,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    logAudit,
    resetAllDataToSeed
  };
}
