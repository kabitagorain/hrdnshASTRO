// Service definitions — single source of truth
export const services = [
      {
        id: 'agentic-ai-rag-orchestration',
        number: '01',
        title: 'Agentic AI & Enterprise RAG Infrastructure',
        tagline: 'Turn static data into an autonomous workforce with secure RAG pipelines.',
        icon: '🧠',
        pricing: {
          oneTime: 1499, // Architecture for vector databases & agentic tool-calling
          weekly: 299,  // Model fine-tuning, token optimization, and logic updates
        },
        payment_links: {
          default: {
            oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
            weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
          },
          bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
          in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
        },
        businessOwner: {
          summary: 'Generic AI bots hallucinate and leak data. I build "Agentic" systems that act as expert employees. By using Retrieval-Augmented Generation (RAG), your AI only speaks from your private data, ensuring 100% accuracy and professional-grade security.',
          benefits: [
            'Private Data Intelligence: AI that knows your specific business docs perfectly',
            'Autonomous Task Execution: Agents that can book meetings, update CRMs, or generate reports',
            'Cost-Efficient Inference: Optimized model routing to slash your OpenAI/Anthropic monthly bills',
            'Enterprise Security: On-premise or VPC-isolated deployment to keep your data private',
          ],
        },
        developer: {
          summary: 'Implementation of advanced RAG pipelines using LangChain/LlamaIndex and Vector Databases (Pinecone/Weaviate). I specialize in "Tool-Calling" logic where agents interact with your existing Django/FastAPI endpoints securely.',
          benefits: [
            'Vector Database Scaling: Optimized indexing for million-document retrieval',
            'Semantic Chunking: Advanced NLP strategies to ensure high-relevancy AI context',
            'Agentic Tool-Use: Enabling LLMs to execute Python functions and SQL queries safely',
            'Observability & Evals: Integrated monitoring to track AI accuracy and latency',
          ],
        },
        deliverables: [
          'Production-Ready Vector Database Setup',
          'Secure API Gateway for LLM Orchestration',
          'Custom Multi-Agent Workflow Design',
          'Evaluation Framework for AI Accuracy (Ragas/Giskard)',
          '1-Month Performance & Hallucination Audit',
        ],
        timeline: '2-3 weeks to initial setup as one-time setup, for weekly continuous optimization and monitoring',
        techStack: ['Python', 'LangChain', 'PostgreSQL (pgvector)', 'Redis', 'Docker'],
    },
    {
      id: 'openclaw-enterprise-web-gateway',
      number: '02',
      title: 'OpenClaw Web Interface & AI Model Integration',
      tagline: 'Deploy a hardened, web-accessible OpenClaw instance with multi-model AI logic.',
      icon: '🤖',
      pricing: {
        oneTime: 699, // Architecture, Web UI hardening, and Model/API orchestration
        weekly: 149,  // Uptime monitoring, security patches, and model cost optimization
      },
      payment_links: {
        default: {
          oneTime: 'https://buy.stripe.com/OPENCLAW_ONE_TIME',
          weekly: 'https://buy.stripe.com/OPENCLAW_WEEKLY',
        },
        bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
        in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
      },
      businessOwner: {
        summary: 'Standard OpenClaw setups are often restricted to a terminal or local machine. I deliver a ready-to-use, cloud-hosted OpenClaw environment accessible via a secure web interface. This includes pre-integrated AI models (GPT-4/Claude/Llama) and automated maintenance, allowing you to focus on results while I handle the infrastructure and security.',
        benefits: [
          'Secure Web Access: Manage your AI agents from any browser with encrypted logins',
          'Turnkey AI Integration: Pre-configured API bridges for OpenAI, Anthropic, or local LLMs',
          'Zero-Maintenance Hosting: I handle the server complexity, patches, and resource scaling',
          'Full Data Sovereignty: Your setup, your keys, and your data—completely isolated and private',
        ],
      },
      developer: {
        summary: 'Deployment of a hardened OpenClaw Gateway using Docker-based sandboxing and Nginx reverse proxies. I implement complex model routing (A2A), SSL/TLS termination, and persistent volume management to ensure stateful conversation history and reliable agent execution across sessions.',
        benefits: [
          'Hardened Web Dashboard: Secure exposure of the OpenClaw UI with custom auth layers',
          'Multi-Model Orchestration: Configurable Fallback/Primary model logic for 99.9% reliability',
          'Isolated Sandboxing: Dockerized environments to prevent agent code-execution escapes',
          'Persistent Database Storage: Integrated PostgreSQL/Redis for reliable session and memory logs',
        ],
      },
      deliverables: [
        'Encrypted Web-Accessible OpenClaw Dashboard',
        'Hardened VPS Deployment (Nginx/Docker/Firewall)',
        'API Key Orchestration & Multi-Model Config',
        'Automated Weekly Backup & Security Update Script',
        'Custom Integration Guide for Webhooks & Channels (Telegram/Slack)',
      ],
      timeline: '7-10 days to initial setup as one-time setup, for weekly continuous optimization and monitoring',
      techStack: ['OpenClaw', 'Docker', 'Nginx (SSL)', 'PostgreSQL', 'Python/Node.js', 'Redis'],
  },
  {
    id: 'private-ai-agent-vps',
    number: '03',
    title: 'Self-Hosted AI Agents (Zero API Costs)',
    tagline: 'Your private digital employee—running 24/7 on your own server without subscriptions.',
    icon: '🤖',
    pricing: {
      oneTime: 599, // Increased value because you save them $200+/mo in API fees
      weekly: 149, // Maintenance for SEO crawling and model fine-tuning
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'A secure, 24/7 AI assistant that lives on your server. It handles SEO monitoring, market research, and customer inquiries using "Free" open-source models—meaning no monthly bills from OpenAI or Claude.',
      benefits: [
        'Zero Monthly API Fees: Uses Gemma 4 E4B for high-tier reasoning at no extra cost',
        'Complete Data Privacy: Your business data never leaves your private VPS',
        'Autonomous SEO & Research: An agent that crawls the web and optimizes your site while you sleep',
        'Scaling without Headcount: Automate repetitive Python/Django tasks and data entry',
      ],
    },
    developer: {
      summary: 'Production-grade deployment of Autonomous Agents using OpenClaw and Ollama. Features native tool-calling with Gemma 4, localized RAG, and seamless integration with Django/FastAPI backends.',
      benefits: [
        'Advanced Orchestration: OpenClaw gateway for multi-step task execution',
        'Gemma 4 Native Function Calling: High-speed reasoning with 128K context window',
        'Local Vector Search: Integrated RAG pipeline using ChromaDB/PostgreSQL pgvector',
        'Secure Deployment: Dockerized environment with CloudPanel Reverse Proxy & SSL',
      ],
    },
    deliverables: [
      'Private AI Agent (OpenClaw) deployed on your VPS',
      'Ollama Backend with Gemma 4 E4B optimized for 8GB+ RAM',
      'Custom SEO & Web-Crawl skills integrated',
      'Secure CloudPanel Dashboard for monitoring and logs',
      'Handover guide for adding new business knowledge',
    ],
    timeline: '7-10 days to initial setup as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['Gemma 4', 'OpenClaw', 'Ollama', 'Django/FastAPI', 'Docker', 'CloudPanel'],
  },
  {
    id: 'high-concurrency-backend-optimization',
    number: '04',
    title: 'High-Performance Backend & Database Scaling',
    tagline: 'Scale your infrastructure to 10K+ concurrent users with sub-50ms latency.',
    icon: '⚡',
    pricing: {
      oneTime: 899, // Premium pricing for specialized Python/Async architecture
      weekly: 199, // Ongoing performance monitoring and scaling
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Slow backends kill conversions. I transform sluggish systems into high-speed engines that handle massive traffic spikes without crashing. Using advanced asynchronous architecture, I ensure your business remains online and responsive 24/7.',
      benefits: [
        'Zero-Downtime Scaling: Handle 10x your current traffic effortlessly',
        'Sub-50ms API Response: Instant page loads that keep customers engaged',
        'Slashed Infrastructure Costs: Optimized resource usage reduces monthly VPS bills',
        'Real-Time Reliability: Asynchronous task handling for smooth background processing',
      ],
    },
    developer: {
      summary: 'Architectural-level optimization of Python-based backends (Django/FastAPI). I implement non-blocking I/O, advanced PostgreSQL/MySQL indexing, and distributed task queues to eliminate bottlenecks and optimize server-side severity protocols.',
      benefits: [
        'Async Architecture: Transitioning sync blockers to High-Performance Async Python',
        'Advanced Query Tuning: Deep EXPLAIN analysis for PostgreSQL and MySQL optimization',
        'Distributed Task Management: Celery & Redis integration for heavy background logic',
        'Real-Time WebSockets: Bi-directional communication using Django Channels',
      ],
    },
    deliverables: [
      'Comprehensive Backend Audit & Performance Benchmarks',
      'Database Schema Refactoring & Strategic Indexing',
      'Redis Caching & Celery Background Worker setup',
      'Nginx Hardening & Dockerized Scaling Strategy',
      'Post-Optimization Load Testing & Stability Report',
    ],
    timeline: '1-2 weeks',
    techStack: ['Python (Async)', 'PostgreSQL', 'Redis', 'Celery', 'Nginx', 'Docker'],
  },
  {
    id: 'fullstack-modern-web-architecture',
    number: '05',
    title: 'Modern Full-Stack Web App Development',
    tagline: 'High-performance applications built for speed, SEO, and massive scale.',
    icon: '🚀',
    pricing: {
      oneTime: 2999, // Increased value for specialized "Island Architecture" expertise
      weekly: 249,
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Generic websites are slow and lose customers. I build custom web applications—from complex inventory portals to high-converting e-commerce engines—using modern "Island Architecture." The result? Instant load times, perfect SEO scores, and a system that fits your business like a glove.',
      benefits: [
        'Ultra-Fast Performance: Optimized with Astro and HTMX for near-instant interaction',
        'Built-in SEO Advantage: SSR and Static Generation ensure you rank higher on Google',
        'Responsive & Modern UX: Beautifully crafted with TailwindCSS or Bootstrap for any device',
        'Enterprise-Grade Reliability: Securely hosted on high-speed VPS using Docker isolation',
      ],
    },
    developer: {
      summary: 'Architecting sophisticated web ecosystems using Nuxt 3 and Astro for the frontend, powered by Alpine.js and HTMX for reactive, low-latency client-side logic. Deployment is handled via Dockerized microservices on optimized Linux VPS environments.',
      benefits: [
        'Hybrid Architecture: NuxtJS (Full SSR) and Astro (Island Architecture) for maximum speed',
        'Lightweight Interactivity: Alpine.js & HTMX to eliminate heavy JavaScript bundles',
        'State-of-the-Art Styling: Rapid UI development with TailwindCSS and Bootstrap 5',
        'DevOps Excellence: Containerized deployment with Docker Compose on dedicated VPS',
      ],
    },
    deliverables: [
      'Complete Full-Stack Application (Frontend + Python/Node Backend)',
      'High-Performance Database Design (PostgreSQL/MySQL)',
      'Optimized UI/UX with TailwindCSS/Bootstrap',
      'Dockerized Production Deployment on VPS with SSL',
      'Post-Launch Performance Audit & SEO Optimization',
      '45-Day Priority Technical Support',
    ],
    timeline: '4-8 weeks',
    techStack: ['NuxtJS', 'Astro', 'HTMX', 'Alpine.js', 'TailwindCSS', 'Docker', 'VPS'],
  },
  {
    id: 'industrial-automation-erp',
    number: '06',
    title: 'Custom ERP & Manufacturing Automation',
    tagline: 'Digital transformation for factories—from production floor to final export.',
    icon: '🏭',
    pricing: {
      oneTime: 4999, // Manufacturing solutions carry higher ticket value due to ROI
      weekly: 299,
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Ditch the messy spreadsheets. I build custom ERP systems designed specifically for manufacturing (Garments, Textiles, Industrial) that track raw materials, production stages, and worker efficiency in real-time. Gain 100% visibility over your factory floor from a single dashboard.',
      benefits: [
        'Eliminate Production Bottlenecks: Real-time tracking of every garment/unit stage',
        'Smart Inventory Management: Automated low-stock alerts and QR-based tracking',
        'Data-Driven Decision Making: One-click export of production and payroll reports',
        'Reduced Operational Waste: Digital workflows that catch errors before they cost money',
      ],
    },
    developer: {
      summary: 'High-concurrency ERP architecture built with Django Ninja for lightning-fast API performance and Astro for real-time monitoring dashboards. Includes IoT sensor integration (MQTT), barcode/QR logic, and automated Celery tasks for heavy reporting.',
      benefits: [
        'Django Ninja Core: Type-safe, high-performance REST APIs with automatic OpenAPI docs',
        'Real-time IoT Integration: Support for PLC, MQTT, and sensor-based production counting',
        'Edge-Ready Frontend: Astro and Alpine.js for lightweight, instant-load factory dashboards',
        'Industrial Security: Role-Based Access Control (RBAC) with detailed audit logging',
      ],
    },
    deliverables: [
      'Custom Modular ERP (Inventory, Production, HR, & Payroll)',
      'Barcode/QR Code Integration for material tracking',
      'Live Factory Floor Monitoring Dashboard (Astro-powered)',
      'Automated PDF/Excel Reporting Engine (Celery-based)',
      'User Training Manuals & 90-Day Priority Support',
    ],
    timeline: '8-12 weeks to initial setup as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['Django Ninja', 'Python', 'Astro', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'erpnext-crm-deployment',
    number: '07',
    title: 'Open-Source ERP & CRM Implementation',
    tagline: 'Enterprise-grade business management without the enterprise price tag.',
    icon: '📊',
    pricing: {
      oneTime: 3999, // High value for complex Frappe/Python environments
      weekly: 249, // Maintenance for backups, updates, and custom scripts
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Tired of expensive per-user licenses for Salesforce or SAP? I deploy and customize powerful open-source alternatives like ERPNext and Odoo. You get full control over your Accounting, HR, CRM, and Supply Chain on your own private cloud—with unlimited users and zero recurring license fees.',
      benefits: [
        'Unlimited Users: No more "per-seat" monthly billing',
        '360° Business View: Integrated Accounting, Sales, and Warehouse management',
        'Total Ownership: You own your data and your software forever',
        'Custom Workflows: Automated triggers for emails, approvals, and reporting',
      ],
    },
    developer: {
      summary: 'Expert deployment of the Frappe Framework and ERPNext ecosystem. I handle complex MariaDB/PostgreSQL configurations, Redis caching for Bench, and custom Python-based server scripts. Deployment is standardized via Docker for high availability and easy scaling.',
      benefits: [
        'Frappe Framework Mastery: Custom DocTypes, Client Scripts, and Server Hooks',
        'High-Availability Deployment: Docker-based multi-tenant setups on Ubuntu VPS',
        'Seamless Data Migration: Expert ETL from Excel/Legacy systems into ERPNext',
        'API Integration: Connecting your ERP to Shopify, WooCommerce, or Custom Apps',
      ],
    },
    deliverables: [
      'Fully configured ERPNext/CRM instance on your VPS',
      'Secure SSL, Firewall, and Automated Backup System',
      'Customized Modules (Sales, Purchase, Inventory, Accounts)',
      'Employee Training & Role-Based Permission Setup',
      'Dockerized setup for easy future migrations',
      '60-Day Post-Implementation Technical Audit',
    ],
    timeline: '4-10 weeks',
    techStack: ['ERPNext', 'Frappe', 'Python', 'MariaDB', 'Redis', 'Docker'],
  },
  {
    id: 'algorithmic-trading-fintech',
    number: '08',
    title: 'Algorithmic Trading & FinTech Automation',
    tagline: 'High-precision trading systems for Forex, Crypto, and Global Markets.',
    icon: '📈',
    pricing: {
      oneTime: 1499, // Quantitative engineering demands premium rates
      weekly: 199, // Ongoing strategy optimization and server monitoring
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Emotion is the enemy of trading. I build institutional-grade algorithmic systems that execute your strategies 24/7 with millisecond precision. Whether you trade Forex on MetaTrader 5 or Crypto on Binance, my systems handle the execution, risk management, and data analysis so you can focus on the edge.',
      benefits: [
        '24/7 Emotionless Execution: Eliminate human error and hesitation',
        'Multi-Platform Mastery: Seamlessly automate MT5, TradingView, and Binance',
        'Rigorous Backtesting: Validate strategies with Pandas against years of historical data',
        'Proactive Risk Guard: Automated stop-loss, trailing stops, and position sizing',
      ],
    },
    developer: {
      summary: 'Engineered quantitative trading solutions using Python and MQL5. I specialize in low-latency WebSocket data streams, vectorized backtesting with Pandas, and cross-platform bridge development. Deployments are Dockerized for 99.9% uptime on Linux VPS environments.',
      benefits: [
        'MQL5 Expert Advisors: Professional-grade EA development for MetaTrader 5',
        'High-Frequency Data: Real-time market processing via Binance & TradingView WebSockets',
        'Distributed Architecture: Redis-backed message queuing for multi-symbol strategies',
        'Pine Script Mastery: Advanced TradingView indicators and strategy automation',
      ],
    },
    deliverables: [
      'Custom Trading Bot / Expert Advisor (EA) Source Code',
      'Vectorized Backtesting Report with Sharpe/Sortino Ratios',
      'Real-Time WebSocket Monitoring Dashboard',
      'Risk Management & Capital Preservation Module',
      'Dockerized Deployment on a Secured Cloud VPS',
      'Strategy Fine-Tuning & Optimization Session',
    ],
    timeline: '2-4 weeks',
    techStack: ['Python', 'MQL5', 'MetaTrader 5', 'Binance API', 'Pandas', 'Redis', 'Docker'],
  },
  {
    id: 'devops-security-hardening',
    number: '09',
    title: 'DevOps, Security & Cloud Hardening',
    tagline: 'Bulletproof infrastructure with automated, zero-downtime deployments.',
    icon: '🔒',
    pricing: {
      oneTime: 699, // Increased value for specialized Security & Cloudflare WAF setup
      weekly: 129, // Retainer for server monitoring, backups, and security patches
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Stop worrying about server crashes, data breaches, and deployment headaches. I build automated "Self-Healing" infrastructures that protect your business from hackers and ensure your updates launch perfectly every time without a second of downtime.',
      benefits: [
        'Zero-Downtime Launches: Deploy updates while customers are active',
        'Fortified Security: Multi-layer protection using Cloudflare WAF and SSL',
        'Disaster Recovery: Automated daily backups and 1-click server restoration',
        'Cost Optimization: Efficient VPS management to lower your monthly cloud bills',
      ],
    },
    developer: {
      summary: 'Advanced DevOps orchestration specializing in Docker containerization and GitHub Actions for CI/CD. I implement Nginx reverse proxies, Cloudflare security layers, and automated vulnerability scanning to ensure server-side severity and compliance.',
      benefits: [
        'Automated CI/CD: Multi-stage GitHub Actions for Python/JS testing & deployment',
        'Containerization: Standardized Docker environments for total portability',
        'Nginx Excellence: High-performance reverse proxy and SSL/TLS hardening',
        'Edge Security: Cloudflare Zero Trust and Firewall Rule configuration',
      ],
    },
    deliverables: [
      'Dockerized Application Environment (Dev, Staging, Production)',
      'Automated GitHub Actions CI/CD Pipeline',
      'Cloudflare WAF & Security Hardening Setup',
      'Nginx Reverse Proxy & Auto-Renewing SSL',
      'Automated Off-site Backup & Recovery System',
      'Infrastructure Health Monitoring & Alerting Dashboard',
    ],
    timeline: '1-2 weeks to initial setup as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['Docker', 'GitHub Actions', 'Nginx', 'Cloudflare', 'VPS (Linux)', 'SSL/TLS'],
  },
  {
    id: 'ecommerce-reliability-maintenance',
    number: '10',
    title: 'eCommerce Reliability & Server Maintenance',
    tagline: 'Zero-downtime maintenance for high-growth online stores.',
    icon: '🛠️',
    pricing: {
      oneTime: 399, // Onboarding fee for full system audit and hardening
      weekly: 99,   // Priority 24/7 monitoring and technical support
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Your online store is your 24/7 salesperson. If it slows down or crashes, you lose revenue instantly. I provide professional technical oversight for your eCommerce platform, ensuring your site remains fast, secure, and fully optimized so you can focus on scaling your sales while I handle the code.',
      benefits: [
        'Prevent Cart Abandonment: Optimized checkout speeds that keep customers buying',
        'Bulletproof Security: Regular patches and malware scans to protect customer data',
        'Automated Recovery: Daily off-site backups ensure your orders are never lost',
        'Peace of Mind: Priority emergency response if your server ever goes offline',
      ],
    },
    developer: {
      summary: 'Proactive maintenance across WooCommerce, Shopify, and OpenCart environments. I specialize in PHP/Liquid optimization, database indexing for large product catalogs, and server-side performance tuning. Integration management via Amazon SP-API for automated inventory synchronization.',
      benefits: [
        'WooCommerce Expert: Deep PHP/MySQL tuning and plugin compatibility audits',
        'Shopify Architecture: Liquid theme optimization and private app management',
        'Inventory Automation: Amazon SP-API integration for multi-channel sync',
        'Server Governance: Uptime monitoring, SSL management, and database vacuuming',
      ],
    },
    deliverables: [
      'Weekly Core, Theme, and Plugin/App Security Updates',
      'Automated Daily Off-site Backups & Recovery Testing',
      '24/7 Uptime Monitoring with Real-time Slack/Email Alerts',
      'Database Performance Tuning & Asset Optimization',
      'Monthly Security Audit & Speed Benchmark Report',
      'Priority Technical Support for Site Emergencies',
    ],
    timeline: '7-10 days to initial setup as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['WooCommerce', 'Shopify', 'OpenCart', 'Amazon SP-API', 'PHP', 'Linux VPS'],
  },
  {
    id: 'manufacturing-automation-erp',
    number: '11',
    title: 'Manufacturing ERP & Real-Time Production Tracking',
    tagline: 'Digitize your shop floor with sub-second latency and automated reporting.',
    icon: '⚙️',
    pricing: {
      oneTime: 2499, // Custom ERP module development and IoT bridge
      weekly: 499,  // Real-time monitoring, hardware maintenance, and data backups
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'Spreadsheets lead to human error and lost revenue. I build custom, high-speed ERP modules that track your production in real-time. From raw material inventory to final dispatch, get a God-eye view of your factory with automated alerts for bottlenecks.',
      benefits: [
        'Eliminate Manual Entry: Barcode/IoT integration for automated tracking',
        'Real-Time Bottleneck Detection: Instant alerts when a production line slows down',
        'Predictive Inventory: Automated re-ordering of materials based on production speed',
        'Custom Dashboarding: High-level financial and operational reports for stakeholders',
      ],
    },
    developer: {
      summary: 'Building resilient, low-latency backends for industrial environments. I focus on "Offline-First" architecture so your factory keeps running even if the internet goes down, with background synchronization via Celery and RabbitMQ or Redis.',
      benefits: [
        'IoT Gateway Integration: Connecting hardware sensors to Django/Django-Ninja backends',
        'Event-Driven Architecture: Using WebSockets for real-time shop floor updates',
        'Relational Data Integrity: Complex schema design for multi-stage manufacturing',
        'Edge Computing: Localized Docker nodes for ultra-low latency processing',
      ],
    },
    deliverables: [
      'Custom ERP/Production Tracking Web Dashboard',
      'IoT/Scanner Integration Bridge',
      'Automated PDF/Excel Reporting Engine',
      'On-Site or Private Cloud Server Configuration',
      'Operator & Manager Training Documentation',
    ],  
    timeline: '4-6 weeks to initial setup and development as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['Django', 'PostgreSQL', 'RabbitMQ', 'MQTT', 'celery', 'Channels', 'Docker', 'Astro'],
  },

  {
    id: 'ecommerce-performance-hardening',
    number: '12',
    title: 'E-commerce Performance & Security Hardening',
    tagline: 'Zero-lag shopping experience protected by enterprise-grade security.',
    icon: '🛡️',
    pricing: {
      oneTime: 1200, // Varnish/Nginx optimization and WAF configuration
      weekly: 150,  // Bot mitigation monitoring and cache-hit ratio tuning
    },
    payment_links: {
      default: {
        oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
        weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
      },
      bd: { oneTime: 'https://bkash.com/...', weekly: 'https://bkash.com/...' },
      in: { oneTime: 'https://razorpay.com/...', weekly: 'https://razorpay.com/...' },
    },
    businessOwner: {
      summary: 'A 1-second delay in page load costs 7% in conversions. I transform standard OpenCart/WooCommerce stores into high-performance engines. Beyond speed, I harden your store against SQL injections, bot-driven price scraping, and checkout attacks.',
      benefits: [
        'Blazing Fast Speed: Achieved through advanced Varnish & Redis caching layers',
        'Bot & Scraper Protection: Prevent competitors from stealing your pricing data',
        'Fraud Prevention: Hardened checkout protocols to stop automated payment testing',
        'SEO Ranking Boost: Faster sites rank higher on Google automatically',
      ],
    },
    developer: {
      summary: 'Advanced server-side optimization including Nginx vHost tuning, Varnish Cache policy writing, and Layer 7 Firewall (WAF) implementation. I focus on reducing TTFB (Time to First Byte) and securing the application layer.',
      benefits: [
        'Varnish VCL Customization: Strategic cache-purging for real-time inventory',
        'Nginx Hardening: Implementation of rate-limiting and custom security headers',
        'Database Query Optimization: Identifying and fixing slow JOINs in e-commerce schemas',
        'SSL/TLS Performance: Modernizing cipher suites for faster, secure handshakes',
      ],
    },
    deliverables: [
      'Full Security & Performance Audit Report',
      'Custom Varnish/Nginx Configuration Files',
      'Cloudflare Enterprise-Level Firewall Rules',
      'Automated Database Optimization Scripts',
      'Post-Setup Load Testing (Simulating 5k+ shoppers)',
    ],
    timeline: '7-10 days to initial setup as one-time setup, for weekly continuous optimization and monitoring',
    techStack: ['Nginx', 'Varnish', 'Redis', 'OpenCart/WooCommerce', 'Linux Hardening'],
  },
];

