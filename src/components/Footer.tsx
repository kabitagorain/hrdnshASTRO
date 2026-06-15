import React from 'react';
import { Mail, Phone, Globe, Heart, ArrowUp } from 'lucide-react';
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
    <footer className="border-t border-white/5 bg-[#050505] py-16 relative z-10 font-sans" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div 
              onClick={() => setView('home')} 
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-950 border border-white/10 shadow-lg overflow-hidden transition-transform group-hover:scale-105 group-hover:border-orange-500/35">
                <AvatarIcon size="20" className="text-white" />
              </div>
              <span className="font-display text-base tracking-[0.12em] font-semibold uppercase text-white transition-colors group-hover:text-orange-500">
                {profile.fname}
                <span className="font-serif italic text-amber-200 lowercase tracking-normal pl-0.5">
                  .{profile.lname}
                </span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              Deploying sovereign AI architectures, private RAG, and asynchronous high-throughput backends globally. Free seats, code ownership, secure VPS.
            </p>
          </div>

          {/* Nav Links Col */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">Engineering Links</span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('home')} className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left uppercase tracking-widest text-[10px] font-semibold">
                  System Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setView('resume')} className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left uppercase tracking-widest text-[10px] font-semibold">
                  Bio & Resume
                </button>
              </li>
              <li>
                <button onClick={() => setView('billing-portal')} className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left uppercase tracking-widest text-[10px] font-semibold">
                  Direct Invoicing
                </button>
              </li>
              <li>
                <button onClick={() => setView('recommend')} className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left uppercase tracking-widest text-[10px] font-semibold">
                  Affiliate Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">Contact Coordinates</span>
            <ul className="space-y-3 text-xs text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
              <li className="flex items-center space-x-2.5">
                <Mail className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors normal-case font-sans text-xs">{profile.email}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors normal-case font-sans text-xs">{profile.phone}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Globe className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and Back to Top action key */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-600 gap-4 uppercase tracking-wider">
          <div className="space-y-1">
            <span>© 2026 {siteData.brandName} • All rights administered under source licenses.</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-zinc-500 mt-1 uppercase font-mono tracking-widest">
              <button onClick={() => setView('terms')} className="hover:text-white text-zinc-400 cursor-pointer font-bold transition-colors">
                Terms of Service
              </button>
              <span className="text-zinc-700">•</span>
              <button onClick={() => setView('privacy')} className="hover:text-white text-zinc-400 cursor-pointer font-bold transition-colors">
                Privacy Policy
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center space-x-2 rounded-sm border border-white/5 bg-white/[0.02] hover:bg-orange-500 px-3.5 py-1.5 text-[9px] font-mono tracking-widest text-zinc-400 hover:text-white font-bold transition-all duration-300 shadow-md cursor-pointer group"
              id="footer-back-to-top"
              title="Return to topmost coordinate"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3 text-orange-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </button>

            <div className="flex items-center space-x-1.5 opacity-75">
              <span>Built for {profile.name}</span>
              <Heart className="h-3 w-3 text-orange-500 shrink-0 fill-orange-500" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
