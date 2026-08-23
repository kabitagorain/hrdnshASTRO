import React, { useState } from 'react';
import { Menu, X, ExternalLink, Globe, ShieldCheck, Briefcase } from 'lucide-react';
import { siteData, profile } from '../data/services';
import AvatarIcon from './AvatarIcon';

interface HeaderProps {
  currentView: string;
  setView: (view: string, serviceId?: string | null) => void;
  locale: string;
  setLocale: (locale: string) => void;
}

export default function Header({ currentView, setView, locale, setLocale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setView(view, null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Executive Identity */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center space-x-3 group"
          id="header-brand"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-zinc-950 border border-white/10 shadow-lg overflow-hidden transition-transform group-hover:scale-105 group-hover:border-orange-500/40">
            <AvatarIcon size="24" className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base tracking-[0.12em] font-bold uppercase text-white transition-colors group-hover:text-orange-400">
              {profile.fname}
              <span className="font-serif italic text-amber-200 lowercase tracking-normal pl-0.5">
                .{profile.lname}
              </span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold hidden sm:block">
              Executive Leader & Chief Architect
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
          <button
            onClick={() => handleNavClick('resume')}
            className={`font-sans text-xs uppercase tracking-widest font-semibold transition-colors hover:text-white ${
              currentView === 'resume' 
                ? 'text-orange-400 border-b border-orange-500/50 pb-0.5' 
                : 'text-zinc-400'
            }`}
            id="nav-resume"
          >
            Executive CV & Dossier
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`font-sans text-xs uppercase tracking-widest font-semibold transition-colors hover:text-white ${
              currentView === 'services' || currentView === 'service-detail'
                ? 'text-amber-400 border-b border-amber-500/50 pb-0.5' 
                : 'text-zinc-400'
            }`}
            id="nav-services"
          >
            Systems & ERP
          </button>

          <button
            onClick={() => handleNavClick('recommend')}
            className={`font-sans text-xs uppercase tracking-widest font-semibold transition-colors hover:text-white ${
              currentView === 'recommend' 
                ? 'text-orange-400 border-b border-orange-500/50 pb-0.5' 
                : 'text-zinc-400'
            }`}
            id="nav-recommend"
          >
            Tech Stack
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`font-sans text-xs uppercase tracking-widest font-semibold transition-colors hover:text-white ${
              currentView === 'blog' || currentView === 'blog-post'
                ? 'text-orange-400 border-b border-orange-500/50 pb-0.5' 
                : 'text-zinc-400'
            }`}
            id="nav-blog"
          >
            Insights
          </button>

          {/* Sub Navigation / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className="flex items-center space-x-1 font-sans text-xs uppercase tracking-widest font-semibold text-zinc-400 transition-colors hover:text-white"
              id="nav-dropdown-trigger"
            >
              <span>Platform</span>
              <svg className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 rounded bg-[#0a0a0a] border border-white/10 p-1.5 shadow-2xl"
                onMouseLeave={() => setDropdownOpen(false)}
                id="header-dropdown-menu"
              >
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3 text-blue-400" />
                </a>
                <a
                  href={profile.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <span>Upwork Profile</span>
                  <ExternalLink className="h-3 w-3 text-green-400" />
                </a>
                <button
                  onClick={() => {
                    handleNavClick('billing-portal');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:bg-white/5 hover:text-white text-left cursor-pointer"
                >
                  <span>Direct Invoicing</span>
                  <Globe className="h-3 w-3 text-amber-500" />
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* CTA Button & Language Selector */}
        <div className="hidden lg:flex items-center space-x-4">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="bg-zinc-950 border border-white/10 hover:border-orange-500/30 font-mono text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500/30 cursor-pointer uppercase tracking-wider text-xs font-bold h-[34px]"
            title="Language Selector"
          >
            <option value="en" className="bg-[#050505]">🇬🇧 EN</option>
            <option value="de" className="bg-[#050505]">🇩🇪 DE</option>
            <option value="bn" className="bg-[#050505]">🇧🇩 BD</option>
            <option value="es" className="bg-[#050505]">🇪🇸 ES</option>
          </select>

          <button
            onClick={() => handleNavClick('consultation')}
            className="rounded-sm px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-zinc-950 bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer shadow-md"
            id="nav-cta-contact"
          >
            Strategic Session
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded p-2 text-zinc-400 hover:bg-white/5 hover:text-white focus:outline-none"
            aria-expanded="false"
            id="mobile-menu-toggle"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#050505] px-4 pb-6 pt-3 space-y-1 animate-fadeIn" id="mobile-navigation-menu">
          <button
            onClick={() => handleNavClick('resume')}
            className={`block w-full py-3 text-left text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white ${
              currentView === 'resume' ? 'text-orange-400 font-bold bg-white/5 px-3 rounded' : ''
            }`}
          >
            Executive CV & Dossier
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`block w-full py-3 text-left text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white ${
              currentView === 'services' || currentView === 'service-detail' ? 'text-amber-400 font-bold bg-white/5 px-3 rounded' : ''
            }`}
          >
            Systems & ERP Catalog
          </button>
          <button
            onClick={() => handleNavClick('recommend')}
            className={`block w-full py-3 text-left text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white ${
              currentView === 'recommend' ? 'text-orange-400 font-bold bg-white/5 px-3 rounded' : ''
            }`}
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`block w-full py-3 text-left text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white ${
              currentView === 'blog' || currentView === 'blog-post' ? 'text-orange-400 font-bold bg-white/5 px-3 rounded' : ''
            }`}
          >
            Insights & Blog
          </button>
          <button
            onClick={() => handleNavClick('consultation')}
            className={`block w-full py-3 text-left text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white ${
              currentView === 'consultation' ? 'text-orange-400 font-bold bg-white/5 px-3 rounded' : ''
            }`}
          >
            Strategic Advisory Booking
          </button>
          
          <div className="border-t border-white/10 pt-4 mt-3">
            <span className="block px-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Executive Profiles & Direct Invoicing
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded border border-white/5 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:bg-orange-500 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={() => handleNavClick('billing-portal')}
                className="flex items-center justify-center rounded border border-orange-500/20 bg-orange-500/10 py-2.5 text-xs font-bold uppercase tracking-widest text-orange-400 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer text-center w-full"
              >
                Invoicing
              </button>
            </div>

            <div className="mt-3.5 pt-3.5 border-t border-white/5">
              <label htmlFor="mobile-locale" className="block text-xs font-mono font-bold uppercase text-zinc-500 tracking-widest mb-1.5 px-1">
                Language
              </label>
              <select
                id="mobile-locale"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 font-mono text-zinc-300 px-3 py-2.5 rounded-sm focus:outline-none cursor-pointer uppercase tracking-wider text-xs font-bold"
              >
                <option value="en" className="bg-[#050505]">🇬🇧 English (EN)</option>
                <option value="de" className="bg-[#050505]">🇩🇪 Deutsch (DE)</option>
                <option value="bn" className="bg-[#050505]">🇧🇩 বাংলা (BN)</option>
                <option value="es" className="bg-[#050505]">🇪🇸 Español (ES)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
