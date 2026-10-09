import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, FileText, Globe, Cookie, ExternalLink } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 min-h-screen font-sans text-zinc-300" id="privacy-policy-container">
      {/* Meta indicator tag */}
      <div className="flex items-center space-x-2 text-[16px] font-mono tracking-widest text-orange-400 uppercase mb-8">
        <Shield className="h-4.5 w-4.5" />
        <span>Privacy Protection / Security & Ad Compliance Protocol</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase">
            Privacy <span className="font-serif italic text-amber-200 font-normal">Policy</span>
          </h1>
          <p className="text-zinc-400 mt-2 font-mono uppercase tracking-wider">
            Effective Date: October 9, 2026 • Version 2.0 (Google AdSense & GDPR Compliant)
          </p>
        </div>
        
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 rounded-sm border border-white/10 bg-white/[0.02] hover:bg-orange-500 hover:text-white px-4 py-2 font-mono tracking-widest text-zinc-200 font-bold transition-all duration-300 cursor-pointer self-start md:self-auto"
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
          <p className="leading-relaxed text-zinc-400">
            This Privacy Policy governs how Haradhan Sharma Executive Advisory (hrdnsh.com) collects, uses, maintains, and discloses information gathered from users. We respect personal and enterprise data privacy and adhere to international standards, including the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Google Publisher Policies.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Eye className="h-4.5 w-4.5 text-orange-400" />
            <span>2. Scoped Elements Collected</span>
          </h2>
          <p className="leading-relaxed text-zinc-400">
            When interacting with this application, we may receive or process information based on your direct inputs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[16px] text-zinc-200 uppercase tracking-widest font-bold mb-2">Lead Information & Contact Forms</h4>
              <p className="text-zinc-400 leading-relaxed">
                If you request custom engineering consultations or submit project briefs, your name, corporate email address, and system specifications are processed solely to communicate project scopes and generate architecture roadmaps.
              </p>
            </div>
            <div className="p-5 rounded-sm border border-white/5 bg-[#0a0a0a]">
              <h4 className="font-mono text-[16px] text-zinc-200 uppercase tracking-widest font-bold mb-2">Diagnostic Telemetry & Analytics</h4>
              <p className="text-zinc-400 leading-relaxed">
                We utilize Google Analytics (gtag.js) to monitor aggregated traffic patterns, popular articles, and technical performance benchmarks to optimize site speed and content relevance.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Google AdSense and Third-Party Cookie Disclosures */}
        <div className="p-6 rounded-sm border border-orange-500/20 bg-orange-950/[0.05] space-y-5">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Cookie className="h-4.5 w-4.5 text-orange-400" />
            <span>3. Third-Party Advertising, Google AdSense & Cookie Disclosures</span>
          </h2>
          <p className="leading-relaxed text-zinc-300">
            To support ongoing research and open-source publication, this website may display advertisements served by Google AdSense and associated third-party advertising partners. In accordance with Google Publisher Policies, please review the following mandatory disclosures:
          </p>

          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <div className="p-4 bg-zinc-950 rounded border border-white/5 space-y-2">
              <h4 className="font-mono text-[15px] uppercase text-orange-300 tracking-wider font-bold">A. Third-Party Vendor Cookies</h4>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites across the Internet.
              </p>
            </div>

            <div className="p-4 bg-zinc-950 rounded border border-white/5 space-y-2">
              <h4 className="font-mono text-[15px] uppercase text-orange-300 tracking-wider font-bold">B. Personalized Advertising (DoubleClick / DART Cookie)</h4>
              <p>
                Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to hrdnsh.com and/or other sites on the Internet. These cookies help ensure that advertisements displayed are relevant to user interests.
              </p>
            </div>

            <div className="p-4 bg-zinc-950 rounded border border-white/5 space-y-3">
              <h4 className="font-mono text-[15px] uppercase text-orange-300 tracking-wider font-bold">C. How Users Can Opt Out of Personalized Advertising</h4>
              <p>
                Users have the right to disable or opt out of personalized advertising at any time through the following resources:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 font-mono text-xs">
                <li>
                  <span>Google Ads Settings: </span>
                  <a 
                    href="https://adssettings.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>adssettings.google.com</span>
                    <ExternalLink className="h-3 w-3 inline ml-1" />
                  </a>
                </li>
                <li>
                  <span>Network Advertising Initiative (NAI) Opt-Out: </span>
                  <a 
                    href="https://optout.networkadvertising.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>networkadvertising.org/choices</span>
                    <ExternalLink className="h-3 w-3 inline ml-1" />
                  </a>
                </li>
                <li>
                  <span>Digital Advertising Alliance (AboutAds): </span>
                  <a 
                    href="https://www.aboutads.info/choices/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>aboutads.info/choices</span>
                    <ExternalLink className="h-3 w-3 inline ml-1" />
                  </a>
                </li>
                <li>
                  <span>European Interactive Digital Advertising Alliance (EDAA - EEA/UK visitors): </span>
                  <a 
                    href="https://www.youronlinechoices.eu/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>youronlinechoices.eu</span>
                    <ExternalLink className="h-3 w-3 inline ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Lock className="h-4.5 w-4.5 text-orange-400" />
            <span>4. No Data Brokering & Client Confidentiality</span>
          </h2>
          <p className="leading-relaxed text-zinc-400">
            For corporate consulting clients, retainers, and proprietary project briefs, we maintain strict non-disclosure safeguards. We never sell, lease, or broker corporate representative communications, custom source code, or private infrastructure diagnostics to third-party data aggregators.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
            <Globe className="h-4.5 w-4.5 text-orange-400" />
            <span>5. International Compliance & Data Subject Rights (GDPR & CCPA)</span>
          </h2>
          <p className="leading-relaxed text-zinc-400">
            Under GDPR, CCPA, and applicable global privacy regulations, visitors have the right to request access to their personal data, rectification, restriction of processing, or complete erasure. To exercise your rights, contact us directly at <span className="text-white font-mono">me@hrdnsh.com</span>. All validated requests are processed within 30 days.
          </p>
        </div>

        {/* Final Out */}
        <div className="pt-8 text-center border-t border-white/5">
          <p className="text-zinc-500 text-[15px] font-mono leading-relaxed">
            Integrity, compliance, and architectural precision in every layer.
          </p>
          <button
            onClick={onBackToHome}
            className="mt-6 inline-flex items-center space-x-2 rounded-sm bg-white hover:bg-orange-500 hover:text-white px-5 py-2.5 font-mono tracking-widest text-zinc-950 font-bold transition-all duration-300 cursor-pointer shadow-xl"
          >
            <span>Close Window & Return</span>
          </button>
        </div>
      </div>
    </div>
  );
}
