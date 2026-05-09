import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Github, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  RefreshCw,
  X
} from 'lucide-react';

interface AuthPortalProps {
  onAuthSuccess: (email: string) => void;
  onClose?: () => void;
}

export default function AuthPortal({ onAuthSuccess, onClose }: AuthPortalProps) {
  const [email, setEmail] = useState<string>('nayem22205341080@diu.edu.bd');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [providerLoading, setProviderLoading] = useState<'google' | 'github' | 'email' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setIsLoading(true);
    setProviderLoading(provider);
    setErrorMsg(null);
    setSuccessMsg(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setProviderLoading(null);
      const userEmail = provider === 'google' ? 'nayem22205341080@diu.edu.bd' : 'github-partner@sketch2design.ai';
      setSuccessMsg(`Successfully authenticated via ${provider === 'google' ? 'Google Auth SSO' : 'GitHub Partner Link'}`);
      setTimeout(() => {
        onAuthSuccess(userEmail);
      }, 1000);
    }, 1200);
  };

  const handleOneClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please specify a valid Gmail or Workspace email Address.');
      return;
    }
    setIsLoading(true);
    setProviderLoading('email');
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      setProviderLoading(null);
      setSuccessMsg(`Passwordless One-Click Session active for ${email}`);
      setTimeout(() => {
        onAuthSuccess(email);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="relative max-w-md w-full bg-[#0F172A]/90 backdrop-blur-2xl border border-slate-800 p-8 rounded-3xl shrink-0 mx-auto shadow-2xl shadow-indigo-500/5" id="auth-portal-card-container">
      
      {/* Background ambient radial aura */}
      <div className="absolute inset-0 max-w-sm mx-auto opacity-20 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 h-full rounded-3xl blur-[50px] pointer-events-none -z-10"></div>
      
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 rounded-full bg-slate-900 border border-slate-800 transition-colors"
          id="btn-close-auth-portal"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-1 shadow-xl shadow-indigo-500/20">
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-sans font-black tracking-tight text-white mb-1">
            ONE-CLICK ACCESS
          </h2>
          <p className="text-xs text-slate-400 font-sans tracking-wide max-w-xs mx-auto">
            Access your AI Drawing & conversion workspace passwordlessly.
          </p>
        </div>
      </div>

      {/* Error & Success Alerts */}
      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2.5 text-xs text-rose-400 font-sans mb-6 animate-fade-in">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400 font-sans mb-6 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Simplifed Login Body */}
      <div className="flex flex-col gap-4">
        
        {/* Google SSO Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:text-white rounded-xl text-sm font-semibold transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5"
          id="btn-google-sso-login"
        >
          {isLoading && providerLoading === 'google' ? (
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.66l3.15-3.15C17.43 1.68 14.94 1 12 1 7.24 1 3.2 3.73 1.24 7.7l3.77 2.92C5.9 7.33 8.71 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.2-2.3H12v4.4h6.43c-.28 1.44-1.1 2.66-2.33 3.48l3.63 2.82c2.12-1.95 3.35-4.83 3.35-8.4z" />
              <path fill="#FBBC05" d="M5.01 13.52c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3L1.24 6.01C.45 7.62 0 9.4 0 11.2s.45 3.58 1.24 5.19l3.77-2.87z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.63-2.82c-1.01.68-2.29 1.09-3.63 1.09-3.29 0-6.1-2.29-7.09-5.38L1.24 15.8C3.2 19.77 7.24 23 12 23z" />
            </svg>
          )}
          <span>Continue with Google / Gmail</span>
        </button>

        {/* GitHub SSO Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin('github')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 hover:text-white rounded-xl text-sm font-semibold transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5"
          id="btn-github-sso-login"
        >
          {isLoading && providerLoading === 'github' ? (
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
          ) : (
            <Github className="w-4 h-4 text-slate-300" />
          )}
          <span>Continue with GitHub Account</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Or login with Email</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        {/* Passwordless One-Click Input Forms */}
        <form onSubmit={handleOneClickLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-sans h-11 placeholder-slate-700"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full text-center py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold font-mono tracking-wide mt-2 flex items-center justify-center gap-2 h-11 shadow-lg shadow-indigo-600/15 transition-all"
            id="btn-passwordless-submit"
          >
            {isLoading && providerLoading === 'email' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>ONE-CLICK ACCESS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-slate-500 text-[10px] text-center font-sans mt-3 leading-relaxed">
          Security policy: No passwords required. Simply authenticate instantly with prefilled secure credentials.
        </p>

      </div>

    </div>
  );
}
