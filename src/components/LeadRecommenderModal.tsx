import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, ArrowLeft, Terminal, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services';
import { Service } from '../types';
import DatacenterMap from './DatacenterMap';

interface LeadRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export default function LeadRecommenderModal({ isOpen, onClose, onSelectService }: LeadRecommenderModalProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [scale, setScale] = useState<string | null>(null);
  const [results, setResults] = useState<Service[]>([]);
  const [finderDcId, setFinderDcId] = useState('de-falkenstein');

  const resetState = () => {
    setStep(1);
    setGoal(null);
    setScale(null);
    setResults([]);
  };

  const calculateMatchesDirect = (currentGoal: string | null, currentScale: string | null) => {
    const activeGoal = currentGoal || goal;
    const activeScale = currentScale || scale;
    if (!activeGoal || !activeScale) return;

    let filtered = [...services];

    // Goal matching
    if (activeGoal === 'ai') {
      filtered = filtered.filter(s => s.category === 'AI & Automation');
    } else if (activeGoal === 'backend') {
      filtered = filtered.filter(s => s.category === 'Backend & Infrastructure');
    } else if (activeGoal === 'fullstack') {
      filtered = filtered.filter(s => s.category === 'Full-Stack Web Development');
    } else if (activeGoal === 'erp') {
      filtered = filtered.filter(s => s.category === 'Enterprise & ERP');
    } else if (activeGoal === 'trading') {
      filtered = filtered.filter(s => s.category === 'Financial & Trading');
    } else if (activeGoal === 'ecommerce') {
      filtered = filtered.filter(s => s.category === 'E-Commerce');
    }

    if (filtered.length === 0) {
      // Safe fallback if category didn't match directly
      filtered = services.slice(0, 2);
    }

    if (activeScale === 'mvp') {
      filtered = filtered.sort((a, b) => a.pricing.oneTime - b.pricing.oneTime);
    } else {
      filtered = filtered.sort((a, b) => b.pricing.oneTime - a.pricing.oneTime);
    }

    setResults(filtered);
    setStep(3);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-sm border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl md:p-8"
        id="recommender-card"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -right-32 -top-32 -z-10 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl text-orange-500" />
        <div className="absolute -left-32 -bottom-32 -z-10 h-64 w-64 rounded-full bg-orange-550/5 blur-3xl" />

        {/* Close Button */}
        <button 
          onClick={() => { onClose(); resetState(); }}
          className="absolute right-4 top-4 rounded-sm border border-white/5 bg-white/[0.02] p-2 text-zinc-400 hover:border-orange-500/30 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4 text-orange-500" />
        </button>

        {/* Header indicator */}
        <div className="mb-6 flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
            System Configurator / Step {step} of 3
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
                What is your primary commercial or technical focus?
              </h3>
              <p className="text-zinc-400 text-xs mb-6 font-sans">
                Select your engineering requirement to match with a hardened, production-grade service implementation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="recommender-goals">
                <button
                  onClick={() => { setGoal('ai'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">🧠</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">AI Agents & RAG</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">Deploy cognitive workers & factual knowledge bases.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setGoal('backend'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">⚡</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">Backend Optimization</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">Transition to High-Performance Async & cloud scaling.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setGoal('fullstack'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">🚀</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">Full-Stack Platforms</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">Island Architecture for maximum SEO and interaction times.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setGoal('erp'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">🏭</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">Sovereign ERP & Shop floor</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">Connect warehouse trackers, IoT metrics & core finance.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setGoal('trading'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">📈</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">Trading & FinTech</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">MQL5 automation, vector backtesting, risk controllers.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setGoal('ecommerce'); setStep(2); }}
                  className="flex items-start text-left p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.01] duration-300"
                >
                  <span className="text-xl mr-3">🛡️</span>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-orange-400 transition-colors">Ecommerce Reliability</h5>
                    <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">Layer 7 firewalls, rate limiting & conversion engineering.</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2 text-zinc-400 mb-4 font-mono text-[9px] uppercase tracking-widest font-bold">
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-orange-500" />
                  <span>Back to Goal</span>
                </button>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
                What is your target timeline and deployment budget?
              </h3>
              <p className="text-zinc-400 text-xs mb-6 font-sans">
                Select your engineering tier. All products are delivered with source ownership and robust standard configurations.
              </p>

              <div className="space-y-3.5 font-sans" id="recommender-scale">
                <button
                  onClick={() => { setScale('mvp'); calculateMatchesDirect(goal, 'mvp'); }}
                  className="w-full flex items-start text-left p-5 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.005] duration-300"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-orange-500 text-orange-400 mt-0.5 mr-4 font-mono text-[9px]">
                    <Terminal className="h-3 w-3" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-amber-200 transition-colors">Fast Rollout / Prototyping Tiers</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed border-t border-white/[0.02] pt-1">
                      Projects delivered within 1 - 2 weeks focusing on essential automation workflows, hardened server hosting configurations, or single-tier applications. Best for budgets scaling $399 - $1,490.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => { setScale('enterprise'); calculateMatchesDirect(goal, 'enterprise'); }}
                  className="w-full flex items-start text-left p-5 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/30 hover:bg-orange-500/[0.02] group transition-all cursor-pointer hover:scale-[1.005] duration-300"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-orange-500 text-orange-400 mt-0.5 mr-4 font-mono text-[9px]">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold uppercase text-white tracking-wider text-xs group-hover:text-amber-200 transition-colors">Enterprise Scale / High-Performance Ecosystems</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed border-t border-white/[0.02] pt-1">
                      Custom manufacturing planning MRP suites, comprehensive vector db fine-tuning, dual-renderer modern frameworks, high-throughput microservices, onsite IoT sensor networks, etc. Timeline spans 4 - 10 weeks. Designed for budgets $2,499 - $4,999+.
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && results.length > 0 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400 mb-3 border border-orange-500/15">
                  <CheckCircle2 className="h-6 w-6 text-orange-40 animate-pulse" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                  Matched Engineering System!
                </h3>
                <p className="text-zinc-400 text-[10px] font-mono mt-1 uppercase tracking-wider">
                  Configured custom matching parameters for optimized implementation ROI.
                </p>
              </div>

              {/* Match Card with Glowing Border */}
              <div className="relative overflow-hidden rounded-sm border border-orange-500/20 bg-white/[0.01] p-5 shadow-2xl">
                {/* Number Watermark */}
                <span className="absolute -bottom-6 -right-2 font-display text-7xl font-bold text-zinc-900/15 pointer-events-none select-none">
                  {results[0].number}
                </span>

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="rounded-sm bg-orange-500/10 px-2.5 py-0.5 text-[9px] font-bold text-orange-400 uppercase tracking-widest font-mono border border-orange-500/10">
                    {results[0].category}
                  </span>
                  <span className="font-mono text-[10px] text-orange-500 uppercase tracking-wider font-bold">
                    Est: {results[0].timeline}
                  </span>
                </div>

                <h4 className="font-display text-base font-bold text-white mb-1.5 flex items-center space-x-2 relative z-10">
                  <span className="text-md shrink-0">{results[0].icon}</span>
                  <span>{results[0].title}</span>
                </h4>
                
                <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-4 relative z-10">
                  {results[0].tagline}
                </p>

                {/* Pricing and Deliverables Summary */}
                <div className="border-t border-white/5 pt-3.5 flex items-center justify-between relative z-10">
                  <div>
                    <h6 className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest font-bold">Setup Valuation</h6>
                    <p className="font-serif italic text-xl text-amber-200 mt-0.5">
                      ${results[0].pricing.oneTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <h6 className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest font-bold">Weekly dev SLA</h6>
                    <p className="font-serif italic text-sm text-zinc-300 mt-0.5">
                      ${results[0].pricing.weekly}/wk
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Host Coordinator Selector */}
              <div className="space-y-2">
                <p className="text-zinc-400 font-mono text-[8px] uppercase tracking-widest font-bold">
                  Sovereign SLA Host Node Selector
                </p>
                <DatacenterMap 
                  selectedId={finderDcId} 
                  onSelect={(id) => setFinderDcId(id)} 
                />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { onClose(); onSelectService(results[0].id); }}
                  className="flex-grow rounded-sm bg-white hover:bg-orange-500 text-zinc-950 hover:text-white py-3.5 text-center text-[10px] font-bold uppercase tracking-widest shadow-xl cursor-pointer flex items-center justify-center space-x-1.5 duration-300"
                  id="recommender-cta-view"
                >
                  <span>View System Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5 text-orange-950 shrink-0 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => { resetState(); }}
                  className="rounded-sm border border-white/10 p-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#9c9c9c] hover:text-white transition-colors cursor-pointer"
                >
                  Reset Configurator
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