// Profile / About data
export const profile = {
  name: 'Haradhan Sharma',
  fname: 'Haradhan',
  lname: 'Sharma',
  apndx: "'s",
  title: 'Full-Stack Developer & AI Automation Specialist',
  tagline: 'Building intelligent systems that help businesses grow — from custom web apps to AI agents that work while you sleep.',
  email: 'me@hrdnsh.com',
  phone: '+8801712270815',
  upwork: 'https://www.upwork.com/freelancers/~0166a448a65b1641fb',
  location: 'Remote — Worldwide',
  url: 'https://hrdnsh.com',
  bio: [
    'I\'m a full-stack developer with 5+ years of experience building production-grade applications that solve real business problems. I specialize in creating intelligent systems — from AI-powered agents to automated trading platforms — that help businesses operate smarter and faster.',
    'My approach is practical: I focus on delivering solutions that actually work in production, not just prototypes. Every project I deliver includes proper documentation, monitoring, and the support you need to maintain it long-term.',
    'I work with businesses of all sizes — from startups building their first MVP to established companies modernizing their tech stack. Whether you need a complete web application, an AI agent, or someone to optimize your existing infrastructure, I bring the expertise and reliability you need.',
  ],
  techStack: [
    { 
      category: 'Frontend & UI', 
      items: ['Astro (Island Architecture)', 'Nuxt 3', 'HTMX', 'Alpine.js', 'TailwindCSS', 'TypeScript', 'Responsive Design'] 
    },
    { 
      category: 'Backend & High-Performance', 
      items: ['Python (Async)', 'Django Ninja', 'FastAPI', 'Celery', 'Django Channels (WebSockets)', 'REST/GraphQL APIs'] 
    },
    { 
      category: 'Database & Real-time', 
      items: ['PostgreSQL (pgvector)', 'MySQL/MariaDB', 'Redis (Caching & Pub/Sub)', 'MongoDB', 'Supabase', 'Pinecone'] 
    },
    { 
      category: 'AI & Autonomous Agents', 
      items: ['Gemma 4 (Ollama)', 'OpenClaw Gateway', 'LangChain', 'RAG Pipelines', 'Vector Embeddings', 'Function Calling'] 
    },
    { 
      category: 'DevOps & Reliability', 
      items: ['Docker & Docker Compose', 'GitHub Actions (CI/CD)', 'Nginx Reverse Proxy', 'Cloudflare WAF', 'Linux VPS Hardening'] 
    },
    { 
      category: 'FinTech & eCommerce', 
      items: ['MQL5 (MetaTrader 5)', 'Binance SP-API', 'WooCommerce', 'Shopify (Liquid)', 'Amazon SP-API', 'ERPNext (Frappe)'] 
    },
],
  stats: [
    { label: 'Projects Delivered', value: '150+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Response Time', value: '< 2hrs' },
  ],
};

