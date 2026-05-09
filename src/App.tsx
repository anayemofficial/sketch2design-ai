import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  LayoutGrid, 
  Smartphone, 
  LineChart, 
  User, 
  Layers, 
  Compass, 
  Menu, 
  X, 
  LogOut, 
  Star, 
  Briefcase 
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import DrawingCanvas from './components/DrawingCanvas';
import EnhancerSandbox from './components/EnhancerSandbox';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import AuthPortal from './components/AuthPortal';
import { Project } from './types';
import { INITIAL_PROJECTS } from './constants';

export default function App() {
  const [userEmail, setUserEmail] = useState<string>('nayem22205341080@diu.edu.bd');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'studio' | 'sandbox' | 'profile' | 'auth'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Shared active sketch passing through Drawing Studio to AI Sandbox
  const [activeSketch, setActiveSketch] = useState<string | undefined>(undefined);
  
  // Local project history list
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Quick project selection view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync projects to LocalStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('s2d_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        // Fallback to defaults
      }
    }
  }, []);

  const saveProjectsToRegistry = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('s2d_projects', JSON.stringify(updated));
  };

  const handleAddNewProject = (newProj: Project) => {
    const updated = [newProj, ...projects];
    saveProjectsToRegistry(updated);
    // Clear shared sketch and focus on dashboard or sandbox result
    setActiveSketch(undefined);
  };

  const handleToggleFavorite = (projId: string) => {
    const updated = projects.map((p) => 
      p.id === projId ? { ...p, isFavorite: !p.isFavorite } : p
    );
    saveProjectsToRegistry(updated);
    if (selectedProject?.id === projId) {
      setSelectedProject({ ...selectedProject, isFavorite: !selectedProject.isFavorite });
    }
  };

  const handleSketchSelect = (base64Image: string) => {
    setActiveSketch(base64Image);
    setCurrentView('sandbox');
  };

  const navigateToView = (view: 'landing' | 'dashboard' | 'studio' | 'sandbox' | 'profile' | 'auth') => {
    if (!isAuthenticated && view !== 'landing' && view !== 'auth') {
      setCurrentView('auth');
      setSelectedProject(null);
      setMobileMenuOpen(false);
      return;
    }
    setCurrentView(view);
    setSelectedProject(null);
    setMobileMenuOpen(false);
  };

  // Sign out simulation
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateToView('landing');
  };

  // Sign in simulation
  const handleLogin = () => {
    navigateToView('auth');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans transition-all selection:bg-indigo-500/30 selection:text-indigo-200 antialiased" id="sketch2design-global-shell">
      
      {/* Top Header Navigation Overlay */}
      <nav className="sticky top-0 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800/80 z-50 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Title / Corporate Logo */}
            <div 
              onClick={() => navigateToView('landing')} 
              className="flex items-center gap-2 cursor-pointer group"
              id="brand-logo-trigger"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 flex items-center justify-center p-1 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              </div>
              <span className="font-sans font-black tracking-tight text-sm text-slate-100 uppercase sm:block">
                Sketch<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">2Design AI</span>
              </span>
            </div>

            {/* Desktop Center Actions */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => navigateToView('landing')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-colors ${currentView === 'landing' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                id="nav-landing"
              >
                Home
              </button>
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => navigateToView('dashboard')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-colors ${currentView === 'dashboard' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                    id="nav-dashboard"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateToView('studio')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-colors ${currentView === 'studio' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                    id="nav-studio"
                  >
                    Drawing Studio
                  </button>
                  <button
                    onClick={() => navigateToView('sandbox')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold leading-none transition-colors ${currentView === 'sandbox' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                    id="nav-sandbox"
                  >
                    AI Enhancer
                  </button>
                </>
              )}
            </div>

            {/* User Session Portal */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 pl-3 pr-1 py-1 rounded-full">
                  <span className="text-[10px] font-mono text-slate-500">{userEmail}</span>
                  <button
                    onClick={() => navigateToView('profile')}
                    className="w-8 h-8 rounded-full bg-indigo-950/85 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-md"
                    title="User Profile Settings"
                    id="user-profile-avatar-trigger"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-mono tracking-wide shadow shadow-indigo-500/10"
                  id="btn-login-sandbox"
                >
                  SIMULATE SIGN IN
                </button>
              )}
            </div>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              id="mobile-hamburger-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#0F172A]/95 backdrop-blur-2xl border-b border-slate-800 flex flex-col gap-2 p-6 select-none z-40 animate-fade-in overflow-y-auto">
          <button
            onClick={() => navigateToView('landing')}
            className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold ${currentView === 'landing' ? 'bg-indigo-950/45 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
          >
            Home Layout
          </button>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigateToView('dashboard')}
                className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold ${currentView === 'dashboard' ? 'bg-indigo-950/45 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                User Projects
              </button>
              <button
                onClick={() => navigateToView('studio')}
                className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold ${currentView === 'studio' ? 'bg-indigo-950/45 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                Drawing Studio Canvas
              </button>
              <button
                onClick={() => navigateToView('sandbox')}
                className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold ${currentView === 'sandbox' ? 'bg-indigo-950/45 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                AI Enhancer Sandbox
              </button>
              <button
                onClick={() => navigateToView('profile')}
                className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold ${currentView === 'profile' ? 'bg-indigo-950/45 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                Corporate Profile Settings
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-bold font-mono tracking-wide mt-2"
            >
              SIMULATE SIGN IN
            </button>
          )}
        </div>
      )}

      {/* Main View Coordinators */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Project detail lightbox overlay when selected */}
        {selectedProject && (
          <div className="mb-8 bg-slate-900 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-xl relative flex flex-col md:flex-row gap-6 animate-fade-in" id="project-closeup-card">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950/80 hover:bg-slate-800 p-2 rounded-full border border-slate-800 transition-all flex items-center justify-center shadow-lg"
              title="Close detailed view"
              id="btn-close-project-closeup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full md:w-5/12 aspect-[14/10] bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800">
              <img 
                src={selectedProject.designedImage || selectedProject.sketchImage} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 cursor-pointer ${selectedProject.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-slate-300'}`} onClick={() => handleToggleFavorite(selectedProject.id)} />
                  <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest leading-none">Design Portfolio Details</span>
                </div>
                <h2 className="text-lg font-sans font-black text-slate-100 uppercase tracking-wide">{selectedProject.title}</h2>
                <p className="text-xxs text-slate-400 font-sans leading-relaxed mt-2 p-3 rounded-lg bg-slate-950 border border-slate-850 italic">
                  "{selectedProject.prompt}"
                </p>
                {selectedProject.notes && (
                  <p className="text-xxs text-slate-500 font-sans leading-relaxed mt-1">
                    Notes: {selectedProject.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-850 pt-4 text-[10px] font-mono text-slate-400">
                <span>Created: {selectedProject.createdAt}</span>
                <span className="bg-indigo-600/10 text-indigo-400 border border-indigo-950/40 px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wider font-bold">
                  Preset: {selectedProject.style}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Route Switching Views */}
        {currentView === 'landing' && (
          <LandingPage onGetStarted={() => navigateToView(isAuthenticated ? 'dashboard' : 'auth')} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
            onNewSketch={() => {
              setActiveSketch(undefined);
              navigateToView('studio');
            }}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentView === 'studio' && (
          <div className="flex flex-col gap-6">
            <div className="max-w-lg mb-2">
              <span className="text-xxs font-mono text-indigo-400 uppercase tracking-widest font-semibold">SKETCH DRAFTER</span>
              <h2 className="text-2xl font-sans font-black tracking-tight text-slate-100 mt-1 uppercase">Drawing Studio Chrome</h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">Draft layouts, shapes, or buttons. Touch support active for tablet devices.</p>
            </div>
            <DrawingCanvas
              onSketchSelect={handleSketchSelect}
              savedSketch={activeSketch}
              onAutoSave={(img) => setActiveSketch(img)}
            />
          </div>
        )}

        {currentView === 'sandbox' && (
          <div className="flex flex-col gap-6">
            <div className="max-w-lg mb-2">
              <span className="text-xxs font-mono text-purple-400 uppercase tracking-widest font-semibold">TRANSFORM SANDBOX</span>
              <h2 className="text-2xl font-sans font-black tracking-tight text-slate-100 mt-1 uppercase">AI Enhance Engine</h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">Transform sketch contours with Gemini AI and map structural vectors instantly.</p>
            </div>
            <EnhancerSandbox
              onProjectSaved={handleAddNewProject}
              activeSketch={activeSketch}
              onClearActiveSketch={() => setActiveSketch(undefined)}
            />
          </div>
        )}

        {currentView === 'profile' && (
          <UserProfile
            userEmail={userEmail}
            onLogoutSimulate={handleLogout}
          />
        )}

        {currentView === 'auth' && (
          <div className="flex justify-center items-center py-8">
            <AuthPortal 
              onAuthSuccess={(email) => {
                setUserEmail(email);
                setIsAuthenticated(true);
                navigateToView('dashboard');
              }}
            />
          </div>
        )}

      </main>

    </div>
  );
}
