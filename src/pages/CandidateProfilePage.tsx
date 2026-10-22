import React, { useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  FileText,
  AlertCircle,
  Save,
  ShieldCheck
} from 'lucide-react';
import { EducationEntry, ExperienceEntry } from '../types';

export const CandidateProfilePage: React.FC = () => {
  const { currentUser, getCandidateProfile, updateCandidateProfile, uploadCV, removeCV } = useStore();
  const { navigate } = useRouter();

  if (!currentUser) {
    navigate('/login?redirect=/candidate/profile');
    return null;
  }

  const profile = getCandidateProfile(currentUser.id);

  // Form states
  const [headline, setHeadline] = useState(profile?.headline || '');
  const [summary, setSummary] = useState(profile?.professionalSummary || '');
  const [location, setLocation] = useState(profile?.location || 'Ibeju-Lekki, Lagos');
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState<EducationEntry[]>(profile?.education || []);
  const [experience, setExperience] = useState<ExperienceEntry[]>(profile?.workExperience || []);
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    profile?.preferredLocations || ['Ibeju-Lekki', 'Lekki Free Zone']
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New experience modal/inputs
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpLocation, setNewExpLocation] = useState('Lagos');
  const [newExpStart, setNewExpStart] = useState('');
  const [newExpEnd, setNewExpEnd] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [showAddExp, setShowAddExp] = useState(false);

  // New education inputs
  const [newEduInst, setNewEduInst] = useState('');
  const [newEduDegree, setNewEduDegree] = useState('');
  const [newEduField, setNewEduField] = useState('');
  const [newEduEnd, setNewEduEnd] = useState('');
  const [showAddEdu, setShowAddEdu] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddExperience = () => {
    if (!newExpCompany || !newExpRole) return;
    const entry: ExperienceEntry = {
      id: 'exp-' + Date.now(),
      company: newExpCompany,
      position: newExpRole,
      location: newExpLocation,
      startDate: newExpStart || '2023',
      endDate: newExpEnd || 'Present',
      current: !newExpEnd,
      description: newExpDesc
    };
    setExperience([entry, ...experience]);
    setNewExpCompany('');
    setNewExpRole('');
    setNewExpDesc('');
    setShowAddExp(false);
  };

  const handleRemoveExperience = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  const handleAddEducation = () => {
    if (!newEduInst || !newEduDegree) return;
    const entry: EducationEntry = {
      id: 'edu-' + Date.now(),
      institution: newEduInst,
      degree: newEduDegree,
      fieldOfStudy: newEduField,
      startDate: '2018',
      endDate: newEduEnd || '2022',
      current: false
    };
    setEducation([entry, ...education]);
    setNewEduInst('');
    setNewEduDegree('');
    setNewEduField('');
    setShowAddEdu(false);
  };

  const handleRemoveEducation = (id: string) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile(currentUser.id, {
      headline,
      professionalSummary: summary,
      location,
      skills,
      education,
      workExperience: experience,
      preferredLocations
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header Title */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                Candidate Profile Editor
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B1E36]">
              Professional Profile & Credentials
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Keep your profile accurate to increase visibility to F&J recruitment consultants.
            </p>
          </div>

          <Link
            to="/candidate/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors self-start sm:self-auto"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-[#E8F5E9] border border-emerald-300 text-[#045B0D] text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
            <span>Profile successfully updated! Changes are reflected in candidate matching.</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#045B0D]" />
              <span>Personal & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.fullName}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  disabled
                  value={currentUser.phone}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Residential Location *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ibeju-Lekki, Lagos"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Professional Headline *</label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Senior Logistics Supervisor | HSE Level 2 Certified"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Professional Summary *</label>
              <textarea
                rows={4}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summarize your technical strengths, industry experience, and career objectives..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
            </div>
          </div>

          {/* Section 2: Work Experience */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#045B0D]" />
                <span>Work Experience History</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddExp(!showAddExp)}
                className="text-xs font-bold text-[#045B0D] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            {/* Add Exp Form */}
            {showAddExp && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Add New Work Experience</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Company Name (e.g. Dangote Fertilizer)"
                    value={newExpCompany}
                    onChange={(e) => setNewExpCompany(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Job Title / Position"
                    value={newExpRole}
                    onChange={(e) => setNewExpRole(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (e.g. 2021)"
                    value={newExpStart}
                    onChange={(e) => setNewExpStart(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="End Date (or 'Present')"
                    value={newExpEnd}
                    onChange={(e) => setNewExpEnd(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Summary of responsibilities and achievements..."
                  value={newExpDesc}
                  onChange={(e) => setNewExpDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddExp(false)}
                    className="px-3 py-1 text-xs text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="px-3 py-1 bg-[#045B0D] text-white text-xs font-bold rounded-lg"
                  >
                    Add Experience
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-slate-900">{exp.position}</h4>
                    <p className="text-xs font-semibold text-[#045B0D]">{exp.company} • {exp.location}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{exp.startDate} – {exp.endDate}</p>
                    {exp.description && (
                      <p className="text-xs text-slate-600 mt-2">{exp.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Remove experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Education */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#045B0D]" />
                <span>Education & Qualifications</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddEdu(!showAddEdu)}
                className="text-xs font-bold text-[#045B0D] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            {showAddEdu && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Add Academic / Technical Qualification</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Institution (e.g. UNILAG, YabaTech, NABTEB)"
                    value={newEduInst}
                    onChange={(e) => setNewEduInst(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Degree / Certificate (e.g. B.Sc, OND, Trade Test)"
                    value={newEduDegree}
                    onChange={(e) => setNewEduDegree(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study (e.g. Electrical Engineering)"
                    value={newEduField}
                    onChange={(e) => setNewEduField(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Year Completed (e.g. 2022)"
                    value={newEduEnd}
                    onChange={(e) => setNewEduEnd(e.target.value)}
                    className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddEdu(false)}
                    className="px-3 py-1 text-xs text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="px-3 py-1 bg-[#045B0D] text-white text-xs font-bold rounded-lg"
                  >
                    Add Education
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-slate-900">{edu.degree} - {edu.fieldOfStudy}</h4>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    <p className="text-[11px] text-slate-400">Completed {edu.endDate}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(edu.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Remove education"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Technical & Professional Skills
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill (e.g. Forklift Operation, SAP, Welding, HSE)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(e);
                  }
                }}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#0B1E36] hover:bg-[#071526] text-white text-xs font-bold rounded-lg"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#045B0D] text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Profile */}
          <div className="flex items-center justify-between pt-2">
            <Link to="/candidate/dashboard" className="text-xs font-bold text-slate-600 hover:text-slate-900">
              Return to Dashboard
            </Link>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#045B0D] hover:bg-[#11851E] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
