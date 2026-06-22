import React, { useState, useMemo } from 'react';
import { services } from '../data/services';
import { 
  ArrowLeft, Check, Calendar, Cpu, ShieldCheck, 
  Terminal, Building2, Zap, Hourglass, DollarSign 
} from 'lucide-react';

interface ServiceDetailViewProps {
  serviceId: string;
  onBack: () => void;
  onInitiatePayment: (serviceId: string, billing: 'onetime' | 'weekly') => void;
}

export default function ServiceDetailView({ serviceId, onBack, onInitiatePayment }: ServiceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'business' | 'developer' | 'deliverables'>('business');

  // Locate current service
  const service = useMemo(() => {
    return services.find(s => s.id === serviceId);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center px-4" id="service-not-found">
        <h3 className="font-display text-xl font-bold text-white">Engineering system with ID '{serviceId}' not found.</h3>
        <button onClick={onBack} className="mt-4 inline-flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors uppercase font-bold tracking-widest text-[11px]">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Grid Catalog</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="service-detail-view">
      
      {/* Back button */}
      <div className="mb-10">
        <button
          onClick={onBack}
          className="group inline-flex items-center space-x-2 rounded-sm border border-white/5 bg-white/[0.02] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-orange-500/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform text-orange-500" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Structural Layout split in two sides: Details & Valuation pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: System Specifications Grid */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Identity banner */}
          <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 md:p-8 relative overflow-hidden">
            <span className="absolute -bottom-10 -right-6 font-display text-9xl font-extrabold text-zinc-800/10 pointer-events-none select-none">
              {service.number}
            </span>

            <div className="relative z-10">
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="rounded-sm bg-orange-500/10 border border-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400 font-mono">
                  {service.category}
                </span>
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  Version 4.1 • Base SLA Build
                </span>
              </div>

              <h1 className="font-display text-2xl font-black text-white sm:text-3xl tracking-tight leading-tight flex items-center space-x-3">
                <span className="text-3xl shrink-0 leading-none">{service.icon}</span>
                <span>{service.title}</span>
              </h1>

              <p className="mt-4 text-xs tracking-wider uppercase font-mono text-zinc-350">
                {service.tagline}
              </p>
            </div>
          </div>

          {/* Tab switching buttons */}
          <div className="border-b border-white/10 flex space-x-6">
            <button
              onClick={() => setActiveTab('business')}
              className={`pb-3 text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-2 ${
                activeTab === 'business'
                  ? 'border-orange-500 text-white font-black'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Building2 className="h-3.5 w-3.5 text-orange-500" />
              <span>Business ROI Focus</span>
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`pb-3 text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-2 ${
                activeTab === 'developer'
                  ? 'border-orange-500 text-white font-black'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-orange-500" />
              <span>Technical Architecture</span>
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`pb-3 text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-2 ${
                activeTab === 'deliverables'
                  ? 'border-orange-500 text-white font-black'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
              <span>Deliverables</span>
            </button>
          </div>

          {/* Active Tab Panel rendered with clean structures */}
          <div className="rounded-sm border border-white/5 bg-white/[0.015] p-6 md:p-8">
            {activeTab === 'business' && (
              <div className="space-y-6 animate-fadeIn" id="detail-business-tab">
                <div>
                  <h3 className="font-display text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Commercial Executive Summary</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans">{service.businessOwner.summary}</p>
                </div>
                <div>
                  <h3 className="font-display text-[11px] font-bold text-amber-200 uppercase tracking-widest mb-4 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span>Key Commercial Objectives & ROI</span>
                  </h3>
                  <ul className="space-y-3">
                    {service.businessOwner.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-xs text-zinc-300 leading-relaxed font-sans">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 mr-3 mt-0.5">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'developer' && (
              <div className="space-y-6 animate-fadeIn" id="detail-dev-tab">
                <div>
                  <h3 className="font-display text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">System Specs Summary</h3>
                  <p className="text-zinc-300 text-xs leading-relaxed font-mono bg-white/[0.01] p-4 rounded-sm border border-white/5">{service.developer.summary}</p>
                </div>
                <div>
                  <h3 className="font-display text-[11px] font-bold text-amber-200 uppercase tracking-widest mb-4 flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-orange-500" />
                    <span>Technical Capabilities & Performance Matrices</span>
                  </h3>
                  <ul className="space-y-3">
                    {service.developer.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-xs text-zinc-300 leading-relaxed font-mono">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 mr-3 mt-0.5">
                          <Terminal className="h-3 w-3" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="space-y-6 animate-fadeIn" id="detail-lifecycle-tab">
                <div>
                  <h3 className="font-display text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>Strategic Artifact Deliverables ({service.deliverables.length} Milestones)</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="p-4 rounded-sm border border-white/5 bg-white/[0.01] flex items-start">
                        <span className="font-mono text-xs font-bold text-orange-400 mr-3">
                          [0{i + 1}]
                        </span>
                        <p className="text-zinc-300 text-xs leading-relaxed font-sans">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-center space-x-3 text-orange-400">
                    <Hourglass className="h-4 w-4 shrink-0" />
                    <div>
                      <h4 className="font-display text-[11px] font-bold uppercase tracking-widest">Commitment Delivery Timeline</h4>
                      <p className="text-zinc-300 text-xs mt-0.5 font-sans">{service.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technology stack display */}
          <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6">
            <h3 className="font-display text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Integrated Tech Blueprint • Environment Foundations
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/40 px-3.5 py-1.5 font-mono text-[11px] text-zinc-300 hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Contract & Financial Valuation Panel */}
        <div className="space-y-6">
          <div className="sticky top-24 rounded-sm border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

            <span className="text-[10px] font-bold text-orange-400 font-mono tracking-widest uppercase block mb-4">
              Financial Specifications
            </span>

            {/* Option 1: One-Time setup pricing */}
            <div className="mb-6 pb-6 border-b border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider">One-Time Complete Build</h3>
                <span className="rounded-sm bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-orange-400">
                  Fixed Scale
                </span>
              </div>
              <p className="text-zinc-400 text-xs mb-4 leading-relaxed font-sans">
                Complete system scoping, secure hosting configuration, automated backup pipeline setup, full source code handover.
              </p>
              <div className="flex items-baseline space-x-1.5 mb-5">
                <span className="font-serif italic text-3xl font-normal text-amber-200">${service.pricing.oneTime}</span>
                <span className="font-mono text-[10px] uppercase text-zinc-450 tracking-wider">Fixed setup</span>
              </div>
              <button
                onClick={() => onInitiatePayment(service.id, 'onetime')}
                className="w-full text-center py-3 font-display text-[11px] font-bold uppercase tracking-widest text-zinc-950 bg-white hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-xl cursor-pointer rounded-sm"
                id="cta-onetime"
              >
                <span>Initiate Development</span>
              </button>
            </div>

            {/* Option 2: Weekly Retainer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider">Weekly Dev Retention</h3>
                <span className="rounded-sm bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-orange-400">
                  Continuous SLA
                </span>
              </div>
              <p className="text-zinc-400 text-xs mb-4 leading-relaxed font-sans">
                Dedicated iteration support, security patches, system updates, token usage tuning, response optimization audits.
              </p>
              <div className="flex items-baseline space-x-1.5 mb-5">
                <span className="font-serif italic text-3xl font-normal text-amber-200">${service.pricing.weekly}</span>
                <span className="font-mono text-[10px] uppercase text-zinc-450 tracking-wider">/ Week Retainer</span>
              </div>
              <button
                onClick={() => onInitiatePayment(service.id, 'weekly')}
                className="w-full text-center py-3 font-display text-[11px] font-bold uppercase tracking-widest text-white border border-white/10 hover:border-orange-500/40 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 cursor-pointer rounded-sm"
                id="cta-weekly"
              >
                <span>Subscribe Weekly SLA</span>
              </button>
            </div>

            {/* Legal Handover Assurances */}
            <div className="mt-8 border-t border-white/5 pt-4">
              <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Included Warranties</span>
              <ul className="space-y-1.5 text-[9px] uppercase tracking-wider text-zinc-300">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-orange-500 shrink-0" />
                  <span>Sovereign Code Integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-orange-500 shrink-0" />
                  <span>30-Day Stability Guarantees</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Service-Specific FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="rounded-sm border border-white/5 bg-white/[0.015] p-6 md:p-8">
          <h2 className="font-display text-lg font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What is included in the {service.title} service?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">This service includes {service.deliverables.length} core deliverables: {service.deliverables.join(", ")}. Every deliverable is production-ready and documented.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">How long does it take to deliver?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{service.timeline} The initial engagement focuses on architecture and core delivery, with ongoing weekly support available for optimization, updates, and maintenance.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What is the pricing model?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">One-time project delivery is ${service.pricing.oneTime}. Weekly ongoing support is ${service.pricing.weekly}/week. The one-time fee covers the full initial build. The weekly option is ideal for continuous development, monitoring, and iterative improvements.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What technologies are used?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">Core technologies: {service.techStack.join(", ")}. All are production-grade, well-maintained, and chosen for long-term reliability and scalability.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">Do you offer ongoing support after delivery?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">Yes. Weekly ongoing support is available at ${service.pricing.weekly}/week. This includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">Can I customize the deliverables for my specific needs?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals. The final scope is tailored to your business needs.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What do you need from me to get started?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">Is my data and intellectual property protected?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure — work can be done within your VPC or on-premise environment.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What payment methods do you accept?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted. All payments are processed securely with invoices provided.</p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-amber-200 uppercase tracking-widest mb-2">What if I am not satisfied with the deliverables?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">If a deliverable does not meet the agreed scope, it will be revised at no additional cost. The weekly support plan includes unlimited revisions within scope. Full refunds are available before the first deliverable is shipped.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
