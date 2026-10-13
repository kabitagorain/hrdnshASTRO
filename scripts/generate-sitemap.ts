import { services } from '../src/data/services';
import { blogPosts } from '../src/data/blogPosts';
import fs from 'fs';

const LOCALES = ['en', 'de', 'bn', 'es'] as const;

interface CorePageConfig {
  subPath: string;
  priority: string;
  changefreq: string;
}

const corePages: CorePageConfig[] = [
  { subPath: '', priority: '1.0', changefreq: 'weekly' },
  { subPath: 'services/', priority: '0.9', changefreq: 'weekly' },
  { subPath: 'resume/', priority: '0.8', changefreq: 'monthly' },
  { subPath: 'consultation/', priority: '0.9', changefreq: 'monthly' },
  { subPath: 'billing/', priority: '0.7', changefreq: 'monthly' },
  { subPath: 'recommend/', priority: '0.8', changefreq: 'weekly' },
  { subPath: 'privacy/', priority: '0.3', changefreq: 'yearly' },
  { subPath: 'terms/', priority: '0.3', changefreq: 'yearly' },
];

const today = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  loc: string;
  alternates?: { lang: string; href: string }[];
  lastmod: string;
  changefreq: string;
  priority: string;
}

const entries: SitemapEntry[] = [];
const cleanUrls: string[] = [];

// 1. Core pages across all 4 locales (8 * 4 = 32 entries)
corePages.forEach(cp => {
  const enUrl = `https://hrdnsh.com/${cp.subPath}`;
  const deUrl = `https://hrdnsh.com/de/${cp.subPath}`;
  const bnUrl = `https://hrdnsh.com/bn/${cp.subPath}`;
  const esUrl = `https://hrdnsh.com/es/${cp.subPath}`;

  const alternates = [
    { lang: 'en', href: enUrl },
    { lang: 'de', href: deUrl },
    { lang: 'bn', href: bnUrl },
    { lang: 'es', href: esUrl },
    { lang: 'x-default', href: enUrl },
  ];

  LOCALES.forEach(loc => {
    const locUrl = loc === 'en' ? enUrl : `https://hrdnsh.com/${loc}/${cp.subPath}`;
    cleanUrls.push(locUrl);
    entries.push({
      loc: locUrl,
      alternates,
      lastmod: today,
      changefreq: cp.changefreq,
      priority: cp.priority,
    });
  });
});

// 2. Services across all 4 locales (14 * 4 = 56 entries)
services.forEach(svc => {
  const enUrl = `https://hrdnsh.com/services/${svc.id}/`;
  const deUrl = `https://hrdnsh.com/de/services/${svc.id}/`;
  const bnUrl = `https://hrdnsh.com/bn/services/${svc.id}/`;
  const esUrl = `https://hrdnsh.com/es/services/${svc.id}/`;

  const alternates = [
    { lang: 'en', href: enUrl },
    { lang: 'de', href: deUrl },
    { lang: 'bn', href: bnUrl },
    { lang: 'es', href: esUrl },
    { lang: 'x-default', href: enUrl },
  ];

  LOCALES.forEach(loc => {
    const locUrl = loc === 'en' ? enUrl : `https://hrdnsh.com/${loc}/services/${svc.id}/`;
    cleanUrls.push(locUrl);
    entries.push({
      loc: locUrl,
      alternates,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    });
  });
});

// 3. Blog pages — English Universal (18 entries: 1 index + 17 posts)
const blogIndexUrl = 'https://hrdnsh.com/blog/';
cleanUrls.push(blogIndexUrl);
entries.push({
  loc: blogIndexUrl,
  lastmod: today,
  changefreq: 'weekly',
  priority: '0.8',
});

blogPosts.forEach(post => {
  const postUrl = `https://hrdnsh.com/blog/${post.slug}/`;
  cleanUrls.push(postUrl);
  entries.push({
    loc: postUrl,
    lastmod: '2026-06-22',
    changefreq: 'monthly',
    priority: '0.7',
  });
});

// Build XML string
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

entries.forEach(entry => {
  xml += '  <url>\n';
  xml += `    <loc>${entry.loc}</loc>\n`;
  if (entry.alternates && entry.alternates.length > 0) {
    entry.alternates.forEach(alt => {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    });
  }
  xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
  xml += `    <priority>${entry.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
if (fs.existsSync('dist')) {
  fs.writeFileSync('dist/sitemap.xml', xml, 'utf8');
}
fs.writeFileSync('.sitemap', cleanUrls.join('\n'), 'utf8');

console.log(`Generated ${entries.length} URLs in public/sitemap.xml and .sitemap (with reciprocal hreflang for multilingual views).`);
