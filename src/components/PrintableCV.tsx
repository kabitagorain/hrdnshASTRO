import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { profile } from '../data/services';

/**
 * PrintableCV — a dedicated, corporate-grade CV document rendered ONLY on print.
 *
 * Portalled as a DIRECT CHILD of <body> (outside #master-app-root) so the
 * global @media print stylesheet in index.css can hide the entire web app
 * while showing this document. Pressing "Print / Save Executive CV (PDF)"
 * produces a clean, traditional executive résumé instead of a screenshot
 * of the dark website.
 *
 * Client-only (portal mounts after hydration); the SSR HTML renders null,
 * which is fine — this document is exclusively for window.print().
 *
 * SEO note: uses divs (not h1) to avoid duplicate-heading / hidden-text signals.
 */
export default function PrintableCV() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div id="printable-cv" className="hidden" aria-hidden="true">

      {/* ===== Letterhead ===== */}
      <div className="cv-section cv-header">
        <div className="cv-name">{profile.name}</div>
        <div className="cv-title">{profile.title}</div>
        <div className="cv-contact">
          <span>{profile.location.split('•')[0].trim()}</span>
          <span className="cv-sep">|</span>
          <span>{profile.email}</span>
          <span className="cv-sep">|</span>
          <span>{profile.phone}</span>
          <span className="cv-sep">|</span>
          <span>hrdnsh.com</span>
          <span className="cv-sep">|</span>
          <span>linkedin.com/in/haradhansharma</span>
        </div>
        <div className="cv-subtitle">{profile.subTitle}</div>
      </div>

      {/* ===== Executive Summary ===== */}
      <div className="cv-section">
        <div className="cv-heading">Executive Summary</div>
        <p className="cv-body">{profile.executiveSummary}</p>
        <p className="cv-body">
          A rare dual-profile executive: ten years as Head of Production Planning &amp; Coordination (PPC) for a
          premier composite knit garments exporter, followed by C-level brand leadership across 63 districts, and
          enterprise systems architecture (Sovereign AI, Custom ERP, high-concurrency Python backends). Bridges the
          factory floor, the boardroom, and the codebase.
        </p>
      </div>

      {/* ===== Core Competencies ===== */}
      <div className="cv-section">
        <div className="cv-heading">Core Competencies</div>
        <div className="cv-cols-2">
          {profile.executiveCompetencies?.map((comp, idx) => (
            <div key={idx} className="cv-comp">
              <div className="cv-comp-cat">{comp.category}</div>
              <ul className="cv-list">
                {comp.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Professional Experience ===== */}
      <div className="cv-section">
        <div className="cv-heading">Professional Experience</div>
        <div className="cv-items">
          {profile.careerTimeline?.map((item, idx) => (
            <div key={idx} className="cv-item">
              <div className="cv-item-row">
                <div className="cv-item-role">{item.role}</div>
                <div className="cv-item-period">{item.period}</div>
              </div>
              <div className="cv-item-row">
                <div className="cv-item-org">{item.organization} — {item.location}</div>
              </div>
              <p className="cv-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Education & Credentials ===== */}
      <div className="cv-section">
        <div className="cv-heading">Education &amp; Technical Credentials</div>
        <div className="cv-items">
          {profile.education?.map((edu, idx) => (
            <div key={idx} className="cv-item cv-item-tight">
              <div className="cv-item-row">
                <div className="cv-item-role">{edu.degree}</div>
              </div>
              <div className="cv-item-org">{edu.institution}</div>
              <p className="cv-body">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Technical Expertise ===== */}
      <div className="cv-section">
        <div className="cv-heading">Technical Expertise</div>
        {profile.techStack.map((stack, idx) => (
          <div key={idx} className="cv-tech-row">
            <span className="cv-tech-cat">{stack.category}:</span>{' '}
            <span className="cv-tech-items">{stack.items.join(' • ')}</span>
          </div>
        ))}
      </div>

      {/* ===== Availability / Footer ===== */}
      <div className="cv-section cv-footer">
        <div className="cv-heading">Executive Availability</div>
        <p className="cv-body">
          Available for C-Level, General Manager (GM), Deputy/Additional General Manager (DGM/AGM), VP of Operations,
          Head of Production Planning &amp; Coordination (PPC), and Chief Enterprise Architect engagements — onsite in
          Bangladesh or worldwide as a fractional/interim executive. Open to direct advisory agreements and corporate
          contracts. References available upon request.
        </p>
        <div className="cv-contact cv-contact-footer">
          <span>{profile.url}</span>
          <span className="cv-sep">|</span>
          <span>{profile.email}</span>
          <span className="cv-sep">|</span>
          <span>{profile.phone}</span>
        </div>
      </div>

    </div>,
    document.body
  );
}
