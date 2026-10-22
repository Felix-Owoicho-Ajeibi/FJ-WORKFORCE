import React from 'react';
import { Link } from '../lib/router';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#045B0D] text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Effective Date: October 2026 • F&J Workforce Limited (Ibeju-Lekki, Lagos)
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website, registering a candidate account, or submitting an employer workforce requisition with F&J Workforce Limited ("the Company"), you agree to be bound by these Terms of Use and all applicable Nigerian laws and regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              2. Candidate Account Responsibilities & Prohibitions
            </h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Candidates must provide accurate, current, and verifiable information regarding academic credentials, previous employment, and trade qualifications.</li>
              <li>Submitting forged diplomas, fabricated references, or misrepresented identity constitutes fraud and will result in permanent account termination and referral to appropriate law enforcement bodies.</li>
              <li>Candidates are prohibited from submitting duplicate applications for the same job opening.</li>
              <li>Account credentials must be kept confidential; you are responsible for all actions under your password.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              3. Recruitment Application Fee Policy
            </h2>
            <p className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium">
              Notice: Recruitment at F&J Workforce is 100% paid. An application fee of 5,000 Naira = $3.8 is applied per candidate application. This fee covers professional credential auditing, technical evaluation dossiers, and priority submission to hiring employers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              4. Employer Staffing Requisitions & SLAs
            </h2>
            <p>
              Corporate clients submitting staffing requisitions agree that submitted role requirements, compensation frameworks, and shift rosters are genuine. Formal service level agreements (SLAs), indemnity scopes, and commercial terms are finalized via executed workforce contracts prior to staff mobilization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              5. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, monograms, portal interfaces, text content, and software architecture are the intellectual property of F&J Workforce Limited and protected by Nigerian copyright and trademark legislation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-base font-bold text-slate-900">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising in connection with these terms shall fall under the jurisdiction of the courts of Lagos State.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link to="/" className="text-[#0B1E36] font-bold hover:underline">
            &larr; Return to Homepage
          </Link>
          <Link to="/privacy" className="text-[#045B0D] font-bold hover:underline">
            Review Privacy Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
