# Implementation Plan: Executive Positioning for C-Level, Head of MIS, and Warehouse/Supply Chain Leadership

> **Context**: Enhancing `/resume`, Printable CV, SEO/GEO metadata, structured JSON-LD schemas, and the offline executive CV dossier to target **C-Level (COO/CEO/GM)**, **Head of MIS & Enterprise Systems**, and **Head of Central Warehouse, Inventory & Supply Chain** leadership roles across industrial manufacturing.

**Goal:** Expand Haradhan Sharma's executive positioning to naturally capture high-impact leadership searches for Head of MIS, Enterprise Systems, and Central Warehouse & Supply Chain Operations, backed by 20+ years of factory floor leadership and deep-tech systems architecture.

**Architecture & Alignment:**
- Active Codebase: `/home/haradhansharma/projects/hrdnshastro/` (React 19 + Vite + TypeScript + Tailwind 4)
- Multi-channel consistency: Ensure the website UI, printable PDF document, client router metadata, SSR/SSG pre-rendered static HTML, and JSON-LD structured schemas reflect these core leadership designations without diluting C-level authority.

---

### Task 1: Update Core Executive Data & Competency Pillars (`src/data/services.ts`)
- **Objective:** Enrich profile summary, competencies, career history, and tech stack to highlight Head of MIS / Enterprise Reporting and Central Warehouse / Inventory Control / Material Flow.
- **Specifics:**
  - In `profile.subTitle` and `profile.executiveSummary`: Integrate executive MIS, centralized warehouse control, and operational supply chain coordination.
  - In `profile.executiveCompetencies`:
    - Add/update competency items in *Executive & Factory Leadership*: Central Warehouse Operations & Raw Material / Finished Goods Store Control, Inventory Turn Optimization, FIFO/Lot Tracking, Waste & Pilferage Control.
    - Add/update competency items in *Industrial ERP & Digital Transformation*: Enterprise MIS & Executive Dashboards, Real-Time Shop-Floor & Warehouse Inventory Digitization (WMS/Barcode/RFID integration), Inter-departmental Data Reconciliation (Store, PPC, Accounts, Merchandising).
  - In `careerTimeline` (Fakir Knitwears Ltd.): Highlight master-level oversight over Central Fabric Stores, Accessories Stores, Cutting Store issues, and daily MIS reporting.
- **Verification:** TypeScript typecheck (`npx tsc --noEmit`).

---

### Task 2: Enhance the Web Resume View (`src/components/ResumeHub.tsx`)
- **Objective:** Display the new leadership pillars and availability scopes on the `/resume` page.
- **Specifics:**
  - Header badges: Add badges for `Head of MIS & Enterprise Systems` and `Central Warehouse & Supply Chain Leadership`.
  - Executive Representation Box: Update available roles to explicitly include:
    `C-Level, General Manager (GM), Deputy/Additional General Manager (DGM/AGM), Head of MIS / IT & Enterprise Systems, Head of Central Warehouse & Supply Chain, VP of Operations, and Head of Production Planning & Coordination (PPC)`.
  - Portrait badge tooltip: Update to include MIS and Warehouse operations leadership.
- **Verification:** Inspect rendered markup in dev/build.

---

### Task 3: Update Corporate Printable Executive CV (`src/components/PrintableCV.tsx`)
- **Objective:** Ensure the one-click PDF print view (`window.print()`) incorporates these target roles and credentials.
- **Specifics:**
  - Update letterhead title and subtitle.
  - Update Executive Summary paragraph: Emphasize the unique synthesis of factory PPC, Central Warehouse / Materials Management, Enterprise MIS, and Modern ERP Architecture.
  - Update Executive Availability section at the footer of the CV.
- **Verification:** Verify component compilation and syntax.

---

### Task 4: Enhance SSR Pre-renderer & Structured Data (`scripts/ssr-generator.tsx` & `src/App.tsx`)
- **Objective:** Optimize SEO, GEO (Generative Engine Optimization), and JSON-LD schema for search engines and AI crawlers (Google, Perplexity, ChatGPT).
- **Specifics:**
  - In `scripts/ssr-generator.tsx`:
    - Route `resume`: Update title and meta description to capture "Head of MIS" and "Warehouse & Supply Chain Operations".
    - `basePerson.knowsAbout`: Add `"Management Information Systems (MIS)"`, `"Enterprise Warehouse & Inventory Management (WMS)"`, `"Supply Chain Material Flow & Store Control"`.
  - In `src/App.tsx`:
    - Update `titleStr` and `descStr` for `currentView === 'resume'`.
- **Verification:** Run `npm run build` and `npm run postbuild`, verify `dist/resume/index.html` contains the updated meta tags, H1, and JSON-LD schema.

---

### Task 5: Update Offline Executive CV Dossier (`professional_cv_for_top_positions.md`)
- **Objective:** Align the comprehensive markdown CV used for executive applications and corporate recruiters with the updated designations.
- **Specifics:**
  - Add "Head of MIS" and "Head of Central Warehouse & Inventory / Supply Chain Operations" under target titles and competencies.
  - Highlight Central Stores & Warehouse Coordination and MIS Architecture under Fakir Knitwears and Brand CEO experience.
- **Verification:** Review markdown file for clean structure and formatting.

---

### Overall Verification Strategy:
1. `npx tsc --noEmit` — confirm zero TypeScript errors.
2. `npm run build` — compile production Vite client bundle and catalog.
3. `npm run postbuild` — execute SSG script generating pre-rendered HTML for all routes including `/resume/index.html`.
4. `grep -E "MIS|Warehouse" dist/resume/index.html` — verify static HTML contains new keywords and JSON-LD schema.
