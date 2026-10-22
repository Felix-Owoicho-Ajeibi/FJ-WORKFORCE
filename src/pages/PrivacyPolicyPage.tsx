import React from 'react';
import { Link } from '../lib/router';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#045B0D] text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nigeria Data Protection Act (NDPA 2023) Compliant</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last Updated & Reviewed: October 2026 • F&J Workforce Limited (RC: Lagos, Nigeria)
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              1. Introduction & Regulatory Scope
            </h2>
            <p>
              F&J Workforce Limited ("we", "our", or "us"), located at Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria, is committed to safeguarding the privacy and personal data of job seekers, client corporate representatives, and platform visitors. This Privacy Notice describes our practices in accordance with the <strong>Nigeria Data Protection Act (NDPA 2023)</strong> and applicable labor regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              2. Personal Information Collected
            </h2>
            <p>
              When utilizing our recruitment portal and workforce services, we collect and process the following categories of data:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>Candidate Identity Data:</strong> Full name, telephone number, residential address, state of origin/residence in Nigeria.</li>
              <li><strong>Professional & Educational Data:</strong> Curricula Vitae (CVs), résumés, academic transcripts, technical certifications (e.g. HSE, Trade Test, NABTEB, NEBOSH), previous employers, and references.</li>
              <li><strong>Screening & Competency Records:</strong> Answers to role-specific screening questions, interview evaluations, and trade assessment scores.</li>
              <li><strong>Corporate Client Records:</strong> Company name, registration details, authorized representative contacts, staffing requisitions, and work location specifications.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              3. Legal Basis and Purpose of Processing
            </h2>
            <p>
              We process personal information under the lawful bases provided by Section 25 of the NDPA 2023, namely:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li><strong>Consent:</strong> Freely given when you register an account or submit an application for published vacancies.</li>
              <li><strong>Contractual Necessity:</strong> To take necessary steps at your request prior to entering into an employment or staffing contract.</li>
              <li><strong>Legal Obligation:</strong> To comply with mandatory statutory filings (LIRS, PenCom, NSITF, and Industrial Training Fund).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              4. CV and Document Security Handling
            </h2>
            <p>
              All candidate CVs and identification records are stored in encrypted, access-restricted databases. We enforce strict role-based access control (RBAC):
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li>Candidate CVs are <strong>never published publicly</strong> on open internet portals.</li>
              <li>Only authorized F&J recruitment consultants and designated hiring managers of prospective client employers review candidate files.</li>
              <li>We never sell, monetize, or lease candidate contact details to third-party marketing brokers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              5. Data Retention & Erasure
            </h2>
            <p>
              Personal data is retained only for as long as necessary to fulfill recruitment opportunities or meet statutory audit requirements under Nigerian law. Candidates retain the right at any time to request the updating or permanent deletion of their profile records from our active rosters by contacting our Data Protection Officer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              6. Your Rights as a Data Subject
            </h2>
            <p>
              Under the Nigeria Data Protection Act 2023, you possess the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li>Request access to copies of your personal data held in our systems.</li>
              <li>Request rectification of inaccurate or outdated credentials.</li>
              <li>Withdraw your consent to ongoing recruitment consideration.</li>
              <li>Object to automated profiling or decision-making.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              7. Contact Our Data Protection Officer
            </h2>
            <p>
              For data protection inquiries or to exercise your rights, contact our privacy compliance desk:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <p><strong>F&J Workforce Limited — Privacy Desk</strong></p>
              <p>Office: Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria</p>
              <p>Email: <a href="mailto:info@fjworkforce.com.ng" className="text-[#045B0D] font-bold">info@fjworkforce.com.ng</a></p>
              <p>Telephone: 09116176563 / 09022542150</p>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link to="/" className="text-[#0B1E36] font-bold hover:underline">
            &larr; Return to Homepage
          </Link>
          <Link to="/terms" className="text-[#045B0D] font-bold hover:underline">
            Read Terms of Use &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
