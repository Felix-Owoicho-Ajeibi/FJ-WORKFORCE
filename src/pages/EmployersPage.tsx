import React from 'react';
import { Link } from '../lib/router';
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Factory,
  Ship,
  Briefcase,
  Layers,
  HelpCircle
} from 'lucide-react';

export const EmployersPage: React.FC = () => {
  const industriesServed = [
    {
      title: 'Manufacturing & FMCG',
      desc: 'Plant operators, packaging technicians, QA inspectors, and shift production crews.',
      icon: Factory
    },
    {
      title: 'Logistics, Port & Supply Chain',
      desc: 'Certified forklift drivers, container dispatchers, haulage supervisors, and terminal hands.',
      icon: Ship
    },
    {
      title: 'Petrochemical & Energy',
      desc: 'Refinery maintenance technicians, HSE officers, riggers, pipefitters, and safety auditors.',
      icon: Building2
    },
    {
      title: 'Commercial & Corporate Services',
      desc: 'Accountants, administrative managers, executive assistants, and customer operations teams.',
      icon: Briefcase
    }
  ];

  const valueProps = [
    {
      title: 'Rapid 48-Hour Mobilization',
      desc: 'Access pre-cleared rosters of blue-collar, technical, and gray-collar staff ready for shift deployment.'
    },
    {
      title: '100% Statutory Compliance',
      desc: 'We handle LIRS PAYE, PenCom Pension, NSITF, and ITF filings with full legal employer indemnification.'
    },
    {
      title: 'Rigorous Technical Trade Testing',
      desc: 'Every technician undergoes hands-on trade assessments before being deployed to your plant floor.'
    },
    {
      title: 'On-Site Field Supervision',
      desc: 'Dedicated F&J field officers manage attendance, welfare, PPE compliance, and union liaison.'
    }
  ];

  const employerFaqs = [
    {
      q: 'How quickly can F&J Workforce deploy temporary workers to our factory?',
      a: 'For standard industrial roles and warehouse operations, we maintain pre-vetted worker pools in Ibeju-Lekki capable of commencing duties within 48 to 72 hours of SLA execution.'
    },
    {
      q: 'Does F&J Workforce handle payroll taxes and statutory remittances?',
      a: 'Yes. Under our workforce outsourcing agreements, F&J Workforce acts as the legal employer of record, administering all statutory remittances (PAYE, NSITF, Pension, NHF) and issuing consolidated monthly invoices.'
    },
    {
      q: 'What is your replacement warranty for permanent hires?',
      a: 'All permanent candidate placements are backed by our 90-day retention guarantee. Should a candidate exit or fail probation within 90 days, we provide a replacement at zero additional recruitment cost.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0B1E36] via-[#08182D] to-[#045B0D] text-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Staffing & Recruitment Services</span>
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Scale Your Workforce with Certainty, Speed & Compliance
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              We provide Nigerian corporations and industrial operators with verified, skilled, and safety-conscious personnel tailored to operational demands along the Lekki-Epe corridor and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/request-staff"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#11851E] hover:bg-[#045B0D] text-white shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Staffing Requisition</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center"
              >
                Schedule Corporate Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full">
              Why Corporate Leaders Choose F&J
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight mt-3">
              Built for Operational Continuity and Risk Mitigation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((vp, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center font-bold mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 mb-2">{vp.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
              Sectors of Specialized Expertise
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our recruitment recruiters understand the distinct regulatory, safety, and trade requirements of Nigeria’s prime commercial verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesServed.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1E36] text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 mb-2">{ind.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Employer FAQs */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
              Frequently Asked Questions by Employers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Key operational parameters for partnerships and contracts.
            </p>
          </div>

          <div className="space-y-4">
            {employerFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <h4 className="font-heading text-sm font-bold text-slate-900 mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/request-staff"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all"
            >
              <span>Submit Staffing Requirements Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
