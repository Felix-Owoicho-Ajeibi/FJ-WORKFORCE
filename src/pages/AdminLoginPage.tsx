import React, { useState } from 'react';
import { useRouter } from '../lib/router';
import { useStore } from '../lib/store';
import { Logo } from '../components/common/Logo';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { currentUser, loginAdmin } = useStore();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('admin@fjworkforce.com.ng');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated as admin, jump to /admin
  if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'recruiter')) {
    navigate('/admin');
    return null;
  }

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = loginAdmin(email, password);
      if (!res.success) {
        setErrorMsg(res.message || 'Access Denied: Invalid administrator credentials.');
        setIsLoading(false);
        return;
      }

      // Successful login
      navigate('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Administrative authentication failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071322] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#045B0D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#11851E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-md">
            <Logo size="lg" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Restricted Staff Portal</span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          F&J Internal ATS Gate
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          Private recruitment operations, candidate tracking, and enterprise workforce administration.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0B1E36]/90 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-xs text-slate-300">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>
              This portal is strictly reserved for authorized F&J administrative personnel and recruitment officers.
            </p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Authorized Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fjworkforce.com.ng"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700 text-white rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#11851E] focus:border-transparent transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-300">
                  Security Master Password
                </label>
                <span className="text-[10px] text-slate-500 font-mono">256-bit Encrypted</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 text-white rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#11851E] focus:border-transparent transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate & Enter ATS Portal'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
          Notice: Unauthorized access attempts are monitored and recorded in platform audit logs in accordance with the Nigerian Cybercrimes Act.
        </p>
      </div>
    </div>
  );
};
