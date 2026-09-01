import React from 'react';
import { profile } from '../data/services';
import { 
  Milestone, Code, Mail, Phone, MapPin, ExternalLink, FileText, 
  Award, ShieldCheck, Factory, Building2, Cpu, GraduationCap, CheckCircle2,
  Linkedin, Github, Printer
} from 'lucide-react';

export default function ResumeHub() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="resume-hub-view">
      
      {/* Executive Bio & Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Left Bio & Executive Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 font-mono text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Executive Curriculum Vitae • Leadership Dossier</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {profile.name}{' '}
            <span className="text-amber-400 font-bold block sm:inline text-2xl sm:text-3xl lg:text-4xl">
              — Executive Leader & Chief Architect
            </span>
          </h1>

          <div className="flex flex-wrap gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
            <span className="bg-zinc-900 border border-zinc-700/80 px-2.5 py-1 rounded text-amber-400">20+ Yrs Industrial Operations</span>
            <span className="bg-zinc-900 border border-zinc-700/80 px-2.5 py-1 rounded text-amber-300">10 Yrs PPC Head (Fakir Knitwears)</span>
            <span className="bg-zinc-900 border border-zinc-700/80 px-2.5 py-1 rounded text-zinc-300">CEO (63 Districts Scale)</span>
            <span className="bg-zinc-900 border border-zinc-700/80 px-2.5 py-1 rounded text-amber-400">Sovereign AI & ERP Architect</span>
          </div>

          {/* Executive Summary Box */}
          <div className="exec-card p-5 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center space-x-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Executive Brief</span>
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans font-normal">
              {profile.executiveSummary}
            </p>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed font-sans font-normal">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right side contact specifications / Executive Hiring Card */}
        <div className="exec-card p-6 self-start space-y-6 shadow-2xl">
          <div className="pb-4 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-display font-bold text-xs text-zinc-300 uppercase tracking-wider">
              Executive Coordinates
            </h3>
            <span className="font-mono text-[11px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
              Available for Leadership Roles
            </span>
          </div>

          {/* Portrait Picture */}
          <div className="flex justify-center py-2">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-amber-600/10 blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/my-pic/h1.JPG" 
                alt="Haradhan Sharma" 
                className="relative h-32 w-32 rounded-2xl border-2 border-amber-500/40 object-cover object-top shadow-2xl bg-zinc-950"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-950 bg-emerald-500 text-[10px] text-zinc-950 font-bold" title="Open to General Management, VP, and Chief Architect roles">
                ✓
              </div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs uppercase tracking-wider font-medium">
            <div className="flex items-center space-x-3 text-zinc-300">
              <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-zinc-300">
              <Mail className="h-4 w-4 text-amber-400 shrink-0" />
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors lowercase font-sans text-sm font-semibold">{profile.email}</a>
            </div>

            <div className="flex items-center space-x-3 text-zinc-300">
              <Phone className="h-4 w-4 text-amber-400 shrink-0" />
              <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors font-mono">{profile.phone}</a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
              <span>Upwork</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5 text-zinc-300" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 rounded bg-amber-500 hover:bg-amber-600 p-3 text-xs font-display font-bold uppercase tracking-wider text-zinc-950 shadow-md transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4 shrink-0 text-zinc-950" />
              <span>Print / Save Executive CV (PDF)</span>
            </button>

            <a
              href="/Service_Product_Catalog.pdf"
              download="Service_Product_Catalog.pdf"
              className="flex items-center justify-center space-x-2 rounded border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 p-3 text-xs font-display font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all"
            >
              <FileText className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Download System Architecture Catalog</span>
            </a>
          </div>
        </div>

      </div>

      {/* Core Executive Competencies Overview */}
      <div className="mb-16 pt-12 border-t border-zinc-800">
        <div className="flex items-center space-x-2 mb-8">
          <Award className="h-5 w-5 text-amber-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Core Competencies & Executive Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.executiveCompetencies?.map((comp, idx) => (
            <div key={idx} className="exec-card p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xs uppercase text-amber-400 tracking-wider mb-4 border-b border-zinc-800 pb-2">
                  {comp.category}
                </h3>
                <ul className="space-y-2">
                  {comp.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-zinc-300 font-sans">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Career Chronology & Technical Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-zinc-800">
        
        {/* Left 2 Cols: Complete Professional Career Chronology */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center space-x-2">
            <Milestone className="h-5 w-5 text-amber-400" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Executive Career History & Industrial Leadership
            </h2>
          </div>

          <div className="space-y-10 relative pl-8 border-l border-zinc-800">
            {profile.careerTimeline?.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <span className={`absolute -left-[39px] top-1.5 h-5 w-5 rounded-full border-4 border-[#09090b] transition-all ${
                  idx === 0 ? 'bg-amber-500 ring-4 ring-amber-500/20' : 
                  idx === 1 ? 'bg-amber-500' :
                  idx === 2 ? 'bg-amber-400' : 'bg-zinc-600'
                }`} />

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{item.location}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {item.role}
                  </h3>

                  <div className="font-sans text-sm font-semibold text-amber-300">
                    {item.organization}
                  </div>

                  {item.highlight && (
                    <div className="inline-block text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                      ★ {item.highlight}
                    </div>
                  )}

                  <p className="text-zinc-300 text-sm leading-relaxed font-sans pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Education & Credentials */}
          <div className="pt-10 border-t border-zinc-800 space-y-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-amber-400" />
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Education & Technical Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.education?.map((edu, idx) => (
                <div key={idx} className="exec-card p-4 space-y-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-mono text-amber-400">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Deep Technical Inventory */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-amber-400" />
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Technical Inventory
            </h2>
          </div>

          <div className="space-y-4">
            {profile.techStack.map((stack, idx) => (
              <div key={idx} className="exec-card p-4">
                <h3 className="font-display font-bold text-xs uppercase text-zinc-300 tracking-wider mb-3">
                  {stack.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded bg-black/60 border border-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-300 hover:border-amber-500/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Executive Availability Callout */}
          <div className="exec-card-accent p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Executive Representation</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Available for top-tier and senior management engagements worldwide — C-Level, General Manager (GM), Additional / Deputy General Manager (AGM / DGM), VP of Operations, Head of Production Planning &amp; Coordination (PPC), and Chief Enterprise Architect roles. Also open to senior coordinator &amp; planning department leadership positions across garments, textiles, and manufacturing. Authorized for direct advisory agreements or via corporate contracts.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${profile.email}?subject=Executive%20Leadership%20Inquiry%20-%20Haradhan%20Sharma`}
                className="block text-center rounded bg-amber-500 hover:bg-amber-600 text-zinc-950 font-display font-bold uppercase tracking-wider text-xs py-2.5 transition-colors"
              >
                Initiate Executive Discussion
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
