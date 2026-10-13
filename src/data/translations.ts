export type Locale = 'en' | 'de' | 'bn' | 'es';

export interface ServiceTranslation {
  title: string;
  tagline: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  h1: string;
}

export interface TranslationBundle {
  brandName: string;
  heroBadge: string;
  heroHeadingPart1: string;
  heroHeadingPart2: string;
  heroHeadingPart3: string;
  heroTagline: string;
  ctaScheduler: string;
  ctaExplorer: string;
  navHome: string;
  navResume: string;
  navServices: string;
  navAffiliates: string;
  navInsights: string;
  navInvoicing: string;
  navConsultation: string;
  selectLanguage: string;
  systemFinderHeading: string;
  recommenderCta: string;
  recommenderSubheading: string;
  matchedBanner: string;
  datacenterSelectorTitle: string;
  datacenterSelectorSubtitle: string;
  germanyRegion: string;
  ukRegion: string;
  singaporeRegion: string;
  usaRegion: string;
  finlandRegion: string;
  latencyLevel: string;
  optimalHostingSelection: string;
  invoiceSubtitle: string;
  applySwiftTemplate: string;
  pages: {
    home: PageMetadata;
    services: PageMetadata;
    resume: PageMetadata;
    consultation: PageMetadata;
    billing: PageMetadata;
    recommend: PageMetadata;
    privacy: PageMetadata;
    terms: PageMetadata;
  };
  services: Record<string, ServiceTranslation>;
}

