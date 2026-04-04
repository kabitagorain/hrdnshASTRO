// Service definitions — single source of truth
export const services = [
  {
    id: 'ai-agent-setup',
    number: '01',
    title: 'Private AI Agent Setup & Deployment',
    tagline: 'Build your own intelligent assistant — tailored to your business logic.',
    icon: '🤖',
    pricing: {
      oneTime: 499,
      weekly: 99,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_1',
      weekly: 'https://buy.stripe.com/YOUR_LINK_1_SUB',
    },
    businessOwner: {
      summary: 'Your own AI assistant that understands your business — answering customer questions, processing orders, and automating daily tasks 24/7 without hiring extra staff.',
      benefits: [
        'Automate customer support with an AI that knows your products inside-out',
        'Process bookings, inquiries, and follow-ups while you sleep',
        'Reduce operational costs by handling repetitive tasks automatically',
        'Scale your business without scaling your headcount',
      ],
    },
    developer: {
      summary: 'End-to-end deployment of custom AI agents using OpenAI, LangChain, and vector databases. Includes RAG pipeline, function calling, and integration with your existing APIs.',
      benefits: [
        'Custom LLM agent with LangChain/LlamaIndex orchestration',
        'RAG pipeline with Pinecone/Weaviate vector stores',
        'Function calling & tool-use integration with your APIs',
        'Secure deployment with Docker, rate limiting, and monitoring',
      ],
    },
    deliverables: [
      'Custom AI agent deployed and running',
      'Knowledge base integrated with your data',
      'API endpoints for external integrations',
      'Admin dashboard for monitoring & training',
      'Documentation & handover guide',
    ],
    timeline: '1-2 weeks',
    techStack: ['OpenAI', 'LangChain', 'Pinecone', 'FastAPI', 'Docker'],
  },
  {
    id: 'backend-api-optimization',
    number: '02',
    title: 'Backend API & Database Optimization',
    tagline: 'Lightning-fast APIs that scale under pressure.',
    icon: '⚡',
    pricing: {
      oneTime: 799,
      weekly: 149,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_2',
      weekly: 'https://buy.stripe.com/YOUR_LINK_2_SUB',
    },
    businessOwner: {
      summary: 'Is your website slow? Customers leave when pages take too long to load. I optimize your backend systems so everything runs fast, handles more visitors, and never crashes during peak times.',
      benefits: [
        'Pages load 3-10x faster after optimization',
        'Handle traffic spikes without downtime',
        'Lower server costs through efficient resource usage',
        'Better customer experience = more conversions',
      ],
    },
    developer: {
      summary: 'Deep performance audit and optimization of REST/GraphQL APIs, database queries, caching layers, and server architecture. Includes load testing, query optimization, and CDN configuration.',
      benefits: [
        'Query optimization with EXPLAIN analysis and indexing strategy',
        'Redis/Memcached caching layer implementation',
        'API response time reduction from seconds to milliseconds',
        'Database connection pooling and query batching',
      ],
    },
    deliverables: [
      'Performance audit report with benchmarks',
      'Optimized database queries & indexing',
      'Caching layer implementation',
      'Load testing results & capacity planning',
      'Monitoring & alerting setup',
    ],
    timeline: '1-2 weeks',
    techStack: ['PostgreSQL', 'Redis', 'Node.js', 'GraphQL', 'Nginx'],
  },
  {
    id: 'fullstack-web-development',
    number: '03',
    title: 'Full-Stack Web Application Development',
    tagline: 'From concept to launch — complete web applications built to scale.',
    icon: '🚀',
    pricing: {
      oneTime: 2499,
      weekly: 199,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_3',
      weekly: 'https://buy.stripe.com/YOUR_LINK_3_SUB',
    },
    businessOwner: {
      summary: 'Need a custom web application? Whether it\'s a customer portal, booking system, inventory management, or internal tool — I build complete solutions that work exactly the way your business needs.',
      benefits: [
        'Custom-built solution tailored to your exact workflows',
        'Professional UI/UX that your team will actually enjoy using',
        'Mobile-responsive design works on any device',
        'Scalable architecture that grows with your business',
      ],
    },
    developer: {
      summary: 'Full-stack application development using React/Next.js frontend with Node.js/Python backend. Includes database design, API architecture, authentication, and CI/CD pipeline setup.',
      benefits: [
        'React/Next.js with TypeScript for type-safe frontend',
        'REST/GraphQL API with comprehensive documentation',
        'PostgreSQL/MongoDB with Prisma ORM and migrations',
        'CI/CD pipeline with GitHub Actions and staging environments',
      ],
    },
    deliverables: [
      'Complete web application (frontend + backend)',
      'Database schema design & migration files',
      'API documentation (Swagger/OpenAPI)',
      'User authentication & authorization system',
      'Deployment to production with CI/CD',
      '30-day post-launch support',
    ],
    timeline: '4-8 weeks',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'industrial-automation-erp',
    number: '04',
    title: 'Industrial Automation & Custom ERP',
    tagline: 'Streamline manufacturing, inventory, and operations with intelligent systems.',
    icon: '🏭',
    pricing: {
      oneTime: 3499,
      weekly: 249,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_4',
      weekly: 'https://buy.stripe.com/YOUR_LINK_4_SUB',
    },
    businessOwner: {
      summary: 'Replace messy spreadsheets and manual processes with a custom system that manages your inventory, production, orders, and reporting — all in one place, accessible from anywhere.',
      benefits: [
        'Eliminate manual data entry errors and duplicate work',
        'Real-time inventory tracking and low-stock alerts',
        'Automated reporting saves hours every week',
        'Centralized dashboard for complete business visibility',
      ],
    },
    developer: {
      summary: 'Custom ERP modules for inventory management, production tracking, order processing, and analytics. Integrates with PLCs, barcode scanners, IoT sensors, and existing business systems via APIs.',
      benefits: [
        'Modular architecture for phased deployment',
        'IoT integration for real-time production monitoring',
        'REST API layer for third-party system integration',
        'Role-based access control with audit logging',
      ],
    },
    deliverables: [
      'Custom ERP system with required modules',
      'IoT/sensor integration (if applicable)',
      'Barcode/QR scanning system',
      'Automated reporting dashboard',
      'User training and documentation',
      '3-month post-deployment support',
    ],
    timeline: '6-12 weeks',
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'MQTT', 'Docker'],
  },
  {
    id: 'fintech-trading-automation',
    number: '05',
    title: 'FinTech & Trading Automation',
    tagline: 'Algorithmic trading systems and financial tools built for precision.',
    icon: '📈',
    pricing: {
      oneTime: 999,
      weekly: 149,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_5',
      weekly: 'https://buy.stripe.com/YOUR_LINK_5_SUB',
    },
    businessOwner: {
      summary: 'Automate your trading strategies and financial workflows. Whether it\'s crypto, stocks, or custom financial instruments — I build systems that execute trades and manage portfolios according to your rules.',
      benefits: [
        'Execute trades 24/7 without emotional decisions',
        'Backtest strategies with historical data before risking capital',
        'Custom alerts and risk management built in',
        'Complete transparency — you see every trade and why it happened',
      ],
    },
    developer: {
      summary: 'Trading bot development with exchange API integration (Binance, Coinbase, Interactive Brokers), backtesting frameworks, real-time data pipelines, and risk management modules.',
      benefits: [
        'Multi-exchange support via unified API abstraction',
        'Vectorized backtesting with pandas/numpy',
        'WebSocket real-time market data feeds',
        'Risk management with position sizing and stop-loss automation',
      ],
    },
    deliverables: [
      'Trading bot with your strategy implemented',
      'Backtesting report with performance metrics',
      'Risk management module',
      'Real-time monitoring dashboard',
      'Deployment guide & configuration manual',
    ],
    timeline: '2-4 weeks',
    techStack: ['Python', 'CCXT', 'Pandas', 'WebSockets', 'Redis', 'Docker'],
  },
  {
    id: 'devops-security-deployment',
    number: '06',
    title: 'DevOps, Security & Deployment',
    tagline: 'Bulletproof infrastructure that deploys itself.',
    icon: '🔒',
    pricing: {
      oneTime: 599,
      weekly: 99,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_6',
      weekly: 'https://buy.stripe.com/YOUR_LINK_6_SUB',
    },
    businessOwner: {
      summary: 'Stop worrying about server crashes, security breaches, and deployment headaches. I set up systems that automatically deploy your updates, protect against attacks, and keep everything running smoothly.',
      benefits: [
        'Zero-downtime deployments — customers never see errors',
        'Automated backups so you never lose data',
        'Security hardening protects against hackers',
        'Monthly infrastructure cost optimization',
      ],
    },
    developer: {
      summary: 'Infrastructure as Code with Terraform/Ansible, Docker containerization, Kubernetes orchestration, CI/CD pipeline design, SSL/TLS management, and comprehensive security auditing.',
      benefits: [
        'Docker + Kubernetes for container orchestration',
        'GitHub Actions / GitLab CI with multi-stage pipelines',
        'Terraform IaC for reproducible infrastructure',
        'OWASP security audit and vulnerability scanning',
      ],
    },
    deliverables: [
      'Docker containerization of your application',
      'CI/CD pipeline configuration',
      'SSL certificate setup & auto-renewal',
      'Security audit report & remediation',
      'Monitoring & alerting dashboard',
      'Infrastructure documentation',
    ],
    timeline: '1–2 weeks',
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS', 'Nginx'],
  },
  {
    id: 'ecommerce-maintenance',
    number: '07',
    title: 'Website, Server & eCommerce Maintenance',
    tagline: 'Keep your online store running smoothly — always.',
    icon: '🛠️',
    pricing: {
      oneTime: 299,
      weekly: 79,
    },
    stripeLinks: {
      oneTime: 'https://buy.stripe.com/YOUR_LINK_7',
      weekly: 'https://buy.stripe.com/YOUR_LINK_7_SUB',
    },
    businessOwner: {
      summary: 'Your online store is your storefront. I keep it updated, secure, fast, and running 24/7 — so you can focus on selling products, not fixing technical problems.',
      benefits: [
        'Regular updates prevent security vulnerabilities',
        'Fast loading times keep customers from abandoning carts',
        'Automated backups protect your product data and orders',
        'Priority response when something goes wrong',
      ],
    },
    developer: {
      summary: 'Comprehensive maintenance covering WooCommerce, Shopify, OpenCart, and Amazon Store platforms. Includes PHP/plugin updates, server monitoring, database optimization, SSL management, and performance tuning.',
      benefits: [
        'WooCommerce: PHP updates, plugin compatibility, database optimization',
        'Shopify: Liquid theme customization, app management, checkout optimization',
        'OpenCart: Extension updates, server tuning, SEO module maintenance',
        'Amazon: Listing optimization via API, inventory sync automation',
      ],
    },
    deliverables: [
      'Platform updates & security patches',
      'Weekly performance report',
      'Automated backup configuration',
      'SSL certificate management',
      'Uptime monitoring with alerting',
      'Monthly health audit',
    ],
    timeline: 'Ongoing',
    techStack: ['WooCommerce', 'Shopify', 'OpenCart', 'Amazon SP-API', 'PHP', 'MySQL'],
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
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'AlpineJS', 'Astro'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'Express', 'GraphQL', 'REST APIs'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Pinecone', 'Supabase'] },
    { category: 'AI/ML', items: ['OpenAI', 'LangChain', 'LlamaIndex', 'Hugging Face', 'RAG Pipelines'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions', 'Nginx'] },
    { category: 'eCommerce', items: ['WooCommerce', 'Shopify', 'OpenCart', 'Amazon SP-API'] },
  ],
  stats: [
    { label: 'Projects Delivered', value: '150+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Response Time', value: '< 2hrs' },
  ],
};

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
