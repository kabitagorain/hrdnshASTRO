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
import { translations, Locale } from '../src/data/translations';

const DIST_DIR = path.resolve('dist');

interface Route {
  view: string;
  slug: string | null;
  service: string | null;
  locale: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  isMultilingual: boolean;
}

const LOCALES: Locale[] = ['en', 'de', 'bn', 'es'];

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

const routes: Route[] = [];

type PageKey = 'home' | 'services' | 'resume' | 'consultation' | 'billing' | 'recommend' | 'privacy' | 'terms';

interface CoreViewConfig {
  view: string;
  pageKey: PageKey;
  enSubPath: string;
}

const coreViews: CoreViewConfig[] = [
  { view: 'home', pageKey: 'home', enSubPath: '' },
  { view: 'services', pageKey: 'services', enSubPath: 'services/' },
  { view: 'resume', pageKey: 'resume', enSubPath: 'resume/' },
  { view: 'consultation', pageKey: 'consultation', enSubPath: 'consultation/' },
  { view: 'billing-portal', pageKey: 'billing', enSubPath: 'billing/' },
  { view: 'recommend', pageKey: 'recommend', enSubPath: 'recommend/' },
  { view: 'privacy', pageKey: 'privacy', enSubPath: 'privacy/' },
  { view: 'terms', pageKey: 'terms', enSubPath: 'terms/' },
];

// 1. Core pages across all 4 locales (8 views * 4 locales = 32 pages)
coreViews.forEach(cv => {
  LOCALES.forEach(loc => {
    const pageData = translations[loc]?.pages?.[cv.pageKey] || translations['en'].pages[cv.pageKey];
    const pathPrefix = loc === 'en' ? cv.enSubPath : `${loc}/${cv.enSubPath}`;
    const filePath = `${pathPrefix}index.html`;

    routes.push({
      view: cv.view,
      slug: null,
      service: null,
      locale: loc,
      path: filePath,
      title: pageData.title,
      description: pageData.description,
      h1: pageData.h1,
      isMultilingual: true,
    });
  });
});

// 2. Services across all 4 locales (14 services * 4 locales = 56 pages)
services.forEach(service => {
  LOCALES.forEach(loc => {
    const svcTrans = translations[loc]?.services?.[service.id];
    const svcTitle = svcTrans?.title || service.title;
    const svcTagline = svcTrans?.tagline || service.tagline || (service as any).businessOwner?.summary || service.title;
    const pathPrefix = loc === 'en' ? `services/${service.id}/` : `${loc}/services/${service.id}/`;
    const filePath = `${pathPrefix}index.html`;

    routes.push({
      view: 'service-detail',
      slug: null,
      service: service.id,
      locale: loc,
      path: filePath,
      title: `${svcTitle} | ${profile.name}`,
      description: svcTagline,
      h1: svcTitle,
      isMultilingual: true,
    });
  });
});

// 3. Blog pages — English Universal (1 index + 17 posts = 18 pages)
routes.push({
  view: 'blog',
  slug: null,
  service: null,
  locale: 'en',
  path: 'blog/index.html',
  title: `Executive Insights — Industrial Operations, ERP & Sovereign AI — ${profile.name}`,
  description: 'Authoritative analysis on industrial manufacturing leadership, production planning (PPC), Sovereign AI, private RAG pipelines, and custom ERP implementation.',
  h1: 'Executive Insights — Industrial Operations, ERP & Sovereign AI',
  isMultilingual: false,
});

blogPosts.forEach(post => {
  routes.push({
    view: 'blog-post',
    slug: post.slug,
    service: null,
    locale: 'en',
    path: `blog/${post.slug}/index.html`,
    title: `${post.title} — ${profile.name}`,
    description: post.description,
    h1: post.title,
    isMultilingual: false,
  });
});

