import type { APIRoute } from "astro";
import { services, siteData } from "../data/services";

export const GET: APIRoute = async ({ site }) => {
  // Graceful fallback to static siteData structure if site context is missing
  const baseSiteUrl = site ? site.href : siteData.url;
  if (!baseSiteUrl) {
    return new Response("Missing base site configuration URL", { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];

  interface SitemapEntry {
    url: string;
    lastmod: string;
    priority: number;
    changefreq: "daily" | "weekly" | "monthly" | "yearly";
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

  // Process dynamic service offerings natively
  for (const service of services) {
    // Ensure accurate string formatting for custom timestamps
    let serviceDate = today;
    if (service.updatedAt) {
      serviceDate = service.updatedAt.includes("T")
        ? service.updatedAt.split("T")[0]
        : service.updatedAt;
    }

    pages.push({
      url: `/services/${service.id}`,
      lastmod: serviceDate,
      priority: 0.8,
      changefreq: "weekly",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => {
    const targetUrl = new URL(p.url, baseSiteUrl).href.replace(/\/+$/, "");
    return `  <url>
    <loc>${targetUrl}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
