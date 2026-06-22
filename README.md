<div align="center">
<img width="1200" height="300" alt="HRDNSH Banner" src="public/og-image.jpg" />
</div>

# HRDNSH Astro + React App

This repository contains a lightweight, high-performance frontend (React + Vite) and a companion Astro reference site in `reference-repo/`. The project powers a services catalog, invoicing/checkout flows, and a PDF catalog generator for Haradhan Sharma's consulting offerings.

**What it includes**
- **UI SPA:** [src/App.tsx](src/App.tsx) — main React single-page app with services catalog, checkout, resume and contact flows.
- **Service data:** [src/data/services.ts](src/data/services.ts) — canonical list of services, pricing, and site metadata.
- **Auth & integrations:** [src/lib/firebase.ts](src/lib/firebase.ts) — Firebase Google Sign-In and access token handling; Sheets/Calendar scopes requested.
- **PDF generator:** `scripts/generate-catalog.ts` — generates `public/Service_Product_Catalog.pdf` used by the Resume/Catalog pages.
- **Reference Astro site:** [reference-repo/](reference-repo/) — example Astro implementation and SEO-focused content.

**Highlights**
- Dynamic SEO (JSON-LD, Open Graph, canonical links) handled in `src/App.tsx`.
- Local invoice ledger and manual payment flows persisted to `localStorage` (see `PaymentCheckout.tsx`).
- Build step runs the PDF generator before producing a production bundle.

**Tech stack**
- **Frontend:** React 19, Vite, TailwindCSS
- **PDF:** pdfkit (used by `scripts/generate-catalog.ts`)
- **Auth & Storage:** Firebase Auth (Google sign-in)
- **Misc:** TypeScript, motion/react, lucide-react icons

**Quick Links**
- File: [src/main.tsx](src/main.tsx)
- File: [src/App.tsx](src/App.tsx)
- File: [scripts/generate-catalog.ts](scripts/generate-catalog.ts)
- File: [src/lib/firebase.ts](src/lib/firebase.ts)

**Repository scripts** (see `package.json`)
- `dev`: run development server (Vite)
- `build`: runs `npx tsx scripts/generate-catalog.ts` then `vite build` (generates PDF then builds)
- `preview`: preview production build
- `clean`: remove `dist` and `server.js`
- `lint`: TypeScript check via `tsc --noEmit`

**Environment variables**
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID` — optional; the app falls back to `firebase-applet-config.json` when present.
- Any other Vite `VITE_*` variables can be placed in an `.env` or `.env.local` file at the project root.

**Setup & Development**
1. Install dependencies:

```bash
npm install
```

2. Start dev server (hot reload):

```bash
npm run dev
```

3. Open http://localhost:3000 (Vite default port is set to `3000` in the dev script).

**Build for production**
1. Generate the service catalog PDF and build the site:

```bash
npm run build
```

2. Preview the built site:

```bash
npm run preview
```

Generated artifacts:
- `public/Service_Product_Catalog.pdf` (created by `scripts/generate-catalog.ts`)
- `dist/` (Vite production build)

**Firebase / Google Sign-In**
- The client initializes Firebase using `firebase-applet-config.json` or `VITE_` environment variables. See [src/lib/firebase.ts](src/lib/firebase.ts).
- The app requests Google Calendar and Google Sheets scopes for integrations. The helper functions expose `googleSignIn()` and `initAuth()` to obtain and manage the access token.

**Payments & Invoicing**
- The checkout flow (`src/components/PaymentCheckout.tsx`) supports manual gateways (bank, bKash, USDT/USDC) and records invoices in `localStorage` under `haradhan_invoices`.
- The UI also produces mailto/WhatsApp links to initiate manual order placement if you prefer off-chain/manual invoicing.

**Project structure (important files)**
- **Root:** `package.json`, `vite.config.ts`, `tsconfig.json`
- **App entry:** [src/main.tsx](src/main.tsx), [src/App.tsx](src/App.tsx)
- **Components:** [src/components/](src/components/) — Header, Hero, ServicesGrid, PaymentCheckout, LeadRecommenderModal, etc.
- **Data & content:** [src/data/services.ts](src/data/services.ts)
- **Scripts:** `scripts/generate-catalog.ts` (PDF generator)
- **Lib:** [src/lib/firebase.ts](src/lib/firebase.ts), [src/lib/sheetsService.ts](src/lib/sheetsService.ts), [src/lib/calendarService.ts](src/lib/calendarService.ts)

**Development notes & tips**
- The build runs the PDF generator first; if you only want to build without generating the PDF you can temporarily modify the `build` script in `package.json`.
- Lint / type-check: `npm run lint` (useful before commits)
- If you need to debug Firebase initialization, provide the `VITE_*` env vars or edit `firebase-applet-config.json` with safe test credentials (do not commit secrets).

**Contributing**
- Open an issue for any feature request or bug.
- PRs should include type-correct changes and a passing `tsc --noEmit` check.

**License & Attribution**
- This repository contains original code by Haradhan Sharma. Add a license file if you wish to open-source the project.

----

If you'd like, I can:
- run `npm run lint` and report any type errors, or
- open a PR that replaces the current `README.md` with this version and run a quick build to confirm the PDF generator runs.

