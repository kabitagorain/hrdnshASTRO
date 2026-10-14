import React, { useState, useMemo } from 'react';
import { recommendations, protonSuite } from '../data/services';
import { ProtonTool } from '../types';
import { 
  DollarSign, Check, ExternalLink, Compass, Shield, ShieldCheck, 
  Lock, Key, Mail, Bot, HardDrive, Globe, Server, Terminal, 
  Sparkles, Building2, AlertTriangle, ArrowRight, CheckCircle2, 
  ShieldAlert, Cpu, Layers, RefreshCw
} from 'lucide-react';

interface AuditItem {
  id: string;
  category: string;
  question: string;
  risk: string;
  recommendedToolId: string;
  recommendedToolName: string;
  recommendedUrl: string;
}

const AUDIT_QUESTIONS: AuditItem[] = [
  {
    id: 'ai-leak',
    category: 'AI & IP Protection',
    question: 'Developers or employees query public LLMs (ChatGPT / Claude) with proprietary source code, contracts, or customer data.',
    risk: 'High Risk: Telemetry & prompts are retained and may train future public models, leaking corporate IP.',
    recommendedToolId: 'proton-lumo',
    recommendedToolName: 'Proton Lumo (Zero-Access AI)',
    recommendedUrl: 'https://go.getproton.me/aff_c?offer_id=68&aff_id=20831',
  },
  {
    id: 'email-mining',
    category: 'Corporate Communications',
    question: 'Corporate email is hosted on Google Workspace or Microsoft 365 where contents are indexed and exposed to US CLOUD Act subpoenas.',
    risk: 'Compliance Liability: US extraterritorial jurisdiction allows lawful interception without Swiss/EU notification.',
    recommendedToolId: 'proton-business',
    recommendedToolName: 'Proton for Business (Swiss B2B)',
    recommendedUrl: 'https://go.getproton.me/aff_c?offer_id=50&aff_id=20831',
  },
  {
    id: 'credentials-slack',
    category: 'Identity & Access',
    question: 'Team passwords, production API keys, or database secrets are shared via Slack/WhatsApp or stored in plain browser managers.',
    risk: 'Critical Vector: Compromised browser session tokens or unencrypted messaging logs lead to lateral network takeover.',
    recommendedToolId: 'proton-pass',
    recommendedToolName: 'Proton Pass (Argon2id Vault)',
    recommendedUrl: 'https://go.getproton.me/aff_c?offer_id=38&aff_id=20831',
  },
  {
    id: 'unencrypted-backups',
    category: 'Cloud Storage & Backups',
    question: 'Database snapshots, financial spreadsheets, or client deliverables are synced to unencrypted Dropbox or Google Drive.',
    risk: 'Data Breach Exposure: Server-side encrypted storage is vulnerable to insider threats and provider key leakage.',
    recommendedToolId: 'proton-drive',
    recommendedToolName: 'Proton Drive (Client-Side Encrypted)',
    recommendedUrl: 'https://go.getproton.me/aff_c?offer_id=43&aff_id=20831',
  },
  {
    id: 'insecure-bastion',
    category: 'Network & Bastion Security',
    question: 'Remote engineers SSH into production cloud servers (Vultr, AWS, Contabo) over public IP without multi-hop zero-logs VPN.',
    risk: 'Origin Exposure: Direct admin IP logging invites automated port scans, brute-force SSH attacks, and ISP tracking.',
    recommendedToolId: 'proton-vpn',
    recommendedToolName: 'Proton VPN (Secure Core Bunkers)',
    recommendedUrl: 'https://go.getproton.me/aff_c?offer_id=26&aff_id=20831',
  },
];

