import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { services, profile, siteData } from '../src/data/services';

// Theme Colors (Elegant Light Editorial Theme)
const COLOR_BG = '#F9FAFB';           // Soft marble/slate-50 background for clean, high-end feel
const COLOR_CARD_BG = '#FFFFFF';      // Pure crisp white for card modules
const COLOR_AMBER = '#92400E';        // Noble amber-800 for warm branding items and accents
const COLOR_ORANGE = '#C2410C';       // Deep coral-700 / ochre for main badges
const COLOR_TEXT_PRIMARY = '#111827'; // Dark charcoal (slate-900) for supreme legibility
const COLOR_TEXT_MUTED = '#4B5563';   // Slate-600 for elegant secondary copy
const COLOR_BORDER = '#E5E7EB';       // Fine slate-200 lines to organize structure

export function generateCatalog() {
  console.log('Starting Service & Product Catalog PDF Generator...');

  const outputPath = path.resolve('./public/Service_Product_Catalog.pdf');
  const tempDir = path.dirname(outputPath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Create standard A4 document (A4: 595.28 x 841.89 points)
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 20, left: 40, right: 40 },
    autoFirstPage: false
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Helper function to draw full-bleed page background
  const drawPageBackground = (d: typeof doc) => {
    d.rect(0, 0, d.page.width, d.page.height).fill(COLOR_BG);
  };

  // Helper to draw clean running header/footer
  const drawHeaderFooter = (d: typeof doc, pageNum: number, totalPages: number, serviceName?: string) => {
    d.save();
    
    // Running Header
    d.fillColor(COLOR_TEXT_MUTED);
    d.font('Helvetica-Bold').fontSize(7).text('HARADHAN SHARMA', 40, 25);
    d.font('Helvetica').fontSize(7);
    if (serviceName) {
      d.text(`//  ${serviceName.toUpperCase()}`, 155, 25);
    }
    d.font('Helvetica-Bold').fontSize(7).text('SOVEREIGN SYSTEMS PORTFOLIO', 40, 25, { align: 'right', width: 515.28 });
    
    // Header Line
    d.strokeColor(COLOR_BORDER).lineWidth(0.5).moveTo(40, 35).lineTo(555.28, 35).stroke();

    // Running Footer
    d.strokeColor(COLOR_BORDER).lineWidth(0.5).moveTo(40, 805).lineTo(555.28, 805).stroke();
    d.fillColor(COLOR_TEXT_MUTED);
    d.font('Helvetica-Bold').fontSize(6.5).text('EMAIL: me@hrdnsh.com  //  LINK: https://hrdnsh.com  //  SLA: +8801712270815', 40, 812, { lineBreak: false });
    d.font('Helvetica').fontSize(6.5).text(`Page ${pageNum} of ${totalPages}`, 40, 812, { align: 'right', width: 515.28, lineBreak: false });

    d.restore();
  };

  // Total pages calculation: 1 cover + 1 index + 14 services = 16 pages
  const totalPages = 16;
  let pageCounter = 1;

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  doc.addPage();
  drawPageBackground(doc);

  // Decorative vector background accents
  doc.save();
  doc.strokeColor(COLOR_ORANGE).lineWidth(1.5).moveTo(40, 40).lineTo(120, 40).stroke();
  doc.strokeColor(COLOR_ORANGE).lineWidth(1.5).moveTo(40, 40).lineTo(40, 120).stroke();
  doc.strokeColor(COLOR_AMBER).lineWidth(1.5).moveTo(555.28, 801.89).lineTo(475.28, 801.89).stroke();
  doc.strokeColor(COLOR_AMBER).lineWidth(1.5).moveTo(555.28, 801.89).lineTo(555.28, 721.89).stroke();
  doc.restore();

  // Mini metadata box
  doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(8.5).text('SECURE RESOURCE RECORD // VERSION 2.5', 40, 80);
  doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(8.5).text('STATUS: SOVEREIGN PRODUCTION-READY', 40, 93);

  // Large Branding Name
  doc.font('Helvetica-Bold').fontSize(30).fillColor(COLOR_TEXT_PRIMARY).text('HARADHAN SHARMA', 40, 155, { characterSpacing: 2 });
  
  // Separator line
  doc.strokeColor(COLOR_ORANGE).lineWidth(2).moveTo(40, 202).lineTo(280, 202).stroke();

  // Premium Title
  doc.fillColor(COLOR_AMBER).font('Times-BoldItalic').fontSize(16).text("Sovereign Systems Architect & AI Engineer", 40, 216);
  
  // Tagline/Sub-bracket
  doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(10.5).text(
    'Production-grade automation agents, high-efficiency retrieval pipelines, private database clustering, and low-latency digital infrastructures optimized for enterprise growth.',
    40, 260, { width: 480, lineGap: 4.5 }
  );

  // Box grid showing corporate metrics / stats
  const statBoxY = 380;
  const statWidth = 120;
  
  const drawStatBox = (x: number, value: string, label: string) => {
    doc.save();
    doc.rect(x, statBoxY, statWidth, 75).fill(COLOR_CARD_BG);
    doc.rect(x, statBoxY, statWidth, 75).strokeColor(COLOR_BORDER).lineWidth(1).stroke();
    // Accent left-stripe
    doc.rect(x, statBoxY, 3, 75).fill(COLOR_ORANGE);
    
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(16).text(value, x + 15, statBoxY + 18);
    doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(7.5).text(label.toUpperCase(), x + 15, statBoxY + 42, { width: 95, lineGap: 2 });
    doc.restore();
  };

  drawStatBox(40, '150+', 'Projects successfully built & shipped');
  drawStatBox(170, '15+', 'Years combined tech proficiency');
  drawStatBox(300, '100%', 'Ultimate client feedback rating');
  drawStatBox(430, '< 2 HRS', 'Typical emergency response index');

  // Bottom profile card
  const profileCardY = 490;
  doc.save();
  doc.rect(40, profileCardY, 515.28, 140).fill(COLOR_CARD_BG);
  doc.rect(40, profileCardY, 515.28, 140).strokeColor(COLOR_BORDER).lineWidth(1).stroke();
  doc.rect(40, profileCardY, 515.28, 3).fill(COLOR_AMBER); // Top accent ribbon

  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(10).text('ENGINEERING ARCHITECTURE MANIFESTO', 55, profileCardY + 20);
  doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(8.5).text(
    'My philosophy centers on absolute architectural honesty, custom containerized isolation, clear service-level redundancy, and complete asset transparency. This document lists the exact 14 operational system layers currently engineered for sovereign deployment on virtual servers, commercial clouds, and private on-premise hardware cluster beds.',
    55, profileCardY + 40, { width: 485, lineGap: 4.5 }
  );
  doc.restore();

  // Cover footer contact info
  const footerY = 710;
  doc.strokeColor(COLOR_BORDER).lineWidth(1).moveTo(40, footerY - 15).lineTo(555.28, footerY - 15).stroke();
  
  doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(8.5).text('HTTPS://HRDNSH.COM', 40, footerY);
  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(8.5).text('Official Enterprise Hub', 40, footerY + 14);

  doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(8.5).text('ME@HRDNSH.COM', 220, footerY);
  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(8.5).text('Direct Business Inquiries', 220, footerY + 14);

  doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(8.5).text('+8801712270815', 400, footerY);
  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(8.5).text('Direct Secure Hot-line', 400, footerY + 14);


  // ==========================================
  // PAGE 2: TABLE OF CONTENTS / CAPABILITY DIRECTORY
  // ==========================================
  pageCounter++;
  doc.addPage();
  drawPageBackground(doc);
  drawHeaderFooter(doc, pageCounter, totalPages, 'DIRECTORY INDEX');

  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(18).text('CATALOG DIRECTORY OF SERVICE MODULES', 40, 60);
  doc.fillColor(COLOR_AMBER).font('Times-BoldItalic').fontSize(11).text('Fourteen discrete operational models engineered for sovereign business intelligence & database scaling.', 40, 84);

  // Let's list the 14 services in a beautiful double-column layout
  const col1X = 40;
  const col2X = 300;
  const colWidth = 240;
  let currentY = 120;

  // Helper to draw micro-directory line item
  const drawIndexItem = (x: number, y: number, s: typeof services[0], index: number) => {
    doc.save();
    // Category line
    doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(8).text(`[${s.number}]`, x, y);
    // Title
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(9.5).text(s.title, x + 25, y, { width: colWidth - 25, lineGap: 2 });
    
    // Draw Category & Sub-Pricing below
    const textHeight = doc.heightOfString(s.title, { width: colWidth - 25, lineGap: 2 });
    doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica-Oblique').fontSize(7.5).text(`${s.category}  //  Setup: $${s.pricing.oneTime}`, x + 25, y + textHeight + 2);
    
    doc.restore();
    return textHeight + 18; // return estimated y offset
  };

  // Split the 14 services between Columns 1 and 2
  let yCol1 = 120;
  let yCol2 = 120;

  services.forEach((s, i) => {
    if (i < 7) {
      const increment = drawIndexItem(col1X, yCol1, s, i + 1);
      yCol1 += increment + 8;
    } else {
      const increment = drawIndexItem(col2X, yCol2, s, i + 1);
      yCol2 += increment + 8;
    }
  });

  // Highlight message box at the bottom of Index
  const boxY = Math.max(yCol1, yCol2) + 20;
  doc.save();
  doc.rect(40, boxY, 515.28, 70).fill(COLOR_CARD_BG);
  doc.rect(40, boxY, 515.28, 70).strokeColor(COLOR_BORDER).lineWidth(1).stroke();
  doc.rect(40, boxY, 3, 70).fill(COLOR_ORANGE);

  doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8.5).text('HOW TO COMMISSION SYSTEMS:', 55, boxY + 15);
  doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(8).text(
    'Every system described in this catalog represents a battle-tested architecture. Setup pricing covers configuration, standard server hardening, complete repository delivery, and testing. Ongoing SLA weekly maintenance guarantees 100% uptime, zero-downtime backups, security auditing, and continuous optimizations.',
    55, boxY + 28, { width: 485, lineGap: 4 }
  );
  doc.restore();


  // ==========================================
  // PAGES 3 - 16: INDIVIDUAL SERVICE SHEETS
  // ==========================================
  services.forEach((s, idx) => {
    pageCounter++;
    doc.addPage();
    drawPageBackground(doc);
    drawHeaderFooter(doc, pageCounter, totalPages, s.category);

    // 1. Service Meta & Price Badge
    doc.save();
    // Draw Category Box
    doc.rect(40, 52, 230, 22).fill(COLOR_CARD_BG);
    doc.rect(40, 52, 230, 22).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    doc.rect(40, 52, 2, 22).fill(COLOR_ORANGE);
    
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Courier-Bold').fontSize(7.5).text(
      `DIVISION: ${s.category.toUpperCase()}  //  MODULE ${s.number}`, 55, 60
    );

    // Draw Price Badge on Top-Right
    doc.rect(345, 52, 210.28, 22).fill(COLOR_CARD_BG);
    doc.rect(345, 52, 210.28, 22).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    doc.rect(345, 52, 2, 22).fill(COLOR_AMBER);
    
    const pricingStr = `SETUP: $${s.pricing.oneTime}  |  MAINT: $${s.pricing.weekly}/WK`;
    doc.fillColor(COLOR_AMBER).font('Courier-Bold').fontSize(7.5).text(
      pricingStr, 357, 60
    );
    doc.restore();

    // 2. Main Title and Tagline
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(14).text(
      s.title.toUpperCase(), 40, 88, { width: 515.28, height: 35, ellipsis: true, lineGap: 2 }
    );
    
    doc.fillColor(COLOR_AMBER).font('Times-BoldItalic').fontSize(10).text(
      `"${s.tagline}"`, 40, 126, { width: 515.28, height: 16, ellipsis: true }
    );

    // Decorative separator
    doc.strokeColor(COLOR_BORDER).lineWidth(0.5).moveTo(40, 146).lineTo(555.28, 146).stroke();

    // 3. Two columns section: Business vs Developer SPECIFICATIONS
    const specColY = 158;
    const specHeight = 255;
    const specColWidth = 246;

    // LEFT Column: Business Owner Profile
    doc.save();
    doc.rect(40, specColY, specColWidth, specHeight).fill(COLOR_CARD_BG);
    doc.rect(40, specColY, specColWidth, specHeight).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    doc.rect(40, specColY, specColWidth, 3).fill(COLOR_ORANGE); // orange accent line

    // Header Left
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8.5).text('BUSINESS OWNER ANALYSIS', 52, specColY + 14);
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(7).text('SYSTEM OUTCOMES & COMMERCIAL BENEFITS', 52, specColY + 25);
    
    // Summary
    doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(8).text(
      s.businessOwner.summary, 52, specColY + 40, { width: specColWidth - 24, height: 68, ellipsis: true, lineGap: 3.5 }
    );

    // Business Benefits Bullet list (limit to first 4 for spacing)
    const bOwnerBulletYStart = specColY + 115;
    s.businessOwner.benefits.slice(0, 4).forEach((benefit, bIdx) => {
      const bY = bOwnerBulletYStart + (bIdx * 32);
      doc.save();
      doc.fillColor(COLOR_ORANGE).rect(52, bY + 2.5, 3.5, 3.5).fill();
      doc.restore();
      doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(7.5).text(
        benefit, 64, bY, { width: specColWidth - 34, height: 26, ellipsis: true, lineGap: 2.5 }
      );
    });
    doc.restore();

    // RIGHT Column: Developer Spec Profile
    doc.save();
    doc.rect(309, specColY, specColWidth, specHeight).fill(COLOR_CARD_BG);
    doc.rect(309, specColY, specColWidth, specHeight).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    doc.rect(309, specColY, specColWidth, 3).fill(COLOR_AMBER); // amber accent line

    // Header Right
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8.5).text('DEVELOPER & SRE SPECIFICATIONS', 321, specColY + 14);
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(7).text('CONTAINER, DATA & PIPELINE ARCHITECTURE', 321, specColY + 25);
    
    // Summary
    doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(8).text(
      s.developer.summary, 321, specColY + 40, { width: specColWidth - 24, height: 68, ellipsis: true, lineGap: 3.5 }
    );

    // Developer Benefits Bullet list
    const devBulletYStart = specColY + 115;
    s.developer.benefits.slice(0, 4).forEach((benefit, dIdx) => {
      const dY = devBulletYStart + (dIdx * 32);
      doc.save();
      doc.fillColor(COLOR_AMBER).rect(321, dY + 2.5, 3.5, 3.5).fill();
      doc.restore();
      doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(7.5).text(
        benefit, 333, dY, { width: specColWidth - 34, height: 26, ellipsis: true, lineGap: 2.5 }
      );
    });
    doc.restore();

    // 4. Deliverables section (Horizontal Grid)
    const deliverY = 425;
    const deliverHeight = 110;
    
    doc.save();
    doc.rect(40, deliverY, 515.28, deliverHeight).fill(COLOR_CARD_BG);
    doc.rect(40, deliverY, 515.28, deliverHeight).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    doc.rect(40, deliverY, 3, deliverHeight).fill(COLOR_ORANGE); // Left-side accent indicator bar
    
    // Header
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8).text('GUARANTEED ENTERPRISE DELIVERABLES:', 55, deliverY + 12);
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(6.5).text('CODEBASE & PLATFORM TRANSFERS INCLUDED IN CORE AGREEMENT', 260, deliverY + 13);
    
    // List Deliverables inside
    let currentDelX = 55;
    let currentDelY = deliverY + 30;

    s.deliverables.slice(0, 5).forEach((deliv, delIndex) => {
      const isCol2 = delIndex >= 3;
      const xOffset = isCol2 ? 309 : 55;
      const yOffset = deliverY + 30 + ((delIndex % 3) * 22);

      doc.save();
      doc.fillColor(COLOR_ORANGE).rect(xOffset, yOffset + 3.5, 6, 1.5).fill();
      doc.restore();
      doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(8).text(
        deliv, xOffset + 14, yOffset, { width: 220, height: 18, ellipsis: true }
      );
    });
    doc.restore();

    // 5. Bottom Tech Stack & Timeline Banner (Grid)
    const bannerY = 548;
    const bannerHeight = 44;
    doc.save();
    doc.rect(40, bannerY, 515.28, bannerHeight).strokeColor(COLOR_BORDER).lineWidth(0.5).stroke();
    // Draw minor separators
    doc.strokeColor(COLOR_BORDER).lineWidth(0.5).moveTo(370, bannerY).lineTo(370, bannerY + bannerHeight).stroke();

    // Left block: Target tech stack
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(7).text('SYSTEM TARGET TECH INTEGRATION:', 52, bannerY + 10);
    // Render horizontal items
    const stackItems = s.techStack.join('  •  ');
    doc.fillColor(COLOR_AMBER).font('Helvetica-Bold').fontSize(8.5).text(stackItems, 52, bannerY + 23, { width: 310, height: 15, ellipsis: true });

    // Right block: Implementation duration
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(7).text('SOCIETY SLA DEPLOYMENT TIMELINE:', 382, bannerY + 10);
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8.5).text(s.timeline.toUpperCase(), 382, bannerY + 23);
    doc.restore();


    // 6. Large Secure CTA Ribbon Block at the deep bottom of each page
    const ctaY = 605;
    const ctaHeight = 52;
    doc.save();
    doc.rect(40, ctaY, 515.28, ctaHeight).fill(COLOR_CARD_BG); // Crisp white secure box
    doc.rect(40, ctaY, 515.28, ctaHeight).strokeColor(COLOR_ORANGE).lineWidth(0.8).stroke();
    doc.rect(40, ctaY, 4, ctaHeight).fill(COLOR_ORANGE);

    // Direct consultation booking elements
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica-Bold').fontSize(8.5).text('SOCIALLY ENGAGED CONSULTATION SCHEDULE:', 55, ctaY + 13);
    doc.fillColor(COLOR_TEXT_MUTED).font('Helvetica').fontSize(7.5).text(
      'Instantly trigger a deployment brief dynamically via our integrated booking portal at https://hrdnsh.com/consultation',
      55, ctaY + 26, { width: 310, lineGap: 1 }
    );

    // Booking Button representation on right
    const btnX = 390;
    const btnY = ctaY + 11;
    doc.rect(btnX, btnY, 150, 30).fill(COLOR_ORANGE);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5).text('BOOK DEPLOYMENT DIALOG', btnX, btnY + 11, { align: 'center', width: 150 });
    doc.restore();


    // 7. Security Certification stamp at bottom-right of page
    const stampY = 675;
    doc.save();
    doc.strokeColor(COLOR_BORDER).lineWidth(0.5).moveTo(40, stampY).lineTo(555.28, stampY).stroke();
    
    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(6.5).text('SECURITY CERTIFICATION:', 40, stampY + 9);
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(6.5).text(
      'All nodes undergo automated penetration reviews, SSL certificate routing validations, and dependency audit protocols prior to transfer.',
      145, stampY + 9, { width: 275 }
    );

    doc.fillColor(COLOR_TEXT_MUTED).font('Courier-Bold').fontSize(6.5).text('DOCUMENT INTEGRITY:', 435, stampY + 9);
    doc.fillColor(COLOR_TEXT_PRIMARY).font('Helvetica').fontSize(6).text(
      `SHA-256 VALIDATED // NODE-REF: HRD_${s.number}_SEC2026`,
      435, stampY + 18
    );
    doc.restore();
  });

  // End and write document
  doc.end();
  
  stream.on('finish', () => {
    console.log(`Successfully generated dynamic PDF Service Catalog at: ${outputPath}`);
  });
}

// Execute unconditionally as a build script
generateCatalog();
