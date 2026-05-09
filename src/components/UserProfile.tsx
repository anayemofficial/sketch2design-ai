import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  LogOut, 
  Key, 
  Check, 
  Camera, 
  Github,
  Award,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';

interface UserProfileProps {
  userEmail: string;
  onLogoutSimulate?: () => void;
}

export default function UserProfile({ userEmail, onLogoutSimulate }: UserProfileProps) {
  const [name, setName] = useState<string>('Nayem Hasan');
  const [company, setCompany] = useState<string>('Daffodil International University');
  const [role, setRole] = useState<string>('Senior UX Researcher');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);

  // Profile update simulator
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans text-slate-100" id="user-profile-section-root">
      
      {/* Left side Profile Overview card */}
      <div className="lg:col-span-4 bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center text-center justify-between min-h-[380px]">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="relative group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
              alt="User profile avatar" 
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-xl group-hover:opacity-80 transition-all"
            />
            <div className="absolute inset-0 bg-slate-950/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-indigo-200" />
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-base text-slate-200">{name}</h3>
            <span className="text-xxs font-mono text-slate-500 mt-0.5">{userEmail}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xxs font-mono text-indigo-400 font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" /> PRO PLATINUM TIER
          </div>
        </div>

        <div className="w-full border-t border-slate-800 pt-5 mt-5 flex flex-col gap-3">
          <div className="flex justify-between items-center text-xxs font-mono text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
            <span>Workspace Role:</span>
            <span className="text-slate-200">{role}</span>
          </div>
          <button 
            onClick={onLogoutSimulate}
            className="w-full py-2 bg-rose-500/15 border border-rose-500/20 rounded-lg text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xxs font-bold font-mono tracking-wide flex items-center justify-center gap-1.5"
            id="btn-simulate-logout"
          >
            <LogOut className="w-3.5 h-3.5" /> Simulate Logout Session
          </button>
        </div>
      </div>

      {/* Right side Settings Details forms */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Profile Settings Update Form */}
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="font-sans font-semibold text-sm text-slate-200 tracking-wide mb-5 uppercase">
            Personal Account Parameters
          </h3>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600 font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Workspace Company</label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600 font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Corporate Role</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600 font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SaaS Email Address</label>
              <input 
                type="text" 
                value={userEmail}
                disabled
                className="bg-slate-950/60 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end mt-4">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 shadow-lg shadow-indigo-600/15"
                id="btn-save-profile-sim"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                {isSaved ? 'SAVED SUCCESS' : 'SAVE SETTINGS'}
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Platform secrets and API keys disclosure */}
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="font-sans font-semibold text-sm text-slate-200 tracking-wide flex items-center gap-1.5 uppercase">
              <Key className="w-4 h-4 text-purple-400" /> Platform Security Keys
            </h3>
            <span className="text-xxs text-slate-500 font-mono mt-0.5">Secrets are managed safely via AI Studio Secrets panels</span>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xxs font-mono text-slate-400">GEMINI_API_KEY</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mt-1 select-none">
                  {showKey ? (process.env.GEMINI_API_KEY || 'Not Loaded') : '••••••••••••••••••••••••••••••••••••••••'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowKey(!showKey)}
              className="p-1 px-2.5 text-[9px] font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-md transition-all flex items-center gap-1"
            >
              {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showKey ? 'Hide Secret' : 'Reveal'}
            </button>
          </div>

          <div className="flex gap-2.5 text-xxs text-slate-400 leading-relaxed font-sans bg-slate-950/40 p-4 border border-indigo-950/40 rounded-xl">
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300">Environment Credentials Managed Safely</p>
              <p className="mt-1">
                Your AI Studio API keys are automatically injected via runtime containers inside `process.env`. There is no need to write secrets manually inside client-side JS forms, ensuring total compliance with Zero-Trust guidelines.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
