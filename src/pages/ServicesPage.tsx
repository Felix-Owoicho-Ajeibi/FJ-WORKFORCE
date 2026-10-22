import React from 'react';
import { Link } from '../lib/router';
import { useStore } from '../lib/store';
import {
  Briefcase,
  Users,
  Building2,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services } = useStore();

  const publishedServices = services.filter((s) => s.isPublished);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0B1E36] to-[#045B0D] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>End-to-End Workforce Management</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Comprehensive Staffing & Workforce Solutions
          </h1>
          <p className="text-slate-200 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
            From specialized engineering talent and turnkey industrial shifts to permanent corporate placements and full payroll outsourcing in Nigeria.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
              Tailored Workforce Capabilities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Select any of our dedicated workforce disciplines below to review detailed process workflows, client qualifications, and deployment options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-600/40 transition-all duration-200 p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#E8F5E9] text-[#045B0D] border border-emerald-200">
                      {service.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Phase 0{service.sortOrder}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-[#045B0D] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {service.shortSummary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Client Benefits:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500">
                      {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#11851E] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0B1E36] group-hover:bg-[#045B0D] text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>View Dedicated Service Page</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Requisition Bar */}
          <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0B1E36]">
                Have a customized workforce requirement?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our recruitment architects can tailor a blended temporary, permanent, and outsourced model specific to your facility's operational shifts.
              </p>
            </div>
            <Link
              to="/request-staff"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#11851E] hover:bg-[#045B0D] text-white whitespace-nowrap shadow-sm transition-all"
            >
              Request Staffing Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