export const commonTechStack = [
  'Python (Async)', 
  'Django Ninja', 
  'Gemma 4 (AI)', 
  'OpenClaw', 
  'Nuxt 3', 
  'Astro', 
  'HTMX', 
  'PostgreSQL', 
  'Redis', 
  'Docker', 
  'MQL5', 
  'Cloudflare'
];

// Site-wide data — single source of truth for brand, contact, and URLs
export const siteData = {
  siteName: `${profile.fname} ${profile.lname}${profile.apndx} Services`,
  brandName: 'hrdnsh',
  url: profile.url,
  email: profile.email,
  phone: profile.phone,
  whatsapp: '8801712270815', // digits only for wa.me link
  upwork: profile.upwork,
  location: profile.location,
  defaultOgImage: '/og-image.jpg',
  defaultDescription: 'Full-stack development services — AI agents, web apps, automation, and DevOps. Build smarter systems with expert engineering.',
  serviceTypes: ['Web Development', 'AI Agent Development', 'Backend Optimization', 'DevOps'],
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
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Resume', href: '/resume' },
  { label: 'Recommend', href: '/recommend' },
  { label: 'Contact', href: '/#contact' },
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
  { code: 'default', name: 'Stripe', icon: '💳' },
  { code: 'bd', name: 'bKash', icon: '📱' },
  { code: 'in', name: 'Razorpay', icon: '🇮🇳' },
];


