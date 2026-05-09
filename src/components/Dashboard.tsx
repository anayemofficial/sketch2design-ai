import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Star, 
  FolderOpen, 
  Share2, 
  Download, 
  Flame, 
  Users, 
  ExternalLink,
  ChevronRight,
  Database,
  Grid
} from 'lucide-react';
import { Project } from '../types';
import { DESIGN_PRESETS } from '../constants';

interface DashboardProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onNewSketch: () => void;
  onToggleFavorite: (id: string) => void;
}

export default function Dashboard({ projects, onSelectProject, onNewSketch, onToggleFavorite }: DashboardProps) {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [search, setSearch] = useState<string>('');
  
  // Collaborative invites simulation
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>(['nayem22205341080@diu.edu.bd', 'collaborator@ai.studio']);
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail && !invitedMembers.includes(inviteEmail)) {
      setInvitedMembers([...invitedMembers, inviteEmail]);
      setInviteEmail('');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === 'all' || p.isFavorite;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.prompt.toLowerCase().includes(search.toLowerCase()) ||
                          p.style.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate stats dynamically
  const totalCredits = 1500;
  const creditsUsed = projects.reduce((acc, curr) => acc + curr.aiCreditsUsed, 140);
  const creditsLeft = totalCredits - creditsUsed;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans text-slate-100" id="user-dashboard-workspace">
      
      {/* Central Projects Panel */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Actions bar (Search, Filter, New Project) */}
        <div className="bg-slate-900/60 border border-slate-700/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          
          <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-all ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white shadow shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-all flex items-center gap-1.5 ${
                filter === 'favorites' 
                  ? 'bg-indigo-600 text-white shadow shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              Starred
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search inputs */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search styles, titles..."
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>
            
            <button
              onClick={onNewSketch}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-indigo-500/10"
              id="new-sketch-dashboard-action"
            >
              <Plus className="w-4 h-4" />
              NEW SKETCH
            </button>
          </div>

        </div>

        {/* Saved Projects Gallery/Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="dashboard-projects-gallery">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => {
              const stylePreset = DESIGN_PRESETS.find(pr => pr.id === p.style);
              return (
                <div 
                  key={p.id}
                  className="bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden group hover:border-slate-500 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => onSelectProject(p)}
                >
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img 
                      src={p.designedImage || p.sketchImage} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    
                    {/* Glow tag badge of preset design mode */}
                    <span className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 text-[9px] font-mono text-slate-300 px-2 py-0.5 rounded backdrop-blur-md">
                      {stylePreset?.name || p.style}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(p.id);
                      }}
                      className="absolute top-2.5 right-3 w-7 h-7 bg-slate-950/90 border border-slate-800 rounded-lg flex items-center justify-center backdrop-blur-md"
                    >
                      <Star className={`w-3.5 h-3.5 ${p.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-500 hover:text-slate-200'}`} />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-sans font-bold text-slate-200 group-hover:text-indigo-400 uppercase tracking-wide truncate">{p.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{p.createdAt}</p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-[10px] font-mono text-slate-400">
                      <span>Credits: {p.aiCreditsUsed} API</span>
                      <span className="text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Explore Design <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center p-8 text-slate-500 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-xl">
              <FolderOpen className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-widest mb-1">NO DESIGNS COMPLETED</h4>
              <p className="text-xs max-w-xs mt-1">Start sketching or draft concepts on the left panel to populate your creative history.</p>
            </div>
          )}
        </div>

      </div>

      {/* Right Stats & Collaboration Panel */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Dynamic Credit Meter */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="font-sans font-semibold text-sm text-slate-200 tracking-wide flex items-center gap-1.5 uppercase">
                <Flame className="w-4 h-4 text-orange-400" /> AI Credits Balance
              </h3>
              <span className="text-xxs text-slate-500 font-mono mt-0.5">Professional Premium Tier Account</span>
            </div>
            <span className="text-xs font-mono text-indigo-400 font-bold">{Math.round((creditsLeft / totalCredits) * 100)}%</span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-orange-400 via-indigo-600 to-purple-600 h-full rounded-full"
                style={{ width: `${(creditsLeft / totalCredits) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xxs font-mono text-slate-500 mt-1">
              <span>Used: {creditsUsed}</span>
              <span>Available: {creditsLeft} / {totalCredits}</span>
            </div>
          </div>
          
          <button className="w-full py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/40 hover:text-white text-xxs font-bold font-mono tracking-wide rounded-xl transition-all">
            TOP UP TELEMETRY CREDITS
          </button>
        </div>

        {/* Interactive Stats Panel */}
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-xl grid grid-cols-2 gap-4">
          <div className="flex flex-col p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
            <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">Exports Completed</span>
            <span className="text-xl font-sans font-black text-indigo-400 mt-1">{projects.length * 3 + 4}</span>
          </div>
          <div className="flex flex-col p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
            <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">Design Rating</span>
            <span className="text-xl font-sans font-black text-cyan-400 mt-1">A+</span>
          </div>
        </div>

        {/* Team Collaboration Invite Simulator */}
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex flex-col mb-4">
            <h3 className="font-sans font-semibold text-sm text-slate-200 tracking-wide flex items-center gap-1.5 uppercase">
              <Users className="w-4 h-4 text-cyan-400" /> COLLABORATORS WORKSPACE
            </h3>
            <span className="text-xxs text-slate-500 font-mono mt-0.5">Invite team to edit or review together</span>
          </div>

          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="teammate@agency.com"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xxs text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
            <button 
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xxs font-bold font-mono tracking-wide whitespace-nowrap"
            >
              Inv. Member
            </button>
          </form>

          {/* Invited List */}
          <div className="flex flex-col gap-1.5 mt-4 border-t border-slate-800 pt-3">
            {invitedMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between text-xxs text-slate-400 font-mono bg-slate-950/50 p-2 rounded-lg border border-slate-900/60">
                <span className="truncate">{member}</span>
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{i === 0 ? 'Admin' : 'Editor'}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
