import React from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Building2,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Bookmark,
  Share2
} from 'lucide-react';

interface JobDetailPageProps {
  slug: string;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ slug }) => {
  const { jobs, currentUser, getCandidateProfile, toggleSaveJob } = useStore();
  const { navigate } = useRouter();

  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-800">
          Job Vacancy Not Found
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          The position you are looking for is either no longer available or the link is incorrect.
        </p>
        <Link
          to="/jobs"
          className="mt-4 inline-block px-5 py-2.5 rounded-lg bg-[#045B0D] text-white text-sm font-bold"
        >
          Browse All Vacancies
        </Link>
      </div>
    );
  }

  const profile = currentUser ? getCandidateProfile(currentUser.id) : undefined;
  const isSaved = profile?.savedJobIds?.includes(job.id);

  const isExpired = new Date(job.applicationDeadline).getTime() < new Date().setHours(0, 0, 0, 0);
  const isPublished = job.status === 'published';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyClick = () => {
    if (!currentUser) {
      navigate(`/login?redirect=/jobs/${job.slug}/apply`);
    } else {
      navigate(`/jobs/${job.slug}/apply`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-[#045B0D]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/jobs" className="hover:text-[#045B0D]">Vacancies</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">{job.title}</span>
        </div>
      </div>

      {/* Main Job Header Hero */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#045B0D] border border-emerald-200">
                  {job.employmentType}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {job.workArrangement}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                  {job.industry}
                </span>
                {isExpired && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    Application Deadline Passed
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{job.hiringOrganization || 'F&J Client Partner'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#11851E]" />
                  <span>{job.workLocation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => currentUser ? toggleSaveJob(job.id) : navigate('/login')}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-emerald-50 border-emerald-300 text-[#045B0D]'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Saved to your profile' : 'Save this vacancy'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {!isExpired && isPublished ? (
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Apply for this Position</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-200 text-slate-400 cursor-not-allowed"
                >
                  Applications Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Columns: Job Specs & Details */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-7 sm:p-9 shadow-xs space-y-8">
              {/* Overview */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1E36] mb-3 pb-2 border-b border-slate-100">
                  Role Overview
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1E36] mb-3 pb-2 border-b border-slate-100">
                  Key Duties & Responsibilities
                </h3>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Qualifications */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1E36] mb-3 pb-2 border-b border-slate-100">
                  Required Qualifications & Credentials
                </h3>
                <ul className="space-y-2.5">
                  {job.qualifications.map((qual, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#045B0D] shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience Requirements */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1E36] mb-2 pb-2 border-b border-slate-100">
                  Experience Requirements
                </h3>
                <p className="text-xs sm:text-sm text-slate-700">
                  {job.experienceRequirements}
                </p>
              </div>

              {/* Skills Tags */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1E36] mb-3 pb-2 border-b border-slate-100">
                  Key Competencies & Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Instructions & Fee Notice */}
              <div className="p-5 bg-amber-50/90 border border-amber-300 rounded-xl space-y-2 text-xs text-amber-950">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Official Recruitment Notice:
                </p>
                <p className="leading-relaxed">
                  Notice: Recruitment at F&J Workforce is 100% paid. Application fee of 5,000 Naira ($3.8) applied. All applications submitted through our platform undergo priority screening, credential verification, and reference checks.
                </p>
              </div>

              {/* Bottom Apply CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link to="/jobs" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                  &larr; Back to all vacancies
                </Link>

                {!isExpired && isPublished && (
                  <button
                    type="button"
                    onClick={handleApplyClick}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Proceed to Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right 4 Columns: Vacancy Overview Card */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <h3 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Job Summary
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Department</span>
                    <span className="font-bold text-slate-800 text-sm">{job.department}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Industry Sector</span>
                    <span className="font-bold text-slate-800 text-sm">{job.industry}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Work Location</span>
                    <span className="font-bold text-slate-800 text-sm">{job.workLocation}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Arrangement & Type</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {job.workArrangement} • {job.employmentType}
                    </span>
                  </div>

                  {job.salaryMin && job.salaryMax && (
                    <div>
                      <span className="text-slate-400 block font-medium">Compensation Range</span>
                      <span className="font-bold text-[#045B0D] text-sm">
                        {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
                        <span className="text-xs text-slate-500 font-normal"> / month</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-400 block font-medium">Date Posted</span>
                    <span className="font-bold text-slate-800">
                      {new Date(job.publishedAt || job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Application Deadline</span>
                    <span className={`font-bold ${isExpired ? 'text-red-600' : 'text-slate-800'}`}>
                      {new Date(job.applicationDeadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {!isExpired && isPublished ? (
                  <button
                    type="button"
                    onClick={handleApplyClick}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center text-xs font-bold text-red-700">
                    This vacancy is closed to new applicants.
                  </div>
                )}
              </div>

              {/* Need help or advice widget */}
              <div className="bg-[#0B1E36] text-white rounded-2xl p-6 border border-slate-700 space-y-3">
                <h4 className="font-heading text-sm font-bold text-white">
                  Have questions about this vacancy?
                </h4>
                <p className="text-xs text-slate-300">
                  Reach out to the F&J recruitment desk for clarification on technical prerequisites and interview timelines.
                </p>
                <div className="pt-1 text-xs">
                  <a
                    href="mailto:info@fjworkforce.com.ng"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    info@fjworkforce.com.ng
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
