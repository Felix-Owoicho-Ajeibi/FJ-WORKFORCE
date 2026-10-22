import React, { useState } from 'react';
import { Link } from '../lib/router';
import { useStore } from '../lib/store';
import {
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const RequestStaffPage: React.FC = () => {
  const { submitEmployerEnquiry } = useStore();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Manufacturing & Packaging');
  const [serviceRequested, setServiceRequested] = useState('Industrial & Factory Workforce Solutions');
  const [workersRequired, setWorkersRequired] = useState('10');
  const [jobRoles, setJobRoles] = useState('');
  const [location, setLocation] = useState('Ibeju-Lekki / Lekki Free Zone, Lagos');
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [requirements, setRequirements] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = submitEmployerEnquiry({
        companyName,
        contactName,
        email,
        phone,
        industry,
        serviceRequested,
        workersRequired: parseInt(workersRequired, 10) || 1,
        jobRoles,
        location,
        expectedStartDate: expectedStartDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        requirements
      });

      setSubmittedRef(res.referenceNumber);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting requisition.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Title Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#045B0D] text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Workforce Requisition</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
            Request Staffing & Recruitment Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Submit your personnel specifications. An F&J recruitment director will analyze your operational timeline and contact you with a customized proposal within 4 hours.
          </p>
        </div>

        {submittedRef ? (
          <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8 sm:p-10 text-center shadow-lg space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#045B0D] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full">
              Requisition Successfully Logged
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
              Thank You, {contactName}!
            </h2>

            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              We have recorded the staffing request for <strong>{companyName}</strong>. A dedicated account director will review your requirements for <strong>{jobRoles}</strong>.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs text-slate-500 block">Corporate Requisition Reference:</span>
              <span className="font-mono text-lg font-bold text-[#0B1E36] tracking-wider select-all">
                {submittedRef}
              </span>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl text-left text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">What Happens Next:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Confirmation email dispatched to <strong>{email}</strong>.</li>
                <li>Our technical recruitment desk begins pre-screening available talent rosters.</li>
                <li>We coordinate an initial alignment call or physical site meeting at your facility.</li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/"
                className="px-6 py-2.5 bg-[#0B1E36] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Dangote Fertilizer Ltd"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Person Name & Title *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Engr. Tunde Adeleke (Plant Manager)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry / Business Sector *
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                >
                  <option value="Manufacturing & Packaging">Manufacturing & Packaging</option>
                  <option value="Logistics & Port Operations">Logistics & Port Operations</option>
                  <option value="Petrochemical & Energy">Petrochemical & Energy</option>
                  <option value="Construction & Engineering">Construction & Engineering</option>
                  <option value="Corporate & Financial">Corporate & Financial</option>
                  <option value="Healthcare & Hospitality">Healthcare & Hospitality</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Staffing Service Model *
                </label>
                <select
                  value={serviceRequested}
                  onChange={(e) => setServiceRequested(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                >
                  <option value="Industrial & Factory Workforce Solutions">Industrial & Factory Workforce Solutions</option>
                  <option value="Temporary & Contract Staffing">Temporary & Contract Staffing</option>
                  <option value="Permanent Placement">Permanent Placement (Direct Hire)</option>
                  <option value="Workforce Outsourcing">Complete Workforce Outsourcing</option>
                  <option value="HR & Workforce Support">HR & Workforce Support Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Workers Required *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={workersRequired}
                  onChange={(e) => setWorkersRequired(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Deployment Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={expectedStartDate}
                  onChange={(e) => setExpectedStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Job Roles Needed *
              </label>
              <input
                type="text"
                required
                value={jobRoles}
                onChange={(e) => setJobRoles(e.target.value)}
                placeholder="e.g. 5 Forklift Drivers, 3 Riggers, 2 Quality Control Checkers"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Work Site / Plant Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lekki Free Trade Zone, Ibeju-Lekki, Lagos"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Project Requirements & Certifications *
              </label>
              <textarea
                rows={4}
                required
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Detail shift patterns (Day/Night), required technical certifications (e.g. Class E License, Trade Test 1, HSE Level 2), and specialized PPE requirements..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Requisition...</span>
              ) : (
                <>
                  <span>Submit Corporate Staffing Requisition</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#11851E]" />
              <span>All corporate information is kept strictly confidential.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
