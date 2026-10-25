import React from 'react';
import { Link } from '../../lib/router';
import { Logo } from '../common/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1E36] text-white border-t-4 border-[#045B0D]">
      {/* Upper Pre-Footer Callout */}
      <div className="border-b border-slate-700/60 bg-[#071526]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#045B0D] text-emerald-200 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Authorized Workforce & Staffing Partner
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Empowering Businesses & Accelerating Careers Across Lagos
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                Headquartered strategically in Ibeju-Lekki, serving the Lekki Free Trade Zone, Dangote industrial hub, Deep Sea Port corridor, and the wider Nigerian economy.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
              <Link
                to="/request-staff"
                className="px-5 py-3 rounded-lg text-sm font-bold bg-[#11851E] hover:bg-[#045B0D] text-white text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Request Staff</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/jobs"
                className="px-5 py-3 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 text-white text-center border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Vacancies</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              F&J Workforce Limited is a licensed, professional recruitment and workforce solutions company based in Ibeju-Lekki, Lagos State. We bridge the talent gap through rigorous screening, industrial workforce mobilization, and compliance excellence.
            </p>

            {/* Direct Contact Snapshot */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#11851E] shrink-0 mt-0.5" />
                <span>Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#11851E] shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="tel:09116176563" className="hover:text-emerald-400 font-medium">09116176563</a>
                  <span className="text-slate-600">•</span>
                  <a href="tel:09022542150" className="hover:text-emerald-400 font-medium">09022542150</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#11851E] shrink-0" />
                <a href="mailto:info@fjworkforce.com.ng" className="hover:text-emerald-400 font-medium">
                  info@fjworkforce.com.ng
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#11851E] shrink-0" />
                <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Workforce Solutions */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-[#045B0D] pb-1.5 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/services/recruitment" className="hover:text-emerald-300 transition-colors">
                  Recruitment & Talent Acquisition
                </Link>
              </li>
              <li>
                <Link to="/services/contract-staffing" className="hover:text-emerald-300 transition-colors">
                  Temporary & Contract Staffing
                </Link>
              </li>
              <li>
                <Link to="/services/permanent-placement" className="hover:text-emerald-300 transition-colors">
                  Permanent Placement
                </Link>
              </li>
              <li>
                <Link to="/services/industrial-workforce" className="hover:text-emerald-300 transition-colors">
                  Industrial & Factory Workforce
                </Link>
              </li>
              <li>
                <Link to="/services/workforce-outsourcing" className="hover:text-emerald-300 transition-colors">
                  Workforce Outsourcing
                </Link>
              </li>
              <li>
                <Link to="/services/hr-support" className="hover:text-emerald-300 transition-colors">
                  HR & Advisory Support
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/services" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                  All Services <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Candidates */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-[#045B0D] pb-1.5 inline-block">
              Candidates
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/jobs" className="hover:text-emerald-300 transition-colors">
                  Find Latest Vacancies
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-300 transition-colors">
                  Create Candidate Account
                </Link>
              </li>
              <li>
                <Link to="/candidate/dashboard" className="hover:text-emerald-300 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/candidate/profile" className="hover:text-emerald-300 transition-colors">
                  Upload & Update CV
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-300 transition-colors">
                  Job Seeker FAQs
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-amber-200 block bg-amber-950/70 p-2.5 rounded-lg border border-amber-800/60 leading-relaxed">
                  ⚠️ <strong>Notice:</strong> Recruitment at F&J Workforce is 100% paid. Application fee of 5,000 Naira ($3.8) applied.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Employers & Company */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase text-white mb-4 border-b border-[#045B0D] pb-1.5 inline-block">
              Corporate & Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">
                  About F&J Workforce
                </Link>
              </li>
              <li>
                <Link to="/employers" className="hover:text-emerald-300 transition-colors">
                  Employer Services
                </Link>
              </li>
              <li>
                <Link to="/request-staff" className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400">
                  Request Staffing Solutions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                  Office Location & Contacts
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-300 transition-colors">
                  Privacy Policy (NDPA 2023)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-300 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-[#060e18] py-6 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-300 transition-colors" title="Internal Operations Portal">
              &copy;
            </Link>{' '}
            {currentYear} F&J Workforce Limited. All rights reserved. Registered under Nigerian Corporate Law.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
