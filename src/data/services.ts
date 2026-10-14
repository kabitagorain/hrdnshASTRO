import type { ProtonTool } from '../types';
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
      oneTime: 999, // Architecture, Web UI hardening, and Model/API orchestration
      weekly: 199, // Uptime monitoring, security patches, and model cost optimization
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
      oneTime: 899, // High value: eliminates monthly API taxes
      weekly: 199, // Maintenance for SEO crawling, model updates, and performance tuning
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
      oneTime: 1499, // Premium pricing for specialized Python/Async architecture
      weekly: 249, // Ongoing performance monitoring and scaling
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
      weekly: 499, // Continuous logic optimization, sensor maintenance, and reporting updates
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
      weekly: 399, // Managed backups, security patching, and custom business-logic scripts
    },
    payment_links: {
      default: {
        oneTime: "/payment/{service-id}?type=onetime",
        weekly: "/payment/{service-id}?type=weekly",
      },
    },
    businessOwner: {
      summary:
        "Most enterprise software is designed to bleed you dry with 'per-user' licenses that increase as your company grows. I help you achieve operational independence by deploying a Sovereign Business OS & Warehouse System. You get the full power of a world-class CRM, Accounting, HR, and Supply Chain system on your own private cloud—with unlimited users, zero recurring license fees, and total ownership of your data.",
      benefits: [
        "End the Subscription Tax: Stop paying monthly 'per-seat' fees and keep your growth costs at zero",
        "360° Operational Command: A single, unified source of truth for your Accounting, Sales, and Warehouse",
        "Absolute Data Sovereignty: Your business intelligence lives on your hardware, not a third-party corporate server",
        "Tailored Business Logic: Custom automated workflows for approvals, emails, and reporting that fit your specific culture",
      ],
    },
    developer: {
      summary:
        "Professional orchestration of custom Python frameworks and open enterprise architectures. I specialize in high-availability MariaDB/PostgreSQL configurations, Redis-backed Bench optimization, and custom Python-based server hooks. All deployments are standardized via Docker to ensure seamless scalability and effortless disaster recovery.",
      benefits: [
        "Frappe Framework Mastery: Engineering custom DocTypes, complex Client Scripts, and deep Server Hooks",
        "Sovereign Infrastructure: Docker-based multi-tenant deployments on hardened Ubuntu VPS environments",
        "Enterprise Data Migration: Expert ETL pipelines to transition legacy Excel or SAP data into sovereign relational databases without loss",
        "Unified API Ecosystem: Connecting your sovereign ERP to Shopify, WooCommerce, or custom internal applications",
      ],
    },
    deliverables: [
      "Fully Optimized Sovereign Enterprise ERP/CRM instance on your private VPS",
      "Enterprise Security Suite (SSL, Firewall, and Immutable Automated Backups)",
      "Custom-Configured Modules (Sales, Purchase, Inventory, and Accounts)",
      "Role-Based Access Control (RBAC) & Comprehensive Employee Training",
      "Dockerized Infrastructure for zero-friction future migrations",
      "60-Day Post-Implementation Technical Audit & Performance Tuning",
    ],
    timeline: "4-10 weeks for full implementation and data migration",
    techStack: ["Python", "PostgreSQL", "MariaDB", "Redis", "Docker", "REST API"],
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
      oneTime: 999, // Architecture, Cloudflare WAF hardening, and CI/CD pipeline engineering
      weekly: 199, // Infrastructure retainer for monitoring, security patching, and disaster recovery
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
      oneTime: 499, // Comprehensive system audit, security hardening, and baseline optimization
      weekly: 129, // 24/7 proactive monitoring, security patching, and emergency response
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
      oneTime: 1499, // Varnish/Nginx architectural overhaul and Layer 7 WAF configuration
      weekly: 199, // Bot mitigation monitoring, cache-hit ratio tuning, and edge-node optimization
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

