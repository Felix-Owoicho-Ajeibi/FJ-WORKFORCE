import React, { useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import { Logo } from '../components/common/Logo';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerCandidate, currentUser } = useStore();
  const { navigate } = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If already logged in, redirect
  if (currentUser && !isSuccess) {
    if (currentUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/candidate/dashboard');
    }
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Use and Privacy Notice.');
      return;
    }

    setIsLoading(true);

    try {
      const res = registerCandidate({
        fullName,
        email,
        phone,
        password
      });

      if (!res.success) {
        setErrorMsg(res.message || 'Registration failed.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
          Create Candidate Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Join thousands of professionals matched with industrial & corporate employers in Lagos.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-sm">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Account Created Successfully!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Welcome to F&J Workforce, <strong>{fullName}</strong>. A verification notice has been dispatched to <strong>{email}</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-left">
                <strong>Next Step:</strong> Complete your candidate profile and upload your CV to start applying for verified vacancies.
              </div>
              <div className="pt-2">
                <Link
                  to="/candidate/dashboard"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md flex items-center justify-center gap-2"
                >
                  <span>Go to Candidate Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Alabi"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 text-[#045B0D] focus:ring-[#11851E]"
                  />
                  <span className="text-[11px] text-slate-600 leading-normal">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#045B0D] font-bold underline">
                      Terms of Use
                    </Link>{' '}
                    and acknowledge the{' '}
                    <Link to="/privacy" className="text-[#045B0D] font-bold underline">
                      Privacy Policy
                    </Link>{' '}
                    under Nigerian data protection law.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Register Candidate Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-[#0B1E36] hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
