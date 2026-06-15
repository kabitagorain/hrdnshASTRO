import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, FileText, Globe } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 min-h-screen font-sans text-zinc-300" id="privacy-policy-container">
      {/* Meta indicator tag */}
      <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-orange-400 uppercase mb-8">
        <Shield className="h-4.5 w-4.5" />
        <span>Privacy Protection / Security Protocol</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase">
            Privacy <span className="font-serif italic text-amber-200 font-normal">Policy</span>
          </h1>
          <p className="text-zinc-400 text-xs mt-2 font-mono uppercase tracking-wider">
            Effective Date: June 15, 2026 • Version 1.9
          </p>
        </div>
        
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 rounded-sm border border-white/10 bg-white/[0.02] hover:bg-orange-500 hover:text-white px-4 py-2 text-xs font-mono tracking-widest text-zinc-200 font-bold transition-all duration-300 cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Exit Document</span>
        </button>
      </div>

      <div className="space-y-12">
        {/* Intro Overview */}
        <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01]">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-3 flex items-center space-x-2">
            <FileText className="h-4.5 w-4.5 text-orange-400" />
            <span>1. Sovereignty, Transparency & Data Scopes</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            This Policy states how Haradhan Sharma collects, protects, routes, and processes transactional and telemetry business metadata gathered during your digital inspection of this engineering portfolio. Unlike high-friction commercial websites run by marketing agencies, our data strategy is geared to prioritize absolute developer privacy, transparency, and sovereign code localizations.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Eye className="h-4.5 w-4.5 text-orange-400" />
            <span>2. Scoped Elements Collected</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            When interacting with this application, we may receive or process information based on your direct inputs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[10px] text-zinc-200 uppercase tracking-widest font-bold mb-2">Lead Information & Contact Forms</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If you request custom development, configure models, or submit project briefings, we record your email address and system specifications locally to generate matching roadmaps.
              </p>
            </div>
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[10px] text-zinc-200 uppercase tracking-widest font-bold mb-2">OAuth Integrations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If OAuth integrations are activated for secure calendar synchronization, we read token schedules strictly in real-time to book event intervals. We never download or monetize private inbox structures.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Lock className="h-4.5 w-4.5 text-orange-400" />
            <span>3. Zero-Monetization & Secure Host Blueprints</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            We operate under a strict, traditional technology retainer structure. We never sell, exchange, rent, or lease corporate representative contact metadata, email details, scheduled calendar slots, or proprietary system goals to list brokers or third-party ad frameworks.
          </p>
          <div className="p-4 bg-zinc-950 rounded border border-white/[0.03] space-y-2">
            <h4 className="font-mono text-[8px] uppercase text-orange-400 tracking-widest font-bold">Encrypted Memory Buffers</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Diagnostic details stored within localStorage (such as matched RAG estimates, recent quote IDs, or active host configurations) remain encapsulated inside your sandboxed browser container and can be wiped instantly by purging cookie storage.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Globe className="h-4.5 w-4.5 text-orange-400" />
            <span>4. Diagnostic SRE Logging</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            If you connect to high-risk payment checkout gates on behalf of a business entity, transaction traces are logged strictly to comply with standard anti-money laundering thresholds and to guarantee payment-verification SLAs. No payment card variables are ever processed on, or transmitted via, our server-side memory nodes.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4 border-t border-white/5 pt-8">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            5. User Rights Under International Code Regulations
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            If you wish to purge your lead profiles from our Google Sheets synchronization cache, or revoke diagnostic access, simply relay an email specifying "PURGE METADATA" to Haradhan Sharma, and our background batch-nodes will destroy associated rows under 24 hours.
          </p>
        </div>

        {/* Final Out */}
        <div className="pt-8 text-center">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            Your trust is our paramount performance metric. Backends scale; trust persists.
          </p>
          <button
            onClick={onBackToHome}
            className="mt-6 inline-flex items-center space-x-2 rounded-sm bg-white hover:bg-orange-500 hover:text-white px-5 py-2.5 text-xs font-mono tracking-widest text-zinc-950 font-bold transition-all duration-300 cursor-pointer shadow-xl"
          >
            <span>Close Window & Return</span>
          </button>
        </div>
      </div>
    </div>
  );
}
