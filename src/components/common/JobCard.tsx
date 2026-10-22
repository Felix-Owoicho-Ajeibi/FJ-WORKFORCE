import React from 'react';
import { Link, useRouter } from '../../lib/router';
import { JobVacancy } from '../../types';
import { useStore } from '../../lib/store';
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Building2,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface JobCardProps {
  job: JobVacancy;
  featured?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const { currentUser, getCandidateProfile, toggleSaveJob } = useStore();
  const { navigate } = useRouter();

  const profile = currentUser ? getCandidateProfile(currentUser.id) : undefined;
  const isSaved = profile?.savedJobIds?.includes(job.id);

  const isExpired = new Date(job.applicationDeadline).getTime() < new Date().setHours(0, 0, 0, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate(`/login?redirect=/jobs/${job.slug}/apply`);
    } else {
      navigate(`/jobs/${job.slug}/apply`);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
    } else {
      toggleSaveJob(job.id);
    }
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 bg-white p-5 sm:p-6 flex flex-col justify-between ${
        featured
          ? 'border-emerald-600/30 shadow-md ring-1 ring-emerald-600/10 hover:shadow-lg'
          : 'border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#045B0D] border border-emerald-200">
              {job.employmentType}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              {job.workArrangement}
            </span>
            {featured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                Priority Hiring
              </span>
            )}
            {isExpired && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">
                Closed
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSaveClick}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-emerald-50 border-emerald-300 text-[#045B0D]'
                : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save vacancy'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Job Title & Hiring Organization */}
        <Link to={`/jobs/${job.slug}`} className="group block">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#045B0D] transition-colors leading-snug">
            {job.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>{job.hiringOrganization || 'F&J Client Partner'}</span>
          <span>•</span>
          <span>{job.industry}</span>
        </p>

        {/* Summary Snippet */}
        <p className="text-slate-600 text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed">
          {job.summary}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.skills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Meta Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-3.5">
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-[#11851E]" />
            <span className="font-medium">{job.workLocation}</span>
          </div>

          {job.salaryMin && job.salaryMax ? (
            <span className="font-bold text-slate-800">
              {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
              <span className="font-normal text-slate-500"> /mo</span>
            </span>
          ) : (
            <span className="text-slate-400 italic">Competitive salary</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Deadline: {new Date(job.applicationDeadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>

          <div className="flex items-center gap-2">
            <Link
              to={`/jobs/${job.slug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100 transition-colors"
            >
              Details
            </Link>

            {!isExpired ? (
              <button
                type="button"
                onClick={handleApplyClick}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#045B0D] hover:bg-[#11851E] shadow-xs hover:shadow transition-all flex items-center gap-1"
              >
                <span>Apply</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed">
                Closed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
