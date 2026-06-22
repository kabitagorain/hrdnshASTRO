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

function buildHtml(route: Route, content: string, assets: { cssTag: string; jsTag: string }): string {
  const dirDepth = route.path.split('/').length - 1;
  const cssTag = makeRelative(assets.cssTag, dirDepth);
  const jsTag = makeRelative(assets.jsTag, dirDepth);

  // Build canonical URL
  const canonicalPath = route.path.replace('/index.html', '').replace('index.html', '');
  const canonical = `https://hrdnsh.com/${canonicalPath}`;

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
