import React from 'react';
import { profile } from '../data/services';
import { 
  Milestone, Code, Mail, Phone, MapPin, ExternalLink, FileText
} from 'lucide-react';

export default function ResumeHub() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="resume-hub-view">
      
      {/* Bio / Bio Grid Header layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Left Bio text */}
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-block rounded-sm border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 font-mono text-[9px] font-bold text-orange-400 uppercase tracking-widest">
            Curriculum Vitae • Profile Summary
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Meet <span className="font-serif italic text-amber-200 font-normal">{profile.name}</span>
          </h1>
          <p className="font-mono text-xs text-orange-500 uppercase tracking-widest font-bold">
            {profile.title}
          </p>

          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed font-sans">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right side contact specifications / Card */}
        <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 self-start space-y-5">
          <div className="pb-3 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-display font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
              Hiring Coordinates
            </h3>
            <span className="font-mono text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-sm uppercase tracking-widest font-bold">
              Active SLA
            </span>
          </div>

          {/* Avatar Portrait Picture */}
          <div className="flex justify-center py-2">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 opacity-25 blur-sm"></div>
              <img 
                src="/avatar.png" 
                alt="Haradhan Sharma" 
                className="relative h-24 w-24 rounded-full border border-white/10 object-cover shadow-2xl bg-zinc-950"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-zinc-950 bg-green-500" title="Available for Contracts"></div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs font-mono uppercase tracking-widest text-[10px] font-bold">
            <div className="flex items-center space-x-3 text-zinc-400">
              <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
              <span>{profile.location}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-zinc-400">
              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">{profile.email}</a>
            </div>

            <div className="flex items-center space-x-3 text-zinc-400">
              <Phone className="h-4 w-4 text-orange-500 shrink-0" />
              <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">{profile.phone}</a>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-sm bg-white hover:bg-orange-500 py-3 text-center text-xs font-bold uppercase tracking-widest text-zinc-950 hover:text-white shadow-lg transition-colors duration-300"
            >
              <span>Upwork Portfolio</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            
            <a
              href="/Service_Product_Catalog.pdf"
              download="Service_Product_Catalog.pdf"
              className="flex items-center justify-center space-x-2 rounded-sm border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 p-3 text-xs font-bold uppercase tracking-widest text-[#dfdfdf] hover:text-white transition-all"
            >
              <FileText className="h-4 w-4 text-orange-500 shrink-0" />
              <span>Download PDF Catalog</span>
            </a>

            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 rounded-sm border border-orange-500/20 bg-orange-500/[0.03] hover:bg-orange-500/[0.08] hover:border-orange-500 p-3 text-xs font-bold uppercase tracking-widest text-orange-400 hover:text-white transition-all cursor-pointer"
            >
              <FileText className="h-4 w-4 shrink-0 animate-pulse" />
              <span>Export CV to professional PDF</span>
            </button>
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 text-center mt-1 leading-normal">
              Tip: Choose &apos;Save as PDF&apos; in output printer dialog to download
            </p>
          </div>
        </div>

      </div>

      {/* Experience and Skills breakdown split in sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 border-t border-white/5">
        
        {/* Left 2 Cols: Experience Timeline / Background of projects */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Milestone className="h-4.5 w-4.5 text-orange-500" />
            <span>Industrial Experience</span>
          </h2>

          <div className="space-y-8 relative pl-6 border-l border-white/5">
            
            {/* Timeline Item 1 */}
            <div className="relative">
              {/* Dot */}
              <span className="absolute -left-8.5 top-1 h-4 w-4 rounded-full bg-orange-500 border-4 border-[#050505]" />
              <div className="space-y-1.5">
                <span className="font-mono text-xs font-bold text-orange-500">2023 — Present</span>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Sovereign AI Integration Specialist & Freelance Tech Lead</h4>
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">Remote • Worldwide Contracts</p>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans mt-2">
                  Oversee custom full-stack installations and AI enablement. Specialize in deploying private models (Gemma, Llama) with secure vector grounding (RAGpgvector) and complex industrial ERP systems for apparel manufacturers.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              {/* Dot */}
              <span className="absolute -left-8.5 top-1 h-4 w-4 rounded-full bg-orange-500/50 border-4 border-[#050505]" />
              <div className="space-y-1.5">
                <span className="font-mono text-xs font-bold text-zinc-450">2018 — 2023</span>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Principal Full-Stack Engineer & FinTech Developer</h4>
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">Dhaka Sector & Remote Coordinates</p>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans mt-2">
                  Engineered distributed backends using Async Python, Django, Celery and Redis message queues. Designed Algorithmic trading MQL5 bridges and complex WooCommerce rate limits for high-surged e-commerce checkout systems.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              {/* Dot */}
              <span className="absolute -left-8.5 top-1 h-4 w-4 rounded-full bg-orange-500/20 border-4 border-[#050505]" />
              <div className="space-y-1.5">
                <span className="font-mono text-xs font-bold text-zinc-450">2011 — 2018</span>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Backend Lead & System Infrastructure Admin</h4>
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">Regional Enterprise Software Labs</p>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans mt-2">
                  Handled server management, CentOS / Ubuntu VPS hardening, proxy configurations, and relational SQL optimization schemes for inventory control tools.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right 1 Col: Tech Stack Competences categorized */}
        <div className="space-y-8">
          <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Code className="h-4.5 w-4.5 text-orange-500" />
            <span>Skills Inventory</span>
          </h2>

          <div className="space-y-4">
            {profile.techStack.map((stack, idx) => (
              <div key={idx} className="p-4 rounded-sm border border-white/5 bg-white/[0.01]">
                <h4 className="font-display font-bold text-[10px] uppercase text-zinc-400 tracking-widest mb-3">
                  {stack.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-sm bg-[#0a0a0a] border border-white/5 px-2.5 py-1 font-mono text-[9px] text-zinc-400 hover:border-orange-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