export default function RecommendGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProtonTab, setSelectedProtonTab] = useState<string>('all');
  
  // Interactive audit state
  const [auditAnswers, setAuditAnswers] = useState<Record<string, boolean>>({
    'ai-leak': false,
    'email-mining': false,
    'credentials-slack': false,
    'unencrypted-backups': false,
    'insecure-bastion': false,
  });

  const toggleAudit = (id: string) => {
    setAuditAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeAuditCount = useMemo(() => {
    return Object.values(auditAnswers).filter(Boolean).length;
  }, [auditAnswers]);

  const auditRiskLevel = useMemo(() => {
    if (activeAuditCount === 0) return { label: 'Optimal Zero-Trust Baseline', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', desc: 'No immediate enterprise exposure vectors selected.' };
    if (activeAuditCount <= 2) return { label: 'Elevated Exposure Risk', color: 'text-amber-300', border: 'border-amber-500/30', bg: 'bg-amber-500/10', desc: 'Moderate telemetry and credential vulnerabilities detected.' };
    if (activeAuditCount <= 4) return { label: 'High Corporate Liability', color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10', desc: 'Significant risk of source code, executive mail, or secret leakage.' };
    return { label: 'Critical Zero-Trust Failure', color: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-500/10', desc: 'Severe multi-vector enterprise exposure. Immediate Swiss sovereignty migration required.' };
  }, [activeAuditCount]);

  // Categories list
  const categoriesList = useMemo(() => {
    return ['All', ...recommendations.map(c => c.category)];
  }, []);

  // Filtered recommendations list
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'All') return recommendations;
    return recommendations.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  // Active Proton tool for spotlight
  const activeProtonTool = useMemo(() => {
    if (selectedProtonTab === 'all') return null;
    return protonSuite.find(p => p.id === selectedProtonTab) || null;
  }, [selectedProtonTab]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="recommendations-hub">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400 mb-4 border border-orange-500/10 shadow-sm">
          <Compass className="h-5 w-5 text-orange-400" />
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Architectural Tooling & <span className="font-serif italic text-amber-200 font-normal">Recommendations</span>
        </h1>
        <p className="mt-4 font-mono uppercase tracking-wider text-zinc-400 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm">
          A hand-picked selection of Swiss zero-knowledge privacy vaults, cloud servers, edge protection registries, and development engines. 
          Tested and deployed daily by Haradhan Sharma in multi-user enterprise and industrial environments.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PROTON SOVEREIGN SUITE SPOTLIGHT (Interactive Command Center)             */}
      {/* ========================================================================= */}
      <div className="mb-20 rounded-sm border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-zinc-950/40 to-black p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        
        {/* Decorative Swiss Shield Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

        {/* Top Header Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Shield className="h-5 w-5 text-purple-400" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-display text-lg font-bold text-white tracking-wide">
                  The Sovereign Privacy Stack <span className="font-serif italic text-purple-300 font-normal">by Proton</span>
                </h2>
                <span className="rounded-sm bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                  🇨🇭 Swiss Jurisdiction
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                CERN-engineered zero-access encryption anchored outside US & EU surveillance mandates.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-wider">Zero Telemetry • GDPR & HIPAA Ready</span>
          </div>
        </div>

        {/* Tactical Explanation */}
        <div className="my-6 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-4xl">
          <p>
            <strong className="text-white">Why Haradhan Sharma Mandates Proton for Enterprise Clients:</strong> When architecting Sovereign AI, 
            custom ERPs, and confidential manufacturing data pipelines, standard Big-Tech platforms (Google Workspace, Microsoft 365, OpenAI) 
            introduce existential liability. Their US CLOUD Act jurisdiction permits warrantless government data extraction, while their commercial terms 
            allow metadata indexing and LLM retraining. Proton solves this with mathematically proven, client-side zero-access cryptography 
            anchored in Swiss federal privacy law (FADP / Swiss Constitution Art. 13).
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-white/5 no-scrollbar mb-6">
          <button
            onClick={() => setSelectedProtonTab('all')}
            className={`px-3.5 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              selectedProtonTab === 'all'
                ? 'bg-purple-500/20 border border-purple-400/50 text-purple-200 font-bold shadow-md'
                : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>Full Ecosystem Overview</span>
          </button>

          {protonSuite.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedProtonTab(tool.id)}
              className={`px-3.5 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                selectedProtonTab === tool.id
                  ? 'bg-purple-500/20 border border-purple-400/50 text-purple-200 font-bold shadow-md'
                  : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tool.id === 'proton-business' && <Building2 className="h-3.5 w-3.5 text-orange-400" />}
              {tool.id === 'proton-lumo' && <Bot className="h-3.5 w-3.5 text-purple-400" />}
              {tool.id === 'proton-mail' && <Mail className="h-3.5 w-3.5 text-blue-400" />}
              {tool.id === 'proton-vpn' && <Globe className="h-3.5 w-3.5 text-emerald-400" />}
              {tool.id === 'proton-pass' && <Key className="h-3.5 w-3.5 text-amber-400" />}
              {tool.id === 'proton-drive' && <HardDrive className="h-3.5 w-3.5 text-cyan-400" />}
              <span>{tool.shortName}</span>
              {tool.offerType === 'CPA' && (
                <span className="text-[10px] text-orange-300 font-mono ml-1 px-1 bg-orange-500/10 rounded">B2B</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        {selectedProtonTab === 'all' ? (
          /* ALL 6 TOOLS GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {protonSuite.map((tool) => (
              <div 
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-sm border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] p-5 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-sm bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      {tool.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {tool.startingPrice}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                  </h3>

                  <p className="text-xs text-zinc-400 font-mono mt-1 mb-3 line-clamp-2 uppercase tracking-wide">
                    {tool.tagline}
                  </p>

                  <div className="text-[11px] text-zinc-400 font-mono bg-black/40 rounded p-2 mb-4 border border-white/5">
                    <span className="text-zinc-500 block mb-0.5 uppercase tracking-wider">Replaces:</span>
                    <span className="text-zinc-300 font-medium">{tool.replaces}</span>
                  </div>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-3 gap-1 mb-4 text-[10px] font-mono text-center">
                    {tool.metrics.map((m, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 p-1.5 rounded-sm">
                        <span className="block text-zinc-500">{m.label}</span>
                        <span className="text-zinc-300 font-bold truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-sm bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 py-2.5 text-center text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>{tool.ctaText}</span>
                  <ExternalLink className="h-3 w-3 text-purple-300" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* SINGLE TOOL DEEP ARCHITECTURAL TEARDOWN VIEW */
          activeProtonTool && (
            <div className="rounded-sm border border-purple-500/30 bg-black/50 p-6 md:p-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left 2 Cols: Details */}
                <div className="lg:col-span-2 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-purple-500/20 border border-purple-500/40 px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                      {activeProtonTool.badge}
                    </span>
                    <span className="rounded-sm bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest text-zinc-300">
                      {activeProtonTool.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Starting: <strong className="text-amber-200">{activeProtonTool.startingPrice}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {activeProtonTool.name}
                    </h3>
                    <p className="font-mono text-sm text-purple-300 mt-1 uppercase tracking-wider">
                      {activeProtonTool.tagline}
                    </p>
                  </div>

                  <div className="bg-purple-950/20 border border-purple-500/20 rounded-sm p-4 text-xs font-mono text-zinc-300">
                    <span className="text-purple-400 font-bold uppercase tracking-wider block mb-1">
                      Direct Surveillance Alternative:
                    </span>
                    <span>Replaces {activeProtonTool.replaces}</span>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">
                      Architectural Rationale & Zero-Knowledge Spec:
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {activeProtonTool.architecturalNote}
                    </p>
                  </div>

                  {/* Core Tech Badges */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                      Hardened Security Primitives:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProtonTool.coreTech.map((tech, i) => (
                        <span key={i} className="inline-flex items-center space-x-1.5 rounded-sm bg-white/[0.03] border border-white/10 px-2.5 py-1 text-xs font-mono text-zinc-300">
                          <Check className="h-3 w-3 text-purple-400" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Metrics & CTA */}
                <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 space-y-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-3">
                      Sovereignty Metrics
                    </span>
                    <div className="space-y-3">
                      {activeProtonTool.metrics.map((m, i) => (
                        <div key={i} className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-xs">
                          <span className="text-zinc-400">{m.label}</span>
                          <span className="text-white font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={activeProtonTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-sm bg-purple-600 hover:bg-purple-500 text-white py-3.5 text-center font-display text-sm font-bold uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group"
                  >
                    <span>{activeProtonTool.ctaText}</span>
                    <ExternalLink className="h-4 w-4 text-purple-200 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <p className="text-[11px] text-zinc-400 text-center font-mono">
                    Protected by Swiss Federal Data Protection Act (FADP). Instant onboarding via official partner link.
                  </p>
                </div>

              </div>
            </div>
          )
        )}

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE ZERO-TRUST EXPOSURE AUDIT TOOL                                 */}
      {/* ========================================================================= */}
      <div className="mb-20 rounded-sm border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900/50 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <h2 className="font-display text-lg font-bold text-white tracking-wide">
                Interactive Enterprise Zero-Trust Audit
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Select your organization's current operating practices to calculate exposure risk and prescribe sovereign countermeasures.
            </p>
          </div>

          {/* Dynamic Score Badge */}
          <div className={`rounded-sm px-4 py-2.5 border ${auditRiskLevel.border} ${auditRiskLevel.bg} flex items-center space-x-3 shrink-0`}>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Calculated Exposure</span>
              <span className={`font-display text-sm font-bold ${auditRiskLevel.color}`}>
                {auditRiskLevel.label} ({activeAuditCount}/5)
              </span>
            </div>
          </div>
        </div>

        {/* Audit Checklist Items */}
        <div className="mt-6 space-y-3.5">
          {AUDIT_QUESTIONS.map((item) => {
            const isChecked = !!auditAnswers[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleAudit(item.id)}
                className={`rounded-sm border p-4 transition-all cursor-pointer select-none ${
                  isChecked 
                    ? 'border-orange-500/40 bg-orange-500/[0.04]' 
                    : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`mt-0.5 h-5 w-5 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-orange-500 border-orange-500 text-black' : 'border-white/20 bg-black/40'
                  }`}>
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-300">
                        {item.category}
                      </span>
                      {isChecked && (
                        <span className="text-[11px] font-mono text-orange-400 font-bold uppercase">
                          Liability Active
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-xs sm:text-sm font-sans ${isChecked ? 'text-white' : 'text-zinc-400'}`}>
                      {item.question}
                    </p>

                    {isChecked && (
                      <div className="mt-3 pt-3 border-t border-orange-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                        <span className="text-xs text-orange-300/90 font-mono">
                          {item.risk}
                        </span>

                        <a
                          href={item.recommendedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-1.5 rounded-sm bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/50 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest shrink-0 transition-colors"
                        >
                          <span>Deploy {item.recommendedToolName}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Callout Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
          <span>Click any vulnerability above to toggle audit simulation.</span>
          <button
            onClick={() => setAuditAnswers({ 'ai-leak': false, 'email-mining': false, 'credentials-slack': false, 'unencrypted-backups': false, 'insecure-bastion': false })}
            className="text-zinc-400 hover:text-white underline cursor-pointer flex items-center space-x-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Assessment</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STANDARD CATEGORY FILTER BUTTONS & GRID                                  */}
      {/* ========================================================================= */}
      <div className="mb-10 text-center">
        <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider mb-2">
          Full Vetted Infrastructure Index
        </h2>
        <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest">
          Filter by architecture domain or scroll through the comprehensive directory
        </p>
      </div>

      {/* Category Tab List Filters */}
      <div className="flex justify-center overflow-x-auto pb-4 mb-12 border-b border-white/5 gap-2 no-scrollbar">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-sm px-4 py-2 text-[14px] font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-orange-500/10 border border-orange-500/50 text-orange-400 font-extrabold shadow-md'
                : 'border border-white/10 hover:border-zinc-500 bg-white/[0.01] text-zinc-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Category grids */}
      <div className="space-y-16">
        {filteredCategories.map((categoryObj, idx) => (
          <div key={idx} className="space-y-6">
            
            {/* Category title */}
            <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
              <span className="text-2xl">{categoryObj.icon}</span>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">{categoryObj.category}</h3>
            </div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryObj.items.map((item, idy) => (
                <div
                  key={idy}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-orange-500/35 hover:scale-[1.01] duration-355"
                >
                  <div>
                    {/* Badge and Tag */}
                    <div className="flex items-center justify-between mb-4">
                      {item.badge ? (
                        <span className={`rounded-sm px-2.5 py-0.5 text-[14px] font-bold uppercase tracking-widest ${
                          item.badge.includes('Proton') || item.badge.includes('Sovereign') || item.badge.includes('Privacy') || item.badge.includes('B2B')
                            ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                            : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                        }`}>
                          {item.badge}
                        </span>
                      ) : (
                        <span className="h-4.5" />
                      )}
                      
                      <span className="font-mono text-[15px] text-zinc-400 flex items-center space-x-0.5 font-semibold">
                        <DollarSign className="h-3 w-3" />
                        <span>Starting: {item.startingPrice}</span>
                      </span>
                    </div>

                    {/* Name & Tagline */}
                    <h4 className="font-display text-base font-bold text-white tracking-tight flex items-center justify-between group-hover:text-orange-400 transition-colors duration-300">
                      <span>{item.name}</span>
                    </h4>
                    <p className="font-mono text-[14px] text-zinc-400 mt-1 uppercase tracking-widest font-bold pb-3 border-b border-white/[0.04]">
                      {item.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-zinc-300 leading-relaxed font-sans font-normal mb-5 text-sm">
                      {item.description}
                    </p>

                    {/* Checklist Pros */}
                    <div className="space-y-1.5 mb-6">
                      <span className="block font-mono text-[13px] uppercase text-zinc-400 tracking-widest font-bold">Pros / Criteria</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                        {item.pros.map((pro, i) => (
                          <div key={i} className="flex items-center text-[14px] text-zinc-300 font-sans">
                            <Check className="h-3.5 w-3.5 text-orange-400 mr-2 shrink-0" />
                            <span className="truncate">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Affiliate External URL Link Button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-full rounded-sm border border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-orange-500/40 py-3 text-center text-[15px] font-bold uppercase tracking-widest text-zinc-200 hover:text-white transition-all flex items-center justify-center space-x-1.5 duration-300"
                  >
                    <span>{(item as any).ctaText || "Deploy Ecosystem"}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-orange-500" />
                  </a>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
