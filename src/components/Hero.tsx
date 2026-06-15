import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, Cpu } from 'lucide-react';
import { profile } from '../data/services';
import { translations } from '../data/translations';

interface HeroProps {
  onOpenRecommender: () => void;
  onExploreServices: () => void;
  locale?: string;
}

export default function Hero({ onOpenRecommender, onExploreServices, locale = 'en' }: HeroProps) {
  const t = translations[locale] || translations.en;

  return (
    <section className="relative overflow-hidden py-24 md:py-32" id="hero-section">
      {/* Refined Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-80 pointer-events-none" />

      {/* Elegant Ambient Glows - Warm Amber & Sophisticated Orange */}
      <div className="absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-[110px] animate-pulse" />
      <div className="absolute bottom-10 right-10 -z-10 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Sleek Minimalist Feature Chip */}
        <div className="inline-flex items-center space-x-2 rounded-sm border border-orange-500/20 bg-orange-950/10 px-4 py-1.5 text-xs text-orange-400 backdrop-blur-md mb-8 animate-fadeIn">
          <Cpu className="h-3.5 w-3.5 text-orange-400 animate-spin" />
          <span className="font-mono uppercase tracking-widest text-[9px] font-bold">
            {t.heroBadge}
          </span>
        </div>

        {/* Sophisticated Display Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-none text-balance">
          {t.heroHeadingPart1}{' '}
          <span className="font-serif italic text-amber-200 font-normal block sm:inline">
            {t.heroHeadingPart2}
          </span>{' '}
          {t.heroHeadingPart3}
        </h1>

        {/* Cinematic Tagline */}
        <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.heroTagline}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRecommender}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-white text-zinc-950 uppercase tracking-widest font-bold text-xs hover:bg-orange-500 hover:text-white hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-orange-500/10 cursor-pointer flex items-center justify-center space-x-2"
            id="hero-cta-recommender"
          >
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>{t.recommenderCta}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-white/10 hover:border-white/30 bg-white/5 text-zinc-400 hover:text-white uppercase tracking-widest font-bold text-xs transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
          >
            <Terminal className="h-4 w-4 text-orange-500" />
            <span>System Architecture Catalog</span>
          </button>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 border-y border-white/5 bg-white/[0.01] py-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
            {profile.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif italic text-3xl font-normal text-amber-200">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
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