// Profile / About data — Executive Operations Leader & Chief Enterprise Architect
export const profile = {
  name: "Haradhan Sharma",
  fname: "Haradhan",
  lname: "Sharma",
  apndx: "'s",
  title: "Executive Operations Leader & Chief Enterprise Architect",
  subTitle: "20+ Years Industrial Operations Leadership • 15+ Years Deep-Tech, Enterprise MIS & Sovereign AI Architecture",
  tagline:
    "Bridging 20+ years of industrial manufacturing, factory PPC & central warehouse leadership with modern Enterprise MIS, Sovereign AI, and custom ERP architecture.",
  email: "me@hrdnsh.com",
  phone: "+880****0815",
  upwork: "https://www.upwork.com/freelancers/~0166a448a65b1641fb",
  linkedin: "https://www.linkedin.com/in/haradhansharma/",
  github: "https://github.com/haradhansharma",
  x: "https://x.com/haradhansharma",
  location: "Dhaka, Bangladesh • Worldwide Executive & Remote Architecture",
  url: "https://hrdnsh.com",
  bio: [
    "Strategic, outcome-driven Executive with over 20 years of cross-functional experience across industrial production planning, supply chain & central warehouse coordination, enterprise MIS, factory floor operations, brand development, and modern software architecture.",
    "A rare operator who bridges the physical shop-floor with cutting-edge digital intelligence: from pioneering computerized German Thies dyeing systems and serving 10 years as Manager of Production Planning & Coordination (PPC) at Fakir Knitwears Ltd. (overseeing operational MIS and raw-material to finished-goods store reconciliation), to founding a national retail apparel brand scaled across 63 districts with 1,200+ dealer networks, and architecting custom enterprise ERPs, Sovereign AI / Agentic RAG pipelines, and high-concurrency systems.",
    "Proven executive leader in factory capacity planning, central warehouse & inventory control (FIFO/WMS), MIS executive reporting, lead-time reduction, cost control, cross-departmental harmonization, and autonomous digital systems built for long-term sovereign ownership and zero data leak.",
  ],
  executiveSummary:
    "20+ years of unified industrial operations leadership (Factory PPC, Master Scheduling, Central Warehouse & Supply Chain, Enterprise MIS) and modern deep-tech systems engineering (Sovereign AI, Custom ERP, Django/FastAPI, Linux Cloud Infrastructure). Track record spans managing high-volume export manufacturing for global brands to architecting automated enterprise software platforms and executive reporting engines.",
  executiveCompetencies: [
    {
      category: "Executive & Factory Leadership",
      items: [
        "Production Planning & Control (PPC)",
        "Central Warehouse & Store Operations (Raw Material & FG)",
        "Inventory Turn, FIFO & Pilferage / Loss Control",
        "Capacity Utilization & Line Balancing",
        "TNA (Time & Action) Calendar Optimization",
        "Factory General Management & P&L",
        "Cut-to-Ship & Quality Assurance",
        "Nationwide Dealership & Retail Expansion",
      ],
    },
    {
      category: "Enterprise AI & Sovereign Systems",
      items: [
        "Sovereign RAG Pipelines (Private pgvector)",
        "Autonomous Agent Gateways (OpenClaw / Hermes)",
        "Self-Hosted LLM Orchestration (Llama 3, Gemma)",
        "Zero-Trust Enterprise Data Governance",
        "Hallucination Auditing & Evaluation (Ragas)",
        "Multi-Agent Workflow Automation",
      ],
    },
    {
      category: "Industrial ERP, MIS & Digital Transformation",
      items: [
        "Custom ERP Architecture (Odoo, ERPNext, Frappe)",
        "Enterprise MIS Reporting & Executive Dashboards",
        "Real-Time Shop-Floor Tracking & WMS Digitization",
        "Cross-Departmental Data Reconciliation (Store, PPC, Accounts)",
        "Inventory & Supply Chain Digitization",
        "Automated Accounting & HR Workflows",
        "High-Concurrency Backends (Django Ninja, FastAPI)",
        "Relational SQL & Postgres Query Tuning (<50ms)",
      ],
    },
    {
      category: "Infrastructure, DevOps & FinTech",
      items: [
        "Linux VPS Hardening & Cloudflare Zero-Trust",
        "Docker Compose & CI/CD Pipelines",
        "Algorithmic Trading Engines & MQL5 Bridges",
        "High-Surge E-Commerce Checkout Protection",
        "Nginx Reverse Proxies & SSL Termination",
        "Disaster Recovery & Automated Backup Pipelines",
      ],
    },
  ],
  careerTimeline: [
    {
      period: "2021 — Present",
      role: "Chief Systems Architect & Enterprise Transformation Consultant",
      organization: "Independent / Global Contracts",
      location: "Dhaka, Bangladesh & Worldwide",
      highlight: "Sovereign AI, Custom ERP, Enterprise MIS & High-Concurrency Systems",
      description:
        "Architecting self-hosted enterprise AI infrastructures (Sovereign RAG, OpenClaw, Hermes Agent), custom ERP & WMS modules (Odoo/ERPNext) for industrial manufacturing, executive MIS dashboards, async Python backends (Django Ninja/FastAPI), and automated quantitative trading bridges.",
    },
    {
      period: "2017 — 2021",
      role: "Founder & Chief Executive Officer (CEO)",
      organization: "Sovereign Apparel & Clothing Brand",
      location: "Dhaka, Bangladesh",
      highlight: "Scaled Nationwide Distribution to 63 Districts (Central Warehouse & Supply Chain)",
      description:
        "Led full corporate strategy, styling, textile sourcing, factory production, central warehouse inventory flow, and commercial retail expansion across 63 districts in Bangladesh. Designed nationwide dealer distribution model and managed end-to-end supply chain from fabric knitting to retail store fulfillment.",
    },
    {
      period: "2007 — 2017 (10 Years)",
      role: "Manager – Production Planning & Coordination (PPC) & Operational MIS",
      organization: "Fakir Knitwears Ltd.",
      location: "Fatullah, Narayanganj, Bangladesh",
      highlight: "Executive Operations & MIS Leadership for Premier Composite Apparel Exporter",
      description:
        "Formulated Master Production Schedules (MPS), spearheaded the factory's core operational MIS reporting, and synchronized cross-departmental operations across Central Fabric & Accessories Stores, Knitting, Dyeing, Printing, Embroidery, Sewing, and Export Finishing. Monitored cut-to-ship reconciliation, streamlined TNA calendars, and eliminated floor bottlenecks.",
    },
    {
      period: "2005 — 2007 (2.5 Years)",
      role: "Production Coordinator – Fabrics & Sample Development",
      organization: "Generation Next Fashions Ltd.",
      location: "Ashulia, Savar, Dhaka",
      highlight: "Fabric R&D & Buyer Specification Compliance",
      description:
        "Managed fabric execution schedules between knitting/dyeing units and garment manufacturing lines. Oversaw R&D and pre-production sample approvals ensuring exact buyer specifications and hand-feel compliance.",
    },
    {
      period: "2000 — 2005 (4.5 Years)",
      role: "Dyeing Supervisor & Pioneer Computerized Machine Operator",
      organization: "Purbani Fabrics Ltd.",
      location: "Gazipur, Bangladesh",
      highlight: "Pioneered First German Thies Computerized Dyeing Systems",
      description:
        "Selected as lead computerized operator for newly commissioned German Thies high-temperature dyeing machines. Promoted to Supervisor within 3 years for establishing standard operating procedures (SOPs), color precision, and drastically reducing re-dyeing rates.",
    },
    {
      period: "2000 Period (1.5 Years)",
      role: "Dyeing Section Helper & Foundation Operator",
      organization: "The Delta Knit Composite Knitting Industries Ltd.",
      location: "Kashimpur, Gazipur, Bangladesh",
      highlight: "Foundational Industrial Manufacturing Roots",
      description:
        "Hands-on foundational immersion in industrial textile chemistry, dye-house batch preparation, fabric processing, and floor labor dynamics.",
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree (Graduation)",
      institution: "National University / Affiliated College",
      details: "Completed during active professional industrial leadership career.",
    },
    {
      degree: "Intermediate of Business Management (IBM)",
      institution: "Bangladesh Technical Education Board (BTEB)",
      details: "Vocational & business management curriculum equivalent to HSC.",
    },
    {
      degree: "Industrial Technical Certifications",
      institution: "German Thies Systems & Industrial Production Institutes",
      details: "Computerized Dyeing Operations, Production Planning (PPC), Industrial Safety & Quality Management.",
    },
  ],
  techStack: [
    {
      category: "Industrial Operations, MIS & WMS",
      items: [
        "Master Production Scheduling (MPS)",
        "Enterprise MIS & Reporting Engines",
        "Central Warehouse & Store Logistics",
        "WMS & Inventory Lot / FIFO Tracking",
        "Capacity Planning & Line Balancing",
        "Odoo ERP & Frappe / ERPNext",
        "Time & Action (TNA) Scheduling",
        "Cut-to-Ship Optimization",
      ],
    },
    {
      category: "Sovereign AI & Autonomous Systems",
      items: [
        "Agentic RAG Pipelines",
        "pgvector & Pinecone",
        "OpenClaw & Hermes Agent",
        "Ollama Local LLM Serving",
        "LangChain & LlamaIndex",
        "Autonomous Tool-Calling Workflows",
      ],
    },
    {
      category: "Backend & High-Concurrency",
      items: [
        "Python (Asyncio)",
        "Django Ninja & Django Channels",
        "FastAPI & REST APIs",
        "Celery & Redis Task Queues",
        "PostgreSQL (<50ms Optimization)",
        "WebSocket Live Streaming",
      ],
    },
    {
      category: "Cloud, DevOps & FinTech",
      items: [
        "Docker & Docker Compose",
        "Linux VPS Hardening (Ubuntu)",
        "Cloudflare Zero-Trust & WAF",
        "GitHub Actions CI/CD",
        "Algorithmic Trading (MQL5 / MetaTrader 5)",
        "Binance WebSocket APIs",
      ],
    },
  ],
  stats: [
    { label: "Industrial & Tech Leadership", value: "20+ Yrs" },
    { label: "PPC Head (Fakir Knitwears)", value: "10 Yrs" },
    { label: "Brand Scale (Districts Reached)", value: "63 Dist." },
    { label: "Architectures Delivered", value: "150+" },
  ],
};

