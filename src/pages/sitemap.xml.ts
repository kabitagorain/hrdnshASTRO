import type { APIRoute } from "astro";
import { services, profile, siteData } from "../data/services";

export const GET: APIRoute = async ({ site }) => {
  if (!site) return new Response("Missing site config", { status: 500 });

  const today = new Date().toISOString().split("T")[0];

  interface SitemapEntry {
    url: string;
    lastmod: string;
    priority: number;
    changefreq: string;
  }

  const pages: SitemapEntry[] = [
    { url: "/", lastmod: today, priority: 1.0, changefreq: "daily" },
    { url: "/services", lastmod: today, priority: 0.9, changefreq: "weekly" },
    { url: "/resume", lastmod: today, priority: 0.8, changefreq: "weekly" },
    { url: "/recommend", lastmod: today, priority: 0.7, changefreq: "weekly" },
    {
      url: "/privacy-policy",
      lastmod: today,
      priority: 0.3,
      changefreq: "monthly",
    },
    {
      url: "/terms-of-service",
      lastmod: today,
      priority: 0.3,
      changefreq: "monthly",
    },
  ];

  // Add all service pages with their individual lastmod dates
  for (const s of services) {
    pages.push({
      url: `/services/${s.id}`,
      lastmod: s.updatedAt || today,
      priority: 0.8,
      changefreq: "weekly",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${new URL(p.url, site).href}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
