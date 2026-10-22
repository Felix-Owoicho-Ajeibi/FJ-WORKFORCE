import React, { useState } from 'react';
import { Link } from '../lib/router';
import { Logo } from '../components/common/Logo';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
          Password Recovery
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Enter your registered email address to receive password reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Recovery Link Dispatched
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists under <strong>{email}</strong>, a secure password reset link has been dispatched with step-by-step instructions.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                For security reasons, this link will expire in 60 minutes.
              </div>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full py-2.5 px-4 text-xs font-bold text-[#0B1E36] bg-slate-100 hover:bg-slate-200 rounded-lg inline-block"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Email Address *
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#0B1E36] hover:bg-[#071526] text-white shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Generating Recovery Link...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                  &larr; Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