export const commonTechStack = [
  "Production Planning (PPC)",
  "Sovereign AI / RAG",
  "Odoo / ERPNext",
  "Python (Async)",
  "Django Ninja",
  "FastAPI",
  "PostgreSQL (pgvector)",
  "Docker",
  "Linux Cloud Hardening",
  "MQL5 / FinTech",
];

// Site-wide data — single source of truth for brand, contact, and URLs
export const siteData = {
  siteName: `${profile.fname} ${profile.lname} — Executive Operations Leader & Chief Architect`,
  brandName: "HRDNSH",
  url: profile.url,
  email: profile.email,
  phone: profile.phone,
  whatsapp: "8801712270815",
  upwork: profile.upwork,
  linkedin: profile.linkedin,
  github: profile.github,
  x: profile.x,
  location: profile.location,
  defaultOgImage: "/og-image.jpg",
  defaultDescription:
    "Executive Operations Leader & Chief Enterprise Architect with 20+ years industrial manufacturing leadership (PPC Manager at Fakir Knitwears, CEO) and deep-tech Sovereign AI, Custom ERP, and high-concurrency systems architecture.",
  serviceTypes: [
    "Industrial Operations & ERP Architecture",
    "Sovereign AI & Agentic RAG Systems",
    "High-Concurrency Backend Engineering",
    "Cloud Infrastructure & DevOps",
  ],
};

