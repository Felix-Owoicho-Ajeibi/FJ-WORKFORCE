import React, { useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import { Logo } from '../components/common/Logo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  User,
  KeyRound
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, currentUser, switchAccount } = useStore();
  const { navigate, searchParams } = useRouter();

  const redirectUrl = searchParams.get('redirect') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in
  if (currentUser) {
    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (currentUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/candidate/dashboard');
    }
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = login(email);
      if (!res.success) {
        setErrorMsg(res.message || 'Invalid email or password.');
        setIsLoading(false);
        return;
      }

      // Check current user after login
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        // Will trigger re-render and redirect
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: 'candidate' | 'admin') => {
    switchAccount(role);
    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/candidate/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
          Sign In to Your Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Access your Candidate Dashboard or Administrative ATS Portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Quick Demo Login Preset Bar */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-xs">
          <p className="font-bold text-[#045B0D] flex items-center gap-1.5 mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            Quick Evaluator One-Click Sign In:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('candidate')}
              className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-800 rounded-lg border border-slate-200 font-semibold text-center transition-colors shadow-2xs"
            >
              Sign In as Candidate
              <span className="block text-[10px] text-slate-400 font-normal">Oluwaseun Adeyemi</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-2 px-3 bg-[#0B1E36] hover:bg-[#071526] text-white rounded-lg font-semibold text-center transition-colors shadow-2xs"
            >
              Sign In as Admin
              <span className="block text-[10px] text-emerald-300 font-normal">F&J Recruiter ATS</span>
            </button>
          </div>
        </div>

        {/* Regular Sign In Form */}
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#045B0D] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#0B1E36] hover:bg-[#071526] text-white shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-600">
                Don’t have an account yet?{' '}
                <Link to="/register" className="font-bold text-[#045B0D] hover:underline">
                  Create Candidate Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
