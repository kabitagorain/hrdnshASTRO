import React from 'react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Briefcase, Award, CheckCircle2, Cpu, Factory } from 'lucide-react';
import { profile } from '../data/services';
import { translations } from '../data/translations';

interface HeroProps {
  onOpenRecommender: () => void;
  onExploreServices: () => void;
  onViewResume?: () => void;
  onScheduleConsultation?: () => void;
  locale?: string;
}

export default function Hero({ 
  onOpenRecommender, 
  onExploreServices, 
  onViewResume, 
  onScheduleConsultation, 
  locale = 'en' 
}: HeroProps) {
  const t = translations[locale] || translations.en;

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-zinc-800/80 bg-[#09090b]" id="hero-section">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive 2-Column Executive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-center lg:text-left">
          
          {/* Left Column: Executive Value Proposition & Actions (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
            
            {/* Executive Authority Pill */}
            <div className="inline-flex items-center space-x-2.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-1.5 text-zinc-300 backdrop-blur-md mb-6 animate-fadeIn shadow-sm">
              <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="font-mono uppercase tracking-wider text-xs font-semibold text-zinc-200">
                {t.heroBadge}
              </span>
            </div>

            {/* Display Heading in Roboto Condensed */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              {t.heroHeadingPart1}{' '}
              <span className="text-amber-400 font-bold block sm:inline">
                {t.heroHeadingPart2}
              </span>{' '}
              {t.heroHeadingPart3}
            </h1>

            {/* Executive Tagline in Roboto */}
            <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-sans font-normal">
              {t.heroTagline}
            </p>

            {/* Key Pillars Micro-Badges */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start text-xs font-mono">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                <Factory className="h-3.5 w-3.5 text-amber-400" />
                <span>10+ Yrs PPC Head (Fakir Knitwears)</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>CEO (63 Districts Scale)</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                <Cpu className="h-3.5 w-3.5 text-amber-400" />
                <span>Sovereign AI & ERP Architect</span>
              </span>
            </div>

            {/* Executive Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
              {onViewResume && (
                <button
                  onClick={onViewResume}
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-amber-500 hover:bg-amber-600 text-zinc-950 font-display font-bold uppercase tracking-wider text-sm transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                  id="hero-cta-resume"
                >
                  <Briefcase className="h-4 w-4 text-zinc-950" />
                  <span>Executive CV & Dossier</span>
                  <ArrowRight className="h-4 w-4 text-zinc-950" />
                </button>
              )}

              {onScheduleConsultation && (
                <button
                  onClick={onScheduleConsultation}
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-display font-bold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                  id="hero-cta-consultation"
                >
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Strategic Advisory</span>
                </button>
              )}

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-5 py-3.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 text-zinc-300 hover:text-white font-display font-bold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                id="hero-cta-catalog"
              >
                <Terminal className="h-4 w-4 text-amber-500" />
                <span>Systems & ERP</span>
              </button>
            </div>

          </div>

          {/* Right Column: Executive Portrait & Leadership Card (Col 5) */}
          <div className="lg:col-span-5 flex justify-center w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative group w-full max-w-[380px]">
              
              {/* Amber Glow Backlight */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/20 via-amber-600/10 to-orange-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500" />

              {/* Main Polished Executive Card */}
              <div className="relative rounded-2xl border border-zinc-800/90 bg-zinc-900/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[11px] font-mono">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="uppercase tracking-wider">Available for Advisory</span>
                  </div>
                  <span className="text-zinc-400 uppercase tracking-widest font-semibold flex items-center space-x-1">
                    <Award className="h-3.5 w-3.5 text-amber-400" />
                    <span>20+ Yrs Track Record</span>
                  </span>
                </div>

                {/* Portrait Image Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[3.4/4] w-full bg-zinc-950 border border-zinc-800">
                  <img 
                    src="/my-pic/h1.JPG" 
                    alt="Haradhan Sharma - Executive Operations Leader & Chief Enterprise Architect" 
                    className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                  
                  {/* Floating Identity Overlay on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-left p-2.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80">
                    <div className="font-display font-bold text-white text-base tracking-wide flex items-center justify-between">
                      <span>{profile.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-[11px] font-mono text-amber-400 font-medium truncate mt-0.5">
                      Executive Leader & Chief Architect
                    </div>
                    <div className="text-[10px] font-sans text-zinc-400 mt-0.5">
                      Fakir Knitwears PPC Head (10 Yrs) • CEO • Sovereign AI
                    </div>
                  </div>
                </div>

                {/* Micro Metrics Strip inside Card */}
                <div className="mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center text-zinc-300">
                  <div className="p-1.5 rounded bg-zinc-950/60 border border-zinc-800/60">
                    <div className="font-display font-extrabold text-amber-400 text-sm">20+ Yrs</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Industrial Ops</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-950/60 border border-zinc-800/60">
                    <div className="font-display font-extrabold text-amber-400 text-sm">63 Dist.</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Nationwide CEO</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-950/60 border border-zinc-800/60">
                    <div className="font-display font-extrabold text-amber-400 text-sm">Zero Leak</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Sovereign AI</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Executive Impact Metrics Strip */}
        <div className="mt-14 sm:mt-18 border-t border-zinc-800/80 bg-zinc-950/40 py-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {profile.stats.map((stat, i) => (
              <div key={i} className="text-center group border-r last:border-r-0 border-zinc-800/60">
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
