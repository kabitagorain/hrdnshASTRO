import React from 'react';
import { ArrowLeft, ShieldCheck, Scale, FileText, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBackToHome: () => void;
}

export default function TermsOfService({ onBackToHome }: TermsOfServiceProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 min-h-screen font-sans text-zinc-300" id="terms-of-service-container">
      {/* Meta indicator tag */}
      <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-orange-400 uppercase mb-8">
        <Scale className="h-4.5 w-4.5" />
        <span>Legal Documentation / System Governance</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase">
            Terms Of <span className="font-serif italic text-amber-200 font-normal">Service</span>
          </h1>
          <p className="text-zinc-400 text-xs mt-2 font-mono uppercase tracking-wider">
            Effective Date: June 15, 2026 • Version 2.1
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
        {/* Intro */}
        <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01]">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-3 flex items-center space-x-2">
            <FileText className="h-4.5 w-4.5 text-orange-400" />
            <span>1. Architecture & Services Framework</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400 space-y-2">
            Welcome to the engineering portal of Haradhan Sharma (acting as and representing sovereign consultancy). By engaging our digital infrastructure, scheduling consulting sessions, or acquiring high-performance template assets, you accept these Terms of Service. If you are entering into this agreement on behalf of a corporate entity, you affirm that you possess full administrative legal authority to bind said entity to these constraints.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle className="h-4.5 w-4.5 text-orange-400" />
            <span>2. Intellect Ownership & Repository Transfers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[10px] text-zinc-200 uppercase tracking-widest font-bold mb-2">Engaged Work-Products</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For custom consulting engagements, full intellectual property and code ownership of private GitHub source repositories are transferred exclusively to the client upon full reconciliation of the corresponding invoice tiers.
              </p>
            </div>
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[10px] text-zinc-200 uppercase tracking-widest font-bold mb-2">Pre-Existing Core Blueprints</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We retain background technology frameworks, common Docker compose configurations, and optimized RAG embedding logic templates, which are licensed to you on an infinite, non-exclusive, sub-licensable global basis.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <ShieldCheck className="h-4.5 w-4.5 text-orange-400" />
            <span>3. SLA Node Hosting & Resource Liability</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            For operational services requiring third-party cloud infrastructure placement (such as Contabo, Hetzner, AWS, Google Cloud Platform, or private VPS host boxes), the client remains singular master of record for cloud bills, license keys, and monthly bandwidth meters. We are not responsible for VPS termination due to payment default, regional firewalls, or hardware degradation.
          </p>
          <div className="p-4 bg-zinc-950 rounded border border-white/[0.03]">
            <p className="text-xs font-mono text-zinc-400 leading-relaxed">
              <span className="text-orange-400 font-bold">WARNING ON USAGE LIMITS:</span> Clients are strictly urged to establish automatic billing thresholds and API rate-limiting layers on model providers (such as Gemini, OpenAI, Anthropic, or Pinecone). We are not legally or financially liable for runaway loop billing patterns triggered by custom prompt overrides.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Scale className="h-4.5 w-4.5 text-orange-400" />
            <span>4. Retainer Cancellation & SLA Expiration</span>
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            Ongoing maintenance contracts or Weekly dev SLA retainers require a 7-day technical notice period for cancellation. Upon cancellation, diagnostic terminal scripts and telemetry health monitors installed within cloud instances will be securely decommissioned, and source branches will be frozen.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4 border-t border-white/5 pt-8">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            5. Dispute Resolution & Sovereign Jurisdictions
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            This system portal is operated internationally, managed via cloud infrastructure. Any contract deviations, claims, or system arbitrations shall be settled directly via collaborative technical review before any statutory escalation.
          </p>
        </div>

        {/* Final Out */}
        <div className="pt-8 text-center">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            Please print this document or archive its link metadata if required to satisfy your legal counsel.
          </p>
          <button
            onClick={onBackToHome}
            className="mt-6 inline-flex items-center space-x-2 rounded-sm bg-white hover:bg-orange-500 hover:text-white px-5 py-2.5 text-xs font-mono tracking-widest text-zinc-950 font-bold transition-all duration-300 cursor-pointer shadow-xl"
          >
            <span>I Accept & Agree to these Terms</span>
          </button>
        </div>
      </div>
    </div>
  );
}
