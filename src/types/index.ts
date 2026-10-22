export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  headline?: string;
  professionalSummary: string;
  location: string;
  education: EducationEntry[];
  workExperience: ExperienceEntry[];
  skills: string[];
  preferredLocations: string[];
  preferredEmploymentTypes: string[];
  cvFileName?: string;
  cvStoragePath?: string;
  cvFileSize?: number;
  cvUploadedAt?: string;
  savedJobIds: string[];
  profileCompletion: number;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'draft' | 'published' | 'closed';

export interface JobVacancy {
  id: string;
  title: string;
  slug: string;
  department: string;
  industry: string;
  employmentType: 'Full-time' | 'Contract' | 'Permanent' | 'Temporary' | 'Shift';
  workLocation: string;
  workArrangement: 'On-site' | 'Hybrid' | 'Remote' | 'Shift';
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  summary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experienceRequirements: string;
  skills: string[];
  applicationDeadline: string;
  status: JobStatus;
  publishedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  hiringOrganization?: string;
  openPositions?: number;
}

export type ApplicationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Interviewed'
  | 'Offered'
  | 'Hired'
  | 'Rejected'
  | 'Withdrawn';

export interface ScreeningAnswer {
  question: string;
  answer: string;
}

export interface JobApplication {
  id: string;
  referenceNumber: string;
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLocation: string;
  cvFileName: string;
  cvStoragePath: string;
  coverLetter?: string;
  screeningAnswers: ScreeningAnswer[];
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface ApplicationNote {
  id: string;
  applicationId: string;
  authorId: string;
  authorName: string;
  note: string;
  createdAt: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  previousStatus: ApplicationStatus;
  newStatus: ApplicationStatus;
  changedBy: string;
  changedByName: string;
  changedAt: string;
  reason?: string;
}

export type EnquiryStatus = 'New' | 'Under Review' | 'Contacted' | 'Proposal Sent' | 'Fulfilled' | 'Archived';

export interface EmployerEnquiry {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  serviceRequested: string;
  workersRequired: number;
  jobRoles: string;
  location: string;
  expectedStartDate: string;
  requirements: string;
  status: EnquiryStatus;
  assignedTo?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageStatus = 'New' | 'Read' | 'Replied' | 'Archived';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortSummary: string;
  heroHeadline: string;
  overview: string;
  businessProblem: string[];
  process: { step: string; title: string; description: string }[];
  targetClients: string[];
  benefits: string[];
  isPublished: boolean;
  sortOrder: number;
  badge: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Candidates' | 'Employers' | 'Recruitment & Verification' | 'General';
  isPublished: boolean;
  sortOrder: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  entityType: 'job' | 'application' | 'candidate' | 'enquiry' | 'content' | 'auth';
  entityId: string;
  metadata?: Record<string, any>;
  createdAt: string;
}
