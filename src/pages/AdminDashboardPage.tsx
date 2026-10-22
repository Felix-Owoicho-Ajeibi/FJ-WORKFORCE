import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import { Link, useRouter } from '../lib/router';
import {
  JobVacancy,
  JobApplication,
  EmployerEnquiry,
  ContactMessage,
  ApplicationStatus,
  EnquiryStatus,
  FAQItem
} from '../types';
import {
  ShieldCheck,
  Briefcase,
  Users,
  Building2,
  Mail,
  FileText,
  Clock,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Search,
  Filter,
  Check,
  X,
  Layers,
  ArrowRight,
  Download,
  Calendar,
  Lock,
  MessageSquare,
  HelpCircle,
  Database,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    switchAccount,
    jobs,
    applications,
    statusHistory,
    applicationNotes,
    candidateProfiles,
    allUsers,
    employerEnquiries,
    contactMessages,
    services,
    faqs,
    auditLogs,
    createJob,
    updateJob,
    deleteJob,
    updateApplicationStatus,
    addApplicationNote,
    updateEnquiryStatus,
    updateContactMessageStatus,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    resetAllDataToSeed
  } = useStore();
  const { navigate } = useRouter();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'jobs' | 'applications' | 'candidates' | 'enquiries' | 'messages' | 'content' | 'logs' | 'database'
  >('overview');

  // Modal / Drawer states
  const [editingJob, setEditingJob] = useState<JobVacancy | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Under Review');
  const [statusReason, setStatusReason] = useState('');
  const [newRecruiterNote, setNewRecruiterNote] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EmployerEnquiry | null>(null);
  const [enquiryNote, setEnquiryNote] = useState('');

  // Search & Filter in tables
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('all');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [appJobFilter, setAppJobFilter] = useState('all');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');

  // Guard: Admin role required
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'recruiter';

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Restricted Administrative Access
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              The F&J Workforce Recruitment Management & ATS portal is restricted to authorized administrative personnel and recruitment officers.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 text-xs text-left space-y-2 text-slate-300">
            <p className="font-bold text-emerald-400">Reviewer Quick-Access:</p>
            <p>
              Click below to immediately switch session to the verified <strong>F&J Management Admin (ATS)</strong> account.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => switchAccount('admin')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#11851E] hover:bg-[#045B0D] text-white shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In as F&J Admin (One-Click)</span>
            </button>

            <Link
              to="/login"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            >
              Go to Standard Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Live Metrics calculations
  const totalCandidates = allUsers.filter((u) => u.role === 'candidate').length;
  const activeVacancies = jobs.filter((j) => j.status === 'published').length;
  const totalApplications = applications.length;
  const pendingReviewApps = applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length;
  const shortlistedApps = applications.filter(
    (a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled' || a.status === 'Offered' || a.status === 'Hired'
  ).length;
  const newEnquiries = employerEnquiries.filter((e) => e.status === 'New' || e.status === 'Under Review').length;
  const newContactMsgs = contactMessages.filter((m) => m.status === 'New').length;

  // Filtered jobs list
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      jobSearch.trim() === '' ||
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.workLocation.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesStatus = jobStatusFilter === 'all' || job.status === jobStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered applications list
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      appSearch.trim() === '' ||
      app.candidateName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
    const matchesJob = appJobFilter === 'all' || app.jobId === appJobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Filtered enquiries
  const filteredEnquiries = employerEnquiries.filter((enq) => {
    return enquiryStatusFilter === 'all' || enq.status === enquiryStatusFilter;
  });

  // Filtered candidates list
  const registeredCandidates = allUsers.filter((u) => u.role === 'candidate');
  const filteredCandidates = registeredCandidates.filter((cand) => {
    const profile = candidateProfiles[cand.id];
    const q = candidateSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      cand.fullName.toLowerCase().includes(q) ||
      cand.email.toLowerCase().includes(q) ||
      profile?.location.toLowerCase().includes(q) ||
      profile?.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'Under Review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">Under Review</span>;
      case 'Shortlisted':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8F5E9] text-[#045B0D] border border-emerald-300">Shortlisted</span>;
      case 'Interview Scheduled':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">Interview Scheduled</span>;
      case 'Offered':
      case 'Hired':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-700 text-white">Hired / Offered</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const handleUpdateAppStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplication) return;
    updateApplicationStatus(selectedApplication.id, newStatus, statusReason);
    setStatusReason('');
  };

  const handleAddAppNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplication || !newRecruiterNote.trim()) return;
    addApplicationNote(selectedApplication.id, newRecruiterNote);
    setNewRecruiterNote('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Top ATS Navigation Header */}
      <div className="bg-[#0B1E36] text-white px-4 sm:px-8 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#045B0D] text-white flex items-center justify-center font-bold text-sm border border-emerald-500/30">
            ATS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg text-white">
                F&J WORKFORCE
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Recruitment Management & Applicant Tracking System • Ibeju-Lekki Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:block text-right">
            <span className="font-bold text-white block">{currentUser.fullName}</span>
            <span className="text-emerald-400 capitalize">{currentUser.role} Access</span>
          </div>

          <button
            type="button"
            onClick={() => switchAccount('candidate')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors"
          >
            Switch to Candidate View
          </button>

          <Link
            to="/"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
          >
            View Public Site
          </Link>
        </div>
      </div>

      {/* Subnav Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max py-2 text-xs font-bold">
          {[
            { id: 'overview', label: 'Overview', icon: Layers, badge: null },
            { id: 'jobs', label: 'Vacancies', icon: Briefcase, badge: jobs.length },
            { id: 'applications', label: 'Applications (ATS)', icon: FileText, badge: pendingReviewApps > 0 ? pendingReviewApps : null },
            { id: 'candidates', label: 'Candidates', icon: Users, badge: totalCandidates },
            { id: 'enquiries', label: 'Employer Staffing Requisitions', icon: Building2, badge: newEnquiries > 0 ? newEnquiries : null },
            { id: 'messages', label: 'Contact Inquiries', icon: Mail, badge: newContactMsgs > 0 ? newContactMsgs : null },
            { id: 'content', label: 'Content & FAQs', icon: HelpCircle, badge: null },
            { id: 'logs', label: 'Audit Logs', icon: Clock, badge: null },
            { id: 'database', label: 'Supabase Settings', icon: Database, badge: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#0B1E36] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-[#11851E] text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & LIVE METRICS */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Registered</span>
                <span className="font-heading text-2xl font-black text-slate-900">{totalCandidates}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Candidates</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">Active</span>
                <span className="font-heading text-2xl font-black text-emerald-700">{activeVacancies}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Published Jobs</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total</span>
                <span className="font-heading text-2xl font-black text-[#0B1E36]">{totalApplications}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Applications</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">Awaiting Review</span>
                <span className="font-heading text-2xl font-black text-amber-800">{pendingReviewApps}</span>
                <span className="text-[10px] text-amber-600 block mt-1">Needs action</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#045B0D] block">Shortlisted</span>
                <span className="font-heading text-2xl font-black text-[#045B0D]">{shortlistedApps}</span>
                <span className="text-[10px] text-slate-500 block mt-1">In interview queue</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block">Requisitions</span>
                <span className="font-heading text-2xl font-black text-purple-800">{employerEnquiries.length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Employer leads</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">Messages</span>
                <span className="font-heading text-2xl font-black text-blue-800">{contactMessages.length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Inquiries</span>
              </div>
            </div>

            {/* Quick Actions & Recent Tables Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Columns: Recent Applications Feed */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-slate-900">
                    Recent Applications Received
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-[#045B0D] hover:underline"
                  >
                    Open Full ATS &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedApplication(app);
                        setNewStatus(app.status);
                        setActiveTab('applications');
                      }}
                      className="p-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{app.candidateName}</span>
                          <span className="text-[10px] font-mono text-slate-400">({app.referenceNumber})</span>
                        </div>
                        <p className="text-xs text-slate-600">{app.jobTitle}</p>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.submittedAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Recent Employer Requisitions */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-slate-900">
                    Incoming Employer Requisitions
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-bold text-[#045B0D] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {employerEnquiries.slice(0, 4).map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setActiveTab('enquiries');
                      }}
                      className="p-4 hover:bg-slate-50 cursor-pointer space-y-1 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{enq.companyName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{enq.serviceRequested}</p>
                      <p className="text-[11px] text-slate-500">
                        {enq.workersRequired} workers • Location: {enq.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit log teaser */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Recent Administrative Activity Log</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('logs')}
                  className="text-xs font-bold text-[#045B0D] hover:underline"
                >
                  View Full Audit Trail &rarr;
                </button>
              </div>

              <div className="space-y-2">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="text-xs text-slate-600 flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                    <span>
                      <strong className="text-slate-800">{log.actorName}:</strong> {log.action}
                    </span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap ml-4">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: JOB VACANCY MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">
                  Job Vacancies ({jobs.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Create, edit, publish, close, or reopen workforce vacancies.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingJob(null);
                  setIsCreatingJob(true);
                }}
                className="px-4 py-2.5 bg-[#045B0D] hover:bg-[#11851E] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Vacancy</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search vacancies by title, department, or location..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Status:</span>
                <select
                  value={jobStatusFilter}
                  onChange={(e) => setJobStatusFilter(e.target.value)}
                  className="border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published (Active)</option>
                  <option value="draft">Drafts</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Job Form Drawer / Modal */}
            {isCreatingJob && (
              <JobFormModal
                job={editingJob}
                onClose={() => {
                  setIsCreatingJob(false);
                  setEditingJob(null);
                }}
                onSave={(jobData) => {
                  if (editingJob) {
                    updateJob(editingJob.id, jobData);
                  } else {
                    createJob(jobData as any);
                  }
                  setIsCreatingJob(false);
                  setEditingJob(null);
                }}
              />
            )}

            {/* Vacancy Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Job Title & Sector</th>
                      <th className="px-4 py-3">Type / Location</th>
                      <th className="px-4 py-3">Deadline</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Apps</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.map((job) => {
                      const appCount = applications.filter((a) => a.jobId === job.id).length;
                      return (
                        <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-heading font-bold text-slate-900 text-sm block">
                              {job.title}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {job.department} • {job.industry}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            <span className="font-semibold text-slate-800 block">{job.employmentType} ({job.workArrangement})</span>
                            <span className="text-[11px] text-slate-400">{job.workLocation}</span>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            {new Date(job.applicationDeadline).toLocaleDateString('en-GB')}
                          </td>
                          <td className="px-4 py-4">
                            {job.status === 'published' ? (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8F5E9] text-[#045B0D] border border-emerald-300">
                                Published
                              </span>
                            ) : job.status === 'draft' ? (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600">
                                Draft
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">
                                Closed
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 font-mono font-bold text-slate-700">
                            {appCount}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                to={`/jobs/${job.slug}`}
                                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                                title="Preview Public Page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingJob(job);
                                  setIsCreatingJob(true);
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit Vacancy"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const nextStatus = job.status === 'published' ? 'closed' : 'published';
                                  updateJob(job.id, { status: nextStatus });
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold ${
                                  job.status === 'published'
                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                }`}
                              >
                                {job.status === 'published' ? 'Close' : 'Publish'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to permanently delete "${job.title}"?`)) {
                                    deleteJob(job.id);
                                  }
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                title="Delete Vacancy"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: APPLICATION MANAGEMENT (FULL ATS WORKFLOW) */}
        {/* ============================================================== */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">
                  Applicant Tracking System (ATS)
                </h2>
                <p className="text-xs text-slate-500">
                  Review applicant dossiers, update stage milestones, and append confidential recruiter notes.
                </p>
              </div>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by candidate name or reference..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Stage:</span>
                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <option value="all">All Stages</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Offered">Offered</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Job:</span>
                <select
                  value={appJobFilter}
                  onChange={(e) => setAppJobFilter(e.target.value)}
                  className="border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 cursor-pointer max-w-[180px] truncate"
                >
                  <option value="all">All Vacancies</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Application Drawer / Details Panel */}
            {selectedApplication && (
              <div className="bg-white rounded-2xl border-2 border-emerald-600/40 p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {selectedApplication.referenceNumber}
                      </span>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
                      {selectedApplication.candidateName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applied for <strong>{selectedApplication.jobTitle}</strong> on {new Date(selectedApplication.submittedAt).toLocaleString('en-GB')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedApplication(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg text-xs font-bold"
                  >
                    Close &times;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Candidate Info & CV */}
                  <div className="space-y-4 text-xs">
                    <h4 className="font-heading font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Candidate Dossier
                    </h4>
                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                      <p><strong>Email:</strong> {selectedApplication.candidateEmail}</p>
                      <p><strong>Phone:</strong> {selectedApplication.candidatePhone}</p>
                      <p><strong>Location:</strong> {selectedApplication.candidateLocation}</p>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                      <span className="font-bold text-[#045B0D] block">Attached Résumé:</span>
                      <p className="font-mono text-slate-800">{selectedApplication.cvFileName}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2.5 py-1 bg-[#045B0D] text-white rounded text-[11px] font-bold inline-flex items-center gap-1 cursor-default">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Secure CV</span>
                        </span>
                      </div>
                    </div>

                    {selectedApplication.coverLetter && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-700 block">Cover Letter:</span>
                        <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Middle Column: Screening Answers */}
                  <div className="space-y-4 text-xs">
                    <h4 className="font-heading font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Screening Assessment Responses
                    </h4>
                    <div className="space-y-3">
                      {selectedApplication.screeningAnswers.map((sa, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <p className="font-bold text-slate-800">{sa.question}</p>
                          <p className="text-slate-600 font-medium">{sa.answer}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <h4 className="font-heading font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                        Status History Trail
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {statusHistory
                          .filter((h) => h.applicationId === selectedApplication.id)
                          .map((h) => (
                            <div key={h.id} className="text-[11px] p-2 bg-slate-50 rounded border border-slate-200">
                              <span className="font-bold text-slate-800">{h.newStatus}</span>
                              <span className="text-slate-400 ml-1">({new Date(h.changedAt).toLocaleTimeString()})</span>
                              {h.reason && <p className="text-slate-600 mt-0.5">{h.reason}</p>}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Update Status & Recruiter Notes */}
                  <div className="space-y-5 text-xs">
                    {/* Update Status form */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <h4 className="font-heading font-bold text-slate-900">
                        Update ATS Pipeline Stage
                      </h4>
                      <form onSubmit={handleUpdateAppStatus} className="space-y-2.5">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                          className="w-full px-2.5 py-1.5 border rounded-lg bg-white font-bold text-slate-800"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Offered">Offered</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Audit reason (e.g. Cleared trade test)"
                          value={statusReason}
                          onChange={(e) => setStatusReason(e.target.value)}
                          className="w-full px-2.5 py-1.5 border rounded-lg bg-white"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-[#045B0D] hover:bg-[#11851E] text-white font-bold rounded-lg transition-colors"
                        >
                          Apply Stage Change
                        </button>
                      </form>
                    </div>

                    {/* Recruiter Notes form */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <h4 className="font-heading font-bold text-slate-900">
                        Private Recruiter Notes
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Confidential. Never visible to candidates.
                      </p>

                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {applicationNotes
                          .filter((n) => n.applicationId === selectedApplication.id)
                          .map((n) => (
                            <div key={n.id} className="p-2 bg-white rounded border border-slate-200 text-[11px]">
                              <p className="text-slate-800">{n.note}</p>
                              <span className="text-[10px] text-slate-400 block mt-1">
                                {n.authorName} • {new Date(n.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                      </div>

                      <form onSubmit={handleAddAppNote} className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          placeholder="Type internal candidate note..."
                          value={newRecruiterNote}
                          onChange={(e) => setNewRecruiterNote(e.target.value)}
                          className="w-full px-2 py-1.5 border rounded-lg bg-white"
                        />
                        <button
                          type="submit"
                          className="w-full py-1.5 bg-[#0B1E36] hover:bg-[#071526] text-white font-bold rounded-lg text-xs"
                        >
                          Add Note
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Reference & Candidate</th>
                      <th className="px-4 py-3">Target Vacancy</th>
                      <th className="px-4 py-3">Date Applied</th>
                      <th className="px-4 py-3">Current Stage</th>
                      <th className="px-4 py-3">CV Attached</th>
                      <th className="px-5 py-3 text-right">Review Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          selectedApplication?.id === app.id ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <td className="px-5 py-4">
                          <span className="font-mono text-[11px] font-bold text-slate-500 block">
                            {app.referenceNumber}
                          </span>
                          <span className="font-heading font-bold text-slate-900 text-sm block">
                            {app.candidateName}
                          </span>
                          <span className="text-[11px] text-slate-400">{app.candidatePhone}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-medium">
                          {app.jobTitle}
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {new Date(app.submittedAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-4 py-4">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-4 py-4 text-slate-600 font-mono text-[11px]">
                          {app.cvFileName}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedApplication(app);
                              setNewStatus(app.status);
                            }}
                            className="px-3 py-1.5 bg-[#0B1E36] hover:bg-[#045B0D] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Evaluate</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CANDIDATE DIRECTORY */}
        {/* ============================================================== */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">
                  Registered Candidate Directory ({filteredCandidates.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Search registered candidate profiles, verify skills, and inspect CV status.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search candidates by name, email, location, or technical skill..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((cand) => {
                const profile = candidateProfiles[cand.id];
                const candApps = applications.filter((a) => a.candidateId === cand.id);
                return (
                  <div key={cand.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0B1E36] text-white flex items-center justify-center font-bold text-sm">
                          {cand.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-slate-900 text-sm">
                            {cand.fullName}
                          </h3>
                          <span className="text-[11px] text-slate-400">{profile?.location || 'Lagos'}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {profile?.profileCompletion || 25}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {profile?.headline || profile?.professionalSummary || 'No headline set yet'}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {profile?.skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{candApps.length} Application(s)</span>
                      <span className="font-mono text-[11px] font-semibold text-slate-700">
                        {profile?.cvFileName ? 'CV Attached' : 'No CV'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: EMPLOYER ENQUIRIES & REQUISITIONS */}
        {/* ============================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">
                  Employer Staffing Requisitions ({employerEnquiries.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Staffing requests received from corporate clients and industrial factory leads.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Filter:</span>
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700"
                >
                  <option value="all">All Requisitions</option>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Fulfilled">Fulfilled</option>
                </select>
              </div>
            </div>

            {selectedEnquiry && (
              <div className="bg-white rounded-2xl border-2 border-purple-400 p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {selectedEnquiry.referenceNumber}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
                      {selectedEnquiry.companyName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Contact: {selectedEnquiry.contactName} ({selectedEnquiry.phone} • {selectedEnquiry.email})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    Close &times;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border">
                    <span className="text-slate-400 block font-medium">Service Requested</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedEnquiry.serviceRequested}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border">
                    <span className="text-slate-400 block font-medium">Workers Needed</span>
                    <span className="font-bold text-purple-700 text-sm">{selectedEnquiry.workersRequired} Personnel</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border">
                    <span className="text-slate-400 block font-medium">Deployment Location</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedEnquiry.location}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-800">Job Roles & Specific Requirements:</span>
                  <p className="text-slate-700 font-semibold">{selectedEnquiry.jobRoles}</p>
                  <p className="text-slate-600 mt-1 whitespace-pre-line">{selectedEnquiry.requirements}</p>
                </div>

                {/* Status updater */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-xs font-bold text-slate-700">Update Lead Status:</span>
                  {(['New', 'Under Review', 'Contacted', 'Proposal Sent', 'Fulfilled'] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateEnquiryStatus(selectedEnquiry.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Reference & Company</th>
                      <th className="px-4 py-3">Service & Workers</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Date Submitted</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <span className="font-mono text-[11px] font-bold text-slate-400 block">{enq.referenceNumber}</span>
                          <span className="font-heading font-bold text-slate-900 text-sm block">{enq.companyName}</span>
                          <span className="text-[11px] text-slate-500">{enq.contactName} ({enq.phone})</span>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          <span className="font-semibold block">{enq.serviceRequested}</span>
                          <span className="text-purple-700 font-bold">{enq.workersRequired} workers requested</span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{enq.location}</td>
                        <td className="px-4 py-4 text-slate-500">{new Date(enq.createdAt).toLocaleDateString('en-GB')}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">
                            {enq.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: CONTACT INQUIRIES */}
        {/* ============================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Contact Messages Desk ({contactMessages.length})
              </h2>
              <p className="text-xs text-slate-500">
                General inquiries submitted via public contact forms.
              </p>
            </div>

            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">{msg.subject}</h3>
                      <p className="text-xs text-slate-500">
                        From: <strong>{msg.name}</strong> ({msg.email} {msg.phone ? `• ${msg.phone}` : ''}) • Received {new Date(msg.createdAt).toLocaleString('en-GB')}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      msg.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-[#045B0D]'
                    }`}>
                      {msg.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-2 justify-end pt-1 text-xs">
                    <a
                      href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                      className="px-3 py-1.5 bg-[#0B1E36] hover:bg-[#071526] text-white font-bold rounded-lg"
                    >
                      Reply via Email
                    </a>
                    {msg.status === 'New' && (
                      <button
                        type="button"
                        onClick={() => updateContactMessageStatus(msg.id, 'Replied')}
                        className="px-3 py-1.5 bg-[#045B0D] hover:bg-[#11851E] text-white font-bold rounded-lg"
                      >
                        Mark Replied
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: CONTENT CMS (SERVICES & FAQS) */}
        {/* ============================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Content Management System
              </h2>
              <p className="text-xs text-slate-500">
                Manage service offerings and frequently asked questions published on the public portal.
              </p>
            </div>

            {/* Service CMS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading text-base font-bold text-slate-900">
                Configured Workforce Services ({services.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{s.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-2">{s.shortSummary}</p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-[#045B0D] font-bold hover:underline inline-block pt-1"
                    >
                      View Live Service Page &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ CMS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Published FAQs ({faqs.length})
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{faq.question}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">
                          {faq.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete FAQ item?')) deleteFAQ(faq.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: AUDIT LOGS */}
        {/* ============================================================== */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Security & Audit Trail Logs ({auditLogs.length})
              </h2>
              <p className="text-xs text-slate-500">
                Chronological trail of role actions, vacancy updates, and recruitment evaluations.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-4 py-3">Actor</th>
                      <th className="px-4 py-3">Action Description</th>
                      <th className="px-4 py-3">Entity Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                          {new Date(log.createdAt).toLocaleString('en-GB')}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">
                          {log.actorName}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {log.action}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 uppercase">
                            {log.entityType}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 9: DATABASE & SUPABASE ARCHITECTURE */}
        {/* ============================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#045B0D]" />
                <h2 className="font-heading text-xl font-bold text-slate-900">
                  Supabase Database & Storage Deployment Guide
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The platform is architected with dual persistence: a zero-latency local fallback store for seamless interactive evaluation, and production-ready Supabase PostgreSQL & Row Level Security schemas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <span className="font-bold text-[#045B0D] block">SQL Migrations File:</span>
                  <p className="text-slate-700">`supabase/migrations/20261022_init.sql`</p>
                  <p className="text-[11px] text-slate-500">Includes 12 tables, RLS policies, indexes, and triggers.</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                  <span className="font-bold text-[#0B1E36] block">Environment Template:</span>
                  <p className="text-slate-700">`.env.example`</p>
                  <p className="text-[11px] text-slate-500">Configured for Vercel and Supabase SSR.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Reset Demo Data to Initial Seeds</h4>
                  <p className="text-[11px] text-slate-500">Restores all sample jobs, candidate applications, and inquiries.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all demo candidate data and applications to factory state?')) {
                      resetAllDataToSeed();
                    }
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                >
                  Reset Demo Seeds
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Modal for Creating & Editing Vacancies
interface JobFormModalProps {
  job: JobVacancy | null;
  onClose: () => void;
  onSave: (data: Partial<JobVacancy>) => void;
}

const JobFormModal: React.FC<JobFormModalProps> = ({ job, onClose, onSave }) => {
  const [title, setTitle] = useState(job?.title || '');
  const [slug, setSlug] = useState(job?.slug || '');
  const [department, setDepartment] = useState(job?.department || 'Operations');
  const [industry, setIndustry] = useState(job?.industry || 'Manufacturing');
  const [employmentType, setEmploymentType] = useState(job?.employmentType || 'Full-time');
  const [workLocation, setWorkLocation] = useState(job?.workLocation || 'Ibeju-Lekki, Lagos');
  const [workArrangement, setWorkArrangement] = useState(job?.workArrangement || 'On-site');
  const [salaryMin, setSalaryMin] = useState(job?.salaryMin?.toString() || '250000');
  const [salaryMax, setSalaryMax] = useState(job?.salaryMax?.toString() || '350000');
  const [summary, setSummary] = useState(job?.summary || '');
  const [description, setDescription] = useState(job?.description || '');
  const [responsibilitiesText, setResponsibilitiesText] = useState(job?.responsibilities.join('\n') || '');
  const [qualificationsText, setQualificationsText] = useState(job?.qualifications.join('\n') || '');
  const [experienceReq, setExperienceReq] = useState(job?.experienceRequirements || '3+ years experience');
  const [skillsText, setSkillsText] = useState(job?.skills.join(', ') || 'Safety, Operations, Supervision');
  const [deadline, setDeadline] = useState(job?.applicationDeadline || '2026-12-15');
  const [status, setStatus] = useState(job?.status || 'published');
  const [hiringOrg, setHiringOrg] = useState(job?.hiringOrganization || 'Industrial Client Partner');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!job) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      slug: slug || 'job-' + Date.now(),
      department,
      industry,
      employmentType: employmentType as any,
      workLocation,
      workArrangement: workArrangement as any,
      salaryMin: parseInt(salaryMin, 10) || undefined,
      salaryMax: parseInt(salaryMax, 10) || undefined,
      currency: 'NGN',
      summary,
      description,
      responsibilities: responsibilitiesText.split('\n').filter((l) => l.trim().length > 0),
      qualifications: qualificationsText.split('\n').filter((l) => l.trim().length > 0),
      experienceRequirements: experienceReq,
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      applicationDeadline: deadline,
      status: status as any,
      hiringOrganization: hiringOrg
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {job ? 'Edit Job Vacancy' : 'Create New Job Vacancy'}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Electrical Plant Maintenance Technician"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Industry Sector *</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Manufacturing / Logistics"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Engineering / Supply Chain"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Shift">Shift</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Arrangement</label>
              <select
                value={workArrangement}
                onChange={(e) => setWorkArrangement(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Location *</label>
              <input
                type="text"
                required
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                placeholder="Ibeju-Lekki, Lagos"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hiring Organization (Client)</label>
              <input
                type="text"
                value={hiringOrg}
                onChange={(e) => setHiringOrg(e.target.value)}
                placeholder="Leading Industrial Partner"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Monthly Salary Min (₦)</label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Monthly Salary Max (₦)</label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Application Deadline *</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Publication Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg bg-white font-bold"
              >
                <option value="published">Published (Visible Publicly)</option>
                <option value="draft">Draft (Private)</option>
                <option value="closed">Closed (No new applications)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Role Summary *</label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1-2 sentences summarizing the role..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full role description..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Responsibilities (One per line) *</label>
            <textarea
              rows={3}
              required
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder="Oversee daily warehouse dispatch&#10;Maintain 99% inventory accuracy"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Qualifications (One per line) *</label>
            <textarea
              rows={3}
              required
              value={qualificationsText}
              onChange={(e) => setQualificationsText(e.target.value)}
              placeholder="B.Sc or HND in Engineering&#10;HSE Level 2 certification"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Skills (Comma-separated)</label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Forklift, HSE, ERP, SAP, Team Leadership"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl text-slate-700 hover:bg-slate-50 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#045B0D] hover:bg-[#11851E] text-white font-bold rounded-xl shadow-xs"
            >
              {job ? 'Save Changes' : 'Create & Save Vacancy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
