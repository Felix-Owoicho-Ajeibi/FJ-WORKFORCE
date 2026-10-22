import React, { useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  AlertCircle,
  FileCheck,
  Briefcase,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { services, submitEmployerEnquiry } = useStore();
  const { navigate } = useRouter();

  const service = services.find((s) => s.slug === slug);

  // Quick enquiry form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [workersRequired, setWorkersRequired] = useState('5');
  const [jobRoles, setJobRoles] = useState('');
  const [location, setLocation] = useState('Ibeju-Lekki, Lagos');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-800">
          Service Not Found
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          The requested service page does not exist or has been moved.
        </p>
        <Link
          to="/services"
          className="mt-4 inline-block px-5 py-2.5 rounded-lg bg-[#045B0D] text-white text-sm font-bold"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newEnquiry = submitEmployerEnquiry({
        companyName,
        contactName,
        email,
        phone,
        industry: service.title,
        serviceRequested: service.title,
        workersRequired: parseInt(workersRequired, 10) || 1,
        jobRoles: jobRoles || service.title,
        location,
        expectedStartDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        requirements: requirements || `Inquiry regarding ${service.title}`
      });

      setSuccessReference(newEnquiry.referenceNumber);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-[#045B0D]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/services" className="hover:text-[#045B0D]">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">{service.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0B1E36] to-[#045B0D] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20">
              {service.badge}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {service.heroHeadline || service.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Requisition Form Split */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Detailed Service Information */}
            <div className="lg:col-span-7 space-y-12">
              {/* Business Problem Addressed */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  Business Challenges
                </span>
                <h3 className="font-heading text-xl font-bold text-[#0B1E36] mt-2 mb-4">
                  The Critical Problem This Service Solves
                </h3>
                <div className="space-y-3">
                  {service.businessProblem.map((problem, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <p>{problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Process & Methodology */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Execution Roadmap
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#0B1E36] mt-2 mb-6">
                  Our Step-by-Step Delivery Process
                </h3>
                <div className="space-y-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-5 border border-slate-200 flex items-start gap-4 shadow-xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0B1E36] text-emerald-400 font-heading font-extrabold text-base flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-heading text-base font-bold text-slate-900">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intended Clients & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Clients */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-heading text-base font-bold text-[#0B1E36] mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#045B0D]" />
                    <span>Target Clients</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {service.targetClients.map((client, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#045B0D] shrink-0 mt-0.5" />
                        <span>{client}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Benefits */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-heading text-base font-bold text-[#0B1E36] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#045B0D]" />
                    <span>Measurable Benefits</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#11851E] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Dedicated Requisition Form */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-2xl border-2 border-emerald-600/30 p-6 sm:p-7 shadow-lg">
                <div className="pb-4 mb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D]">
                    Direct Staffing Inquiry
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
                    Request {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Submit your requirement. Our recruitment director will contact you within 4 business hours.
                  </p>
                </div>

                {successReference ? (
                  <div className="p-6 bg-[#E8F5E9] border border-emerald-300 rounded-xl text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#045B0D] text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-lg font-bold text-[#045B0D]">
                      Requisition Submitted Successfully!
                    </h4>
                    <p className="text-xs text-slate-700">
                      Your reference tracking number is:
                    </p>
                    <div className="font-mono font-bold text-sm bg-white px-3 py-1.5 rounded border border-emerald-200 inline-block text-[#0B1E36]">
                      {successReference}
                    </div>
                    <p className="text-xs text-slate-600">
                      Our staffing team in Ibeju-Lekki has received your request and will follow up promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessReference(null);
                        setCompanyName('');
                        setContactName('');
                        setEmail('');
                        setPhone('');
                        setJobRoles('');
                        setRequirements('');
                      }}
                      className="mt-3 px-4 py-2 bg-[#045B0D] text-white text-xs font-bold rounded-lg"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Dangote Packaging Hub"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 08012345678"
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hr@yourcompany.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Workers Needed *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={workersRequired}
                          onChange={(e) => setWorkersRequired(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Project Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ibeju-Lekki, Lagos"
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specific Roles / Requirements *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Detail the job functions, technical certifications needed, and expected shift arrangements..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Requisition...</span>
                      ) : (
                        <>
                          <span>Submit Workforce Requisition</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center">
                      Protected under Nigerian Data Protection Act (NDPA 2023). Confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
