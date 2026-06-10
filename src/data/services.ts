// Service definitions — single source of truth
export const services = [
  {
    id: "agentic-ai-rag-orchestration",
    number: "01",
    category: "AI & Automation",
    updatedAt: "2026-03-15",
    title: "Enterprise Agentic AI & Sovereign RAG Infrastructure",
    tagline:
      "Transform corporate knowledge into a high-accuracy autonomous workforce with secure RAG pipelines.",
    icon: "🧠",
    pricing: {
      oneTime: 1499, // Architecture for vector databases & agentic tool-calling
      weekly: 299, // Model fine-tuning, token optimization, and logic updates
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        'Generic AI bots are a liability—they hallucinate and leak sensitive data. I build "Sovereign AI" systems that act as expert employees. By implementing an Enterprise RAG (Retrieval-Augmented Generation) pipeline, your AI only speaks from your verified private data, ensuring 100% factual accuracy and zero-trust security.',
      benefits: [
        "Sovereign Data Intelligence: AI that masters your specific business logic and documentation without leaking it",
        'Autonomous ROI Workflows: Agents that don\'t just "chat" but actually book meetings, update CRMs, and generate reports',
        "Hallucination Mitigation: Advanced grounding techniques to ensure the AI never makes up facts",
        "Enterprise-Grade Privacy: Fully isolated VPC or on-premise deployment to keep your IP completely private",
      ],
    },
    developer: {
      summary:
        'Implementation of production-grade RAG pipelines using LangChain/LlamaIndex and high-performance Vector Databases (Pinecone/Weaviate/pgvector). Specializing in "Agentic Tool-Calling" where LLMs interact with secure Django/FastAPI endpoints via a hardened middleware layer.',
      benefits: [
        "High-Scale Vector Indexing: Optimized retrieval for million-document corpora with sub-second latency",
        "Semantic Chunking Strategies: Advanced NLP recursive splitting to maximize context relevancy",
        "Safe Tool-Use Execution: Sandbox-isolated execution for LLM-generated Python functions and SQL queries",
        "AI Observability: Integrated evaluation frameworks (Ragas/Giskard) to quantify accuracy and drift",
      ],
    },
    deliverables: [
      "Production-Ready Sovereign Vector Database Setup",
      "Secure API Gateway for Multi-Model LLM Orchestration",
      "Custom Multi-Agent Workflow Logic Design",
      "AI Accuracy Evaluation Report (Ground Truth Analysis)",
      "1-Month Hallucination Audit & Performance Tuning",
    ],
    timeline:
      "2-3 weeks for initial architecture; ongoing weekly optimization for accuracy and latency",
    techStack: [
      "Python",
      "LangChain",
      "PostgreSQL (pgvector)",
      "Redis",
      "Docker",
      "Ragas",
    ],
  },
  {
    id: "openclaw-enterprise-web-gateway",
    number: "02",
    category: "AI & Automation",
    updatedAt: "2026-03-15",
    title: "OpenClaw Enterprise AI Gateway & Model Orchestration",
    tagline:
      "Secure, web-accessible AI orchestration with multi-model routing and enterprise-grade infrastructure hardening.",
    icon: "🤖",
    pricing: {
      oneTime: 699, // Architecture, Web UI hardening, and Model/API orchestration
      weekly: 149, // Uptime monitoring, security patches, and model cost optimization
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "Raw AI power is often trapped in complex terminals or local machines, creating a barrier to scaling. I deploy a turnkey, cloud-hosted OpenClaw Enterprise Gateway that bridges this gap. This provides your team with a secure, browser-based command center to manage multi-model AI logic (GPT-4, Claude, Llama) without touching a single line of code, while I handle the underlying security and server stability.",
      benefits: [
        "Enterprise Access Control: Manage your AI workforce from any device with encrypted, role-based authentication",
        "Model-Agnostic Intelligence: Seamlessly switch between OpenAI, Anthropic, or Local LLMs via a single unified gateway",
        "Managed AI Infrastructure: Zero-friction deployment—I handle the server scaling, security patches, and uptime",
        "Sovereign Control: Your own dedicated instance, your own API keys, and your own data—completely isolated from public clouds",
      ],
    },
    developer: {
      summary:
        "Implementation of a hardened OpenClaw Gateway utilizing Docker-based isolation and high-performance Nginx reverse proxies. I specialize in complex model routing (A2A), SSL/TLS termination, and stateful session management to ensure reliable agent execution and persistent conversation history across distributed sessions.",
      benefits: [
        "Secure Edge Gateway: Hardened exposure of the OpenClaw UI with custom auth layers and DDoS mitigation",
        "Intelligent Model Fallback: Configurable primary/secondary model routing to ensure 99.9% system availability",
        "Containerized Sandboxing: Strict Docker isolation to prevent agent code-execution escapes and system compromise",
        "Persistent State Management: Integrated PostgreSQL/Redis layers for reliable memory logs and session persistence",
      ],
    },
    deliverables: [
      "Encrypted Enterprise AI Dashboard (Web-Accessible)",
      "Hardened VPS Infrastructure Blueprint (Nginx/Docker/Firewall)",
      "Multi-Model Orchestration Matrix & API Key Integration",
      "Automated Security Patching & Weekly Backup Pipeline",
      "Custom Integration Framework for Webhooks & Enterprise Channels (Slack/Telegram)",
    ],
    timeline:
      "7-10 days for initial deployment; ongoing weekly infrastructure hardening and model optimization",
    techStack: [
      "OpenClaw",
      "Docker",
      "Nginx (SSL)",
      "PostgreSQL",
      "Python/Node.js",
      "Redis",
    ],
  },
  {
    id: "private-ai-agent-vps",
    number: "03",
    category: "AI & Automation",
    updatedAt: "2026-03-15",
    title: "Private AI Employee (Sovereign Self-Hosted Agents)",
    tagline:
      "Deploy a 24/7 digital workforce on your own hardware with zero recurring API costs.",
    icon: "🤖",
    pricing: {
      oneTime: 599, // High value: eliminates monthly API taxes
      weekly: 149, // Maintenance for SEO crawling, model updates, and performance tuning
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        'Stop paying "AI taxes" to OpenAI or Anthropic. I deploy a secure, 24/7 AI assistant that lives entirely on your server. It handles SEO monitoring, market research, and customer inquiries using top-tier open-source models—meaning zero monthly subscriptions and absolute data ownership.',
      benefits: [
        "Zero API Overhead: Leverage Gemma 4 for high-tier reasoning with no per-token costs",
        "Absolute Data Sovereignty: Your business intelligence never leaves your private VPS",
        "Autonomous Growth Engine: An agent that crawls the web and optimizes your SEO while you sleep",
        "Operational Scalability: Automate repetitive data entry and Python/Django tasks without adding headcount",
      ],
    },
    developer: {
      summary:
        "Production-grade deployment of Autonomous Agents using OpenClaw and Ollama. Features native tool-calling with Gemma 4, localized RAG, and seamless integration with existing FastAPI/Django backends via a secure reverse proxy.",
      benefits: [
        "Advanced Agent Orchestration: OpenClaw gateway for complex, multi-step task execution",
        "Gemma 4 Native Intelligence: High-speed reasoning with a massive 128K context window",
        "Localized Vector Search: Integrated RAG pipeline using ChromaDB or PostgreSQL pgvector",
        "Hardened Deployment: Dockerized environment with CloudPanel Reverse Proxy and SSL encryption",
      ],
    },
    deliverables: [
      "Sovereign AI Agent (OpenClaw) deployed on your private VPS",
      "Ollama Backend with Gemma 4 E4B optimized for high-performance RAM usage",
      "Custom SEO & Web-Intelligence skills integrated",
      "Secure CloudPanel Dashboard for real-time monitoring and logs",
      "Sovereign Handover Guide for adding new business knowledge",
    ],
    timeline:
      "7-10 days for deployment; ongoing weekly optimization for model performance",
    techStack: [
      "Gemma 4",
      "OpenClaw",
      "Ollama",
      "Django/FastAPI",
      "Docker",
      "CloudPanel",
    ],
  },
  {
    id: "high-concurrency-backend-optimization",
    number: "04",
    category: "Backend & Infrastructure",
    updatedAt: "2026-03-15",
    title: "Enterprise Backend Scaling & High-Concurrency Engineering",
    tagline:
      "Eliminate bottlenecks and scale your infrastructure to 10K+ concurrent users with industrial-grade <50ms latency.",
    icon: "⚡",
    pricing: {
      oneTime: 899, // Premium pricing for specialized Python/Async architecture
      weekly: 199, // Ongoing performance monitoring and scaling
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "In the digital economy, latency is a direct leak in your revenue. A 1-second delay can crash your conversion rates and drive users to competitors. I transform sluggish, fragile backends into high-performance engines capable of handling massive traffic surges without a single second of downtime. I don't just 'fix' the speed; I re-engineer your architecture for infinite scalability.",
      benefits: [
        "Zero-Loss Scaling: Handle 10x traffic spikes effortlessly without system crashes",
        "Ultra-Low API Latency: Sub-50ms response times that maximize user retention and SEO rankings",
        "Infrastructure Cost Reduction: Optimized resource utilization to slash your monthly VPS/Cloud bills",
        "Rock-Solid Reliability: Asynchronous processing to ensure heavy tasks never block your user experience",
      ],
    },
    developer: {
      summary:
        "Deep-level architectural optimization of Python-based ecosystems (Django/FastAPI). I specialize in transitioning synchronous blockers to High-Performance Async Python, implementing advanced PostgreSQL/MySQL query execution plans, and deploying distributed task queues to resolve critical system bottlenecks.",
      benefits: [
        "Non-Blocking I/O Architecture: Full migration from sync blockers to high-concurrency Async Python",
        "Deep Query Tuning: EXPLAIN ANALYZE-driven optimization of complex SQL joins and indexing strategies",
        "Distributed State Management: Enterprise Celery & Redis orchestration for heavy background workloads",
        "Real-Time Event Streaming: Implementation of bi-directional communication via Django Channels and WebSockets",
      ],
    },
    deliverables: [
      "Full-Stack Performance Audit & Latency Benchmark Report",
      "Database Schema Refactoring & Strategic Indexing Map",
      "Distributed Caching Layer (Redis) & Background Worker Pipeline",
      "Hardened Nginx Configuration & Dockerized Horizontal Scaling Strategy",
      "Post-Optimization Stress Test & Stability Certification",
    ],
    timeline:
      "1-2 weeks for architectural overhaul; ongoing weekly performance monitoring",
    techStack: [
      "Python (Asyncio)",
      "PostgreSQL / MySQL",
      "Redis",
      "Celery",
      "Nginx",
      "Docker / Kubernetes",
    ],
  },
  {
    id: "fullstack-modern-web-architecture",
    number: "05",
    category: "Full-Stack Web Development",
    updatedAt: "2026-03-15",
    title: "High-Conversion Full-Stack Ecosystems & Performance Engineering",
    tagline:
      "Engineering ultra-lean, SEO-dominant web applications using Island Architecture for instant load times and maximum revenue.",
    icon: "🚀",
    pricing: {
      oneTime: 2999, // Premium pricing for specialized "Island Architecture" & SEO expertise
      weekly: 249, // Continuous performance auditing and feature scaling
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "In an era of 2-second attention spans, a slow website is a failed business. Most 'modern' apps are bloated with JavaScript that kills your SEO and drives customers away. I build high-performance digital ecosystems—from complex inventory portals to high-converting e-commerce engines—using a revolutionary 'Island Architecture.' The result is a site that feels instant, ranks higher on Google, and converts visitors into customers with zero friction.",
      benefits: [
        "Competitive Speed Advantage: Near-instant interaction using Astro and HTMX to outperform your competition",
        "SEO Dominance: Server-Side Rendering (SSR) and Static Generation designed specifically to rank #1 on Google",
        "Frictionless User Experience: Modern, high-end UI crafted with TailwindCSS for a premium feel on any device",
        "Infrastructure Sovereignty: Secure, Dockerized hosting on high-speed VPS to ensure your business never goes offline",
      ],
    },
    developer: {
      summary:
        "Architecting sophisticated, low-bloat web ecosystems using Nuxt 3 and Astro. I specialize in eliminating 'JavaScript Fatigue' by implementing Island Architecture and replacing heavy client-side frameworks with Alpine.js and HTMX for reactive, low-latency logic. All deployments are handled via Dockerized microservices on optimized Linux environments.",
      benefits: [
        "Hybrid Rendering Strategy: Combining NuxtJS (Full SSR) and Astro (Island Architecture) to minimize TTI (Time to Interactive)",
        "Zero-JS by Default: Using HTMX and Alpine.js to strip away heavy JS bundles and reduce hydration overhead",
        "Atomic CSS Implementation: Rapid, scalable UI development using TailwindCSS for maintainable design systems",
        "Production-Grade DevOps: Containerized deployment via Docker Compose on dedicated, tuned Linux VPS",
      ],
    },
    deliverables: [
      "Enterprise Full-Stack Application (Sovereign Frontend + Hardened Backend)",
      "High-Performance Database Architecture (PostgreSQL/MySQL Optimized)",
      "SEO-Dominant UI/UX Design with TailwindCSS/Bootstrap",
      "Dockerized Production Deployment with SSL & Automated CI/CD",
      "Post-Launch Core Web Vitals Audit & SEO Optimization Report",
      "45-Day Priority Technical Support & Performance Tuning",
    ],
    timeline:
      "4-8 weeks for full ecosystem deployment; ongoing weekly optimization",
    techStack: [
      "NuxtJS",
      "Astro",
      "VueJS",
      "HTMX",
      "Alpine.js",
      "TailwindCSS",
      "Docker",
      "Linux VPS",
    ],
  },
  {
    id: "industrial-automation-erp",
    number: "06",
    category: "Enterprise & ERP",
    updatedAt: "2026-03-15",
    title: "Industrial Intelligence & Custom Manufacturing ERP",
    tagline:
      "Bridging the gap between the production floor and the boardroom with real-time operational transparency.",
    icon: "🏭",
    pricing: {
      oneTime: 4999, // High-ROI investment in operational efficiency and waste reduction
      weekly: 299, // Continuous logic optimization, sensor maintenance, and reporting updates
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "Managing a factory with spreadsheets and manual logs is like flying a plane blind—you only realize there's a problem after the crash. I replace the chaos of manual tracking with a custom-built Industrial ERP designed specifically for the unique pressures of Garments, Textiles, and Heavy Industry. I give you a 'God-eye view' of your entire operation, from raw material arrival to final export, so you can stop guessing and start growing.",
      benefits: [
        "Absolute Shop-Floor Visibility: Track every single unit and garment through every stage of production in real-time",
        "Zero-Waste Inventory Control: Automated low-stock alerts and QR-driven tracking to eliminate material leakage",
        "Fact-Based Decision Making: Stop relying on 'gut feeling' with one-click production, efficiency, and payroll reports",
        "Operational Peace of Mind: Digital workflows that catch production errors before they become expensive mistakes",
      ],
    },
    developer: {
      summary:
        "Engineering a high-concurrency MRP (Manufacturing Resource Planning) architecture. I utilize Django Ninja for ultra-low latency API performance and Astro for high-refresh monitoring dashboards. The system is designed for industrial resilience, featuring IoT sensor integration (MQTT), barcode/QR logic, and distributed Celery tasks for heavy-duty reporting.",
      benefits: [
        "High-Performance Core: Type-safe, asynchronous REST APIs using Django Ninja for maximum throughput",
        "IIoT Integration: Native support for PLC, MQTT, and sensor-based automated production counting",
        "Edge-Optimized Dashboards: Astro and Alpine.js for lightweight, instant-load interfaces on factory-floor tablets",
        "Industrial-Grade Security: Strict Role-Based Access Control (RBAC) with comprehensive immutable audit logging",
      ],
    },
    deliverables: [
      "Custom Modular ERP Suite (Inventory, Production, HR, & Payroll)",
      "Hardened Barcode/QR Integration for end-to-end material traceability",
      "Live Factory Floor Intelligence Dashboard (Astro-powered)",
      "Automated Industrial Reporting Engine (Celery-based PDF/Excel generation)",
      "Comprehensive User Training Framework & 90-Day Priority Operational Support",
    ],
    timeline:
      "8-12 weeks for full architectural deployment; ongoing weekly optimization and sensor tuning",
    techStack: [
      "Django Ninja",
      "Python",
      "Astro",
      "PostgreSQL",
      "Redis",
      "Docker",
      "MQTT",
    ],
  },
  {
    id: "erpnext-crm-deployment",
    number: "07",
    category: "Enterprise & ERP",
    updatedAt: "2026-03-15",
    title: "Sovereign Business OS: Open-Source ERP & CRM Implementation",
    tagline:
      "Break free from the 'Subscription Tax' with a license-free, enterprise-grade management system you own forever.",
    icon: "📊",
    pricing: {
      oneTime: 3999, // High value for complex Frappe/Python environments and data migration
      weekly: 249, // Managed backups, security patching, and custom business-logic scripts
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "Most enterprise software is designed to bleed you dry with 'per-user' licenses that increase as your company grows. I help you achieve operational independence by deploying a Sovereign Business OS (ERPNext/Odoo). You get the full power of a world-class CRM, Accounting, HR, and Supply Chain system on your own private cloud—with unlimited users, zero recurring license fees, and total ownership of your data.",
      benefits: [
        "End the Subscription Tax: Stop paying monthly 'per-seat' fees and keep your growth costs at zero",
        "360° Operational Command: A single, unified source of truth for your Accounting, Sales, and Warehouse",
        "Absolute Data Sovereignty: Your business intelligence lives on your hardware, not a third-party corporate server",
        "Tailored Business Logic: Custom automated workflows for approvals, emails, and reporting that fit your specific culture",
      ],
    },
    developer: {
      summary:
        "Professional orchestration of the Frappe Framework and ERPNext ecosystem. I specialize in high-availability MariaDB/PostgreSQL configurations, Redis-backed Bench optimization, and custom Python-based server hooks. All deployments are standardized via Docker to ensure seamless scalability and effortless disaster recovery.",
      benefits: [
        "Frappe Framework Mastery: Engineering custom DocTypes, complex Client Scripts, and deep Server Hooks",
        "Sovereign Infrastructure: Docker-based multi-tenant deployments on hardened Ubuntu VPS environments",
        "Enterprise Data Migration: Expert ETL pipelines to transition legacy Excel or SAP data into ERPNext without loss",
        "Unified API Ecosystem: Connecting your sovereign ERP to Shopify, WooCommerce, or custom internal applications",
      ],
    },
    deliverables: [
      "Fully Optimized Sovereign ERPNext/CRM instance on your private VPS",
      "Enterprise Security Suite (SSL, Firewall, and Immutable Automated Backups)",
      "Custom-Configured Modules (Sales, Purchase, Inventory, and Accounts)",
      "Role-Based Access Control (RBAC) & Comprehensive Employee Training",
      "Dockerized Infrastructure for zero-friction future migrations",
      "60-Day Post-Implementation Technical Audit & Performance Tuning",
    ],
    timeline: "4-10 weeks for full implementation and data migration",
    techStack: ["ERPNext", "Frappe", "Python", "MariaDB", "Redis", "Docker"],
  },
  {
    id: "algorithmic-trading-fintech",
    number: "08",
    category: "Financial & Trading",
    updatedAt: "2026-03-15",
    title: "Quantitative Trading Systems & FinTech Automation",
    tagline:
      "Engineering institutional-grade algorithmic execution to extract a mathematical edge from Global Markets.",
    icon: "📈",
    pricing: {
      oneTime: 1499, // Quantitative engineering and strategy architecture
      weekly: 199, // Strategy drift monitoring, server health, and parameter optimization
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "In professional trading, emotion is a liability. Human hesitation, fatigue, and greed are the primary reasons strategies fail. I build systematic, institutional-grade trading engines that execute your logic 24/7 with mathematical precision. Whether you are scaling a Forex strategy on MetaTrader 5 or automating a Crypto portfolio on Binance, I remove the human element, ensuring your edge is executed perfectly, every single time.",
      benefits: [
        "Systematic Market Participation: Eliminate emotional bias and execute your edge with 100% consistency",
        "Multi-Platform Orchestration: Unified automation across MT5, TradingView, and Major Exchange APIs",
        "Quantitative Validation: Rigorous backtesting against years of tick-data to prove the strategy's viability",
        "Institutional Risk Guard: Hard-coded capital preservation via automated stop-losses and dynamic position sizing",
      ],
    },
    developer: {
      summary:
        "Engineering high-performance quantitative solutions using Python and MQL5. I specialize in low-latency WebSocket data streams, vectorized backtesting with Pandas/NumPy, and cross-platform bridge development. All systems are deployed in Dockerized environments on ultra-low latency Linux VPS to ensure 99.9% execution reliability.",
      benefits: [
        "Professional MQL5 Engineering: Development of high-precision Expert Advisors (EA) for MetaTrader 5",
        "Low-Latency Data Pipelines: Real-time market processing via high-speed Binance & TradingView WebSockets",
        "Distributed Quantitative Architecture: Redis-backed message queuing for multi-symbol, high-frequency strategies",
        "Advanced Pine Script Logic: Transforming complex TradingView indicators into fully automated execution flows",
      ],
    },
    deliverables: [
      "Custom Quantitative Trading Engine / Expert Advisor (EA) Source Code",
      "Vectorized Backtesting Report (inclusive of Sharpe, Sortino, and Drawdown Analysis)",
      "Real-Time Execution & WebSocket Monitoring Dashboard",
      "Sovereign Risk Management & Capital Preservation Module",
      "Dockerized Deployment on a Hardened, Low-Latency Cloud VPS",
      "Quantitative Strategy Fine-Tuning & Parameter Optimization Session",
    ],
    timeline: "2-4 weeks for strategy engineering and deployment",
    techStack: [
      "Python (Pandas/NumPy)",
      "MQL5",
      "MetaTrader 5",
      "Binance / Exchange APIs",
      "Redis",
      "Docker",
      "Linux VPS",
    ],
  },
  {
    id: "devops-security-hardening",
    number: "09",
    category: "Backend & Infrastructure",
    updatedAt: "2026-03-15",
    title: "Sovereign Cloud Hardening & Zero-Downtime DevOps",
    tagline:
      "Build an unbreakable digital foundation with automated, self-healing infrastructure and zero-trust security.",
    icon: "🔒",
    pricing: {
      oneTime: 699, // Architecture, Cloudflare WAF hardening, and CI/CD pipeline engineering
      weekly: 129, // Infrastructure retainer for monitoring, security patching, and disaster recovery
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "A single server crash or a data breach can destroy years of brand trust in seconds. Most businesses run on fragile setups that are one mistake away from a total blackout. I build 'Sovereign' infrastructure—self-healing environments that protect your business from hackers and ensure your updates launch perfectly every time. I provide the invisible shield that allows you to scale your business without the anxiety of technical failure.",
      benefits: [
        "Zero-Downtime Evolution: Deploy new features and updates while your customers are active, with zero interruption",
        "Fortified Edge Security: Multi-layer defense using Cloudflare Zero Trust and WAF to block attacks before they hit your server",
        "Ironclad Disaster Recovery: Automated, off-site backups and a 1-click restoration plan to ensure you never lose a byte of data",
        "Sovereign Cost Efficiency: Precise VPS resource tuning that eliminates wasted spend and lowers your monthly cloud bills",
      ],
    },
    developer: {
      summary:
        "Advanced SRE (Site Reliability Engineering) focusing on immutable infrastructure and Zero-Trust architecture. I implement high-performance Nginx reverse proxies, GitHub Actions for automated CI/CD, and rigorous vulnerability scanning to ensure total system compliance and server-side stability.",
      benefits: [
        "Automated CI/CD Pipelines: Multi-stage GitHub Actions for seamless testing, staging, and production deployment",
        "Immutable Containerization: Standardized Docker environments for total portability and environment parity",
        "Hardened Edge Orchestration: High-performance Nginx tuning with SSL/TLS 1.3 and strict header hardening",
        "Zero-Trust Cloud Security: Implementation of Cloudflare Tunnel, Firewall Rules, and authenticated access layers",
      ],
    },
    deliverables: [
      "Hardened Dockerized Application Ecosystem (Dev → Staging → Production)",
      "Enterprise-Grade GitHub Actions CI/CD Pipeline",
      "Cloudflare WAF & Zero-Trust Security Architecture Setup",
      "Optimized Nginx Reverse Proxy & Auto-Renewing SSL Infrastructure",
      "Immutable Off-site Backup & Rapid Recovery System",
      "Real-Time Infrastructure Health Monitoring & Critical Alerting Dashboard",
    ],
    timeline:
      "1-2 weeks for initial hardening; ongoing weekly security auditing and performance tuning",
    techStack: [
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Cloudflare Zero Trust",
      "Linux (Hardened)",
      "SSL/TLS 1.3",
    ],
  },
  {
    id: "ecommerce-reliability-maintenance",
    number: "10",
    category: "E-Commerce",
    updatedAt: "2026-03-15",
    title: "eCommerce Revenue Protection & Technical Stewardship",
    tagline:
      "Eliminating the 'Fear of the Crash' with zero-downtime maintenance for high-growth online stores.",
    icon: "🛠️",
    pricing: {
      oneTime: 399, // Comprehensive system audit, security hardening, and baseline optimization
      weekly: 99, // 24/7 proactive monitoring, security patching, and emergency response
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "Your online store is your most hardworking employee—it sells 24/7 without a break. But when a plugin conflicts, a server lags, or a database crashes, your 'salesperson' vanishes, and your revenue drops to zero instantly. I provide professional technical stewardship for your platform, removing the anxiety of 'what if it breaks?' I ensure your store remains lightning-fast and bulletproof, so you can focus on marketing and growth while I protect the engine that powers your profit.",
      benefits: [
        "Slay Cart Abandonment: Ultra-optimized checkout flows that remove technical friction and keep customers buying",
        "Ironclad Brand Trust: Regular security patches and proactive malware scans to ensure customer data is never compromised",
        "Absolute Data Insurance: Automated, off-site backups that guarantee your orders and customer lists are never lost",
        "Entrepreneurial Freedom: Priority emergency response and 24/7 monitoring, giving you the peace of mind to actually sleep at night",
      ],
    },
    developer: {
      summary:
        "Proactive infrastructure governance across WooCommerce, Shopify, and OpenCart ecosystems. I specialize in deep PHP/Liquid optimization, database indexing for massive product catalogs, and server-side performance tuning. I implement advanced integration logic via Amazon SP-API to ensure seamless, automated multi-channel inventory synchronization.",
      benefits: [
        "WooCommerce Performance Tuning: Deep MySQL/PHP optimization and critical plugin compatibility audits",
        "Shopify Architecture Optimization: Expert Liquid theme refactoring to eliminate render-blocking JS and improve LCP",
        "Multi-Channel Sync Automation: Enterprise-grade Amazon SP-API integration for real-time inventory precision",
        "Sovereign Server Governance: Proactive uptime monitoring, SSL lifecycle management, and scheduled database vacuuming",
      ],
    },
    deliverables: [
      "Weekly Core, Theme, and Plugin/App Security & Compatibility Updates",
      "Automated Daily Off-site Backups with Verified Recovery Testing",
      "24/7 Proactive Uptime Monitoring with Real-time Slack/Email Alerting",
      "Database Indexing & Static Asset Optimization for Maximum Speed",
      "Monthly Security Audit & Core Web Vitals Performance Report",
      "Priority Technical Support 'Bat-Phone' for Critical Site Emergencies",
    ],
    timeline:
      "7-10 days for initial audit and hardening; ongoing weekly stewardship and optimization",
    techStack: [
      "WooCommerce",
      "Shopify",
      "OpenCart",
      "Amazon SP-API",
      "PHP",
      "Linux VPS",
      "MySQL/MariaDB",
    ],
  },
  {
    id: "manufacturing-automation-erp",
    number: "11",
    category: "Enterprise & ERP",
    updatedAt: "2026-03-15",
    title: "Shop Floor Intelligence & Real-Time Production Tracking",
    tagline:
      "Eliminate production blindness with sub-second latency and industrial-grade automated reporting.",
    icon: "⚙️",
    pricing: {
      oneTime: 2499, // Custom ERP module development and Industrial IoT bridge
      weekly: 499, // Real-time monitoring, hardware-layer maintenance, and data integrity backups
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "If you're relying on spreadsheets to track your production, you're operating with a blind spot. By the time a mistake is recorded in a log, the revenue is already lost. I build high-speed, industrial ERP modules that give you an 'Operational Truth' in real-time. From the moment raw material hits the floor to the second the final product is dispatched, you get complete command-center visibility of your factory with instant alerts that stop bottlenecks before they kill your margin.",
      benefits: [
        "End the Spreadsheet Nightmare: Replace manual logs with automated Barcode and IoT tracking for 100% data accuracy",
        "Instant Bottleneck Awareness: Receive real-time alerts the moment a production line slows down, allowing you to pivot instantly",
        "Predictive Material Flow: Stop guessing your stock levels with automated re-ordering based on actual real-time production speed",
        "Boardroom-Ready Intelligence: Transform raw floor data into high-level financial and operational reports for stakeholders",
      ],
    },
    developer: {
      summary:
        "Engineering resilient, low-latency backends tailored for volatile industrial environments. I specialize in 'Offline-First' architecture, ensuring your factory floor remains fully operational even during network outages, with seamless background synchronization utilizing Celery and RabbitMQ/Redis for total data consistency.",
      benefits: [
        "Industrial IoT Gateway: Securely bridging hardware sensors and PLC data to high-performance Django-Ninja backends",
        "Event-Driven Shop Floor: Utilizing WebSockets for zero-lag, real-time updates of production states",
        "High-Integrity Schema Design: Complex relational modeling for multi-stage manufacturing and material traceability",
        "Edge Computing Orchestration: Deploying localized Docker nodes to ensure ultra-low latency processing at the machine level",
      ],
    },
    deliverables: [
      "Custom Industrial Intelligence Suite (Production Tracking Web Dashboard)",
      "Sovereign IoT/Scanner Integration Bridge",
      "Immutable Industrial Reporting Engine (Automated PDF/Excel Generation)",
      "Hardened On-Site or Private Cloud Server Configuration",
      "Floor-Operator & Management Training Framework",
    ],
    timeline:
      "4-6 weeks for initial architecture and hardware bridging; ongoing weekly optimization and sensor tuning",
    techStack: [
      "Django",
      "PostgreSQL",
      "RabbitMQ",
      "MQTT",
      "Celery",
      "Channels",
      "Docker",
      "Astro",
    ],
  },
  {
    id: "ecommerce-performance-hardening",
    number: "12",
    category: "E-Commerce",
    updatedAt: "2026-03-15",
    title: "E-commerce Conversion Engineering & Edge Security Hardening",
    tagline:
      "Maximize your ROI by eliminating latency and securing your revenue stream with industrial-grade edge protection.",
    icon: "🛡️",
    pricing: {
      oneTime: 1200, // Varnish/Nginx architectural overhaul and Layer 7 WAF configuration
      weekly: 150, // Bot mitigation monitoring, cache-hit ratio tuning, and edge-node optimization
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "In e-commerce, speed isn't a luxury—it's a direct multiplier of your profit. A mere 1-second delay in page load can slash your conversions by 7%. I transform standard OpenCart/WooCommerce stores into high-velocity conversion engines. Beyond speed, I build a digital fortress around your store to stop competitors from scraping your pricing data and block automated checkout attacks before they hit your bottom line.",
      benefits: [
        "Slay Latency & Boost Sales: Achieve near-instant load times using advanced Varnish and Redis edge-caching layers",
        "Price Sovereignty: Deploy advanced bot-detection to stop competitors from scraping your pricing and stealing your market edge",
        "Fraud-Proof Your Revenue: Implement hardened checkout protocols to neutralize automated payment testing and fraudulent orders",
        "Automatic SEO Dominance: Eliminate the 'speed penalty' to rank higher on Google and capture more organic traffic",
      ],
    },
    developer: {
      summary:
        "Advanced server-side engineering focusing on the reduction of TTFB (Time to First Byte). I specialize in Nginx vHost tuning, custom Varnish VCL policy writing, and Layer 7 Firewall (WAF) implementation to secure the application layer while maintaining maximum throughput.",
      benefits: [
        "Varnish VCL Customization: Engineering strategic cache-purging logic to ensure real-time inventory accuracy without sacrificing speed",
        "Hardened Nginx Edge: Implementation of strict rate-limiting and custom security headers to prevent L7 DDoS attacks",
        "Database Query Optimization: Deep-dive analysis to eliminate slow JOINs and optimize e-commerce schema for million-product catalogs",
        "SSL/TLS Performance Tuning: Modernizing cipher suites and implementing OCSP stapling for faster, secure handshakes",
      ],
    },
    deliverables: [
      "Deep-Dive Security & Performance Audit (Latency & Vulnerability Report)",
      "Custom-Engineered Varnish/Nginx Configuration Suite",
      "Enterprise-Level Cloudflare WAF & Bot-Mitigation Rule-set",
      "Automated Database Optimization & Indexing Scripts",
      "Post-Setup Stress Test (Simulating 5k+ simultaneous shoppers to certify stability)",
    ],
    timeline:
      "7-10 days for initial architectural hardening; ongoing weekly edge-tuning and bot monitoring",
    techStack: [
      "Nginx",
      "Varnish",
      "Redis",
      "OpenCart / WooCommerce",
      "Linux Hardening",
      "Layer 7 WAF",
    ],
  },
  {
    id: "personal-portfolio-high-conversion",
    number: "13",
    category: "Full-Stack Web Development",
    updatedAt: "2026-03-15",
    title: "High-Performance Personal Brand & Portfolio Ecosystems",
    tagline:
      "Ultra-fast, professional personal portfolio designed to land high-paying clients, by Haradhan Sharma.",
    icon: "👤",
    pricing: { oneTime: 999, weekly: 49 },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "I build high-performance portfolios that load instantly, rank on Google, and convert visitors into leads automatically.",
      benefits: [
        "SEO dominance",
        "Instant load times",
        "High-conversion CTA integration",
        "Professional hosting setup",
      ],
    },
    developer: {
      summary:
        "Engineered using Astro, TailwindCSS, and Alpine.js for a performant, zero-bloat experience.",
      benefits: [
        "Astro Island Architecture",
        "Responsive Design",
        "Fast deployment",
        "Google-optimized meta tags",
      ],
    },
    deliverables: [
      "Landing page",
      "Project showcase",
      "Resume integration",
      "Booking/Contact CTA",
      "Hosting setup",
    ],
    timeline: "5-7 days",
    techStack: ["Astro", "TailwindCSS", "Alpine.js"],
  },
  {
    id: "legal-specialized-rag-infrastructure",
    number: "14",
    category: "AI & Automation",
    updatedAt: "2026-03-15",
    title: "Lawyer-Specialized Sovereign RAG Infrastructure",
    tagline:
      "Private, secure, and fact-verified RAG for legal teams to analyze case law securely.",
    icon: "⚖️",
    pricing: { oneTime: 2999, weekly: 399 },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "I build private, local LLM-powered RAG systems that search only your verified legal databases, with zero possibility of data leakage.",
      benefits: [
        "100% Data Confidentiality",
        "Case Law Semantic Search",
        "Automated Citation Verification",
        "Compliance-ready Infrastructure",
      ],
    },
    developer: {
      summary:
        "Python-based RAG using pgvector for efficient retrieval, isolated from public LLMs.",
      benefits: [
        "Local Vector DB",
        "No internet needed",
        "Security-hardened",
        "High-accuracy grounding",
      ],
    },
    deliverables: [
      "Local RAG engine",
      "Case data onboarding",
      "Audit report",
      "Dashboard",
      "Maintenance guide",
    ],
    timeline: "4-6 weeks",
    techStack: ["Python", "pgvector", "LangChain", "Docker"],
  },
];

