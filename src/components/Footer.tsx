import React from 'react';
import { Mail, Phone, Globe, Heart, ArrowUp, Linkedin, Github, ExternalLink, ShieldCheck } from 'lucide-react';
import { siteData, profile } from '../data/services';
import AvatarIcon from './AvatarIcon';

interface FooterProps {
  setView: (view: string, serviceId?: string | null) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050505] py-16 relative z-10 font-sans" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          
          {/* Brand & Executive Identity Col */}
          <div className="space-y-4 md:col-span-2">
            <div 
              onClick={() => setView('home')} 
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-zinc-950 border border-white/10 shadow-lg overflow-hidden transition-transform group-hover:scale-105 group-hover:border-orange-500/40">
                <AvatarIcon size="22" className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base tracking-[0.12em] font-bold uppercase text-white transition-colors group-hover:text-orange-400">
                  {profile.fname}
                  <span className="font-serif italic text-amber-200 lowercase tracking-normal pl-0.5">
                    .{profile.lname}
                  </span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  Executive Operations Leader & Chief Enterprise Architect
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Unifying 20+ years of industrial factory floor leadership (10 Yrs PPC Manager at Fakir Knitwears, CEO) with modern Sovereign AI pipelines, custom ERP systems (Odoo/ERPNext), and high-concurrency backends.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
                title="GitHub Repositories"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
                title="Upwork Profile"
              >
                <ExternalLink className="h-4 w-4 text-green-400" />
              </a>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase text-zinc-400 tracking-widest font-bold">Executive Links</span>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setView('resume')} className="text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer text-left uppercase tracking-wider text-xs font-semibold">
                  Executive CV & Dossier
                </button>
              </li>
              <li>
                <button onClick={() => setView('home')} className="text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer text-left uppercase tracking-wider text-xs font-semibold">
                  Systems & ERP Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setView('consultation')} className="text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer text-left uppercase tracking-wider text-xs font-semibold">
                  Strategic Advisory Session
                </button>
              </li>
              <li>
                <button onClick={() => setView('recommend')} className="text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer text-left uppercase tracking-wider text-xs font-semibold">
                  Recommended Tech Stack
                </button>
              </li>
              <li>
                <button onClick={() => setView('blog')} className="text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer text-left uppercase tracking-wider text-xs font-semibold">
                  Technical & Industrial Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase text-zinc-400 tracking-widest font-bold">Direct Coordinates</span>
            <ul className="space-y-3 text-zinc-300 font-mono text-xs uppercase tracking-wider font-semibold">
              <li className="flex items-center space-x-2.5">
                <Mail className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors normal-case font-sans">{profile.email}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors font-mono">{profile.phone}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Globe className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <span className="normal-case font-sans">{profile.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 uppercase tracking-wider">
          <div className="space-y-1">
            <span>© 2026 {siteData.brandName} • {profile.name}</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-1 uppercase font-mono tracking-widest">
              <button onClick={() => setView('terms')} className="hover:text-white text-zinc-400 cursor-pointer font-bold transition-colors">
                Terms of Engagement
              </button>
              <span className="text-zinc-700">•</span>
              <button onClick={() => setView('privacy')} className="hover:text-white text-zinc-400 cursor-pointer font-bold transition-colors">
                Privacy & Data Governance
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center space-x-2 rounded-sm border border-white/10 bg-white/[0.03] hover:bg-orange-500 px-3.5 py-1.5 text-xs font-mono tracking-widest text-zinc-300 hover:text-white font-bold transition-all duration-300 shadow-md cursor-pointer group"
              id="footer-back-to-top"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3 text-orange-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