// Page-specific SEO data — all meta titles/descriptions from one place
export const seoData = {
  home: {
    title: `${profile.fname} ${profile.lname} — Executive Operations Leader & Chief Enterprise Architect`,
    description: siteData.defaultDescription,
  },
  resume: {
    title: `Executive CV & Leadership Dossier — ${profile.fname} ${profile.lname}`,
    description: `Executive Curriculum Vitae of ${profile.fname} ${profile.lname}: 20+ years industrial operations, 10 years PPC Manager at Fakir Knitwears, CEO, and Chief Architect of Sovereign AI & Custom ERPs.`,
  },
  recommend: {
    title: `Recommended Enterprise Stack & Tools — ${profile.fname} ${profile.lname}`,
    description: `Personally vetted enterprise infrastructure, cloud hosting, and AI developer tools recommended by ${profile.fname} ${profile.lname}.`,
  },
  privacy: {
    title: `Privacy Policy — ${profile.fname} ${profile.lname}`,
    description: `Privacy policy for ${siteData.url} — how we collect, use, and protect your data with zero-trust sovereign architecture.`,
  },
  terms: {
    title: `Terms of Service — ${profile.fname} ${profile.lname}`,
    description: `Terms of service and enterprise consulting engagement protocols for ${siteData.url}.`,
  },
};