// Recommended tools & services (affiliate links)
export const recommendations = [
  {
    category: 'Cloud Hosting',
    icon: '☁️',
    items: [
      {
        name: 'DigitalOcean',
        tagline: 'Simple cloud hosting for developers',
        description: 'Droplets, managed databases, Kubernetes, and app platform. Clean pricing with no surprise bills. Perfect for deploying production apps quickly.',
        url: 'https://www.digitalocean.com/?refcode=YOUR_REF_CODE',
        badge: 'I Use Daily',
        badgeColor: 'accent',
        pros: ['Predictable pricing', 'Great documentation', 'One-click app deployments', 'Free tier available'],
        startingPrice: '$4/mo',
      },
      {
        name: 'AWS (Amazon Web Services)',
        tagline: 'Industry-standard cloud infrastructure',
        description: 'The most comprehensive cloud platform — EC2, S3, Lambda, RDS, and hundreds more. Essential for enterprise-grade applications and scaling.',
        url: 'https://aws.amazon.com/?YOUR_REF_CODE',
        badge: 'Enterprise Standard',
        badgeColor: 'primary',
        pros: ['Most services available', 'Global edge network', 'Free tier for 12 months', 'Industry compliance'],
        startingPrice: 'Free tier',
      },
    ],
  },
  {
    category: 'VPS & Servers',
    icon: '🖥️',
    items: [
      {
        name: 'Hetzner Cloud',
        tagline: 'Best price-to-performance VPS in Europe',
        description: 'Incredible value cloud servers based in Germany and Finland. Perfect for cost-sensitive projects that need serious compute power. I use these for personal projects.',
        url: 'https://hetzner.cloud/?ref=YOUR_REF_CODE',
        badge: 'Best Value',
        badgeColor: 'accent',
        pros: ['Unbeatable pricing', 'High-performance CPUs', 'European data centers', 'Excellent uptime'],
        startingPrice: '€3.29/mo',
      },
      {
        name: 'Linode (Akamai)',
        tagline: 'Reliable cloud compute with simple pricing',
        description: 'Straightforward VPS hosting with consistent performance. Now part of Akamai with global CDN integration. Great for blogs, APIs, and small applications.',
        url: 'https://www.linode.com/?r=YOUR_REF_CODE',
        badge: '',
        badgeColor: '',
        pros: ['Simple pricing', 'Global data centers', '24/7 human support', 'Built-in backups'],
        startingPrice: '$5/mo',
      },

      {
        name: 'Contabo',
        tagline: 'Reliable cloud compute with simple pricing',
        description: 'Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.',
        url: 'https://contabo.com/en/vps/?utm_source=cj&utm_medium=affiliate&utm_campaign=vps',
        badge: '',
        badgeColor: '',
        pros: ['Simple pricing', 'Global data centers', '24/7 human support', 'Built-in backups'],
        startingPrice: '$3.9/mo',
      },

      {
        name: 'Hostinger',
        tagline: 'Reliable cloud compute with simple pricing',
        description: 'Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.',
        url: 'https://www.hostinger.com/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=NKWHARADHG2L&referral_id=019d5a62-f9e7-7361-96de-bb360c6d66ca',
        badge: '',
        badgeColor: '',
        pros: ['Simple pricing', 'Global data centers', '24/7 human support', 'Built-in backups'],
        startingPrice: '$5.59/mo',
      },

      {
        name: 'SSDNODES',
        tagline: 'Reliable cloud compute with simple pricing',
        description: 'Straightforward VPS hosting with consistent performance. Global CDN integration. Great for blogs, APIs, and any applications.',
        url: 'https://www.ssdnodes.com/manage/aff.php?aff=2160&register=true',
        badge: '',
        badgeColor: '',
        pros: ['Simple pricing', 'Global data centers', '24/7 human support', 'Built-in backups'],
        startingPrice: '$5.59/mo',
      },


      
    
    ],
  },
  {
    category: 'Domain & DNS',
    icon: '🌐',
    items: [
      {
        name: 'Cloudflare',
        tagline: 'Free CDN, DNS, and DDoS protection',
        description: 'Every website should use Cloudflare. Free tier includes CDN, DNS management, SSL, DDoS protection, and basic caching. Pro tier adds WAF and analytics.',
        url: 'https://www.cloudflare.com/?ref=YOUR_REF_CODE',
        badge: 'Essential',
        badgeColor: 'accent',
        pros: ['Generous free tier', 'Global CDN network', 'DDoS protection included', 'Easy DNS management'],
        startingPrice: 'Free',
      },
      {
        name: 'Namecheap',
        tagline: 'Affordable domain registration',
        description: 'Clean domain registrar with transparent pricing. Free WhoisGuard privacy protection included with every domain. No upsell tricks.',
        url: 'https://www.namecheap.com/?aff=YOUR_REF_CODE',
        badge: '',
        badgeColor: '',
        pros: ['Low renewal prices', 'Free WhoisGuard', 'Clean interface', 'Bulk domain tools'],
        startingPrice: '$5.98/yr',
      },
    ],
  },
  {
    category: 'Development Tools',
    icon: '🛠️',
    items: [
      {
        name: 'GitHub Pro',
        tagline: 'Private repositories with advanced features',
        description: 'Essential for professional development. GitHub Actions CI/CD, Codespaces, Copilot, and advanced repository management. Free for students.',
        url: 'https://github.com/pricing?ref=YOUR_REF_CODE',
        badge: 'Must Have',
        badgeColor: 'primary',
        pros: ['GitHub Actions CI/CD', 'Codespaces dev environment', 'Copilot AI assistant', 'Best community support'],
        startingPrice: 'Free',
      },
      {
        name: 'Vercel',
        tagline: 'Best platform for frontend deployment',
        description: 'Zero-config deployments for Next.js, Astro, and modern web frameworks. Preview deployments for every PR. Serverless functions included.',
        url: 'https://vercel.com/?ref=YOUR_REF_CODE',
        badge: 'Recommended',
        badgeColor: 'accent',
        pros: ['Instant deployments', 'Automatic HTTPS', 'Edge functions', 'Preview environments'],
        startingPrice: 'Free',
      },
    ],
  },
  {
    category: 'AI & APIs',
    icon: '🤖',
    items: [
      {
        name: 'OpenAI API',
        tagline: 'GPT-4, GPT-4o, and more via API',
        description: 'The most powerful LLM APIs available. Build chatbots, agents, content generators, and intelligent automation. I use this in almost every AI project.',
        url: 'https://openai.com/api/?ref=YOUR_REF_CODE',
        badge: 'My Go-To',
        badgeColor: 'accent',
        pros: ['GPT-4o & GPT-4 models', 'Function calling', 'Vision capabilities', 'Embeddings for search'],
        startingPrice: 'Pay-per-use',
      },
      {
        name: 'Pinecone',
        tagline: 'Managed vector database for AI apps',
        description: 'Purpose-built vector database for RAG applications, semantic search, and AI agents. Fast, scalable, and integrates with LangChain and LlamaIndex.',
        url: 'https://www.pinecone.io/?ref=YOUR_REF_CODE',
        badge: '',
        badgeColor: '',
        pros: ['Purpose-built for vectors', 'Low latency queries', 'LangChain integration', 'Free starter tier'],
        startingPrice: 'Free tier',
      },
    ],
  },
];

export const testimonials = [
  {
    quote: 'The AI agent they built handles 80% of our customer inquiries automatically. It\'s like having a 24/7 support team.',
    author: 'Sarah M.',
    role: 'E-commerce Owner',
    service: 'AI Agent Setup',
  },
  {
    quote: 'Our API response times went from 3 seconds to under 100ms. The optimization was worth every penny.',
    author: 'James K.',
    role: 'CTO, SaaS Startup',
    service: 'Backend Optimization',
  },
  {
    quote: 'Custom ERP that actually fits our manufacturing workflow. No more fighting with off-the-shelf software.',
    author: 'Michael R.',
    role: 'Operations Director',
    service: 'Industrial ERP',
  },
];
