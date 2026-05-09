import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Smartphone, 
  LineChart, 
  Zap, 
  Download, 
  Check, 
  ChevronRight, 
  HelpCircle,
  Play,
  RotateCw,
  Github,
  Mail
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "Sketch2Design has compressed our ideation cycle from days to minutes. We simply doodle during client alignment, click generate, and map out vectors instantly.",
      author: "Elena Vasquez",
      role: "Lead Product Architect, Vercel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The Figma-ready export is a game-changer. Rather than starting wireframes from scratch, we import Sketch2Design layer maps directly as structural vector nodes.",
      author: "Marcus Vance",
      role: "Senior UX Specialist, Canva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const features = [
    {
      title: "Active Vector Snapping",
      desc: "Our Computer Vision layers snap rough sketches onto precise aligned 12-column grid grids automatically, avoiding visual slop.",
      icon: Layers,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25"
    },
    {
      title: "Interactive Drawing Studio",
      desc: "Draft wireframe screens directly within our HTML5 Drawing Canvas, customized with pencils, brushes, and overlay grids.",
      icon: Smartphone,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/25"
    },
    {
      title: "12+ Art Conversion Presets",
      desc: "Instantly switch design styles on-the-fly—covering dashboards, iOS mobile apps, corporate portfolios, architecture, and minimal Swiss posters.",
      icon: Cpu,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25"
    },
    {
      title: "Actionable UX Critiques",
      desc: "Receive real-time accessibility reviews, structural scores, and color palette suggestions alongside high-fidelity result renderings.",
      icon: LineChart,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
    }
  ];

  const faqs = [
    {
      q: "How does Sketch2Design AI detect my drawing elements?",
      a: "We process raw sketch bitmaps using state-of-the-art computer vision models which isolate shapes, layout ratios, and text inputs, prior to orchestrating high-fidelity template synthesis via our Gemini core."
    },
    {
      q: "Can I export structural nodes straight into Figma?",
      a: "Absolutely. Our platform outputs responsive Figma-ready coordinate files as standardized JSON layout trees, preserving the layers, bounding boxes, and styles so you can load them as vectors."
    },
    {
      q: "What image formats are supported in the drag-and-drop zone?",
      a: "You can load high-resolution PNG, JPG, JPEG, and WEBP files. You can also paste screenshots directly into the browser workspace."
    }
  ];

  return (
    <div id="landing-page-root" className="flex flex-col gap-24 py-6 font-sans text-slate-100 max-w-7xl mx-auto px-4 leading-relaxed">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 gap-6 overflow-hidden">
        
        {/* Abstract futuristic grid background */}
        <div className="absolute inset-0 bg-radial-at-t from-indigo-500/15 via-transparent to-transparent opacity-60 pointer-events-none -z-10"></div>
        <div className="absolute inset-0 max-w-lg mx-auto opacity-10 blur-[80px] bg-gradient-to-r from-indigo-400 to-cyan-400 h-96 -top-12 pointer-events-none -z-10"></div>
        
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-700/60 rounded-full text-xs font-mono text-indigo-400 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" /> INTRODUCING SKETCH2DESIGN AI v1.0
        </div>

        <h1 className="text-4xl md:text-6xl font-sans tracking-tight font-black leading-tight max-w-3xl text-slate-100">
          Transform Rough Drawings into <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Professional Designs</span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 max-w-xl font-sans leading-relaxed">
          Instantly convert hand-drawn wireframes, app drawings, conceptual illustrations, and doodles into beautiful high-fidelity mockups, UI layouts, and Figma components using state-of-the-art Artificial Intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button 
            onClick={onGetStarted}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold font-mono tracking-wide shadow-lg shadow-indigo-500/25 flex items-center gap-2 group transition-all"
            id="btn-hero-launch"
          >
            LAUNCH DRAWING WORKSPACE
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#demo-showcase"
            className="px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold font-mono transition-colors flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> VIEW DEMO REEL
          </a>
        </div>

        {/* Floating Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 bg-slate-900/40 border border-slate-700/60 p-5 rounded-2xl backdrop-blur-xl max-w-xl w-full">
          <div className="flex flex-col">
            <span className="text-2xl font-sans font-black text-slate-100">12+</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Design Modes</span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-2xl font-sans font-black text-slate-100">1.2M+</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Sketches Converted</span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-2xl font-sans font-black text-slate-100">&lt; 15s</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Median Rendertime</span>
          </div>
        </div>

      </section>

      {/* Before/After Showcase Slider Promo Section */}
      <section id="demo-showcase" className="flex flex-col items-center gap-12 bg-slate-950/40 border border-slate-800/80 p-8 rounded-3xl relative overflow-hidden">
        
        <div className="text-center max-w-lg">
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-slate-100 mb-2">INVESTOR SHOWCASE</h2>
          <p className="text-xs text-slate-400 font-sans">Slide divider back and forth to see rough canvas sketching morph instantly into beautiful interactive layouts.</p>
        </div>

        <div className="relative w-full max-w-3xl aspect-[16/10] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl bg-slate-900 group select-none">
          {/* Mock high fidelity result */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
              alt="Mock high quality high fidelity design dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Mock hand sketch on top clipped using hardcoded 50% split */}
          <div 
            className="absolute inset-0 bg-slate-950 w-full h-full"
            style={{ clipPath: 'polygon(0 0, 48% 0, 48% 100%, 0 100%)' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80" 
              alt="Mock sketch draft" 
              className="w-full h-full object-cover mix-blend-screen opacity-50"
            />
            <div className="absolute inset-x-0 bottom-4 left-4 z-10 text-xxs font-mono text-amber-500 bg-amber-950/80 px-2 py-1 rounded border border-amber-800/80 backdrop-blur-md">
              [CONTOUR DRAFT INPUT]
            </div>
          </div>

          {/* Golden dividing bar */}
          <div className="absolute top-0 bottom-0 left-[48%] w-0.5 bg-indigo-500 z-10">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-950 border border-indigo-500 flex items-center justify-center text-indigo-400 text-xxs font-bold shadow-lg shadow-indigo-500/20">
              ↔
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 right-4 text-right z-10">
            <span className="text-xxs font-mono text-indigo-400 bg-indigo-950/80 px-2 py-1 rounded border border-indigo-800/80 backdrop-blur-md">
              [HIGH-FIDELITY SaaS GRAPH MOCKUP]
            </span>
          </div>
        </div>

      </section>

      {/* Core Technology Features Grid */}
      <section className="flex flex-col gap-12">
        
        <div className="text-center max-w-lg mx-auto flex flex-col gap-2">
          <span className="text-xxs font-mono text-indigo-400 uppercase tracking-widest font-semibold">FEATURES MATRIX</span>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-slate-100">POLISHED CREATIVE ENGINE</h2>
          <p className="text-xs text-slate-400">Everything needed to accelerate UI ideas from rough concepts to production wireframes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl flex gap-4 transition-all hover:bg-slate-900/60 hover:border-slate-700 hover:scale-[1.01] group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-sans font-bold shrink-0 shadow-lg ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm font-sans font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors uppercase tracking-wide">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-0.5">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* How it works simple timeline */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-slate-900/20 rounded-3xl border border-slate-800/80">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest leading-none font-bold">WORKFLOW PIPELINE</span>
          <h3 className="text-xl font-sans font-black text-slate-100">THREE PASS PIPELINE</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Our pipeline streamlines design cycles by linking drawing, automatic computer vision extraction, and AI mockup synthesis.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 font-mono text-xs font-bold text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/5">
            01
          </div>
          <h4 className="text-xs font-sans font-bold text-slate-200 uppercase tracking-wider">Sketch Your Outline</h4>
          <p className="text-xxs text-slate-400 font-sans">Use our responsive drawing canvas to scribble layout structures, or upload existing rough mockups.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 font-mono text-xs font-bold text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/5">
            02
          </div>
          <h4 className="text-xs font-sans font-bold text-slate-200 uppercase tracking-wider">Describe Creative Style</h4>
          <p className="text-xxs text-slate-400 font-sans">Describe the interface goals using simple language, or pick a custom preset mode for automated transformations.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-sm mx-auto">
          <span className="text-xxs font-mono text-purple-400 uppercase tracking-widest font-bold">FEEDBACK REPORT</span>
          <h2 className="text-xl md:text-2xl font-sans font-black text-slate-100 mt-1 uppercase tracking-tight">DESIGNED BY CREATIVE TEAMS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between gap-6 backdrop-blur-xl relative">
              <span className="absolute top-4 right-6 text-slate-800 text-6xl font-serif select-none pointer-events-none">“</span>
              <p className="text-xs font-sans text-slate-300 leading-relaxed italic relative z-10 mt-2">"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-bold text-slate-200">{t.author}</span>
                  <span className="text-[10px] font-mono text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="flex flex-col gap-12">
        <div className="text-center max-w-lg mx-auto flex flex-col gap-2">
          <span className="text-xxs font-mono text-cyan-400 uppercase tracking-widest font-semibold">PRICING TIERS</span>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-slate-100">FLEXIBLE COMMERCIAL TIERS</h2>
          <p className="text-xs text-slate-400">Unlock advanced vector conversions, Figma presets, and batch processing nodes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-8 hover:border-slate-700 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest font-bold">Standard Preview</span>
              <h3 className="text-lg font-sans font-extrabold text-slate-100">Free Trial</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-slate-100">$0</span>
                <span className="text-xs font-mono text-slate-500"> / forever</span>
              </div>
              <p className="text-xxs text-slate-400 leading-relaxed mt-2">Highly capable basic workspace for small wireframe conceptualization.</p>
            </div>
            <ul className="flex flex-col gap-2.5 text-xxs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Standard Gemini image core</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Interactive drawing canvas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>50 AI credits per month</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-[11px] font-bold font-mono tracking-wide text-slate-300 transition-all">
              LAUNCH FREE
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-900/60 border-2 border-indigo-500/80 rounded-2xl p-6 flex flex-col justify-between gap-8 relative shadow-xl shadow-indigo-600/5 hover:-translate-y-1 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 font-mono text-[9px] font-bold tracking-widest uppercase text-white px-3 py-1 rounded-full leading-none">
              MOST PROFESSIONAL
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs font-mono text-indigo-400 uppercase tracking-widest font-bold">Vector Master</span>
              <h3 className="text-lg font-sans font-extrabold text-slate-100">UX Architect</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-slate-100">$29</span>
                <span className="text-xs font-mono text-slate-500"> / month</span>
              </div>
              <p className="text-xxs text-slate-400 leading-relaxed mt-2">Optimal suite for agency architects compiling custom enterprise UI elements.</p>
            </div>
            <ul className="flex flex-col gap-2.5 text-xxs text-slate-300 border-t border-slate-850 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Smart Figma vector node export</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Double scanning limits & high-contrast clean</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>1,200 premium AI credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Priority model latency</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[11px] font-bold font-mono tracking-wide shadow-lg shadow-indigo-500/20 transition-all">
              UPGRADE TRIAL
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-8 hover:border-slate-700 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest font-bold">Collab Suite</span>
              <h3 className="text-lg font-sans font-extrabold text-slate-100">Enterprise Core</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-slate-100">Custom</span>
              </div>
              <p className="text-xxs text-slate-400 leading-relaxed mt-2">Dedicated nodes, collaborative environments, and corporate API channels.</p>
            </div>
            <ul className="flex flex-col gap-2.5 text-xxs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Real-time multi-user editing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Unlimited batch conversion channels</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Dedicated SLA support channels</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-[11px] font-bold font-mono tracking-wide text-slate-300 transition-all">
              CONTACT EXECUTIVE
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="flex flex-col gap-12">
        <div className="text-center max-w-sm mx-auto">
          <span className="text-xxs font-mono text-indigo-400 uppercase tracking-widest font-bold">FAQ CATALOG</span>
          <h2 className="text-xl md:text-2xl font-sans font-black text-slate-100 mt-1 uppercase tracking-tight">COMMON QUESTIONS</h2>
        </div>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden cursor-pointer transition-colors hover:border-slate-700"
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between p-4 gap-4">
                <h4 className="text-xs font-sans font-semibold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  {faq.q}
                </h4>
                <span className="text-slate-500 font-bold font-mono text-sm">
                  {activeFaq === i ? '−' : '+'}
                </span>
              </div>
              {activeFaq === i && (
                <div className="px-10 pb-4 text-xxs text-slate-400 leading-relaxed font-sans border-t border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xxs text-slate-500 font-mono">
        <div>
          © 2026 Sketch2Design AI • Investor Demo Application. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Support Registry</a>
        </div>
      </footer>

    </div>
  );
}
