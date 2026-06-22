// SSR Generator — renders React components to static HTML for SEO/GEO discovery
// This ensures AI agents and search crawlers can read content without JavaScript execution.

// Load .env before importing app modules that depend on process.env
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

const routes: Route[] = [
  {
    view: 'home', slug: null, service: null, path: 'index.html',
    title: `${profile.name} | Sovereign Systems & Cloud Migration Architect`,
    description: 'Shatter modern bloated architectures with sovereign, low-latency deployment pipelines. Specializing in AI/RAG integration, Python asynchronous optimization, self-managed ERPNext instances.'
  },
  {
    view: 'resume', slug: null, service: null, path: 'resume.html',
    title: `Resume & Credentials | ${profile.name}`,
    description: 'Professional background, certifications, and technical expertise in Sovereign AI, RAG, ERPNext, and cloud architectures.'
  },
  {
    view: 'consultation', slug: null, service: null, path: 'consultation.html',
    title: `Book a Consultation | ${profile.name}`,
    description: 'Schedule a discovery call to discuss your AI automation, RAG pipeline, ERPNext, or infrastructure migration project.'
  },
  {
    view: 'billing-portal', slug: null, service: null, path: 'billing.html',
    title: `Billing & Invoicing | ${profile.name}`,
    description: 'Secure payment portal for invoices, retainers, and project billing.'
  },
  {
    view: 'recommend', slug: null, service: null, path: 'recommend.html',
    title: `Recommended Infrastructure & Tools | ${profile.name}`,
    description: 'Highly curated hosting recommendations, cloud servers, local data centers, and infrastructure tools.'
  },
  {
    view: 'blog', slug: null, service: null, path: 'blog.html',
    title: `Blog — AI, ERP & Infrastructure Articles — ${profile.name}`,
    description: 'In-depth technical articles on Sovereign AI, private RAG systems, ERPNext, Odoo, LLM self-hosting, and AI automation.'
  },
];

blogPosts.forEach(post => {
  routes.push({
    view: 'blog-post', slug: post.slug, service: null, path: `blog/${post.slug}.html`,
    title: `${post.title} — ${profile.name}`,
    description: post.description
  });
});

services.forEach(service => {
  routes.push({
    view: 'service-detail', slug: null, service: service.id, path: `services/${service.id}.html`,
    title: `${service.title} | ${profile.name} Consulting`,
    description: service.description
  });
});

function buildHtml(route: Route, content: string): string {
  const slug = route.path.replace('.html', '');
  const canonical = `https://hrdnsh.com/${slug === 'index' ? '' : slug}`;

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
  </head>
  <body>
    <div id="root">${content}</div>
  </body>
</html>`;
}

async function generate() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

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

      const fullHtml = buildHtml(route, content);
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