export const translations: Record<Locale, TranslationBundle> = {
  en: {
    brandName: "HRDNSH.com",
    heroBadge: "20+ Years Industrial Operations Leadership & Chief Enterprise Architect",
    heroHeadingPart1: "Harmonizing",
    heroHeadingPart2: "Industrial Manufacturing Scale",
    heroHeadingPart3: "with Sovereign AI & Resilient Systems.",
    heroTagline: "Bridging 20+ years of factory operations (10 Yrs PPC Manager at Fakir Knitwears, CEO) with Sovereign AI pipelines, custom ERP architectures (Odoo/ERPNext), and high-concurrency enterprise engineering.",
    ctaScheduler: "Schedule Executive Strategic Session",
    ctaExplorer: "Explore 14 Architecture Blueprints",
    navHome: "Overview",
    navResume: "Leadership Dossier",
    navServices: "Engineering Blueprints",
    navAffiliates: "Enterprise Stack",
    navInsights: "Executive Insights",
    navInvoicing: "Corporate Settlement",
    navConsultation: "Strategic Advisory",
    selectLanguage: "Interface Language",
    systemFinderHeading: "Executive Architecture Finder",
    recommenderCta: "Generate Tailored Infrastructure Plan",
    recommenderSubheading: "Select your enterprise tier and primary throughput requirement to identify optimal architectures.",
    matchedBanner: "Architectural Pattern Matched",
    datacenterSelectorTitle: "Enterprise Datacenter Locality",
    datacenterSelectorSubtitle: "Zero-egress low latency multi-region cloud routing.",
    germanyRegion: "Falkenstein (Germany) - Central Europe",
    ukRegion: "London (UK) - Western Europe",
    singaporeRegion: "Singapore - Asia Pacific Low-Latency",
    usaRegion: "Ashburn (USA East) - North American Backbone",
    finlandRegion: "Helsinki (Finland) - Nordics High Security",
    latencyLevel: "Latency Verification",
    optimalHostingSelection: "Recommended Bare-Metal & Cloud Profile",
    invoiceSubtitle: "Generate and settle verifiable invoices for advisory retainers, architecture implementation, and audits.",
    applySwiftTemplate: "Load Enterprise Master Retainer Template",
    pages: {
      home: {
        title: "Haradhan Sharma — Executive Operations Leader & Chief Enterprise Architect",
        description: "20+ years industrial manufacturing leadership (PPC Manager at Fakir Knitwears, CEO) and deep-tech Sovereign AI, Custom ERP, and high-concurrency systems architecture.",
        h1: "Haradhan Sharma — Executive Operations Leader & Chief Enterprise Architect"
      },
      services: {
        title: "Systems Architecture & Custom ERP Catalog | Haradhan Sharma",
        description: "Explore 14 production-grade engineering blueprints: Sovereign AI, Agentic RAG, Industrial ERP (Odoo/ERPNext), High-Concurrency Backends, and Cloud Hardening.",
        h1: "Production Engineering Ecosystems & Systems Architecture"
      },
      resume: {
        title: "Executive CV & Leadership Dossier | Haradhan Sharma",
        description: "Executive CV of Haradhan Sharma: 20+ years industrial operations, 10 years PPC Manager at Fakir Knitwears, CEO, Head of MIS, and Central Warehouse & Supply Chain Leadership.",
        h1: "Executive Curriculum Vitae & Leadership Dossier"
      },
      consultation: {
        title: "Schedule an Executive Strategic Consultation | Haradhan Sharma",
        description: "Schedule an executive discovery session to discuss factory operations modernization, Sovereign AI, custom ERP architecture, or enterprise scaling.",
        h1: "Schedule an Executive Strategic Consultation"
      },
      billing: {
        title: "Direct Invoicing & Corporate Billing | Haradhan Sharma",
        description: "Secure payment portal for enterprise contracts, retainers, and strategic advisory agreements.",
        h1: "Corporate Invoicing & Settlement Portal"
      },
      recommend: {
        title: "Recommended Enterprise Stack & Tools | Haradhan Sharma",
        description: "Personally vetted enterprise infrastructure, cloud hosting, and AI developer tools recommended by Haradhan Sharma.",
        h1: "Recommended Enterprise Infrastructure & Stack"
      },
      privacy: {
        title: "Privacy & Data Governance Policy | Haradhan Sharma",
        description: "Privacy policy, data protection governance, security protocols, and third-party advertising cookie disclosures for Haradhan Sharma Executive Advisory.",
        h1: "Privacy Protection & Data Governance Protocol"
      },
      terms: {
        title: "Terms of Engagement & Corporate Master Services | Haradhan Sharma",
        description: "Master service terms of engagement, liability scopes, retainers, and delivery milestones for Haradhan Sharma Executive Advisory.",
        h1: "Terms of Engagement & Corporate Master Services"
      }
    },
    services: {
      "agentic-ai-rag-orchestration": {
        title: "Agentic AI & Private RAG Orchestration",
        tagline: "Enterprise-grade autonomous multi-agent pipelines with local vector embeddings, hybrid BM25 search, and strict data governance."
      },
      "openclaw-enterprise-web-gateway": {
        title: "OpenClaw Enterprise Web Gateway & Automation",
        tagline: "Zero-trust autonomous web interaction infrastructure with automated session handling and rate-resilient API routing."
      },
      "private-ai-agent-vps": {
        title: "Private AI Agent VPS & Sovereign LLM Deployment",
        tagline: "Hardened bare-metal & private cloud deployment of open-weights LLMs (DeepSeek, Llama 3) with zero data leakage."
      },
      "high-concurrency-backend-optimization": {
        title: "High-Concurrency Backend Architecture & DB Optimization",
        tagline: "Sub-10ms response times at 100k+ RPS with Redis caching, PostgreSQL connection pooling, and asynchronous messaging."
      },
      "fullstack-modern-web-architecture": {
        title: "Fullstack Modern Web Architecture & Micro-Frontends",
        tagline: "Ultra-responsive SSR/SSG enterprise portals built with modern frameworks, edge caching, and modular architectures."
      },
      "industrial-automation-erp": {
        title: "Industrial Automation & Factory ERP Modernization",
        tagline: "20+ years shop-floor manufacturing expertise digitized into real-time ERP workflows, IoT tracking, and automated PPC."
      },
      "erpnext-crm-deployment": {
        title: "ERPNext & Enterprise CRM Production Deployment",
        tagline: "Full-lifecycle implementation, customization, data migration, and high-availability clustering for ERPNext."
      },
      "algorithmic-trading-fintech": {
        title: "Algorithmic Trading & FinTech Execution Engines",
        tagline: "Low-latency order routing, risk management controls, and real-time WebSocket market data ingestion."
      },
      "devops-security-hardening": {
        title: "DevOps Security Hardening & Infrastructure as Code",
        tagline: "Zero-trust Linux server hardening, automated CI/CD pipelines, container orchestration, and disaster recovery."
      },
      "ecommerce-reliability-maintenance": {
        title: "Enterprise E-Commerce Reliability & Maintenance Retainer",
        tagline: "24/7 proactive monitoring, failover automation, database tuning, and zero-downtime flash-sale preparation."
      },
      "manufacturing-automation-erp": {
        title: "Industrial Manufacturing Operations & Central ERP Suite",
        tagline: "Comprehensive manufacturing resource planning, supply chain synchronization, and BOM management."
      },
      "ecommerce-performance-hardening": {
        title: "E-Commerce Performance Hardening & Checkout Optimization",
        tagline: "Conversion-optimized checkout pipelines, sub-second load times, and hardened payment gateway integration."
      },
      "personal-portfolio-high-conversion": {
        title: "Executive Digital Presence & Conversion Architecture",
        tagline: "High-authority personal branding architecture for C-suite executives, founders, and senior advisors."
      },
      "legal-specialized-rag-infrastructure": {
        title: "Legal & Regulatory Private RAG Intelligence Suite",
        tagline: "Domain-specific document intelligence pipelines with strict confidentiality and verifiable citation trails."
      }
    }
  },
  de: {
    brandName: "HRDNSH.com",
    heroBadge: "20+ Jahre industrielle Betriebsführung & Leitender Unternehmensarchitekt",
    heroHeadingPart1: "Harmonisierung",
    heroHeadingPart2: "industrieller Fertigungsskalierung",
    heroHeadingPart3: "mit souveräner KI & resilienten Systemen.",
    heroTagline: "Verbindung von über 20 Jahren Fabrikbetrieb (10 Jahre PPC-Manager bei Fakir Knitwears, CEO) mit souveränen KI-Pipelines, maßgeschneiderten ERP-Architekturen (Odoo/ERPNext) und hochgradig parallelem Enterprise-Engineering.",
    ctaScheduler: "Strategische Beratung vereinbaren",
    ctaExplorer: "14 Architektur-Blueprints entdecken",
    navHome: "Übersicht",
    navResume: "Führungsdossier",
    navServices: "Architektur-Blueprints",
    navAffiliates: "Unternehmens-Stack",
    navInsights: "Führungseinblicke",
    navInvoicing: "Unternehmensabrechnung",
    navConsultation: "Strategische Beratung",
    selectLanguage: "Sprache wählen",
    systemFinderHeading: "Architektur-Finder für Führungskräfte",
    recommenderCta: "Maßgeschneiderten Infrastrukturplan erstellen",
    recommenderSubheading: "Wählen Sie Ihre Unternehmensgröße und Durchsatzanforderungen, um optimale Architekturen zu ermitteln.",
    matchedBanner: "Passendes Architekturmuster gefunden",
    datacenterSelectorTitle: "Rechenzentrums-Standortauswahl",
    datacenterSelectorSubtitle: "Latenzoptimiertes Multi-Region-Cloud-Routing ohne Egress-Kosten.",
    germanyRegion: "Falkenstein (Deutschland) - Zentraleuropa",
    ukRegion: "London (Großbritannien) - Westeuropa",
    singaporeRegion: "Singapur - Asien-Pazifik geringe Latenz",
    usaRegion: "Ashburn (USA Ost) - Nordamerikanisches Backbone",
    finlandRegion: "Helsinki (Finnland) - Nordeuropa Hohe Sicherheit",
    latencyLevel: "Latenzverifizierung",
    optimalHostingSelection: "Empfohlenes Bare-Metal- & Cloud-Profil",
    invoiceSubtitle: "Erstellen und begleichen Sie überprüfbare Rechnungen für Beratungsmandate, Architekturimplementierungen und Audits.",
    applySwiftTemplate: "Unternehmens-Retainer-Vorlage laden",
    pages: {
      home: {
        title: "Haradhan Sharma — Leitende Betriebsführung & Enterprise Architect",
        description: "20+ Jahre industrielle Fertigungsführung (PPC-Manager bei Fakir Knitwears, CEO) sowie Sovereign AI, Custom ERP und hochgradig parallele Systemarchitektur.",
        h1: "Haradhan Sharma — Leitende Betriebsführung & Enterprise Architect"
      },
      services: {
        title: "Systemarchitektur & Custom-ERP-Katalog | Haradhan Sharma",
        description: "Entdecken Sie 14 produktionserprobte Engineering-Blueprints: Sovereign AI, Agentic RAG, Industrie-ERP (Odoo/ERPNext), Hochlast-Backends und Cloud-Sicherheit.",
        h1: "Produktionstechnik-Ecosystems & Systemarchitektur"
      },
      resume: {
        title: "Führungs-Lebenslauf & Management-Dossier | Haradhan Sharma",
        description: "Executive CV von Haradhan Sharma: 20+ Jahre Industrieerfahrung, 10 Jahre PPC-Manager bei Fakir Knitwears, CEO, MIS-Leitung und Zentrallagerführung.",
        h1: "Executive Curriculum Vitae & Führungs-Dossier"
      },
      consultation: {
        title: "Strategische Beratung vereinbaren | Haradhan Sharma",
        description: "Buchen Sie eine strategische Beratung zur Modernisierung von Fabrikprozessen, Sovereign AI, individueller ERP-Architektur oder Skalierung.",
        h1: "Strategische Beratung vereinbaren"
      },
      billing: {
        title: "Direktabrechnung & Unternehmens-Zahlungsportal | Haradhan Sharma",
        description: "Sicheres Abrechnungsportal für Unternehmensverträge, Retainer und strategische Beratungsvereinbarungen.",
        h1: "Unternehmensabrechnung & Zahlungsportal"
      },
      recommend: {
        title: "Empfohlener Enterprise-Stack & Infrastruktur | Haradhan Sharma",
        description: "Persönlich geprüfte Enterprise-Infrastruktur, Cloud-Hosting und KI-Entwicklertools, empfohlen von Haradhan Sharma.",
        h1: "Empfohlene Enterprise-Infrastruktur & Stack"
      },
      privacy: {
        title: "Datenschutz- & Governance-Richtlinie | Haradhan Sharma",
        description: "Datenschutzerklärung, Data-Governance-Protokolle, Sicherheitsstandards und Cookie-Richtlinien für Haradhan Sharma Executive Advisory.",
        h1: "Datenschutz- & Governance-Protokoll"
      },
      terms: {
        title: "Geschäftsbedingungen & Master Services Agreement | Haradhan Sharma",
        description: "Allgemeine Geschäftsbedingungen, Haftungsgrenzen, Retainer-Modelle und Leistungsmeilensteine von Haradhan Sharma Executive Advisory.",
        h1: "Geschäftsbedingungen & Master Services Agreement"
      }
    },
    services: {
      "agentic-ai-rag-orchestration": {
        title: "Agentic AI & Private RAG-Orchestrierung",
        tagline: "Autonome Multi-Agenten-Pipelines auf Unternehmensebene mit lokalen Vektoreinbettungen, BM25-Suche und Datenhoheit."
      },
      "openclaw-enterprise-web-gateway": {
        title: "OpenClaw Enterprise Web-Gateway & Automatisierung",
        tagline: "Zero-Trust Web-Interaktionsinfrastruktur mit automatisierter Sitzungsverwaltung und ratenresistentem API-Routing."
      },
      "private-ai-agent-vps": {
        title: "Privater KI-Agent VPS & Souveräne LLM-Bereitstellung",
        tagline: "Gehärtete Bare-Metal- und Private-Cloud-Bereitstellung quelloffener LLMs (DeepSeek, Llama 3) ohne Datenabfluss."
      },
      "high-concurrency-backend-optimization": {
        title: "Hochlast-Backend-Architektur & Datenbank-Optimierung",
        tagline: "Antwortzeiten unter 10 ms bei 100k+ Anfragen/Sek. durch Redis-Caching, PostgreSQL-Verbindungs-Pooling und asynchrones Messaging."
      },
      "fullstack-modern-web-architecture": {
        title: "Moderne Fullstack-Webarchitektur & Micro-Frontends",
        tagline: "Ultraschnelle SSR/SSG-Unternehmensportale mit modernen Frameworks, Edge-Caching und modularer Struktur."
      },
      "industrial-automation-erp": {
        title: "Industrieautomatisierung & Fabrik-ERP-Modernisierung",
        tagline: "Über 20 Jahre Fertigungserfahrung digitalisiert in Echtzeit-ERP-Workflows, IoT-Tracking und automatisierte Produktionsplanung."
      },
      "erpnext-crm-deployment": {
        title: "ERPNext & Enterprise-CRM Produktionsbereitstellung",
        tagline: "Vollständige Implementierung, Anpassung, Datenmigration und Hochverfügbarkeits-Cluster für ERPNext."
      },
      "algorithmic-trading-fintech": {
        title: "Algorithmischer Handel & FinTech-Ausführungs-Engines",
        tagline: "Order-Routing mit geringer Latenz, Risikomanagementkontrollen und Echtzeit-WebSocket-Marktdatenverarbeitung."
      },
      "devops-security-hardening": {
        title: "DevOps-Sicherheitshärtung & Infrastructure as Code",
        tagline: "Zero-Trust-Linux-Serverhärtung, automatisierte CI/CD-Pipelines, Container-Orchestrierung und Disaster Recovery."
      },
      "ecommerce-reliability-maintenance": {
        title: "E-Commerce-Zuverlässigkeit & Wartungs-Retainer",
        tagline: "Proaktives 24/7-Monitoring, automatisiertes Failover, Datenbankoptimierung und Ausfallsicherheit bei Verkaufsspitzen."
      },
      "manufacturing-automation-erp": {
        title: "Industrielle Fertigungsabläufe & Zentrales ERP",
        tagline: "Ganzheitliche Fertigungsressourcenplanung, Synchronisierung der Lieferkette und Stücklistenverwaltung (BOM)."
      },
      "ecommerce-performance-hardening": {
        title: "E-Commerce-Performance-Härtung & Checkout-Optimierung",
        tagline: "Konversionsoptimierte Checkout-Pipelines, Ladezeiten unter einer Sekunde und abgesicherte Zahlungsgateways."
      },
      "personal-portfolio-high-conversion": {
        title: "Digitale Präsenz für Führungskräfte & Konvertierungsarchitektur",
        tagline: "Reputationsarchitektur für Geschäftsführer, Gründer und leitende Berater mit hoher Autorität."
      },
      "legal-specialized-rag-infrastructure": {
        title: "Rechtliche & regulatorische Private RAG-Intelligence",
        tagline: "Fachspezifische Dokumentenanalyse-Pipelines unter strengster Vertraulichkeit und mit überprüfbaren Zitaten."
      }
    }
  },
  bn: {
    brandName: "HRDNSH.com",
    heroBadge: "২০+ বছরের শিল্প কারখানা পরিচালনা ও চিফ এন্টারপ্রাইজ আর্কিটেক্ট",
    heroHeadingPart1: "শিল্প কারখানা পরিচালনার",
    heroHeadingPart2: "বৃহৎ পরিসর ও অভিজ্ঞতা",
    heroHeadingPart3: "সার্বভৌম এআই ও স্থিতিস্থাপক সিস্টেমের সমন্বয়।",
    heroTagline: "২০+ বছরের উৎপাদন অভিজ্ঞতা (ফকির নিটওয়্যারে ১০ বছর পিপিচি ম্যানেজার, প্রধান নির্বাহী) এবং সার্বভৌম এআই, কাস্টম ইআরপি ও উচ্চ-ক্ষমতাসম্পন্ন সিস্টেম আর্কিটেকচারের যুগলবন্দি।",
    ctaScheduler: "কৌশলগত পরামর্শের জন্য সময় নির্ধারণ করুন",
    ctaExplorer: "১৪টি আর্কিটেকচার ব্লুপ্রিন্ট দেখুন",
    navHome: "মূল পাতা",
    navResume: "জীবনবৃত্তান্ত",
    navServices: "ইঞ্জিনিয়ারিং ব্লুপ্রিন্ট",
    navAffiliates: "প্রযুক্তি কাঠামো",
    navInsights: "প্রবন্ধ ও বিশ্লেষণ",
    navInvoicing: "পেমেন্ট ও বিলিং",
    navConsultation: "পরামর্শ সেবা",
    selectLanguage: "ভাষা নির্বাচন",
    systemFinderHeading: "আর্কিটেকচার ফাইন্ডার",
    recommenderCta: "উপযুক্ত অবকাঠামো পরিকল্পনা তৈরি করুন",
    recommenderSubheading: "আপনার প্রতিষ্ঠানের আকার ও ট্রাফিকের পরিমাণের ওপর ভিত্তি করে সঠিক সমাধান নির্বাচন করুন।",
    matchedBanner: "উপযুক্ত আর্কিটেকচার নির্ধারিত হয়েছে",
    datacenterSelectorTitle: "ডাটা সেন্টার অবস্থান নির্বাচন",
    datacenterSelectorSubtitle: "কম ল্যাটেন্সিযুক্ত মাল্টি-রিজিয়ন ক্লাউড ক্লাস্টার।",
    germanyRegion: "ফলকেনস্টাইন (জার্মানি) - সেন্ট্রাল ইউরোপ",
    ukRegion: "লন্ডন (যুক্তরাজ্য) - পশ্চিম ইউরোপ",
    singaporeRegion: "সিঙ্গাপুর - এশিয়া প্যাসিফিক লো-ল্যাটেন্সি",
    usaRegion: "অ্যাশবার্ন (ইউএস ইস্ট) - উত্তর আমেরিকা",
    finlandRegion: "হেলসিঙ্কি (ফিনল্যান্ড) - উচ্চ নিরাপত্তা নর্ডিক",
    latencyLevel: "ল্যাটেন্সি পরীক্ষা",
    optimalHostingSelection: "প্রস্তাবিত ক্লাউড প্রোফাইল",
    invoiceSubtitle: "পরামর্শ ও আর্কিটেকচার বাস্তবায়নের জন্য ভেরিফায়েবল ইনভয়েস গ্রহণ ও পরিশোধ করুন।",
    applySwiftTemplate: "রিটেইনার টেমপ্লেট লোড করুন",
    pages: {
      home: {
        title: "হারাধন শর্মা — এক্সিকিউটিভ অপারেশনস লিডার ও চিফ এন্টারপ্রাইজ আর্কিটেক্ট",
        description: "২০+ বছরের শিল্প কারখানা পরিচালনা (ফকির নিটওয়্যারে পিপিচি ম্যানেজার, সিইও) এবং গভীর প্রযুক্তিগত সার্বভৌম এআই, কাস্টম ইআরপি ও হাই-কনকারেন্সি সিস্টেম আর্কিটেকচার।",
        h1: "হারাধন শর্মা — এক্সিকিউটিভ অপারেশনস লিডার ও চিফ এন্টারপ্রাইজ আর্কিটেক্ট"
      },
      services: {
        title: "সিস্টেম আর্কিটেকচার ও কাস্টম ইআরপি ক্যাটালগ | হারাধন শর্মা",
        description: "১৪টি বাস্তবায়িত ইঞ্জিনিয়ারিং ব্লুপ্রিন্ট: সার্বভৌম এআই, এজেন্টিক RAG, ইন্ডাস্ট্রিয়াল ইআরপি (Odoo/ERPNext), হাই-কনকারেন্সি ব্যাকএন্ড এবং ক্লাউড সিকিউরিটি।",
        h1: "প্রোডাকশন ইঞ্জিনিয়ারিং ইকোসিস্টেম ও সিস্টেম আর্কিটেকচার"
      },
      resume: {
        title: "এক্সিকিউটিভ রেজুমে ও ক্যারিয়ার প্রোফাইল | হারাধন শর্মা",
        description: "হারাধন শর্মার পেশাগত জীবনবৃত্তান্ত: ২০+ বছরের শিল্প কারখানা ব্যবস্থাপনা, ফকির নিটওয়্যারে ১০ বছর পিপিচি ম্যানেজার, সিইও, হেড অব এমআইএস ও সেন্ট্রাল ওয়্যারহাউস নেতৃত্ব।",
        h1: "এক্সিকিউটিভ রেজুমে ও নেতৃত্ব প্রোফাইল"
      },
      consultation: {
        title: "কৌশলগত এক্সিকিউটিভ কনসালটেশন শিডিউল করুন | হারাধন শর্মা",
        description: "ফ্যাক্টরি অপারেশন আধুনিকায়ন, সোভেরিন এআই, কাস্টম ইআরপি আর্কিটেকচার বা এন্টারপ্রাইজ স্কেলিং নিয়ে আলোচনার জন্য একটি এক্সিকিউটিভ মিটিং বুক করুন।",
        h1: "কৌশলগত এক্সিকিউটিভ পরামর্শের জন্য শিডিউল করুন"
      },
      billing: {
        title: "কর্পোরেট ইনভয়েসিং ও বিলিং পোর্টাল | হারাধন শর্মা",
        description: "এন্টারপ্রাইজ চুক্তি, রিটেইনার এবং কৌশলগত উপদেষ্টা চুক্তির জন্য নিরাপদ পেমেন্ট পোর্টাল।",
        h1: "কর্পোরেট ইনভয়েসিং ও সেটেলমেন্ট পোর্টাল"
      },
      recommend: {
        title: "প্রস্তাবিত এন্টারপ্রাইজ প্রযুক্তি কাঠামো ও টুলস | হারাধন শর্মা",
        description: "হারাধন শর্মা কর্তৃক যাচাইকৃত নির্ভরযোগ্য ক্লাউড হোস্টিং, সার্ভার এবং এআই টুলস।",
        h1: "প্রস্তাবিত এন্টারপ্রাইজ ইনফ্রাস্ট্রাকচার ও টেক স্ট্যাক"
      },
      privacy: {
        title: "প্রাইভেসি ও ডাটা গভর্নেন্স নীতিমালা | হারাধন শর্মা",
        description: "হারাধন শর্মা এক্সিকিউটিভ অ্যাডভাইজরির গোপনীয়তা রক্ষা ও ডাটা গভর্নেন্স সংক্রান্ত নিয়মাবলী।",
        h1: "গোপনীয়তা রক্ষা ও ডাটা গভর্নেন্স প্রোটোকল"
      },
      terms: {
        title: "চুক্তির শর্তাবলী ও মাস্টার সার্ভিস এগ্রিমেন্ট | হারাধন শর্মা",
        description: "পরামর্শ ও ইঞ্জিনিয়ারিং সেবা গ্রহণের সাধারণ নিয়মাবলী, দায়বদ্ধতা এবং ডেলিভারি নীতিমালা।",
        h1: "চুক্তির শর্তাবলী ও মাস্টার সার্ভিস এগ্রিমেন্ট"
      }
    },
    services: {
      "agentic-ai-rag-orchestration": {
        title: "এজেন্টিক এআই ও প্রাইভেট RAG অর্কেস্ট্রেশন",
        tagline: "স্থানীয় ভেক্টর এম্বেডিং, হাইব্রিড BM25 সার্চ এবং কঠোর ডেটা সুরক্ষাযুক্ত মাল্টি-এজেন্ট পাইপলাইন।"
      },
      "openclaw-enterprise-web-gateway": {
        title: "ওপেনক্ল এন্টারপ্রাইজ ওয়েব গেটওয়ে ও অটোমেশন",
        tagline: "স্বয়ংক্রিয় সেশন ব্যবস্থাপনা ও রেট-রেজিলিয়েন্ট এপিআই রাউটিং সহ জিরো-ট্রাস্ট ওয়েব অটোমেশন।"
      },
      "private-ai-agent-vps": {
        title: "প্রাইভেট এআই এজেন্ট ভিপিএস ও সোভেরিন এলএলএম",
        tagline: "কোনো ডেটা লিক ছাড়া সম্পূর্ণ সুরক্ষিত ওপেন-ওয়েট এলএলএম (DeepSeek, Llama 3) ডিপ্লয়মেন্ট।"
      },
      "high-concurrency-backend-optimization": {
        title: "উচ্চ-কনকারেন্সি ব্যাকএন্ড ও ডাটাবেস অপ্টিমাইজেশন",
        tagline: "রেডিস ক্যাশিং এবং পোস্টগ্রেস কিউ অপ্টিমাইজেশনের মাধ্যমে প্রতি সেকেন্ডে ১ লক্ষ+ রিকোয়েস্ট পরিচালনা।"
      },
      "fullstack-modern-web-architecture": {
        title: "আধুনিক ফুলস্ট্যাক ওয়েব আর্কিটেকচার ও মাইক্রো-ফ্রন্টএন্ড",
        tagline: "মডার্ন ফ্রেমওয়ার্ক ও এজ-ক্যাশিং সহযোগে নির্মিত দ্রুতগতির এসএসআর/এসএসজি এন্টারপ্রাইজ পোর্টাল।"
      },
      "industrial-automation-erp": {
        title: "ইন্ডাস্ট্রিয়াল অটোমেশন ও ফ্যাক্টরি ইআরপি আধুনিকায়ন",
        tagline: "কারখানার বাস্তব ২০+ বছরের অভিজ্ঞতাকে রিয়েল-টাইম ইআরপি, আইওটি ও স্বয়ংক্রিয় পিপিচিতে রূপান্তর।"
      },
      "erpnext-crm-deployment": {
        title: "ERPNext ও এন্টারপ্রাইজ সিআরএম বাস্তবায়ন",
        tagline: "ERPNext-এর সম্পূর্ণ ইনস্টলেশন, কাস্টমাইজেশন, ডেটা মাইগ্রেশন ও হাই-অ্যাভেইলেবিলিটি ক্লাস্টার।"
      },
      "algorithmic-trading-fintech": {
        title: "অ্যালগরিদমিক ট্রেডিং ও ফিনটেক এক্সিকিউশন ইঞ্জিন",
        tagline: "লো-ল্যাটেন্সি অর্ডার রাউটিং, রিয়েল-টাইম ওয়েবসকেট মার্কেট ডেটা ও ঝুঁকি ব্যবস্থাপনা নিয়ন্ত্রণ।"
      },
      "devops-security-hardening": {
        title: "ডেভঅপস সিকিউরিটি হার্ডেনিং ও ইনফ্রাস্ট্রাকচার অ্যাজ কোড",
        tagline: "জিরো-ট্রাস্ট লিনাক্স সিকিউরিটি, স্বয়ংক্রিয় সিআই/সিডি এবং ক্লাউড ব্যাকআপ সিস্টেম।"
      },
      "ecommerce-reliability-maintenance": {
        title: "এন্টারপ্রাইজ ই-কমার্স নির্ভরযোগ্যতা ও রক্ষণাবেক্ষণ রিটেইনার",
        tagline: "২৪/৭ প্রোঅ্যাকটিভ মনিটরিং, অটোমেটিক ফেইলওভার এবং ফ্ল্যাশ-সেল ট্রাফিকের সম্পূর্ণ প্রস্তুতি।"
      },
      "manufacturing-automation-erp": {
        title: "শিল্প উৎপাদন পরিচালনা ও কেন্দ্রীয় ইআরপি স্যুট",
        tagline: "উৎপাদন সম্পদ পরিকল্পনা (MRP), সাপ্লাই চেইন সমন্বয় এবং বিল অব মেটেরিয়ালস (BOM) নিয়ন্ত্রণ।"
      },
      "ecommerce-performance-hardening": {
        title: "ই-কমার্স পারফরম্যান্স অপ্টিমাইজেশন ও চেকআউট স্পিড",
        tagline: "দ্রুতগতির চেকআউট পাইপলাইন, ১ সেকেন্ডের কম লোডিং সময় ও পেমেন্ট গেটওয়ে সুরক্ষা।"
      },
      "personal-portfolio-high-conversion": {
        title: "শীর্ষ নির্বাহীদের ডিজিটাল উপস্থিতি ও ব্র্যান্ডিং",
        tagline: "প্রতিষ্ঠাতা, প্রধান নির্বাহী ও সিনিয়র উপদেষ্টাদের জন্য বিশ্বমানের ডিজিটাল উপস্থিতি আর্কিটেকচার।"
      },
      "legal-specialized-rag-infrastructure": {
        title: "আইন ও কমপ্লায়েন্স সংক্রান্ত প্রাইভেট RAG সমাধান",
        tagline: "সম্পূর্ণ গোপনীয়তা ও সঠিক রেফারেন্স ট্র্যাকিং সহ জটিল নথিপত্র বিশ্লেষণের নির্ভরযোগ্য এআই কাঠামো।"
      }
    }
  },
  es: {
    brandName: "HRDNSH.com",
    heroBadge: "20+ Años de Liderazgo en Operaciones Industriales y Arquitecto Empresarial Jefe",
    heroHeadingPart1: "Armonizando la",
    heroHeadingPart2: "escala de manufactura industrial",
    heroHeadingPart3: "con IA soberana y sistemas resilientes.",
    heroTagline: "Uniendo más de 20 años de experiencia en planta industrial (10 años como Gerente de PPC en Fakir Knitwears, CEO) con canales de IA soberana, arquitecturas ERP a medida (Odoo/ERPNext) e ingeniería de alta concurrencia.",
    ctaScheduler: "Agendar Sesión Estratégica Ejecutiva",
    ctaExplorer: "Explorar 14 Diseños de Arquitectura",
    navHome: "Inicio",
    navResume: "Dossier Ejecutivo",
    navServices: "Diseños de Ingeniería",
    navAffiliates: "Stack Tecnológico",
    navInsights: "Análisis y Perspectivas",
    navInvoicing: "Liquidación Corporativa",
    navConsultation: "Asesoría Estratégica",
    selectLanguage: "Seleccionar Idioma",
    systemFinderHeading: "Buscador de Arquitecturas",
    recommenderCta: "Generar Plan de Infraestructura a Medida",
    recommenderSubheading: "Seleccione su nivel empresarial y requerimientos de tráfico para determinar la solución ideal.",
    matchedBanner: "Patrón de Arquitectura Encontrado",
    datacenterSelectorTitle: "Ubicación del Centro de Datos",
    datacenterSelectorSubtitle: "Enrutamiento en la nube multirregión de baja latencia sin costos de salida.",
    germanyRegion: "Falkenstein (Alemania) - Europa Central",
    ukRegion: "Londres (Reino Unido) - Europa Occidental",
    singaporeRegion: "Singapur - Asia-Pacífico Baja Latencia",
    usaRegion: "Ashburn (EE. UU. Este) - Red Troncal Norteamericana",
    finlandRegion: "Helsinki (Finlandia) - Países Nórdicos Alta Seguridad",
    latencyLevel: "Verificación de Latencia",
    optimalHostingSelection: "Perfil Recomendado de Bare-Metal y Nube",
    invoiceSubtitle: "Genere y liquide facturas verificables para asesorías, implementación de arquitecturas y auditorías.",
    applySwiftTemplate: "Cargar Plantilla de Retainer Corporativo",
    pages: {
      home: {
        title: "Haradhan Sharma — Líder de Operaciones Industriales y Arquitecto Empresarial",
        description: "Más de 20 años en liderazgo de manufactura industrial (Gerente de PPC en Fakir Knitwears, CEO) e IA soberana, ERP personalizado y sistemas de alta concurrencia.",
        h1: "Haradhan Sharma — Líder de Operaciones Industriales y Arquitecto Empresarial"
      },
      services: {
        title: "Catálogo de Arquitectura de Sistemas y ERP a Medida | Haradhan Sharma",
        description: "Explore 14 diseños de ingeniería listos para producción: IA soberana, RAG agéntico, ERP industrial (Odoo/ERPNext), backends de alto rendimiento y seguridad en la nube.",
        h1: "Ecosistemas de Ingeniería de Producción y Arquitectura de Sistemas"
      },
      resume: {
        title: "CV Ejecutivo y Dossier de Liderazgo | Haradhan Sharma",
        description: "Curículum ejecutivo de Haradhan Sharma: más de 20 años en operaciones industriales, 10 años como Gerente de PPC en Fakir Knitwears, CEO, Director de MIS y cadena de suministro.",
        h1: "Curriculum Vitae Ejecutivo y Dossier de Liderazgo"
      },
      consultation: {
        title: "Agendar Asesoría Estratégica Ejecutiva | Haradhan Sharma",
        description: "Programe una sesión de descubrimiento para abordar la modernización de operaciones de fábrica, IA soberana, arquitectura ERP o escalabilidad.",
        h1: "Agendar Asesoría Estratégica Ejecutiva"
      },
      billing: {
        title: "Facturación Directa y Portal Corporativo | Haradhan Sharma",
        description: "Portal de pago seguro para contratos empresariales, retainers y acuerdos de asesoría estratégica.",
        h1: "Portal de Facturación y Liquidación Corporativa"
      },
      recommend: {
        title: "Stack y Herramientas Empresariales Recomendadas | Haradhan Sharma",
        description: "Infraestructura empresarial, alojamiento en la nube y herramientas de IA examinadas personalmente por Haradhan Sharma.",
        h1: "Infraestructura y Stack Empresarial Recomendados"
      },
      privacy: {
        title: "Política de Privacidad y Gobernanza de Datos | Haradhan Sharma",
        description: "Política de privacidad, protección de datos, protocolos de seguridad y cookies para Haradhan Sharma Executive Advisory.",
        h1: "Protocolo de Privacidad y Gobernanza de Datos"
      },
      terms: {
        title: "Términos de Contratación y Acuerdo Marco de Servicios | Haradhan Sharma",
        description: "Términos del acuerdo marco de servicios, alcance de responsabilidad, retainers e hitos de entrega para Haradhan Sharma Executive Advisory.",
        h1: "Términos de Contratación y Acuerdo Marco de Servicios"
      }
    },
    services: {
      "agentic-ai-rag-orchestration": {
        title: "IA Agéntica y Orquestación Privada de RAG",
        tagline: "Canales multi-agente autónomos de nivel empresarial con embeddings locales, búsqueda híbrida BM25 y gobernanza estricta de datos."
      },
      "openclaw-enterprise-web-gateway": {
        title: "OpenClaw Enterprise Web Gateway y Automatización",
        tagline: "Infraestructura de interacción web zero-trust con gestión automatizada de sesiones y enrutamiento resiliente de APIs."
      },
      "private-ai-agent-vps": {
        title: "VPS de Agente IA Privado y Despliegue de LLM Soberano",
        tagline: "Despliegue blindado en bare-metal y nube privada de modelos LLM abiertos (DeepSeek, Llama 3) sin fugas de datos."
      },
      "high-concurrency-backend-optimization": {
        title: "Arquitectura Backend de Alta Concurrencia y Optimización de BD",
        tagline: "Tiempos de respuesta inferiores a 10 ms con más de 100k RPS mediante caché Redis, pooling PostgreSQL y mensajería asíncrona."
      },
      "fullstack-modern-web-architecture": {
        title: "Arquitectura Web Moderna Fullstack y Micro-Frontends",
        tagline: "Portales empresariales ultrarrápidos SSR/SSG construidos con frameworks modernos, edge caching y arquitectura modular."
      },
      "industrial-automation-erp": {
        title: "Automatización Industrial y Modernización de ERP de Fábrica",
        tagline: "Más de 20 años de experiencia en planta productiva digitalizados en flujos ERP en tiempo real, IoT y PPC automatizado."
      },
      "erpnext-crm-deployment": {
        title: "Despliegue en Producción de ERPNext y CRM Empresarial",
        tagline: "Implementación completa, personalización, migración de datos y clústeres de alta disponibilidad para ERPNext."
      },
      "algorithmic-trading-fintech": {
        title: "Trading Algorítmico y Motores de Ejecución FinTech",
        tagline: "Enrutamiento de órdenes de baja latencia, controles de gestión de riesgos e ingesta en tiempo real de datos de mercado por WebSocket."
      },
      "devops-security-hardening": {
        title: "Blindaje de Seguridad DevOps e Infraestructura como Código",
        tagline: "Blindaje Linux Zero-Trust, pipelines automatizados de CI/CD, orquestación de contenedores y recuperación ante desastres."
      },
      "ecommerce-reliability-maintenance": {
        title: "Retainer de Fiabilidad y Mantenimiento de E-Commerce Empresarial",
        tagline: "Monitoreo proactivo 24/7, conmutación por error automatizada, optimización de base de datos y preparación para ventas masivas."
      },
      "manufacturing-automation-erp": {
        title: "Operaciones de Manufactura Industrial y Suite Central de ERP",
        tagline: "Planificación de recursos de manufactura (MRP), sincronización de la cadena de suministro y gestión de listas de materiales (BOM)."
      },
      "ecommerce-performance-hardening": {
        title: "Optimización de Rendimiento y Proceso de Pago en E-Commerce",
        tagline: "Flujos de pago optimizados para conversión, tiempos de carga inferiores a un segundo e integración blindada de pasarelas de pago."
      },
      "personal-portfolio-high-conversion": {
        title: "Presencia Digital Ejecutiva y Arquitectura de Conversión",
        tagline: "Arquitectura de marca personal de alta autoridad para directores ejecutivos, fundadores y asesores sénior."
      },
      "legal-specialized-rag-infrastructure": {
        title: "Suite de Inteligencia RAG Privada para Asuntos Legales y Normativos",
        tagline: "Canales de inteligencia documental especializados con estricta confidencialidad y trazabilidad verificable de citas."
      }
    }
  }
};
