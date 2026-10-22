import React, { useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import { JobCard } from '../components/common/JobCard';
import {
  Briefcase,
  FileText,
  Bookmark,
  CheckCircle2,
  Clock,
  Upload,
  Calendar,
  AlertCircle,
  ChevronRight,
  User,
  ShieldCheck,
  Building2,
  Download,
  Trash2,
  Eye,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const CandidateDashboardPage: React.FC = () => {
  const {
    currentUser,
    getCandidateProfile,
    applications,
    statusHistory,
    jobs,
    uploadCV,
    removeCV,
    toggleSaveJob
  } = useStore();
  const { navigate } = useRouter();

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [cvFileError, setCvFileError] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'saved' | 'cv'>('applications');

  if (!currentUser) {
    navigate('/login?redirect=/candidate/dashboard');
    return null;
  }

  const profile = getCandidateProfile(currentUser.id);
  const candidateApps = applications.filter((a) => a.candidateId === currentUser.id);
  const savedJobs = jobs.filter((j) => profile?.savedJobIds?.includes(j.id));

  // Metrics
  const totalApplied = candidateApps.length;
  const inReviewCount = candidateApps.filter((a) => a.status === 'Under Review').length;
  const shortlistedCount = candidateApps.filter(
    (a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled' || a.status === 'Offered' || a.status === 'Hired'
  ).length;

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setCvFileError('File exceeds 5MB limit.');
      return;
    }
    const name = file.name.toLowerCase();
    if (!name.endsWith('.pdf') && !name.endsWith('.docx') && !name.endsWith('.doc')) {
      setCvFileError('Only PDF or DOCX documents allowed.');
      return;
    }

    uploadCV(currentUser.id, file.name, file.size);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Submitted</span>;
      case 'Under Review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Under Review</span>;
      case 'Shortlisted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#045B0D] border border-emerald-300">Shortlisted</span>;
      case 'Interview Scheduled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">Interview Scheduled</span>;
      case 'Offered':
      case 'Hired':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white">Offer Extended</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">Not Selected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const selectedApp = candidateApps.find((a) => a.id === selectedAppId);
  const appHistory = selectedAppId
    ? statusHistory.filter((sh) => sh.applicationId === selectedAppId)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Welcome & Profile Completion Banner */}
        <div className="bg-gradient-to-r from-[#0B1E36] to-[#045B0D] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                Verified Candidate Portal
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {currentUser.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Track your recruitment pipeline, maintain your verified CV, and discover new industrial and corporate vacancies across Lagos State.
            </p>
          </div>

          {/* Profile Completion Meter */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Profile Completion</span>
              <span className="font-bold text-emerald-300">{profile?.profileCompletion || 25}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#11851E] h-2 rounded-full transition-all duration-500"
                style={{ width: `${profile?.profileCompletion || 25}%` }}
              />
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[10px] text-slate-300">
                {profile?.profileCompletion === 100 ? 'All sections completed' : 'Add work history to reach 100%'}
              </span>
              <Link
                to="/candidate/profile"
                className="text-[11px] font-bold text-emerald-300 hover:text-white underline"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Applied</span>
              <Briefcase className="w-4 h-4 text-[#0B1E36]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalApplied}
            </div>
            <span className="text-[11px] text-slate-500">Vacancies applied</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Under Review</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-600">
              {inReviewCount}
            </div>
            <span className="text-[11px] text-slate-500">Recruiter reviewing</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Shortlisted</span>
              <CheckCircle2 className="w-4 h-4 text-[#045B0D]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#045B0D]">
              {shortlistedCount}
            </div>
            <span className="text-[11px] text-slate-500">Interview pipeline</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Saved Jobs</span>
              <Bookmark className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-blue-600">
              {savedJobs.length}
            </div>
            <span className="text-[11px] text-slate-500">Bookmarked openings</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-6 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`pb-3 font-bold border-b-2 transition-colors ${
              activeTab === 'applications'
                ? 'border-[#045B0D] text-[#045B0D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Job Applications ({candidateApps.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`pb-3 font-bold border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-[#045B0D] text-[#045B0D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Saved Openings ({savedJobs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cv')}
            className={`pb-3 font-bold border-b-2 transition-colors ${
              activeTab === 'cv'
                ? 'border-[#045B0D] text-[#045B0D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            CV Management
          </button>
        </div>

        {/* Tab 1: Applications Pipeline */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {candidateApps.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-heading text-sm font-bold text-slate-800">
                    Active & Past Applications
                  </h3>
                  <Link
                    to="/jobs"
                    className="text-xs font-bold text-[#045B0D] hover:underline flex items-center gap-1"
                  >
                    <span>Browse More Vacancies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {candidateApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {app.referenceNumber}
                          </span>
                          {getStatusBadge(app.status)}
                        </div>

                        <Link
                          to={`/jobs/${app.jobSlug}`}
                          className="font-heading text-base sm:text-lg font-bold text-slate-900 hover:text-[#045B0D] block transition-colors"
                        >
                          {app.jobTitle}
                        </Link>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Submitted: {new Date(app.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {app.cvFileName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedAppId(selectedAppId === app.id ? null : app.id)}
                          className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{selectedAppId === app.id ? 'Hide Pipeline' : 'View Timeline'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  No Applications Submitted Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our open vacancies in Ibeju-Lekki and submit your application with verified credentials.
                </p>
                <Link
                  to="/jobs"
                  className="inline-block px-5 py-2.5 bg-[#045B0D] text-white text-xs font-bold rounded-xl"
                >
                  Explore Vacancies
                </Link>
              </div>
            )}

            {/* Application Timeline Drawer Modal */}
            {selectedApp && (
              <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-md space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#045B0D] uppercase tracking-wider">
                      Application Status History
                    </span>
                    <h4 className="font-heading text-lg font-bold text-slate-900 mt-0.5">
                      {selectedApp.jobTitle} ({selectedApp.referenceNumber})
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAppId(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    Close &times;
                  </button>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Review Milestones
                  </h5>
                  {appHistory.length > 0 ? (
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {appHistory.map((h, i) => (
                        <div key={h.id} className="relative">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#045B0D] text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                          <div className="text-xs">
                            <span className="font-bold text-slate-900 text-sm">
                              Status: {h.newStatus}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-2">
                              {new Date(h.changedAt).toLocaleString('en-GB')}
                            </span>
                            {h.reason && (
                              <p className="text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                {h.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Application submitted. Awaiting recruitment officer review.
                    </p>
                  )}
                </div>

                {/* Screening Answers summary */}
                {selectedApp.screeningAnswers.length > 0 && (
                  <div className="pt-4 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Submitted Screening Responses:
                    </h5>
                    <div className="space-y-2 text-xs">
                      {selectedApp.screeningAnswers.map((sa, idx) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <p className="font-semibold text-slate-800">{sa.question}</p>
                          <p className="text-slate-600 mt-0.5">{sa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Jobs */}
        {activeTab === 'saved' && (
          <div>
            {savedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  No Saved Jobs
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Bookmark vacancies while browsing so you can easily review and apply later.
                </p>
                <Link
                  to="/jobs"
                  className="inline-block px-5 py-2.5 bg-[#0B1E36] text-white text-xs font-bold rounded-xl"
                >
                  Find Open Vacancies
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: CV Management */}
        {activeTab === 'cv' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Official CV & Résumé Document
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your uploaded CV is securely stored and attached when applying to vacancies. Only authorized F&J recruiters can access this document.
              </p>
            </div>

            {profile?.cvFileName ? (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#045B0D] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{profile.cvFileName}</p>
                    <p className="text-[11px] text-slate-500">
                      Uploaded on {profile.cvUploadedAt ? new Date(profile.cvUploadedAt).toLocaleDateString() : 'Active'} • {(profile.cvFileSize ? profile.cvFileSize / 1024 : 350).toFixed(0)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to remove your active CV document?')) {
                        removeCV(currentUser.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete CV"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                ⚠️ You currently have no CV uploaded. Uploading a CV is required to achieve high priority shortlisting by recruiters.
              </div>
            )}

            {/* Upload/Replace Form */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                {profile?.cvFileName ? 'Upload Replacement CV Document' : 'Select CV Document'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supported formats: PDF, DOCX (up to 5MB)
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleCvChange}
                className="mt-3 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#045B0D] file:text-white hover:file:bg-[#11851E] cursor-pointer"
              />
              {cvFileError && (
                <p className="text-xs text-red-600 font-semibold mt-2">{cvFileError}</p>
              )}
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#11851E]" />
              <span>Private & confidential under the Nigeria Data Protection Act (NDPA 2023).</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