// Profile / About data
export const profile = {
  name: "Haradhan Sharma",
  fname: "Haradhan",
  lname: "Sharma",
  apndx: "'s",
  title: "Full-Stack Developer & AI Automation Specialist",
  tagline:
    "Building intelligent systems that help businesses grow — from custom web apps to AI agents that work while you sleep.",
  email: "me@hrdnsh.com",
  phone: "+8801712270815",
  upwork: "https://www.upwork.com/freelancers/~0166a448a65b1641fb",
  location: "Remote — Worldwide",
  url: "https://hrdnsh.com",
  bio: [
    "I'm a full-stack developer with 5+ years of experience building production-grade applications that solve real business problems. I specialize in creating intelligent systems — from AI-powered agents to automated trading platforms — that help businesses operate smarter and faster.",
    "My approach is practical: I focus on delivering solutions that actually work in production, not just prototypes. Every project I deliver includes proper documentation, monitoring, and the support you need to maintain it long-term.",
    "I work with businesses of all sizes — from startups building their first MVP to established companies modernizing their tech stack. Whether you need a complete web application, an AI agent, or someone to optimize your existing infrastructure, I bring the expertise and reliability you need.",
  ],
  techStack: [
    {
      category: "Frontend & UI",
      items: [
        "Astro (Island Architecture)",
        "Nuxt 3",
        "HTMX",
        "Alpine.js",
        "TailwindCSS",
        "TypeScript",
        "Responsive Design",
      ],
    },
    {
      category: "Backend & High-Performance",
      items: [
        "Python (Async)",
        "Django Ninja",
        "FastAPI",
        "Celery",
        "Django Channels (WebSockets)",
        "REST/GraphQL APIs",
      ],
    },
    {
      category: "Database & Real-time",
      items: [
        "PostgreSQL (pgvector)",
        "MySQL/MariaDB",
        "Redis (Caching & Pub/Sub)",
        "MongoDB",
        "Supabase",
        "Pinecone",
      ],
    },
    {
      category: "AI & Autonomous Agents",
      items: [
        "Gemma 4 (Ollama)",
        "OpenClaw Gateway",
        "LangChain",
        "RAG Pipelines",
        "Vector Embeddings",
        "Function Calling",
      ],
    },
    {
      category: "DevOps & Reliability",
      items: [
        "Docker & Docker Compose",
        "GitHub Actions (CI/CD)",
        "Nginx Reverse Proxy",
        "Cloudflare WAF",
        "Linux VPS Hardening",
      ],
    },
    {
      category: "FinTech & eCommerce",
      items: [
        "MQL5 (MetaTrader 5)",
        "Binance SP-API",
        "WooCommerce",
        "Shopify (Liquid)",
        "Amazon SP-API",
        "ERPNext (Frappe)",
      ],
    },
  ],
  stats: [
    { label: "Projects Delivered", value: "150+" },
    { label: "Years Experience", value: "15+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Response Time", value: "< 2hrs" },
  ],
};

