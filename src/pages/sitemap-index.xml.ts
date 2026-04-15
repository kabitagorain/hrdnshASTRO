import type { APIRoute } from 'astro';
import { services } from '../data/services';

export const GET: APIRoute = async ({ site }) => {
  if (!site) return new Response('Missing site config', { status: 500 });

  const today = new Date().toISOString().split('T')[0];

  const pages: { url: string; priority: number; changefreq: string }[] = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/resume', priority: 0.8, changefreq: 'weekly' },
    { url: '/recommend', priority: 0.7, changefreq: 'weekly' },
    { url: '/privacy-policy', priority: 0.3, changefreq: 'monthly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'monthly' },
  ];

  // Add all service pages (payment pages excluded)
  for (const s of services) {
    pages.push({ url: `/services/${s.id}`, priority: 0.8, changefreq: 'daily' });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
