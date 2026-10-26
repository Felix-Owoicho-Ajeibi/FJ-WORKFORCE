import React from 'react';
import { Link } from '../lib/router';
import { useStore } from '../lib/store';
import { JobCard } from '../components/common/JobCard';
import workforceHeroBanner from '../assets/images/workforce_hero_banner_1793006870400.jpg';
import {
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  FileCheck,
  Search,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { jobs, services } = useStore();

  const activeJobs = jobs.filter((j) => j.status === 'published').slice(0, 4);

  const stats = [
    { label: 'Workforce Placed', value: '1,200+', detail: 'Across Lagos industrial corridors' },
    { label: 'Placement Speed', value: '48 - 72 hrs', detail: 'Rapid turnaround contract staffing' },
    { label: 'Screening Pass Rate', value: '100%', detail: 'Verified credentials & trade tests' },
    { label: 'Application Fee', value: '₦5,000 ($3.8)', detail: 'Official 100% paid recruitment' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Register in seconds with your contact info and career preferences.',
      icon: Users
    },
    {
      step: '02',
      title: 'Upload Your CV',
      desc: 'Attach your verified résumé in PDF/DOCX format with work history.',
      icon: FileCheck
    },
    {
      step: '03',
      title: 'Explore Vacancies',
      desc: 'Filter verified openings by industry, location, and employment type.',
      icon: Search
    },
    {
      step: '04',
      title: 'Apply Seamlessly',
      desc: 'Submit direct applications with tailored screening responses.',
      icon: Briefcase
    },
    {
      step: '05',
      title: 'Track Real-Time Status',
      desc: 'Monitor review milestones and recruiter interview scheduling online.',
      icon: Clock
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1E36] via-[#09172B] to-[#045B0D]/30 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle geometric background accents */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#11851E] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#11851E] animate-pulse" />
                <span>Premier Recruitment & Staffing in Ibeju-Lekki, Lagos</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Building Stronger Workforces.{' '}
                <span className="text-emerald-400">
                  Connecting Talent with Opportunity.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                F&J Workforce Limited is your dependable partner for factory, logistics, corporate, and technical staffing across the Lekki Free Trade Zone, Dangote industrial hub, and Greater Lagos. We bridge skilled professionals and enterprise employers with zero friction.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/jobs"
                  className="px-6 py-3.5 rounded-xl text-base font-bold bg-[#11851E] hover:bg-[#045B0D] text-white shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Explore Job Opportunities</span>
                </Link>

                <Link
                  to="/request-staff"
                  className="px-6 py-3.5 rounded-xl text-base font-bold bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span>Request Workforce Solutions</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-700/60 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                  <span>100% Pre-Vetted Workers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                  <span>Rapid 48-Hour Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                  <span>Full NDPA & Labor Compliance</span>
                </div>
              </div>
            </div>

            {/* Right Graphic / Workforce Hero Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
                {/* Workforce Banner Image Container */}
                <div className="relative h-72 sm:h-80 md:h-[370px] w-full overflow-hidden bg-slate-950">
                  <img
                    src={workforceHeroBanner}
                    alt="F&J Workforce team at Lagos industrial logistics hub"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (e.currentTarget.src !== window.location.origin + '/assets/workforce_hero_banner.jpg') {
                        e.currentTarget.src = '/assets/workforce_hero_banner.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Atmospheric gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Floating operational badge at top-left */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#11851E] animate-pulse" />
                    <span>Lekki Free Zone & Industrial Hub</span>
                  </div>

                  {/* Floating 100% Pre-Vetted badge at top-right */}
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-xs font-bold shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Pre-Vetted</span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/60 inline-block mb-1.5">
                      On-Ground Workforce Operations
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      Verified Technical, Factory & Corporate Talent
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Deploying skilled technicians, warehouse crews, and certified personnel across the Ibeju-Lekki industrial belt.
                    </p>
                  </div>
                </div>

                {/* Sub-card: Immediate Assistance Callout */}
                <div className="p-4 bg-slate-900/95 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-white">Need immediate staffing mobilization?</p>
                    <p className="text-[11px] text-emerald-300">Speak directly with our staffing director</p>
                  </div>
                  <a
                    href="tel:09116176563"
                    className="px-3.5 py-2 bg-[#11851E] hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Capability Metrics */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-center hover:border-emerald-300 transition-colors"
              >
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full border border-emerald-200">
                Tailored Solutions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E36] tracking-tight mt-2">
                Workforce Solutions Engineered for Business Impact
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Explore our full spectrum of specialized recruitment, contract labor, industrial workforce, and HR compliance advisory services.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#045B0D] hover:text-[#11851E] group"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-emerald-600/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Phase {service.sortOrder}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-[#045B0D] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.shortSummary}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                    {service.benefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#11851E] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#0B1E36] group-hover:text-[#045B0D] flex items-center gap-1 transition-colors"
                  >
                    <span>Read Full Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Job Vacancies */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full border border-emerald-200">
                Career Opportunities
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E36] tracking-tight mt-2">
                Latest Published Vacancies
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Verified job openings in Ibeju-Lekki, Lekki Free Trade Zone, and across Lagos State. Apply online with verified credentials.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-[#0B1E36] text-white hover:bg-[#071526] transition-colors"
            >
              <span>View All Vacancies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {activeJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-slate-800">
                No Vacancies Currently Published
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Check back shortly or register your candidate profile to receive immediate notifications when new positions are posted.
              </p>
              <Link
                to="/register"
                className="mt-4 inline-block px-4 py-2 bg-[#045B0D] text-white text-xs font-bold rounded-lg"
              >
                Register Candidate Profile
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How Recruitment Works for Candidates */}
      <section className="py-20 px-4 sm:px-6 bg-[#0B1E36] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              The Candidate Journey
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
              How Job Applications Work at F&J Workforce
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              A transparent, fair, and merit-based recruitment process. Application fee of 5,000 Naira ($3.8) applied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-emerald-400 transition-all duration-200 relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-2xl font-black text-emerald-400">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-700/80 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[#11851E] hover:bg-emerald-600 text-white shadow-lg transition-all"
            >
              <span>Get Started as a Candidate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Employer Banner CTA */}
      <section className="py-20 px-4 sm:px-6 bg-emerald-50/60 border-t border-b border-emerald-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-emerald-200/90 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full border border-emerald-200">
                Corporate Staffing Solutions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
                Are You Hiring in Lagos or the Lekki Industrial Corridor?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Partner with F&J Workforce Limited for turnkey workforce recruitment, shift planning, temporary industrial labor, and statutory payroll outsourcing. Fast-track your operational ramp-up with fully verified talent.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#045B0D]" />
                  Dedicated Account Manager
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#045B0D]" />
                  On-Site Shift Supervision
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#045B0D]" />
                  Transparent SLAs
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/request-staff"
                className="px-6 py-4 rounded-xl text-center font-bold text-sm bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Submit Staffing Request</span>
              </Link>
              <Link
                to="/employers"
                className="px-6 py-4 rounded-xl text-center font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
              >
                <span>Read Employer Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-[#0B1E36] to-[#045B0D] text-white py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to Connect with Nigeria’s Leading Workforce Solutions?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you are advancing your professional career or expanding industrial factory operations, F&J Workforce delivers excellence every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              to="/jobs"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-[#0B1E36] hover:bg-slate-100 shadow-lg transition-all"
            >
              Browse Job Vacancies
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
