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
}

// Read Vite's generated index.html to extract the correct hashed asset filenames
function getViteAssetTags(): { cssTag: string; jsTag: string } {
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  // Extract the full <link rel="stylesheet" ...> tag (handles both /> and > endings)
  const cssMatch = indexHtml.match(/<link[^>]*rel="stylesheet"[^>]*>/);
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
    title: `${profile.name} | Sovereign Systems & Cloud Migration Architect`,
    description: 'Shatter modern bloated architectures with sovereign, low-latency deployment pipelines. Specializing in AI/RAG integration, Python asynchronous optimization, self-managed ERPNext instances.'
  },
  {
    view: 'resume', slug: null, service: null, path: 'resume/index.html',
    title: `Resume & Credentials | ${profile.name}`,
    description: 'Professional background, certifications, and technical expertise in Sovereign AI, RAG, ERPNext, and cloud architectures.'
  },
  {
    view: 'consultation', slug: null, service: null, path: 'consultation/index.html',
    title: `Book a Consultation | ${profile.name}`,
    description: 'Schedule a discovery call to discuss your AI automation, RAG pipeline, ERPNext, or infrastructure migration project.'
  },
  {
    view: 'billing-portal', slug: null, service: null, path: 'billing/index.html',
    title: `Billing & Invoicing | ${profile.name}`,
    description: 'Secure payment portal for invoices, retainers, and project billing.'
  },
  {
    view: 'recommend', slug: null, service: null, path: 'recommend/index.html',
    title: `Recommended Infrastructure & Tools | ${profile.name}`,
    description: 'Highly curated hosting recommendations, cloud servers, local data centers, and infrastructure tools.'
  },
  {
    view: 'blog', slug: null, service: null, path: 'blog/index.html',
    title: `Blog — AI, ERP & Infrastructure Articles — ${profile.name}`,
    description: 'In-depth technical articles on Sovereign AI, private RAG systems, ERPNext, Odoo, LLM self-hosting, and AI automation.'
  },
];

blogPosts.forEach(post => {
  routes.push({
    view: 'blog-post', slug: post.slug, service: null, path: `blog/${post.slug}/index.html`,
    title: `${post.title} — ${profile.name}`,
    description: post.description
  });
});

services.forEach(service => {
  routes.push({
    view: 'service-detail', slug: null, service: service.id, path: `services/${service.id}/index.html`,
    title: `${service.title} | ${profile.name} Consulting`,
    description: service.description
  });
});

function buildJsonLd(route: Route): string {
  const basePerson = {
    "@type": "Person", "@id": "https://hrdnsh.com/#person",
    "name": profile.name, "jobTitle": "Sovereign Systems Architect & AI Automation Specialist",
    "url": "https://hrdnsh.com", "image": "https://hrdnsh.com/avatar.png",
    "sameAs": ["https://github.com/hrdnsh"],
    "knowsAbout": ["Sovereign Systems Architect", "AI Agents", "Enterprise RAG", "Python Async Developer", "low-latency ERP", "Cloud Migration", "DevOps", "SRE"]
  };
  const baseService = {
    "@type": "ProfessionalService", "@id": "https://hrdnsh.com/#service",
    "name": "Haradhan Sharma Sovereign Systems Consulting",
    "url": "https://hrdnsh.com", "logo": "https://hrdnsh.com/avatar.png",
    "image": "https://hrdnsh.com/og-image.jpg",
    "description": "Sovereign Systems Architect specializing in production-grade AI agents, RAG pipelines, low-latency ERP implementations, and high-performance server migrations.",
    "telephone": "+8801712270815", "priceRange": "$$$",
    "address": { "@type": "PostalAddress", "addressCountry": "BD" },
    "founder": { "@type": "Person", "@id": "https://hrdnsh.com/#person" }
  };

  // Homepage: Person + ProfessionalService + FAQPage
  if (route.view === 'home') {
    const faqItems = [
      { q: "Do I own 100% of the completed service code?", a: "Yes, absolutely. Once final invoices are settled, the entire private GitHub repository, Docker blueprints, and administrator keys are fully transferred. There are zero licensing, royalty, or hosting restrictions." },
      { q: "How are APIs and server resource billing managed?", a: "All underlying resource costs (e.g., Contabo, Hetzner, DO VPS nodes, OpenAI API keys) are billed directly to your corporate accounts. I assist in setting up strict usage locks, semantic caching layers, and token compression to prevent runaway operational bills." },
      { q: "What happens if the system encounters a bug after launch?", a: "Every single architectural deployment includes an automatic 30-day performance warranty. During this window, any configuration deviations, memory leaks, or execution failures are resolved instantly as priority items." },
      { q: "Do you offer ongoing support after delivery?", a: "Yes. Weekly ongoing support is available and includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime with no penalties." },
      { q: "Can I customize the deliverables for my specific needs?", a: "Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals." },
      { q: "What do you need from me to get started?", a: "To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope." },
      { q: "Is my data and intellectual property protected?", a: "Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure." },
      { q: "What payment methods do you accept?", a: "Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted." },
      { q: "What if I am not satisfied with the deliverables?", a: "If a deliverable does not meet the agreed scope, it will be revised at no additional cost. Full refunds are available before the first deliverable is shipped." },
      { q: "How do you handle communication during the project?", a: "I provide daily progress updates via your preferred channel (email, Slack, Telegram, or video calls). A shared project board tracks all tasks, milestones, and blockers." }
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
        { q: `What is included in the ${svc.title} service?`, a: `This service includes comprehensive delivery: ${svc.deliverables.slice(0, 3).join(", ")}. Every deliverable is production-ready and documented.` },
        { q: `How long does ${svc.title} take to deliver?`, a: svc.timeline },
        { q: `What is the pricing for ${svc.title}?`, a: `One-time project delivery is $${svc.pricing.oneTime}. Weekly ongoing support is $${svc.pricing.weekly}/week.` },
        { q: `What technologies are used in ${svc.title}?`, a: `Core technologies: ${svc.techStack.slice(0, 4).join(", ")}. All are production-grade, well-maintained, and chosen for long-term reliability.` },
        { q: "Do you offer ongoing support after delivery?", a: "Yes. Weekly ongoing support is available. This includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development." },
        { q: "Can I customize the deliverables for my specific needs?", a: "Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements." },
        { q: "What do you need from me to get started?", a: "To begin, I need: (1) A clear description of your project goals, (2) Access to any existing systems or documentation, (3) Your preferred communication channel." },
        { q: "Is my data and intellectual property protected?", a: "Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required." },
        { q: "What payment methods do you accept?", a: "Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted." },
        { q: "What if I am not satisfied with the deliverables?", a: "If a deliverable does not meet the agreed scope, it will be revised at no additional cost. Full refunds are available before the first deliverable is shipped." }
      ];
      const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          basePerson,
          baseService,
          {
            "@type": "Service",
            "@id": `https://hrdnsh.com/services/${svc.id}/#service`,
            "name": svc.title, "description": svc.description,
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
    <meta property="og:site_name" content="Haradhan Sharma Sovereign Systems Consulting" />
    <meta property="og:type" content="${route.view === 'home' ? 'website' : 'article'}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://hrdnsh.com/og-image.jpg" />
    <title>${route.title}</title>
    <script type="application/ld+json">${jsonLd}</script>
    ${cssTag}
  </head>
  <body>
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