export const commonTechStack = [
  "Python (Async)",
  "Django Ninja",
  "Gemma 4 (AI)",
  "OpenClaw",
  "Nuxt 3",
  "Astro",
  "HTMX",
  "PostgreSQL",
  "Redis",
  "Docker",
  "MQL5",
  "Cloudflare",
];

// Site-wide data — single source of truth for brand, contact, and URLs
export const siteData = {
  siteName: `${profile.fname} ${profile.lname}${profile.apndx} Services`,
  brandName: "HRDNSH",
  url: profile.url,
  email: profile.email,
  phone: profile.phone,
  whatsapp: "8801712270815", // digits only for wa.me link
  upwork: profile.upwork,
  location: profile.location,
  defaultOgImage: "/og-image.jpg",
  defaultDescription:
    "Full-stack development services — AI agents, web apps, automation, and DevOps. Build smarter systems with expert engineering.",
  serviceTypes: [
    "Web Development",
    "AI Agent Development",
    "Backend Optimization",
    "DevOps",
  ],
};

// Page-specific SEO data — all meta titles/descriptions from one place
export const seoData = {
  home: {
    title: `${profile.fname} ${profile.lname} — AI Agents, Web Apps, Automation & DevOps`,
    description: siteData.defaultDescription,
  },
  resume: {
    title: `Resume & Services — ${profile.fname} ${profile.lname}`,
    description: `Download ${profile.fname}'s complete service catalog, view technical skills, and explore professional background.`,
  },
  recommend: {
    title: `Recommended Tools & Services — ${profile.fname} ${profile.lname}`,
    description: `Personally recommended tools, hosting, and services — tested and used in real projects by ${profile.fname}. Honest recommendations backed by real experience.`,
  },
  privacy: {
    title: `Privacy Policy — ${profile.fname} ${profile.lname}`,
    description: `Privacy policy for ${siteData.url} — how we collect, use, and protect your data through Cloudflare Zaraz and Google Analytics.`,
  },
  terms: {
    title: `Terms of Service — ${profile.fname} ${profile.lname}`,
    description: `Terms of service for ${siteData.url} — payment terms, delivery timelines, refund policy, intellectual property rights, and client obligations.`,
  },
};

