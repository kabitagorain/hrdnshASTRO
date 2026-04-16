# HRDNSH Astro Portfolio

A personal website built with Astro, Tailwind CSS, and Alpine.js, deployed through Cloudflare Pages. This repo contains HRDNSH's service catalog, resume and recommendation pages, payment route scaffolding, and a custom sitemap generator.

## 🚀 Project overview

The project is a modern Astro portfolio site with:

- Responsive landing page and hero section
- Service overview and dynamic service detail pages
- Resume and recommendation pages
- Privacy policy and terms of service pages
- Cloudflare deployment via `wrangler.jsonc`
- Sitemap generation with Astro
- Custom export and catalog scripts

## 🧰 Technology stack

- Astro 6.x
- Tailwind CSS 4.x
- Alpine.js 3.x
- TypeScript
- Cloudflare Workers / Pages (`@astrojs/cloudflare`, Wrangler)
- `@astrojs/sitemap`

## 📁 Repository structure

- `public/` — static assets and metadata
- `src/components/` — reusable UI components
- `src/layouts/` — application layout templates
- `src/pages/` — routes and dynamic pages
- `src/data/` — service data structure
- `scripts/` — export and catalog generation scripts
- `wrangler.jsonc` — Cloudflare deployment configuration

## 📦 Requirements

- Node.js `>=22.12.0`
- npm
- Python 3 (required by `npm run pdf`)

## 🚧 Local development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open the site at:

```text
http://localhost:4321
```

## 🛠️ Build and preview

Build the project for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## 📜 Available scripts

- `npm run dev` — launch Astro in development mode
- `npm run start` — alias for `astro dev`
- `npm run build` — run `astro check` then build site
- `npm run preview` — preview production output
- `npm run check` — validate Astro setup and TypeScript
- `npm run astro` — run Astro CLI commands directly
- `npm run generate-types` — generate Wrangler TypeScript bindings
- `npm run pdf` — export service data and generate catalog using custom scripts

## 🌐 Routes

- `/` — homepage
- `/resume` — resume page
- `/recommend` — recommendation page
- `/privacy-policy` — privacy policy
- `/terms-of-service` — terms of service
- `/services/[id]` — service detail page
- `/payment/[id]` — payment route page
- `/sitemap.xml` — sitemap index

## 🚀 Deployment

This site is configured for Cloudflare deployment. The `wrangler.jsonc` file points to the Astro Cloudflare server entrypoint and serves assets from `./dist`.

Use Wrangler or your Cloudflare Pages workflow to publish the site.

## 💡 Notes

- The `scripts/export-services.mjs` and `scripts/generate-catalog.py` scripts are used to generate service catalog assets.
- Tailwind is integrated through `@tailwindcss/vite` and configured in Astro.
- Alpine.js provides lightweight interactive behavior for frontend components.

## 🤝 Contribution

This repository is set up as a personal portfolio. If you make enhancements, test locally with `npm run dev` and `npm run build` before deploying.
