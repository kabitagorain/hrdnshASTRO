// SSR Generator — renders React components to static HTML for SEO/GEO discovery
// Reads Vite's dist/index.html to get correct hashed asset paths, then generates
// static HTML for all routes with proper script/link tags for React hydration.

import { config } from 'dotenv';
config();

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from '../src/App';
import { services, profile } from '../src/data/services';
import { blogPosts } from '../src/data/blogPosts';

const DIST_DIR = path.resolve('dist');

interface Route {
  view: string;
  slug: string | null;
  service: string | null;
  path: string;
  title: string;
  description: string;
  h1: string;
}

// Read Vite's generated index.html to extract the correct hashed asset filenames
function getViteAssetTags(): { cssTag: string; jsTag: string } {
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  // Extract the built CSS stylesheet link tag specifically
  const cssMatch = indexHtml.match(/<link[^>]*href="[^"]*\/assets\/[^"]+\.css"[^>]*>/);
  const cssTag = cssMatch ? cssMatch[0].replace(/\s*\/?>$/, ' />') : '<link rel="stylesheet" href="/assets/index.css" />';

  // Extract the full <script type="module" ...> tag
  const jsMatch = indexHtml.match(/<script[^>]*type="module"[^>]*><\/script>/);
  const jsTag = jsMatch ? jsMatch[0] : '<script type="module" src="/assets/index.js"></script>';

  return { cssTag, jsTag };
}

