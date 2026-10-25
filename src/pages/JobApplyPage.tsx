import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import {
  Briefcase,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Lock
} from 'lucide-react';

interface JobApplyPageProps {
  slug: string;
}

export const JobApplyPage: React.FC<JobApplyPageProps> = ({ slug }) => {
  const { jobs, currentUser, getCandidateProfile, applyForJob, applications } = useStore();
  const { navigate } = useRouter();

  const job = jobs.find((j) => j.slug === slug);
  const profile = currentUser ? getCandidateProfile(currentUser.id) : undefined;

  // Screening questions based on job industry/type
  const defaultQuestions = [
    {
      question: `Do you have verifiable work experience relevant to ${job?.title || 'this role'}?`,
      answer: ''
    },
    {
      question: 'Are you residing within or able to commute reliably to the designated work location in Lagos State?',
      answer: 'Yes, I am able to commute reliably to this location.'
    },
    {
      question: 'Are you available for immediate deployment if shortlisted and successful after client interviews?',
      answer: 'Yes, available for immediate deployment.'
    }
  ];

  const [screeningAnswers, setScreeningAnswers] = useState(defaultQuestions);
  const [coverLetter, setCoverLetter] = useState(
    profile?.professionalSummary
      ? `Dear Hiring Manager,\n\nI am pleased to submit my application for the position of ${job?.title || 'this role'}. With my proven background in ${profile.headline || 'this field'}, I am confident in delivering high performance and strict adherence to operational standards.\n\nThank you for your consideration.`
      : ''
  );
  const [useProfileCV, setUseProfileCV] = useState<boolean>(Boolean(profile?.cvFileName));
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<number>(0);
  const [fileError, setFileError] = useState<string>('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppRef, setSubmittedAppRef] = useState<string | null>(null);

  // Check if candidate already applied
  const alreadyApplied = currentUser && job
    ? applications.find((a) => a.jobId === job.id && a.candidateId === currentUser.id)
    : undefined;

  // Check deadline
  const isExpired = job
    ? new Date(job.applicationDeadline).getTime() < new Date().setHours(0, 0, 0, 0)
    : false;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB limit. Please upload a smaller PDF or DOCX document.');
      return;
    }

    // Check extension
    const name = file.name.toLowerCase();
    if (!name.endsWith('.pdf') && !name.endsWith('.docx') && !name.endsWith('.doc')) {
      setFileError('Invalid file format. Only PDF, DOC, or DOCX documents are accepted.');
      return;
    }

    setUploadedFileName(file.name);
    setUploadedFileSize(file.size);
    setUseProfileCV(false);
  };

  const handleAnswerChange = (index: number, val: string) => {
    const updated = [...screeningAnswers];
    updated[index].answer = val;
    setScreeningAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!currentUser) {
      navigate(`/login?redirect=/jobs/${slug}/apply`);
      return;
    }

    if (!job) return;

    if (!consentGiven) {
      setErrorMsg('You must agree to the data processing consent pursuant to the Nigeria Data Protection Act (NDPA 2023).');
      return;
    }

    // Determine CV
    let finalCVFile = '';
    let finalCVPath = '';

    if (useProfileCV && profile?.cvFileName) {
      finalCVFile = profile.cvFileName;
      finalCVPath = profile.cvStoragePath || `resumes/${currentUser.id}/${profile.cvFileName}`;
    } else if (uploadedFileName) {
      finalCVFile = uploadedFileName;
      finalCVPath = `resumes/${currentUser.id}/${uploadedFileName}`;
    } else {
      setErrorMsg('Please attach or select your CV/Résumé before submitting your application.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = applyForJob({
        jobId: job.id,
        coverLetter,
        screeningAnswers,
        cvFileName: finalCVFile,
        cvStoragePath: finalCVPath
      });

      if (!result.success) {
        setErrorMsg(result.message || 'Unable to submit application.');
        setIsSubmitting(false);
        return;
      }

      setSubmittedAppRef(result.application?.referenceNumber || 'FJW-APP-SUCCESS');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-800">
          Vacancy Not Found
        </h2>
        <Link to="/jobs" className="mt-4 inline-block px-4 py-2 bg-[#045B0D] text-white text-xs font-bold rounded-lg">
          Browse All Vacancies
        </Link>
      </div>
    );
  }

  // Not logged in gate
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0B1E36] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            Candidate Authentication Required
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            To apply for <strong>{job.title}</strong>, please log in with your verified candidate credentials or create a new account in under two minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to={`/login?redirect=/jobs/${job.slug}/apply`}
              className="px-6 py-2.5 bg-[#0B1E36] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Log In to Apply
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-[#045B0D] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Create New Candidate Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Already applied state
  if (alreadyApplied && !submittedAppRef) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-emerald-300 p-8 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#0B1E36]">
            Application Already Submitted
          </h2>
          <p className="text-slate-600 text-sm">
            You have already submitted an active application for <strong>{job.title}</strong>. Duplicate applications are prohibited to protect recruitment integrity.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block text-xs font-mono font-bold text-slate-800">
            Reference: {alreadyApplied.referenceNumber} • Status: {alreadyApplied.status}
          </div>
          <div className="pt-2">
            <Link
              to="/candidate/dashboard"
              className="px-5 py-2.5 bg-[#045B0D] hover:bg-[#11851E] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Track Application in Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success view
  if (submittedAppRef) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8 sm:p-10 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#045B0D] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-3 py-1 rounded-full">
            Application Received
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
            Your Application Was Submitted Successfully!
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
            Thank you, <strong>{currentUser.fullName}</strong>. Your candidacy for <strong>{job.title}</strong> has been safely recorded in the F&J Workforce recruitment database.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs text-slate-500 block">Official Application Reference ID:</span>
            <span className="font-mono text-lg font-bold text-[#0B1E36] tracking-wider select-all">
              {submittedAppRef}
            </span>
          </div>

          <div className="text-xs text-slate-500 text-left bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-2">
            <p className="font-bold text-slate-800">Next Steps in the Selection Process:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Our recruitment officers will verify your credentials and responses against client specifications.</li>
              <li>You can monitor real-time review updates directly inside your Candidate Dashboard.</li>
              <li>Shortlisted candidates will receive telephone and email notifications for scheduled interviews.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link
              to="/candidate/dashboard"
              className="px-6 py-3 bg-[#045B0D] hover:bg-[#11851E] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Go to Candidate Dashboard
            </Link>
            <Link
              to="/jobs"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
            >
              Browse More Vacancies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto w-full">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
              Official Job Application
            </span>
            <Link to={`/jobs/${job.slug}`} className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              Cancel & Exit
            </Link>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B1E36]">
            {job.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>{job.hiringOrganization || 'F&J Client Partner'}</span>
            <span>•</span>
            <span>{job.workLocation}</span>
            <span>•</span>
            <span>{job.employmentType}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Section 1: Candidate Verification Info */}
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-[#045B0D]" />
              <span>1. Verified Candidate Profile</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Prefilled from your registered account profile.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block font-medium">Full Name</span>
                <span className="font-bold text-slate-800 text-sm">{currentUser.fullName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block font-medium">Email Address</span>
                <span className="font-bold text-slate-800 text-sm">{currentUser.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block font-medium">Phone Number</span>
                <span className="font-bold text-slate-800 text-sm">{currentUser.phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block font-medium">Current Location</span>
                <span className="font-bold text-slate-800 text-sm">{profile?.location || 'Lagos, Nigeria'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: CV Selection & Upload */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-heading text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#045B0D]" />
              <span>2. Attach CV / Résumé</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select your profile CV or upload an updated document for this application (PDF or DOCX, max 5MB).
            </p>

            {profile?.cvFileName ? (
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all bg-slate-50 hover:bg-white border-slate-200">
                  <input
                    type="radio"
                    name="cvChoice"
                    checked={useProfileCV}
                    onChange={() => {
                      setUseProfileCV(true);
                      setUploadedFileName('');
                    }}
                    className="text-[#045B0D] focus:ring-[#11851E]"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-800 block">
                      Use Profile CV: {profile.cvFileName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Uploaded on {profile.cvUploadedAt ? new Date(profile.cvUploadedAt).toLocaleDateString() : 'Active'} • {(profile.cvFileSize ? profile.cvFileSize / 1024 : 350).toFixed(0)} KB
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#045B0D]">Attached</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all bg-slate-50 hover:bg-white border-slate-200">
                  <input
                    type="radio"
                    name="cvChoice"
                    checked={!useProfileCV}
                    onChange={() => setUseProfileCV(false)}
                    className="text-[#045B0D] focus:ring-[#11851E]"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Upload a different or updated CV for this role
                  </span>
                </label>
              </div>
            ) : null}

            {(!profile?.cvFileName || !useProfileCV) && (
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  {uploadedFileName ? (
                    <span className="text-emerald-700 font-bold">
                      Selected: {uploadedFileName} ({(uploadedFileSize / 1024).toFixed(0)} KB)
                    </span>
                  ) : (
                    'Click to choose a file or drag and drop'
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supported formats: PDF, DOC, DOCX (up to 5MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="mt-3 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B1E36] file:text-white hover:file:bg-[#071526] cursor-pointer"
                />
                {fileError && (
                  <p className="text-xs text-red-600 font-semibold mt-2">{fileError}</p>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Screening Questions */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-heading text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#045B0D]" />
              <span>3. Role Screening Questions</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Mandatory qualification questions to assess candidate alignment with employer requirements.
            </p>

            <div className="space-y-4">
              {screeningAnswers.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {idx + 1}. {item.question} *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.answer}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="Provide your specific response or details..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Motivation / Cover Letter */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
              4. Cover Letter & Professional Motivation
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Highlight your relevant achievements, shift availability, and qualifications.
            </p>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Explain why you are the ideal professional for this opening..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
            />
          </div>

          {/* Section 5: Application Fee Notice & Legal Consent (NDPA 2023) */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-950">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">Application Fee Notice</p>
                <p className="mt-0.5 leading-relaxed">
                  Notice: Recruitment at F&J Workforce is 100% paid. Application fee of 5,000 Naira ($3.8) applied. This covers candidate pre-screening, credential auditing, and priority profile presentation to client interview panels.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 text-[#045B0D] focus:ring-[#11851E]"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I hereby declare that the information provided is accurate and verifiable. I acknowledge that recruitment at F&J Workforce is 100% paid (Application fee of 5,000 Naira ($3.8) applied), and I consent to F&J Workforce Limited processing my personal records and CV for recruitment and credential verification under the <strong>Nigeria Data Protection Act (NDPA 2023)</strong>.
              </span>
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to={`/jobs/${job.slug}`} className="text-xs font-semibold text-slate-600 hover:text-slate-900">
              Cancel Application
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#045B0D] hover:bg-[#11851E] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Your Application...</span>
              ) : (
                <>
                  <span>Submit Official Job Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
