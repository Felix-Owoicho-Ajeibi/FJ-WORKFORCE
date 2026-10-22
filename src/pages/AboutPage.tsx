import React from 'react';
import { Link } from '../lib/router';
import {
  ShieldCheck,
  Target,
  Compass,
  Award,
  Users,
  CheckCircle2,
  MapPin,
  Clock,
  Building2,
  Briefcase,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const coreValues = [
    {
      title: 'Integrity & Transparency',
      desc: 'We operate with absolute honesty in candidate screening, client billings, and clear recruitment application fees.',
      icon: ShieldCheck
    },
    {
      title: 'Operational Excellence',
      desc: 'Delivering disciplined, pre-screened talent capable of immediate productivity and safety compliance.',
      icon: Award
    },
    {
      title: 'Safety & HSE Leadership',
      desc: 'Workplace safety is non-negotiable. Every candidate deployed undergoes health, safety, and operational site orientation.',
      icon: CheckCircle2
    },
    {
      title: 'Local Empowerment',
      desc: 'Deep roots in Ibeju-Lekki and surrounding Lagos communities, bridging host community talent with industrial progress.',
      icon: Users
    }
  ];

  const commitments = [
    {
      title: 'Our Commitment to Employers',
      items: [
        'Rapid turnaround mobilization with pre-vetted worker pools.',
        'Zero compromise on technical competency assessments and trade tests.',
        'Strict statutory compliance handling (PAYE, NSITF, Pension, ITF).',
        'Transparent SLAs with dedicated on-site workforce coordinators.'
      ]
    },
    {
      title: 'Our Commitment to Candidates',
      items: [
        'Recruitment at F&J Workforce is 100% paid — application fee of 5,000 Naira ($3.8) applied.',
        'Fair, merit-based selection without bias or favoritism.',
        'Strict protection of your personal records under NDPA 2023.',
        'Continuous support, career guidance, and safe working conditions.'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#0B1E36] to-[#071526] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>About F&J Workforce Limited</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            A Trusted Workforce & Recruitment Partner in Nigeria
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
            Headquartered on Eleko Beach Road, Ibeju-Lekki, Lagos State, providing mission-critical staffing, industrial labor, and recruitment excellence to modern enterprises.
          </p>
        </div>
      </section>

      {/* Company Overview & Context */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full border border-emerald-200">
                Company Introduction
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
                Pioneering Professional Workforce Solutions for Lagos' Industrial Expansion
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                F&J Workforce Limited was established to solve one of the most critical challenges facing enterprises in Nigeria: the acute gap between industrial operational demands and dependable, vetted, safety-conscious personnel.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Positioned strategically along Eleko Beach Road in Ibeju-Lekki, we sit at the epicenter of Nigeria’s most vital commercial and industrial corridor. We actively support manufacturing factories, container terminals, maritime hubs, logistics distribution warehouses, and corporate headquarters with verified candidates ready to perform from day one.
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-[#045B0D] rounded-r-xl">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
                  "Our mission is to engineer human capacity solutions that elevate organizational productivity while providing dignifying, transparent employment pathways for Nigerian professionals."
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B1E36] text-white rounded-2xl p-8 border border-slate-700 shadow-xl space-y-6">
                <h3 className="font-heading text-xl font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Strategic Location</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our presence in Ibeju-Lekki provides immediate proximity to:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                    <span>Lekki Free Trade Zone (LFTZ) industrial operations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                    <span>Dangote Refinery & Petrochemical Complex corridor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                    <span>Lekki Deep Sea Port terminals & logistics parks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11851E] shrink-0" />
                    <span>Victoria Island, Lekki Phase 1 & Ikeja commercial districts</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="block w-full py-2.5 px-4 text-center text-xs font-bold text-[#0B1E36] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    Visit or Contact Our Office
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:border-emerald-600/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0B1E36]">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                To build dependable, agile, and safety-conscious workforces for businesses across Nigeria through rigorous pre-employment screening, proactive client partnership, and ethical human resource stewardship.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:border-emerald-600/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B1E36] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0B1E36]">
                Our Vision
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                To be the definitive workforce solutions partner of choice across Nigeria’s industrial, manufacturing, and commercial corridors, recognized for uncompromising integrity, talent quality, and operational reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full border border-emerald-200">
              Guiding Principles
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight mt-3">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every recruitment engagement, candidate evaluation, and client deployment is guided by our fundamental tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments to Employers and Candidates */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
              Recruitment Philosophy & Commitments
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We operate as a balanced, trustworthy intermediary creating sustainable value for both organizations and job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs">
                <h3 className="font-heading text-xl font-bold text-[#0B1E36] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#11851E]" />
                  <span>{c.title}</span>
                </h3>
                <ul className="space-y-3">
                  {c.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#045B0D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/services"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-sm transition-all"
            >
              Explore Our Services
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-all"
            >
              Contact Our Management Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