// Navigation links — used in Header and Footer
export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
  {
    label: "More",
    children: [
      { label: "Resume", href: "/resume" },
      { label: "Recommend", href: "/recommend" },
      { label: "Blog", href: "https://blog.hrdnsh.com" },
    ],
  },
];
// ============================================================
// Payment Gateways
// ============================================================
// Gateway options for the "Payment Gateway" dropdown in the
// ToS consent modal. Only add gateways that have their own
// payment links configured in service.payment_links.
//
// The 'default' gateway (Stripe) is always shown as the first
// option and is the fallback for any service that doesn't have
// a link for the selected gateway.
//
// Links live on each service object — not here.
// This is just the dropdown list (code, name, icon).
// ============================================================
export const paymentGateways = [
  { code: "default", name: "Manual Invoice", icon: "📝" },
  // { code: 'bd', name: 'bKash', icon: '📱' },
  // { code: 'in', name: 'Razorpay', icon: '🇮🇳' },
  // { code: 'manual', name: 'Stripe', icon: '💳' }
];

// Recommended tools & services (affiliate links)
export const recommendations = [
  {
    category: "Cloud Hosting",
    icon: "☁️",
    items: [
      {
        name: "DigitalOcean",
        tagline: "Simple cloud hosting for developers",
        description:
          "Droplets, managed databases, Kubernetes, and app platform. Clean pricing with no surprise bills. Perfect for deploying production apps quickly.",
        url: "https://www.digitalocean.com/?refcode=YOUR_REF_CODE",
        badge: "I Use Daily",
        badgeColor: "accent",
        pros: [
          "Predictable pricing",
          "Great documentation",
          "One-click app deployments",
          "Free tier available",
        ],
        startingPrice: "$4/mo",
      },
      {
        name: "AWS (Amazon Web Services)",
        tagline: "Industry-standard cloud infrastructure",
        description:
          "The most comprehensive cloud platform — EC2, S3, Lambda, RDS, and hundreds more. Essential for enterprise-grade applications and scaling.",
        url: "https://aws.amazon.com/?YOUR_REF_CODE",
        badge: "Enterprise Standard",
        badgeColor: "primary",
        pros: [
          "Most services available",
          "Global edge network",
          "Free tier for 12 months",
          "Industry compliance",
        ],
        startingPrice: "Free tier",
      },
    ],
  },
  {
    category: "VPS & Servers",
    icon: "🖥️",
    items: [
      {
        name: "Hetzner Cloud",
        tagline: "Best price-to-performance VPS in Europe",
        description:
          "Incredible value cloud servers based in Germany and Finland. Perfect for cost-sensitive projects that need serious compute power. I use these for personal projects.",
        url: "https://hetzner.cloud/?ref=YOUR_REF_CODE",
        badge: "Best Value",
        badgeColor: "accent",
        pros: [
          "Unbeatable pricing",
          "High-performance CPUs",
          "European data centers",
          "Excellent uptime",
        ],
        startingPrice: "€3.29/mo",
      },
      {
        name: "Linode (Akamai)",
        tagline: "Reliable cloud compute with simple pricing",
        description:
          "Straightforward VPS hosting with consistent performance. Now part of Akamai with global CDN integration. Great for blogs, APIs, and small applications.",
        url: "https://www.linode.com/?r=YOUR_REF_CODE",
        badge: "",
        badgeColor: "",
        pros: [
          "Simple pricing",
          "Global data centers",
          "24/7 human support",
          "Built-in backups",
        ],
        startingPrice: "$5/mo",
      },

      {
        name: "Contabo",
        tagline: "Reliable cloud compute with simple pricing",
        description:
          "Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.",
        url: "https://contabo.com/en/vps/?utm_source=cj&utm_medium=affiliate&utm_campaign=vps",
        badge: "",
        badgeColor: "",
        pros: [
          "Simple pricing",
          "Global data centers",
          "24/7 human support",
          "Built-in backups",
        ],
        startingPrice: "$3.9/mo",
      },

      {
        name: "Hostinger",
        tagline: "Reliable cloud compute with simple pricing",
        description:
          "Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.",
        url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=NKWHARADHG2L&referral_id=019d5a62-f9e7-7361-96de-bb360c6d66ca",
        badge: "",
        badgeColor: "",
        pros: [
          "Simple pricing",
          "Global data centers",
          "24/7 human support",
          "Built-in backups",
        ],
        startingPrice: "$5.59/mo",
      },

      {
        name: "SSDNODES",
        tagline: "Reliable cloud compute with simple pricing",
        description:
          "Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.",
        url: "https://www.ssdnodes.com/manage/aff.php?aff=2160&register=true",
        badge: "",
        badgeColor: "",
        pros: [
          "Simple pricing",
          "Global data centers",
          "24/7 human support",
          "Built-in backups",
        ],
        startingPrice: "$5.59/mo",
      },
    ],
  },
  {
    category: "Domain & DNS",
    icon: "🌐",
    items: [
      {
        name: "Cloudflare",
        tagline: "Free CDN, DNS, and DDoS protection",
        description:
          "Every website should use Cloudflare. Free tier includes CDN, DNS management, SSL, DDoS protection, and basic caching. Pro tier adds WAF and analytics.",
        url: "https://www.cloudflare.com/?ref=YOUR_REF_CODE",
        badge: "Essential",
        badgeColor: "accent",
        pros: [
          "Generous free tier",
          "Global CDN network",
          "DDoS protection included",
          "Easy DNS management",
        ],
        startingPrice: "Free",
      },
      {
        name: "Namecheap",
        tagline: "Affordable domain registration",
        description:
          "Clean domain registrar with transparent pricing. Free WhoisGuard privacy protection included with every domain. No upsell tricks.",
        url: "https://www.namecheap.com/?aff=YOUR_REF_CODE",
        badge: "",
        badgeColor: "",
        pros: [
          "Low renewal prices",
          "Free WhoisGuard",
          "Clean interface",
          "Bulk domain tools",
        ],
        startingPrice: "$5.98/yr",
      },
    ],
  },
  {
    category: "Development Tools",
    icon: "🛠️",
    items: [
      {
        name: "GitHub Pro",
        tagline: "Private repositories with advanced features",
        description:
          "Essential for professional development. GitHub Actions CI/CD, Codespaces, Copilot, and advanced repository management. Free for students.",
        url: "https://github.com/pricing?ref=YOUR_REF_CODE",
        badge: "Must Have",
        badgeColor: "primary",
        pros: [
          "GitHub Actions CI/CD",
          "Codespaces dev environment",
          "Copilot AI assistant",
          "Best community support",
        ],
        startingPrice: "Free",
      },
      {
        name: "Vercel",
        tagline: "Best platform for frontend deployment",
        description:
          "Zero-config deployments for Next.js, Astro, and modern web frameworks. Preview deployments for every PR. Serverless functions included.",
        url: "https://vercel.com/?ref=YOUR_REF_CODE",
        badge: "Recommended",
        badgeColor: "accent",
        pros: [
          "Instant deployments",
          "Automatic HTTPS",
          "Edge functions",
          "Preview environments",
        ],
        startingPrice: "Free",
      },
    ],
  },
  {
    category: "AI & APIs",
    icon: "🤖",
    items: [
      {
        name: "OpenAI API",
        tagline: "GPT-4, GPT-4o, and more via API",
        description:
          "The most powerful LLM APIs available. Build chatbots, agents, content generators, and intelligent automation. I use this in almost every AI project.",
        url: "https://openai.com/api/?ref=YOUR_REF_CODE",
        badge: "My Go-To",
        badgeColor: "accent",
        pros: [
          "GPT-4o & GPT-4 models",
          "Function calling",
          "Vision capabilities",
          "Embeddings for search",
        ],
        startingPrice: "Pay-per-use",
      },
      {
        name: "Pinecone",
        tagline: "Managed vector database for AI apps",
        description:
          "Purpose-built vector database for RAG applications, semantic search, and AI agents. Fast, scalable, and integrates with LangChain and LlamaIndex.",
        url: "https://www.pinecone.io/?ref=YOUR_REF_CODE",
        badge: "",
        badgeColor: "",
        pros: [
          "Purpose-built for vectors",
          "Low latency queries",
          "LangChain integration",
          "Free starter tier",
        ],
        startingPrice: "Free tier",
      },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "The AI agent they built handles 80% of our customer inquiries automatically. It's like having a 24/7 support team.",
    author: "Sarah M.",
    role: "E-commerce Owner",
    service: "AI Agent Setup",
  },
  {
    quote:
      "Our API response times went from 3 seconds to under 100ms. The optimization was worth every penny.",
    author: "James K.",
    role: "CTO, SaaS Startup",
    service: "Backend Optimization",
  },
  {
    quote:
      "Custom ERP that actually fits our manufacturing workflow. No more fighting with off-the-shelf software.",
    author: "Michael R.",
    role: "Operations Director",
    service: "Industrial ERP",
  },
];