// Convert absolute asset paths to relative based on directory depth
function makeRelative(tag: string, depth: number): string {
  if (depth === 0) return tag;
  const prefix = '../'.repeat(depth);
  return tag.replace(/href="\/assets\//g, `href="${prefix}assets/`)
             .replace(/src="\/assets\//g, `src="${prefix}assets/`);
}

const routes: Route[] = [
  {
    view: 'home', slug: null, service: null, path: 'index.html',
    title: `${profile.name} — Executive Operations Leader & Chief Enterprise Architect`,
    description: '20+ years industrial manufacturing leadership (PPC Manager at Fakir Knitwears, CEO) and deep-tech Sovereign AI, Custom ERP, and high-concurrency systems architecture.',
    h1: 'Haradhan Sharma — Executive Operations Leader & Chief Enterprise Architect'
  },
  {
    view: 'services', slug: null, service: null, path: 'services/index.html',
    title: `Systems Architecture & Custom ERP Catalog | ${profile.name}`,
    description: 'Explore 14 production-grade engineering blueprints: Sovereign AI, Agentic RAG, Industrial ERP (Odoo/ERPNext), High-Concurrency Backends, and Cloud Hardening.',
    h1: 'Production Engineering Ecosystems & Systems Architecture'
  },
  {
    view: 'resume', slug: null, service: null, path: 'resume/index.html',
    title: `Executive CV & Leadership Dossier | ${profile.name}`,
    description: 'Executive Curriculum Vitae of Haradhan Sharma: 20+ years industrial operations, 10 years PPC Manager at Fakir Knitwears, CEO, and Chief Architect of Sovereign AI & Custom ERPs.',
    h1: 'Executive Curriculum Vitae & Leadership Dossier'
  },
  {
    view: 'consultation', slug: null, service: null, path: 'consultation/index.html',
    title: `Strategic Advisory & Executive Consultation | ${profile.name}`,
    description: 'Schedule an executive discovery session to discuss factory operations modernization, Sovereign AI, custom ERP architecture, or enterprise scaling.',
    h1: 'Schedule an Executive Strategic Consultation'
  },
  {
    view: 'billing-portal', slug: null, service: null, path: 'billing/index.html',
    title: `Direct Invoicing & Corporate Billing | ${profile.name}`,
    description: 'Secure payment portal for enterprise contracts, retainers, and strategic advisory agreements.',
    h1: 'Corporate Invoicing & Settlement Portal'
  },
  {
    view: 'recommend', slug: null, service: null, path: 'recommend/index.html',
    title: `Recommended Enterprise Stack & Tools | ${profile.name}`,
    description: 'Personally vetted enterprise infrastructure, cloud hosting, and AI developer tools recommended by Haradhan Sharma.',
    h1: 'Recommended Enterprise Infrastructure & Stack'
  },
  {
    view: 'blog', slug: null, service: null, path: 'blog/index.html',
    title: `Executive Insights — Industrial Operations, ERP & Sovereign AI — ${profile.name}`,
    description: 'Authoritative analysis on industrial manufacturing leadership, production planning (PPC), Sovereign AI, private RAG pipelines, and custom ERP implementation.',
    h1: 'Executive Insights — Industrial Operations, ERP & Sovereign AI'
  },
];

blogPosts.forEach(post => {
  routes.push({
    view: 'blog-post', slug: post.slug, service: null, path: `blog/${post.slug}/index.html`,
    title: `${post.title} — ${profile.name}`,
    description: post.description,
    h1: post.title
  });
});

services.forEach(service => {
  routes.push({
    view: 'service-detail', slug: null, service: service.id, path: `services/${service.id}/index.html`,
    title: `${service.title} | ${profile.name}`,
    description: service.tagline || (service as any).businessOwner?.summary || service.title,
    h1: service.title
  });
});

function buildJsonLd(route: Route): string {
  const basePerson = {
    "@type": "Person", "@id": "https://hrdnsh.com/#person",
    "name": profile.name, 
    "jobTitle": "Executive Operations Leader & Chief Enterprise Architect",
    "url": "https://hrdnsh.com", 
    "image": "https://hrdnsh.com/avatar.png",
    "sameAs": [
      profile.linkedin,
      profile.github,
      profile.upwork,
      profile.x
    ].filter(Boolean),
    "knowsAbout": [
      "Production Planning and Control (PPC)",
      "Industrial Factory Floor Leadership",
      "Master Production Scheduling (MPS)",
      "Sovereign AI Architecture",
      "Enterprise Agentic RAG",
      "Custom ERP Systems (Odoo, ERPNext)",
      "Python Async High-Concurrency Backends",
      "PostgreSQL pgvector Optimization",
      "Linux Cloud Infrastructure Hardening"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "HRDNSH Executive Advisory"
    }
  };
  
  const baseService = {
    "@type": "ProfessionalService", "@id": "https://hrdnsh.com/#service",
    "name": "Haradhan Sharma Executive Advisory & Enterprise Architecture",
    "url": "https://hrdnsh.com", 
    "logo": "https://hrdnsh.com/avatar.png",
    "image": "https://hrdnsh.com/og-image.jpg",
    "description": "Executive Operations Leadership and Deep-Tech Enterprise Architecture specializing in Sovereign AI, Custom Manufacturing ERP (Odoo/ERPNext), and high-concurrency systems.",
    "telephone": "+8801712270815", 
    "priceRange": "$$$",
    "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" },
    "founder": { "@type": "Person", "@id": "https://hrdnsh.com/#person" }
  };

  // Homepage: Person + ProfessionalService + FAQPage
  if (route.view === 'home') {
    const faqItems = [
      { q: "What is Haradhan Sharma's leadership background?", a: "Haradhan Sharma brings 20+ years of cross-functional industrial leadership: 10 years as Manager of Production Planning & Coordination (PPC) at Fakir Knitwears Ltd., Founder & CEO scaling an apparel brand across 63 districts (1,200+ dealer proposals), and Chief Architect of Sovereign AI & Custom ERP software." },
      { q: "What is the dual advantage of physical operations and deep-tech architecture?", a: "Most software architects have never managed industrial factory floors, and most factory executives lack deep software engineering capability. Haradhan bridges both—optimizing shop-floor workflows, PPC, capacity balancing, and ERP alongside private Sovereign AI and high-concurrency backends." },
      { q: "Do clients retain full code and intellectual property ownership?", a: "Yes, absolutely 100%. All custom ERP modules, AI pipelines, repository architectures, and deployment keys are transferred in full with zero licensing or vendor lock-in." },
      { q: "How is Sovereign AI different from public SaaS AI?", a: "Sovereign AI runs on your private cloud or on-premise infrastructure. Private RAG systems query your internal company documentation with zero data leaks to public foundation models, ensuring complete intellectual property and compliance security." },
      { q: "How can I engage Haradhan Sharma for executive advisory or architecture roles?", a: "You can book a strategic consultation directly through the website, send an inquiry via email (me@hrdnsh.com), or connect via LinkedIn and Upwork." }
    ];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        basePerson,
        baseService,
        {
          "@type": "FAQPage", "@id": "https://hrdnsh.com/#faq",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question", "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        }
      ]
    };
    return JSON.stringify(jsonLd, null, 2);
  }

  // Blog posts: Article
  if (route.view === 'blog-post') {
    const post = blogPosts.find(p => p.slug === route.slug);
    if (post) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "author": { "@type": "Person", name: profile.name, url: "https://hrdnsh.com" },
        "publisher": { "@type": "Person", name: profile.name, url: "https://hrdnsh.com" },
        "datePublished": "2026-06-22T00:00:00+00:00",
        "dateModified": "2026-06-22T00:00:00+00:00",
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://hrdnsh.com/blog/${post.slug}/` }
      };
      return JSON.stringify(jsonLd, null, 2);
    }
  }

  // Service details: Service + FAQPage
  if (route.view === 'service-detail') {
    const svc = services.find(s => s.id === route.service);
    if (svc) {
      const faqItems = [
        { q: `What is included in the ${svc.title} architecture?`, a: `This service includes comprehensive delivery: ${svc.deliverables.slice(0, 3).join(", ")}. Every deliverable is production-ready and documented.` },
        { q: `How long does ${svc.title} take to deliver?`, a: svc.timeline },
        { q: `What is the pricing for ${svc.title}?`, a: `One-time architecture implementation is $${svc.pricing.oneTime}. Weekly ongoing advisory and optimization is $${svc.pricing.weekly}/week.` },
        { q: `What technologies are used in ${svc.title}?`, a: `Core technologies: ${svc.techStack.slice(0, 4).join(", ")}. All are production-grade, hardened, and selected for long-term operational resilience.` },
        { q: "Is my data and intellectual property protected?", a: "Yes. All work product, code, and documentation become your exclusive intellectual property upon payment. Strict NDAs are executed for enterprise clients." }
      ];
      const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          basePerson,
          baseService,
          {
            "@type": "Service",
            "@id": `https://hrdnsh.com/services/${svc.id}/#service`,
            "name": svc.title, "description": svc.tagline || (svc as any).businessOwner?.summary || svc.title,
            "provider": { "@type": "Person", "@id": "https://hrdnsh.com/#person" },
            "offers": { "@type": "Offer", "price": svc.pricing.oneTime, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": `https://hrdnsh.com/services/${svc.id}/` }
          },
          {
            "@type": "FAQPage", "@id": `https://hrdnsh.com/services/${svc.id}/#faq`,
            "mainEntity": faqItems.map(item => ({
              "@type": "Question", "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }))
          }
        ]
      };
      return JSON.stringify(jsonLd, null, 2);
    }
  }

  // Default: Person only
  return JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": profile.name, "url": "https://hrdnsh.com" }, null, 2);
}

function buildHtml(route: Route, content: string, assets: { cssTag: string; jsTag: string }): string {
  const dirDepth = route.path.split('/').length - 1;
  const cssTag = makeRelative(assets.cssTag, dirDepth);
  const jsTag = makeRelative(assets.jsTag, dirDepth);
  const canonicalPath = route.path.replace('/index.html', '').replace('index.html', '');
  const canonical = `https://hrdnsh.com/${canonicalPath}`;
  const jsonLd = buildJsonLd(route);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="https://hrdnsh.com/og-image.jpg" />
    <meta property="og:site_name" content="Haradhan Sharma Executive Advisory" />
    <meta property="og:type" content="${route.view === 'home' ? 'website' : 'article'}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://hrdnsh.com/og-image.jpg" />
    <title>${route.title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300..900;1,300..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script type="application/ld+json">${jsonLd}</script>
    ${cssTag}
  </head>
  <body>
    <h1 style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">${route.h1}</h1>
    <div id="root">${content}</div>
    ${jsTag}
  </body>
</html>`;
}

async function generate() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Get the correct asset tags from Vite's output
  const assets = getViteAssetTags();
  console.log(`Assets: ${assets.cssTag} | ${assets.jsTag}\n`);
  console.log(`Starting SSG for ${routes.length} pages...\n`);

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const element = React.createElement(App, {
        initialView: route.view,
        initialServiceId: route.service,
        initialSlug: route.slug,
      });
      const content = ReactDOMServer.renderToStaticMarkup(element);

      const filePath = path.join(DIST_DIR, route.path);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const fullHtml = buildHtml(route, content, assets);
      fs.writeFileSync(filePath, fullHtml);
      console.log(`  OK  ${route.path} (${content.length} chars)`);
      success++;
    } catch (e: any) {
      console.error(`  FAIL  ${route.path}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nSSG Complete! ${success} success, ${failed} failed.`);
}

generate();