function getHreflangTags(route: Route): string {
  if (!route.isMultilingual) return '';

  let subPath = '';
  if (route.view === 'home') {
    subPath = '';
  } else if (route.view === 'service-detail' && route.service) {
    subPath = `services/${route.service}/`;
  } else {
    const cv = coreViews.find(c => c.view === route.view);
    subPath = cv ? cv.enSubPath : '';
  }

  const enUrl = `https://hrdnsh.com/${subPath}`;
  const deUrl = `https://hrdnsh.com/de/${subPath}`;
  const bnUrl = `https://hrdnsh.com/bn/${subPath}`;
  const esUrl = `https://hrdnsh.com/es/${subPath}`;

  return [
    `    <link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <link rel="alternate" hreflang="de" href="${deUrl}" />`,
    `    <link rel="alternate" hreflang="bn" href="${bnUrl}" />`,
    `    <link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`
  ].join('\n');
}

function buildJsonLd(route: Route): string {
  const basePerson = {
    "@type": "Person", "@id": "https://hrdnsh.com/#person",
    "name": profile.name, 
    "jobTitle": "Executive Operations Leader & Chief Enterprise Architect",
    "worksFor": { "@type": "Organization", "name": "Haradhan Sharma Executive Advisory" },
    "url": "https://hrdnsh.com",
    "sameAs": [profile.linkedin, profile.github, profile.upwork]
  };

  const baseService = {
    "@type": "ProfessionalService", "@id": "https://hrdnsh.com/#business",
    "name": "Haradhan Sharma Executive Advisory",
    "url": "https://hrdnsh.com",
    "priceRange": "$$$$",
    "address": { "@type": "PostalAddress", "addressCountry": "BD" }
  };

  // Homepage: Organization + Person + FAQPage
  if (route.view === 'home') {
    const faqItems = [
      { q: "What is Haradhan Sharma's core background?", a: "Over 20 years of dual-track expertise: industrial manufacturing leadership (PPC Manager at Fakir Knitwears, CEO, Head of MIS) combined with deep-tech systems architecture (Sovereign AI, private RAG pipelines, custom ERP, and cloud security)." },
      { q: "What services are offered?", a: "14 core production blueprints across Sovereign AI, Private RAG pipelines, Custom Industrial ERP (Odoo, ERPNext), High-Concurrency Backend Architecture, and Enterprise Cloud Infrastructure." },
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
        "image": ["https://hrdnsh.com/og-image.jpg"],
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
  const rawPath = route.path.replace('/index.html', '').replace('index.html', '');
  const canonicalPath = rawPath ? (rawPath.endsWith('/') ? rawPath : `${rawPath}/`) : '';
  const canonical = `https://hrdnsh.com/${canonicalPath}`;
  const hreflangTags = getHreflangTags(route);
  const jsonLd = buildJsonLd(route);
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    de: 'de_DE',
    bn: 'bn_BD',
    es: 'es_ES',
  };
  const ogLocale = ogLocaleMap[route.locale] || 'en_US';

  return `<!doctype html>
<html lang="${route.locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonical}" />
${hreflangTags ? hreflangTags + '\n' : ''}    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="https://hrdnsh.com/og-image.jpg" />
    <meta property="og:site_name" content="Haradhan Sharma Executive Advisory" />
    <meta property="og:type" content="${route.view === 'home' ? 'website' : 'article'}" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://hrdnsh.com/og-image.jpg" />
    <meta name="google-adsense-account" content="ca-pub-8699640014335732">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VM4JDZYW59"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VM4JDZYW59');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8699640014335732" crossorigin="anonymous"></script>
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
        initialLocale: route.locale,
      });
      const content = ReactDOMServer.renderToStaticMarkup(element);

      const filePath = path.join(DIST_DIR, route.path);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const fullHtml = buildHtml(route, content, assets);
      fs.writeFileSync(filePath, fullHtml);
      console.log(`  OK  [${route.locale}] ${route.path} (${content.length} chars)`);
      success++;
    } catch (e: any) {
      console.error(`  FAIL  [${route.locale}] ${route.path}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nSSG Complete! ${success} success, ${failed} failed.`);
}

generate();