// Navigation links — used in Header and Footer
export const navLinks = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
  {
    label: "More",
    children: [
      { label: "Resume", href: "/resume/" },
      { label: "Recommend", href: "/recommend/" },
      { label: "Blog", href: "/blog/" },
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

// Proton Sovereign Privacy & Security Suite
export const protonSuite: ProtonTool[] = [
  {
    id: "proton-business",
    name: "Proton for Business",
    shortName: "Business B2B",
    tagline: "Complete Sovereign Suite for Enterprise Privacy & Compliance",
    category: "Enterprise Infrastructure",
    offerType: "CPA",
    offerId: 50,
    url: "https://go.getproton.me/aff_c?offer_id=50&aff_id=20831",
    badge: "Enterprise B2B",
    startingPrice: "$6.99/user/mo",
    ctaText: "Deploy Proton Business",
    replaces: "Google Workspace, Microsoft 365 Enterprise",
    architecturalNote: "Centralizes corporate identity, mail, encrypted document collaboration, and VPN under Swiss legal jurisdiction (FADP) and GDPR without US CLOUD Act exposure.",
    coreTech: ["Zero-Access Encryption", "Custom DKIM/DMARC", "Admin Console", "HIPAA/GDPR DPA"],
    metrics: [
      { label: "SLA", value: "99.95%" },
      { label: "Jurisdiction", value: "Switzerland" },
      { label: "Compliance", value: "GDPR / HIPAA" }
    ]
  },
  {
    id: "proton-lumo",
    name: "Proton Lumo",
    shortName: "Lumo AI",
    tagline: "Zero-Knowledge Encrypted AI Assistant & Confidential Search",
    category: "Sovereign AI",
    offerType: "RevShare",
    offerId: 68,
    url: "https://go.getproton.me/aff_c?offer_id=68&aff_id=20831",
    badge: "Sovereign AI",
    startingPrice: "Free Tier Available",
    ctaText: "Access Proton Lumo",
    replaces: "ChatGPT Enterprise, Microsoft Copilot, Gemini",
    architecturalNote: "Engineered specifically for teams that cannot risk prompt leakage or source code re-training. Queries are executed in zero-knowledge Swiss enclaves with zero telemetry retention.",
    coreTech: ["Zero Data Mining", "Confidential Compute", "Swiss Enclaves", "Web Search Shield"],
    metrics: [
      { label: "Model Training", value: "0% (Never)" },
      { label: "Logs Stored", value: "Zero" },
      { label: "Data Boundary", value: "Swiss Sovereign" }
    ]
  },
  {
    id: "proton-mail",
    name: "Proton Mail",
    shortName: "Mail",
    tagline: "End-to-End Encrypted Swiss Business & Executive Email",
    category: "Secure Communication",
    offerType: "RevShare",
    offerId: 7,
    url: "https://go.getproton.me/aff_c?offer_id=7&aff_id=20831",
    badge: "Essential Privacy",
    startingPrice: "Free / $3.99/mo",
    ctaText: "Get Proton Mail",
    replaces: "Gmail, Outlook 365, Fastmail",
    architecturalNote: "Messages are encrypted at rest with client-side public key cryptography. Incoming external messages are immediately PGP-encrypted with your public key upon receipt.",
    coreTech: ["OpenPGP Standards", "Zero-Access Mailboxes", "Tracker Stripping", "Custom MX/DKIM"],
    metrics: [
      { label: "Encryption", value: "OpenPGP / AES-256" },
      { label: "Tracker Stripping", value: "100% Active" },
      { label: "Legal Anchor", value: "Swiss Art. 13" }
    ]
  },
  {
    id: "proton-vpn",
    name: "Proton VPN",
    shortName: "VPN",
    tagline: "High-Speed Zero-Logs Swiss VPN with Secure Core Multi-Hop",
    category: "Network Defense",
    offerType: "RevShare",
    offerId: 26,
    url: "https://go.getproton.me/aff_c?offer_id=26&aff_id=20831",
    badge: "Zero-Logs VPN",
    startingPrice: "Free / $4.99/mo",
    ctaText: "Activate Proton VPN",
    replaces: "NordVPN, ExpressVPN, Cisco AnyConnect",
    architecturalNote: "Secure Core routes management traffic through underground Swiss/Icelandic nuclear bunkers before exiting to the target network, preventing DNS spoofing and ISP surveillance.",
    coreTech: ["Secure Core Bunkers", "WireGuard & ChaCha20", "NetShield DNS", "Tor Over VPN"],
    metrics: [
      { label: "Network Capacity", value: "10 Gbps" },
      { label: "Audit Status", value: "Strict Zero-Logs" },
      { label: "DNS Leak Defense", value: "Hardware Hardened" }
    ]
  },
  {
    id: "proton-pass",
    name: "Proton Pass",
    shortName: "Pass",
    tagline: "End-to-End Encrypted Password, 2FA & Identity Masking Vault",
    category: "Identity & Access",
    offerType: "RevShare",
    offerId: 38,
    url: "https://go.getproton.me/aff_c?offer_id=38&aff_id=20831",
    badge: "Identity Shield",
    startingPrice: "Free / $1.99/mo",
    ctaText: "Deploy Proton Pass",
    replaces: "1Password, Bitwarden, LastPass",
    architecturalNote: "Encrypts 25 cryptographic fields including URLs, notes, and usernames using Argon2id and XChaCha20-Poly1305. Includes SimpleLogin email cloaking aliases.",
    coreTech: ["Argon2id KDF", "XChaCha20-Poly1305", "Integrated 2FA", "Hide-My-Email Aliases"],
    metrics: [
      { label: "KDF Iterations", value: "Argon2id Hardened" },
      { label: "Alias Shield", value: "Unlimited Masks" },
      { label: "Passkeys", value: "FIDO2 / WebAuthn" }
    ]
  },
  {
    id: "proton-drive",
    name: "Proton Drive",
    shortName: "Drive",
    tagline: "Encrypted Cloud Storage & Real-Time Collaborative Private Docs",
    category: "Sovereign Storage",
    offerType: "RevShare",
    offerId: 43,
    url: "https://go.getproton.me/aff_c?offer_id=43&aff_id=20831",
    badge: "Zero-Access Storage",
    startingPrice: "Free / $3.99/mo",
    ctaText: "Launch Proton Drive",
    replaces: "Google Drive, Dropbox, OneDrive, Box",
    architecturalNote: "Files are segmented and encrypted client-side using OpenPGP before transmission. Even folder structures and file names are zero-knowledge encrypted against server inspection.",
    coreTech: ["Client-Side Chunking", "End-to-End Encrypted Docs", "Version History", "Encrypted Sync"],
    metrics: [
      { label: "Payload Encryption", value: "End-to-End Client" },
      { label: "Filename Encryption", value: "Zero-Knowledge" },
      { label: "Cloud Boundary", value: "Swiss Data Centers" }
    ]
  }
];


// Recommended tools & services (affiliate links)
export const recommendations = [
  {
    category: "Privacy & Sovereign Security (Proton Suite)",
    icon: "🛡️",
    items: [
      {
        name: "Proton for Business",
        tagline: "Enterprise Zero-Trust Privacy Suite & Compliance (B2B)",
        description:
          "All-in-one sovereign privacy infrastructure for modern companies: encrypted enterprise email on custom corporate domains, collaborative cloud docs, centralized credential vaults, and team-wide VPN. Guarantees GDPR and HIPAA compliance under strict Swiss privacy laws.",
        url: "https://go.getproton.me/aff_c?offer_id=50&aff_id=20831",
        badge: "Enterprise B2B",
        badgeColor: "accent",
        pros: [
          "Centralized admin console & user provisioning",
          "Custom company email domains (DKIM/DMARC/SPF)",
          "GDPR, HIPAA & Swiss DPA compliance",
          "High-priority 24/7 dedicated enterprise SLA",
        ],
        startingPrice: "$6.99/user/mo",
        ctaText: "Deploy Proton Business",
      },
      {
        name: "Proton Lumo",
        tagline: "Zero-Knowledge Encrypted AI Assistant & Private Search",
        description:
          "Sovereign, privacy-first conversational AI assistant and search developed by Proton. Zero-access encryption architecture guarantees your prompts, proprietary source code, internal strategies, and documents are never logged or used to train third-party models.",
        url: "https://go.getproton.me/aff_c?offer_id=68&aff_id=20831",
        badge: "Sovereign AI",
        badgeColor: "primary",
        pros: [
          "Zero model training on user data or prompts",
          "Swiss privacy jurisdiction & zero telemetry",
          "Code review, document analysis & private web queries",
          "Zero-access encrypted architecture",
        ],
        startingPrice: "Free Tier Available",
        ctaText: "Access Proton Lumo",
      },
      {
        name: "Proton Mail",
        tagline: "End-to-End Encrypted Swiss Business & Personal Email",
        description:
          "The world standard for encrypted communication, engineered by CERN scientists. Features automatic PGP interoperability, zero-access encryption ensuring not even Proton can read your emails or metadata, and seamless custom domain integration.",
        url: "https://go.getproton.me/aff_c?offer_id=7&aff_id=20831",
        badge: "Essential Privacy",
        badgeColor: "accent",
        pros: [
          "Zero-access end-to-end encryption",
          "Custom business domain routing & PGP keys",
          "No tracking pixels, ads, or data-mining",
          "Protected by Swiss privacy laws (non-EU/non-US)",
        ],
        startingPrice: "Free / $3.99/mo",
        ctaText: "Get Proton Mail",
      },
      {
        name: "Proton VPN",
        tagline: "High-Speed Zero-Logs Swiss VPN with Secure Core",
        description:
          "High-throughput virtual private network routed through underground bunkers in Switzerland, Iceland, and Sweden. Features NetShield DNS ad/malware blocking, WireGuard protocol, Tor-over-VPN, and audited strict zero-logs defense.",
        url: "https://go.getproton.me/aff_c?offer_id=26&aff_id=20831",
        badge: "Zero-Logs VPN",
        badgeColor: "primary",
        pros: [
          "Audited strict no-logs policy",
          "Secure Core multi-hop architecture",
          "NetShield DNS blocker (malware & tracking)",
          "10 Gbps high-speed server infrastructure",
        ],
        startingPrice: "Free / $4.99/mo",
        ctaText: "Activate Proton VPN",
      },
      {
        name: "Proton Pass",
        tagline: "End-to-End Encrypted Password & Identity Shield",
        description:
          "Zero-knowledge password manager and identity protector with built-in email alias generation (hide-my-email), integrated 2FA authenticator, passkey authentication, and encrypted team credential sharing.",
        url: "https://go.getproton.me/aff_c?offer_id=38&aff_id=20831",
        badge: "Identity Shield",
        badgeColor: "accent",
        pros: [
          "End-to-end encrypted password vaults",
          "Integrated hide-my-email alias masking",
          "Hardware passkeys & built-in 2FA authenticator",
          "Team vault sharing & breach monitoring",
        ],
        startingPrice: "Free / $1.99/mo",
        ctaText: "Deploy Proton Pass",
      },
      {
        name: "Proton Drive",
        tagline: "Encrypted Cloud Storage & Real-Time Collaborative Private Docs",
        description:
          "End-to-end encrypted cloud storage and document collaboration. Every file, keystroke, document revision, and metadata property is encrypted client-side before upload, providing complete sovereignty over business files and backups.",
        url: "https://go.getproton.me/aff_c?offer_id=43&aff_id=20831",
        badge: "Zero-Access Storage",
        badgeColor: "primary",
        pros: [
          "End-to-end client-side encryption",
          "Private collaborative document editor",
          "Encrypted file versioning & automated sync",
          "Password-protected & expiring share links",
        ],
        startingPrice: "Free / $3.99/mo",
        ctaText: "Launch Proton Drive",
      },
    ],
  },
  {
    category: "Proprietary Engines & Utilities",
    icon: "⚡",
    items: [
      {
        name: "NeuroScale Engine",
        tagline: "Deterministic AI Compute & Infra Planning Suite",
        description:
          "Zero-latency computational planning suite for Large Language Models, Reasoning Networks (DeepSeek-R1, Llama 3.3, Qwen 2.5), AI Agent cost runway, Vector DB RAM sizing, and dedicated GPU cluster ROI.",
        url: "https://neuroscale.hrdnsh.com/en/",
        badge: "AI Compute",
        badgeColor: "accent",
        pros: [
          "DeepSeek & Llama sizing",
          "VRAM & quantization math",
          "Vector DB RAM sizing",
          "Dedicated cluster ROI",
        ],
        startingPrice: "Free Access",
        ctaText: "Launch Engine",
      },
      {
        name: "TokenOps Pro",
        tagline: "AI Token & API Cost Calculator Suite",
        description:
          "Calculate and optimize LLM API costs across OpenAI, Anthropic, Gemini, DeepSeek, Meta, and xAI. Real-time pricing, prompt caching, tokenization, GPU break-even, and RAG database estimates.",
        url: "https://tokenops.sattaspace.com/",
        badge: "AI FinOps",
        badgeColor: "primary",
        pros: [
          "Multi-model cost audit",
          "Prompt caching analytics",
          "GPU break-even matrix",
          "RAG storage projections",
        ],
        startingPrice: "Free Access",
        ctaText: "Launch Calculator",
      },
      {
        name: "SattaSpace Developer Tools",
        tagline: "Multi-Utility Developer Suite & Regex Workspace",
        description:
          "Client-side sandbox suite of local developer utilities featuring interactive live Markdown editor, visual text diff scanner, cryptographic encoders, synthetic DB blueprint generators, and regex visual debugger.",
        url: "https://tools.sattaspace.com/",
        badge: "Dev Suite",
        badgeColor: "accent",
        pros: [
          "100% client-side privacy",
          "Visual regex debugger",
          "Crypto & hash encoders",
          "Text diff scanner",
        ],
        startingPrice: "Free Access",
        ctaText: "Open Workspace",
      },
      {
        name: "BharatUtility",
        tagline: "India Statutory Calculators & Compliance Suite",
        description:
          "Micro-tools across all 28 Indian states: In-Hand Salary & New Tax Regime Calculator (FY 2024-26), Central & State Government Scheme Finder, Loan EMI Prepayment Simulator, and Regional Land Unit Converter.",
        url: "https://bharatutility.hrdnsh.com/",
        badge: "Statutory Suite",
        badgeColor: "primary",
        pros: [
          "New Tax Regime (2024-26)",
          "Loan prepayment simulator",
          "All 28 Indian states",
          "Regional land converter",
        ],
        startingPrice: "Free Access",
        ctaText: "Open Calculators",
      },
      {
        name: "NomadMatrix",
        tagline: "Global Nomad Visas & Tax Residency Explorer",
        description:
          "Interactive explorer of 60+ global digital nomad visas, foreign-source income tax exemptions, cost of living indices, and permanent residency pathways.",
        url: "https://nomadmatrix.hrdnsh.com/",
        badge: "Global Mobility",
        badgeColor: "accent",
        pros: [
          "60+ digital nomad visas",
          "Tax exemption breakdown",
          "Cost of living data",
          "Permanent residency routes",
        ],
        startingPrice: "Free Access",
        ctaText: "Explore Visas",
      },
    ],
  },
  {
    category: "VPS & Compute",
    icon: "🖥️",
    items: [
      {
        name: "Vultr",
        tagline: "High-Frequency Compute, Bare Metal & GPU Cloud",
        description:
          "Global cloud compute platform across 32+ datacenter locations worldwide. Features high-frequency 3GHz+ NVMe instances, dedicated bare-metal, and NVIDIA GPU clusters with instant API deployment.",
        url: "https://www.vultr.com/?ref=9928399",
        badge: "Top Global Choice",
        badgeColor: "accent",
        pros: [
          "32+ worldwide datacenters",
          "High-frequency 3GHz+ CPUs",
          "Instant hourly/monthly billing",
          "Full root access & custom ISO",
        ],
        startingPrice: "$2.50/mo",
        ctaText: "Deploy on Vultr",
      },
      {
        name: "Contabo",
        tagline: "German High-Density RAM & Bare-Metal Cloud",
        description:
          "Enterprise cloud hosting with unbeatable RAM and NVMe storage per dollar. Ideal for self-hosting local AI models, high-concurrency databases, Docker swarms, and ERPNext instances.",
        url: "https://www.kqzyfj.com/click-101717396-17165311",
        badge: "Best RAM Value",
        badgeColor: "accent",
        pros: [
          "Massive RAM & NVMe SSDs",
          "European & global regions",
          "DDoS mitigation included",
          "Zero traffic egress fees",
        ],
        startingPrice: "$3.90/mo",
        ctaText: "Deploy on Contabo",
      },
      {
        name: "Hostinger",
        tagline: "High-Speed NVMe KVM Cloud VPS with Dedicated IP",
        description:
          "High-performance KVM VPS with instant provisioning, automated snapshots, and pure NVMe storage. Excellent global presence with an intuitive server control panel.",
        url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=NKWHARADHG2L&referral_id=019d5a62-f9e7-7361-96de-bb360c6d66ca",
        badge: "Fast Setup",
        badgeColor: "primary",
        pros: [
          "KVM virtualization",
          "Weekly automated backups",
          "Dedicated IPv4 & IPv6",
          "AI firewall assistant",
        ],
        startingPrice: "$5.59/mo",
        ctaText: "Deploy on Hostinger",
      },
      {
        name: "SSD Nodes",
        tagline: "High-Memory Cloud Infrastructure for Heavy Workloads",
        description:
          "Specially architected high-RAM cloud instances for data-intensive applications. Up to 64GB+ RAM tiers for in-memory caching, large PostgreSQL nodes, and multi-tenant systems.",
        url: "https://www.ssdnodes.com/manage/aff.php?aff=2160&register=true",
        badge: "High RAM",
        badgeColor: "",
        pros: [
          "Up to 64GB+ RAM instances",
          "Enterprise NVMe SSD array",
          "Global network backbone",
          "99.9% uptime SLA",
        ],
        startingPrice: "$5.59/mo",
        ctaText: "Deploy on SSD Nodes",
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
        ctaText: "Configure DNS",
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
        ctaText: "Search Domains",
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
        ctaText: "View GitHub",
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
        ctaText: "Deploy App",
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
        ctaText: "Get API Keys",
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
        ctaText: "Create Index",
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
