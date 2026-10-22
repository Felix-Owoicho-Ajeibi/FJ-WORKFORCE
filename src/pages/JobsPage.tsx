import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import { JobCard } from '../components/common/JobCard';
import { Link, useRouter } from '../lib/router';
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Building2,
  Calendar
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { jobs } = useStore();
  const { searchParams } = useRouter();

  // Filter States
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedArrangement, setSelectedArrangement] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'salary'>('newest');

  // Unique options extracted from published jobs
  const publishedJobs = useMemo(() => jobs.filter((j) => j.status === 'published'), [jobs]);

  const industries = useMemo(() => {
    const list = Array.from(new Set(publishedJobs.map((j) => j.industry)));
    return list.sort();
  }, [publishedJobs]);

  const locations = useMemo(() => {
    const list = Array.from(new Set(publishedJobs.map((j) => j.workLocation)));
    return list.sort();
  }, [publishedJobs]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    let result = publishedJobs.filter((job) => {
      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesSummary = job.summary.toLowerCase().includes(q);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchesDepartment = job.department.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesSkills && !matchesDepartment) {
          return false;
        }
      }

      // Location match
      if (selectedLocation !== 'all' && job.workLocation !== selectedLocation) {
        return false;
      }

      // Industry match
      if (selectedIndustry !== 'all' && job.industry !== selectedIndustry) {
        return false;
      }

      // Employment Type match
      if (selectedType !== 'all' && job.employmentType !== selectedType) {
        return false;
      }

      // Arrangement match
      if (selectedArrangement !== 'all' && job.workArrangement !== selectedArrangement) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
      }
      if (sortBy === 'deadline') {
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      }
      if (sortBy === 'salary') {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      return 0;
    });

    return result;
  }, [publishedJobs, keyword, selectedLocation, selectedIndustry, selectedType, selectedArrangement, sortBy]);

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedLocation('all');
    setSelectedIndustry('all');
    setSelectedType('all');
    setSelectedArrangement('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    keyword !== '' ||
    selectedLocation !== 'all' ||
    selectedIndustry !== 'all' ||
    selectedType !== 'all' ||
    selectedArrangement !== 'all';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Search Header Banner */}
      <section className="bg-[#0B1E36] text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Verified Career Openings
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Find Jobs in Ibeju-Lekki & Lagos State
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Browse authentic vacancies from vetted employers. Fast-track your application with zero recruitment fees.
            </p>
          </div>

          {/* Search Inputs Bar */}
          <div className="bg-white rounded-2xl p-3 shadow-xl text-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Keyword Input */}
            <div className="md:col-span-5 flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keyword, skill (e.g. Forklift, HSE, Logistics)..."
                className="w-full text-xs sm:text-sm focus:outline-none"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Selector */}
            <div className="md:col-span-4 flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <MapPin className="w-5 h-5 text-[#11851E] shrink-0 mr-2.5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-700 cursor-pointer"
              >
                <option value="all">All Locations (Lagos State)</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Selector */}
            <div className="md:col-span-3 flex items-center px-3 py-2">
              <Briefcase className="w-5 h-5 text-[#0B1E36] shrink-0 mr-2.5" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-700 cursor-pointer"
              >
                <option value="all">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Filters Sidebar & Job Listings */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 3.5 Columns: Filter Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#045B0D]" />
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    Filter Vacancies
                  </h3>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Employment Type
                </label>
                <div className="space-y-1.5">
                  {['all', 'Full-time', 'Contract', 'Permanent', 'Shift'].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900 p-1.5 rounded hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="employmentType"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="text-[#045B0D] focus:ring-[#11851E]"
                      />
                      <span className="capitalize">{type === 'all' ? 'All Types' : type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Arrangement */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Work Arrangement
                </label>
                <div className="space-y-1.5">
                  {['all', 'On-site', 'Hybrid', 'Remote'].map((arr) => (
                    <label
                      key={arr}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900 p-1.5 rounded hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="workArrangement"
                        checked={selectedArrangement === arr}
                        onChange={() => setSelectedArrangement(arr)}
                        className="text-[#045B0D] focus:ring-[#11851E]"
                      />
                      <span>{arr === 'all' ? 'All Arrangements' : arr}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Sort Vacancies
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                >
                  <option value="newest">Newest First</option>
                  <option value="deadline">Application Deadline (Urgent)</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>

              {/* Job Seeker Alert Box */}
              <div className="pt-4 border-t border-slate-100 bg-[#E8F5E9]/50 -mx-6 -mb-6 p-6 rounded-b-2xl border-t border-emerald-100">
                <p className="text-xs font-bold text-[#045B0D] mb-1">
                  Want instant notifications?
                </p>
                <p className="text-[11px] text-slate-600 mb-3">
                  Create a free profile to get matched automatically with new industrial vacancies in Ibeju-Lekki.
                </p>
                <Link
                  to="/register"
                  className="block w-full py-2 px-3 text-center text-xs font-bold bg-[#045B0D] text-white rounded-lg hover:bg-[#11851E] transition-colors"
                >
                  Register Profile
                </Link>
              </div>
            </div>

            {/* Right 8.5 Columns: Job Results */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header Status & Result Count */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-heading text-lg font-bold text-slate-900">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Vacancy' : 'Vacancies'} Found
                  </span>
                  {hasActiveFilters && (
                    <span className="text-xs text-slate-500 ml-2">
                      (Filtered)
                    </span>
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-[#045B0D] hover:underline"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>

              {/* Listings */}
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold text-slate-800">
                    No matching vacancies found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                    We could not find any active vacancies matching your current search criteria. Try removing filters or searching for different keywords.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-[#045B0D] text-white text-xs font-bold rounded-lg hover:bg-[#11851E]"
                  >
                    Clear Search Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
