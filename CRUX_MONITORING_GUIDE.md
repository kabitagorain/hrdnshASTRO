# Core Web Vitals Monitoring via Chrome UX Report (CrUX)

## What is CrUX?

The **Chrome User Experience Report (CrUX)** is Google's public dataset of real-user performance data from millions of Chrome users. It measures the **actual** experience of your visitors — not synthetic lab tests.

### The 3 Core Web Vitals

| Metric | What It Measures | Good Threshold |
|--------|----------------|----------------|
| **LCP** (Largest Contentful Paint) | Loading performance — how fast the main content appears | ≤ 2.5s |
| **INP** (Interaction to Next Paint) | Interactivity — how responsive the page feels to clicks | ≤ 200ms |
| **FID** → **INP** | (INP replaced FID in March 2024) | — |
| **CLS** (Cumulative Layout Shift) | Visual stability — how much content shifts around | ≤ 0.1 |

---

## Step 1: Check Your Current CrUX Data (Free)

### Option A: PageSpeed Insights (Easiest)
1. Go to **https://pagespeed.web.dev**
2. Enter your URL: `https://hrdnsh.com`
3. It shows both **Lab data** (Lighthouse) AND **Field data** (CrUX)
4. Check the "Origin" summary for overall site performance
5. Test individual pages:
   - `https://hrdnsh.com/services/agentic-ai-rag-orchestration`
   - `https://hrdnsh.com/resume`
   - etc.

### Option B: CrUX Dashboard (API)
1. Go to **https://cruxdashboard.withgoogle.com/**
2. Add your domain: `hrdnsh.com`
3. It shows LCP, INP, CLS trends over the last 28 days
4. Free — requires Google account

### Option C: web-vitals npm Package (Self-Hosted)
Add real-user monitoring directly to your site using the official `web-vitals` library.

**1. Install the package:**
```bash
npm install web-vitals
```

**2. Add to your Layout.astro (or a new component):**
```astro
---
// src/components/WebVitals.astro
---
<script is:inline>
  // Load web-vitals from CDN (no npm needed for Astro)
  if ('web-vital' in performance) return;
  
  function sendToAnalytics(metric) {
    // Option 1: Send to Google Analytics
    if (typeof gtag === 'function') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
    
    // Option 2: Send to your own endpoint
    // navigator.sendBeacon('/api/vitals', JSON.stringify(metric));
    
    // Option 3: Log to console for debugging
    console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}`);
  }

  // Import web-vitals and observe
  (async () => {
    try {
      const { onLCP, onINP, onCLS, onFCP, onTTFB } = await import('https://esm.run/web-vitals@4');
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onFCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    } catch (e) {
      console.warn('Web Vitals failed to load:', e);
    }
  })();
</script>
```

**3. Include in Layout.astro:**
```astro
---
import WebVitals from '@components/WebVitals.astro';
---
<body>
  <slot />
  <WebVitals />
</body>
```

---

## Step 2: Set Up Google Search Console Core Web Vitals Report

1. Go to **https://search.google.com/search-console**
2. Verify your property (if not already done)
3. Go to **Experience** → **Core Web Vitals**
4. This report uses CrUX data directly
5. It shows which URLs pass/fail each metric
6. **Monitor weekly** — especially after deployments

### What to Look For
- **Poor URLs**: Pages failing any metric (red status)
- **Improved URLs**: Pages that were poor but improved (compare week over week)
- **URL groups**: Grouped by template/pattern (e.g., `/services/*`)

---

## Step 3: Automate Monitoring (Advanced Options)

### Option A: Looker Studio Dashboard (Free)

Create a dashboard that pulls CrUX data automatically:

1. Go to **https://lookerstudio.google.com**
2. Create a new report → **Connect to data** → **BigQuery Public Datasets**
3. Use this SQL:
```sql
SELECT
  date,
  origin,
  SUM(fast_lcp) / SUM(lcp) AS lcp_good_pct,
  SUM(fast_inp) / SUM(inp) AS inp_good_pct,
  SUM(small_cls) / SUM(cls) AS cls_good_pct
FROM
  `chrome-ux-report.all.202405`
WHERE
  origin = 'https://hrdnsh.com'
GROUP BY
  date,
  origin
ORDER BY
  date DESC
```

### Option B: GitHub Actions Weekly Report

Create a GitHub Action that checks your CrUX scores weekly:

```yaml
# .github/workflows/web-vitals-check.yml
name: Weekly Core Web Vitals Check
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check Web Vitals
        run: |
          npm install -g lighthouse
          # Check homepage
          lighthouse https://hrdnsh.com --output=json --chrome-flags="--headless" --only-categories=performance > lighthouse-home.json 2>/dev/null || true
          
          # Extract scores
          LCP=$(node -e "const d=require('./lighthouse-home.json'); console.log(d.audits['largest-contentful-paint'].displayValue)")
          CLS=$(node -e "const d=require('./lighthouse-home.json'); console.log(d.audits['cumulative-layout-shift'].displayValue)")
          INP=$(node -e "const d=require('./lighthouse-home.json'); console.log(d.audits['interactive'].displayValue)")
          
          echo "## Web Vitals Report - $(date)" >> $GITHUB_STEP_SUMMARY
          echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| LCP | $LCP |" >> $GITHUB_STEP_SUMMARY
          echo "| CLS | $CLS |" >> $GITHUB_STEP_SUMMARY
          echo "| INP (estimated) | $INP |" >> $GITHUB_STEP_SUMMARY
```

### Option C: Cloudflare Web Analytics (Already Available!)

Since your site is on Cloudflare, you already have **Cloudflare Web Analytics**:

1. Go to **Cloudflare Dashboard** → **Web Analytics**
2. It provides real-user performance metrics (similar to CrUX)
3. Check **RUM (Real User Monitoring)** → **Performance**
4. No additional setup needed — it's already tracking

---

## Step 4: Performance Budget

Set targets for each metric and monitor against them:

| Metric | Target | Current Status |
|--------|--------|-----------------|
| LCP | ≤ 2.0s | Check with PageSpeed Insights |
| INP | ≤ 150ms | Check with PageSpeed Insights |
| CLS | ≤ 0.05 | Check with PageSpeed Insights |
| TTFB | ≤ 200ms | Check with PageSpeed Insights |
| FCP | ≤ 1.5s | Check with PageSpeed Insights |

### Quick Wins for Astro Sites

Since you're using Astro (zero JS by default), you should already have good scores. Common issues to watch:

1. **LCP too high?** → Preload hero image (`<link rel="preload" as="image" href="/hero-bg.jpg">`)
2. **CLS issues?** → Ensure image/video elements have explicit `width` and `height` attributes
3. **INP too high?** → Alpine.js interactions might block — keep handlers lightweight
4. **TTFB too high?** → Cloudflare Workers should be fast, but check for cold starts

---

## Step 5: Monthly Review Checklist

- [ ] Check **Google Search Console** → Core Web Vitals report
- [ ] Run **PageSpeed Insights** on homepage + 3 random service pages
- [ ] Check **Cloudflare Web Analytics** for performance trends
- [ ] If any metric is "Needs Improvement" or "Poor", investigate and fix before next deploy
- [ ] Compare month-over-month trends (improving = good)
