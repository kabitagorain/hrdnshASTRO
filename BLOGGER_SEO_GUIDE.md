# Blogger SEO Setup Guide for hrdnsh.com

## 1. Create Your Blogger Blog

1. Go to **https://www.blogger.com** → Sign in with your Google account
2. Click **"Create your blog"**
3. Choose a blog name: `hrdnsh` or `Haradhan Sharma Blog` or `Insights by Haradhan`
4. Select a URL slug: `hrdnsh.blogspot.com` (you can later use a custom subdomain like `blog.hrdnsh.com`)
5. Choose a theme → Use a **simple, clean theme** (e.g., "Contempo" or "Notable") — avoid heavy themes
6. Click **Create blog**

---

## 2. Configure Custom Domain (Recommended)

To connect your blog to `blog.hrdnsh.com`:

1. In Blogger Settings → Publishing → Custom domain
2. Enter `blog.hrdnsh.com`
3. Blogger gives you two CNAME records to add:
   - `www.blog.hrdnsh.com` → `ghs.google.com`
   - A verification CNAME record with a specific value
4. Go to **Cloudflare Dashboard** → hrdnsh.com → **DNS** → **Records**
5. Add the CNAME records Blogger provided
6. Wait for DNS propagation (5 minutes to 48 hours)
7. In Blogger, enable **HTTPS** (Settings → HTTPS → Yes)

> **Alternative**: Use a free `blogspot.com` subdomain first, then upgrade later.

---

## 3. Blogger SEO Settings

### Basic SEO
1. **Settings** → **Meta tags** → Enable "Yes" for "Enable search description?"
2. Write a blog description: *"Technical insights on AI agents, web development, DevOps, and backend engineering by Haradhan Sharma."*

### Per-Post SEO
For every blog post you publish:
1. Click **Search Description** (right sidebar) → Write a unique 150-160 char description
2. Add **Labels/Tags** — use specific keywords (e.g., `RAG Pipeline`, `Astro SEO`, `Cloudflare WAF`)
3. Set a **custom URL slug** — short, keyword-rich (e.g., `/how-to-build-rag-pipeline-langchain` instead of auto-generated)
4. Add **alt text** to every image

---

## 4. Connect Blogger to Your Main Site (Cross-Linking)

### From hrdnsh.com → Blogger
Add a "Blog" or "Insights" link to your site navigation:

In `src/data/services.ts`, update `navLinks`:
```typescript
{ label: "Blog", href: "https://blog.hrdnsh.com" },
```

Also add to the Footer. This creates a strong topical authority link between your main site and blog.

### From Blogger → hrdnsh.com
In Blogger → **Layout** → Add a **HTML/JavaScript gadget** in the sidebar:
```html
<a href="https://hrdnsh.com/services" style="display:block; padding:12px; background:#111; color:#fff; border-radius:8px; text-align:center; font-weight:bold; margin-bottom:16px;">
  View My Professional Services →
</a>
```

---

## 5. Content Strategy (What to Write)

Write at least **2 blog posts per month**. Target these keyword clusters:

### AI & Automation (4 posts)
- "How to Build a Sovereign RAG Pipeline with LangChain and pgvector"
- "Deploying Gemma 4 on Your Own VPS with OpenClaw — Zero API Costs"
- "Why Generic AI Chatbots Are a Liability for Your Business"
- "Agentic Tool-Calling: Making LLMs Actually Do Work"

### Web Development (4 posts)
- "Astro Island Architecture: Why It Beats Next.js for Marketing Sites"
- "HTMX + Alpine.js: Building Interactive Apps Without React Fatigue"
- "How I Optimized a WooCommerce Store to Load Under 1 Second"
- "Server-Side Rendering vs Static Generation: When to Use What"

### DevOps (3 posts)
- "Cloudflare Zero Trust Setup: A Step-by-Step Guide for VPS Owners"
- "Dockerizing a Django + Celery + Redis Stack for Production"
- "GitHub Actions CI/CD Pipeline for Zero-Downtime Deployments"

### Business / Case Studies (2 posts)
- "How I Built a Custom Manufacturing ERP That Replaced Spreadsheets"
- "From 3-Second Load Time to 200ms: An E-Commerce Performance Audit"

---

## 6. Submit Blogger Sitemap to Google

1. Your Blogger sitemap is auto-generated at: `https://blog.hrdnsh.com/sitemap.xml`
2. Go to **Google Search Console** → Add property → `blog.hrdnsh.com`
3. Verify ownership (Blogger does this automatically if using the same Google account)
4. Submit sitemap: `sitemap.xml`
5. Also submit the main site sitemap: `https://hrdnsh.com/sitemap.xml`

---

## 7. RSS Feed Integration (Bonus)

Blogger has a built-in RSS feed at `https://blog.hrdnsh.com/feeds/posts/default`

You can display your latest blog posts on hrdnsh.com's homepage or a dedicated section using JavaScript:

```html
<!-- Add to your site to display latest blog posts -->
<div id="blog-feed"></div>
<script>
fetch('https://blog.hrdnsh.com/feeds/posts/default?alt=json')
  .then(r => r.json())
  .then(data => {
    const posts = data.feed.entry.slice(0, 3);
    document.getElementById('blog-feed').innerHTML = posts.map(p => `
      <a href="${p.link[0].href}" style="display:block; padding:12px 0; border-bottom:1px solid #333;">
        <strong>${p.title.$t}</strong><br>
        <small>${new Date(p.published.$t).toLocaleDateString()}</small>
      </a>
    `).join('');
  });
</script>
```

---

## 8. Blogging Checklist (Per Post)

- [ ] Unique title (60 chars max, includes target keyword)
- [ ] Meta description (150-160 chars)
- [ ] Custom URL slug (short, keyword-rich)
- [ ] At least 800 words of content
- [ ] 2-3 internal links to your service pages on hrdnsh.com
- [ ] 1-2 external links to authoritative sources
- [ ] At least 1 image with alt text
- [ ] 3-5 relevant labels/tags
- [ ] Published on a consistent schedule (same day each week)
