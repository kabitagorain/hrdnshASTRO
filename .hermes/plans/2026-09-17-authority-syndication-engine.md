# Implementation Plan: Authority Building & Automated Syndication Engine

> **Context**: Continuing from `marketing_materials/` to expand domain authority, search engine indexing signals, AI discoverability (GEO), and high-DA dofollow backlinks for `hrdnsh.com` via canonical syndication, automated publishing scripts, social authority assets, and directory submissions.

**Goal:** Establish an end-to-end Authority & Syndication Engine that publishes authoritative technical content with strict canonical tags pointing to `https://hrdnsh.com`, builds high-value backlinks, and drives qualified enterprise inbound inquiries.

---

### Task 1: Complete Canonical Syndication Articles (`marketing/syndication/`)
- **Objective:** Create complete, platform-optimized markdown articles with exact frontmatter (`canonical_url`, `tags`, `cover_image`, `description`) for the remaining core blog guides on `hrdnsh.com`:
  - `03_devto_hashnode_pgvector_vs_pinecone.md` (Target: pgvector vs Pinecone for Enterprise RAG, canonical: `https://hrdnsh.com/blog/pgvector-vs-pinecone-enterprise-rag/`)
  - `04_devto_hashnode_odoo_vs_erpnext.md` (Target: Odoo vs ERPNext for Industrial Manufacturing, canonical: `https://hrdnsh.com/blog/odoo-vs-erpnext-comparison/`)
  - `05_devto_hashnode_building_private_rag.md` (Target: Private Sovereign RAG Architecture, canonical: `https://hrdnsh.com/blog/building-private-rag-systems/`)
- **Verification:** Markdown frontmatter linting and canonical URL format validation.

---

### Task 2: Build Automated Local Syndication CLI Script (`scripts/syndicate.py`)
- **Objective:** Create a lightweight Python CLI tool (`scripts/syndicate.py`) that runs locally on WSL:
  - Parses frontmatter and body from `marketing/syndication/*.md` files.
  - Validates that `canonical_url` matches `https://hrdnsh.com/blog/*`.
  - Interfaces with DEV.TO API (`https://dev.to/api/articles`) using `DEV_TO_API_KEY`.
  - Provides CLI flags:
    - `--list` (shows all syndication files, target blog URLs, and canonical status)
    - `--dry-run` (validates JSON payload and auth without publishing)
    - `--publish-devto <file>` (publishes draft or live article to DEV.TO with canonical URL intact)
- **Verification:** Execute `python3 scripts/syndicate.py --list` and `python3 scripts/syndicate.py --dry-run marketing/syndication/01_devto_sovereign_ai_vs_chatgpt.md`.

---

### Task 3: Social Thought-Leadership Authority Snippets (`marketing_materials/social_authority/`)
- **Objective:** Author ready-to-publish, high-converting posts for LinkedIn and X (Twitter):
  - **LinkedIn Post 1 (The Factory Floor vs Tech Architect):** How 10 years of PPC at Fakir Knitwears informs custom ERP and WMS architecture today.
  - **LinkedIn Post 2 (Sovereign AI vs ChatGPT Enterprise):** Hard TCO math and data security breakdown for CTOs.
  - **LinkedIn Post 3 (pgvector vs Pinecone):** Why keeping vector embeddings in PostgreSQL beats external vector DBs for 95% of enterprises.
  - Each post contains strong hooks, zero fluff, technical substance, and clean CTAs driving readers to `hrdnsh.com`.
- **Verification:** File inspection and character count / formatting check.

---

### Task 4: High-DA Directory & Community Backlink Blueprint (`marketing_materials/backlink_directory_action_list.md`)
- **Objective:** Create an actionable roster of free, high-authority directories, curated GitHub repositories, and developer platforms:
  - Target platforms: GitHub Awesome RAG/LLM repositories, Open-source ERP communities, IndieHackers, Dev.to listings, AlternativeTo, SaaSHub.
  - Pre-drafted submission text, categories, and anchor links for each platform to ensure rapid manual or assisted execution.
- **Verification:** Verify markdown clarity and link integrity.

---

### Overall Verification Strategy:
1. `python3 scripts/syndicate.py --list` — confirms parsing and canonical tag integrity across all syndication articles.
2. `python3 scripts/syndicate.py --dry-run marketing/syndication/01_devto_sovereign_ai_vs_chatgpt.md` — verifies payload construction and schema compliance.
3. `npm run lint` & `npm run build` — confirm workspace remains clean and uninterrupted.
