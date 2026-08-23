import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, CheckCircle2, HelpCircle, Star, Quote, Brain, Zap, Factory, ShieldCheck, TrendingUp, Layers, Cpu, Building2, Server, ArrowRight, Check } from 'lucide-react';

// Centralized components
import Header from './components/Header';
import Hero from './components/Hero';
import LeadRecommenderModal from './components/LeadRecommenderModal';
import ServicesGrid from './components/ServicesGrid';
import ServiceDetailView from './components/ServiceDetailView';
import PaymentCheckout from './components/PaymentCheckout';
import ResumeHub from './components/ResumeHub';
import RecommendGrid from './components/RecommendGrid';
import ConsultationScheduler from './components/ConsultationScheduler';
import InvoicingPortal from './components/InvoicingPortal';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import BlogIndex from './pages/BlogIndex';
import BlogPostPage from './pages/BlogPost';
import FloatingBookButton from './components/FloatingBookButton';

// Site Data
import { testimonials, siteData, profile, services } from './data/services';
import { translations } from './data/translations';
import { blogPosts } from './data/blogPosts';

interface AppProps {
  initialView?: string;
  initialServiceId?: string | null;
  initialSlug?: string | null;
}

export default function App({ initialView, initialServiceId, initialSlug }: AppProps) {
  const [currentView, setCurrentView] = useState<string>(initialView || 'home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId || null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(initialSlug || null);
  const [checkoutBilling, setCheckoutBilling] = useState<'onetime' | 'weekly'>('onetime');
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [locale, setLocale] = useState<string>('en');

  // Forms for simple contact sub-sheet
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [msgSending, setMsgSending] = useState(false);

  // 1. Initial Load Deep Link Param Sync — supports both clean paths and ?view= query params
  useEffect(() => {
    const url = new URL(window.location.href);
    // Check for clean path first
    const pathInfo = pathToView(url.pathname);
    if (pathInfo.view !== 'home') {
      setCurrentView(pathInfo.view);
      setSelectedServiceId(pathInfo.serviceId);
      setSelectedBlogPostSlug(pathInfo.slug);
    } else {
      // Fallback to query params for backward compatibility
      const viewParam = url.searchParams.get('view');
      const serviceParam = url.searchParams.get('service');
      const slugParam = url.searchParams.get('slug');
      if (viewParam) {
        if (viewParam === 'service-detail' && serviceParam) {
          setCurrentView('service-detail');
          setSelectedServiceId(serviceParam);
        } else if (viewParam === 'blog-post' && slugParam) {
          setCurrentView('blog-post');
          setSelectedBlogPostSlug(slugParam);
        } else if (['home', 'resume', 'recommend', 'consultation', 'billing-portal', 'invoicing', 'terms', 'privacy', 'blog'].includes(viewParam)) {
          setCurrentView(viewParam === 'invoicing' ? 'billing-portal' : viewParam);
        }
      }
    }
  }, []);

  // 2. Browser PopState State Synchronizer — supports clean paths and query params
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const pathInfo = pathToView(url.pathname);
      if (pathInfo.view !== 'home') {
        setCurrentView(pathInfo.view);
        setSelectedServiceId(pathInfo.serviceId);
        setSelectedBlogPostSlug(pathInfo.slug);
      } else {
        // Fallback to query params
        const viewParam = url.searchParams.get('view') || 'home';
        const serviceParam = url.searchParams.get('service');
        const slugParam = url.searchParams.get('slug');
        setCurrentView(viewParam === 'invoicing' ? 'billing-portal' : viewParam);
        setSelectedServiceId(serviceParam || null);
        setSelectedBlogPostSlug(slugParam || null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic noindex / robots tag for Terms and Privacy views to keep them out of standard search sitemaps
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (['terms', 'privacy'].includes(currentView)) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }
  }, [currentView]);

  // 3. Active Change pushing to History State — clean URLs for SEO
  useEffect(() => {
    const currentPath = viewToPath(currentView, selectedServiceId, selectedBlogPostSlug);
    if (window.location.pathname !== currentPath) {
      window.history.pushState(null, '', currentPath);
    }
  }, [currentView, selectedServiceId, selectedBlogPostSlug]);

  // Dynamic Head SEO, canonical link, Open Graph, Twitter Card, and JSON-LD structured schema generator
  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    const t = translations[locale] || translations.en;

    // 1. Dynamic document titles and descriptions
    let titleStr = `${profile.name} | ${t.heroBadge}`;
    let descStr = t.heroTagline;
    let canonicalUrl = 'https://hrdnsh.com';

    if (currentView === 'service-detail' && selectedServiceId) {
      const matched = services.find(s => s.id === selectedServiceId);
      if (matched) {
        titleStr = `${matched.title} | ${profile.name}`;
        descStr = matched.tagline || matched.businessOwner?.summary || matched.title;
        canonicalUrl = `https://hrdnsh.com/services/${selectedServiceId}/`;
      }
    } else if (currentView === 'services') {
      titleStr = `Systems Architecture & Custom ERP Catalog | ${profile.name}`;
      descStr = `Explore 14 production-grade engineering blueprints: Sovereign AI, Agentic RAG, Industrial ERP (Odoo/ERPNext), High-Concurrency Backends, and Cloud Hardening.`;
      canonicalUrl = 'https://hrdnsh.com/services/';
    } else if (currentView === 'resume') {
      titleStr = `Executive CV & Leadership Dossier | ${profile.name}`;
      descStr = `Executive Curriculum Vitae of Haradhan Sharma: 20+ years industrial operations leadership, 10 years PPC Manager at Fakir Knitwears, CEO, and Chief Architect.`;
      canonicalUrl = 'https://hrdnsh.com/resume/';
    } else if (currentView === 'recommend') {
      titleStr = `Recommended Enterprise Tech Stack | ${profile.name}`;
      descStr = `Personally vetted infrastructure, cloud servers, local databases, and development tools recommended by Haradhan Sharma.`;
      canonicalUrl = 'https://hrdnsh.com/recommend/';
    } else if (currentView === 'blog') {
      titleStr = `Executive Insights — Industrial Operations, ERP & Sovereign AI | ${profile.name}`;
      descStr = `Authoritative analysis on industrial manufacturing leadership, production planning (PPC), Sovereign AI, private RAG pipelines, and custom ERP implementation.`;
      canonicalUrl = 'https://hrdnsh.com/blog/';
    } else if (currentView === 'blog-post' && selectedBlogPostSlug) {
      const foundPost = blogPosts.find(p => p.slug === selectedBlogPostSlug);
      if (foundPost) {
        titleStr = `${foundPost.title} | ${profile.name}`;
        descStr = foundPost.description;
        canonicalUrl = `https://hrdnsh.com/blog/${selectedBlogPostSlug}/`;
      }
    } else if (currentView === 'consultation') {
      titleStr = `Schedule an Executive Strategic Consultation | ${profile.name}`;
      descStr = `Book a strategic discovery session to discuss factory operations modernization, Sovereign AI, custom ERP architecture, or enterprise scaling.`;
      canonicalUrl = 'https://hrdnsh.com/consultation/';
    } else if (currentView === 'billing-portal' || currentView === 'payment') {
      titleStr = `Corporate Invoicing & Payment Settlement | ${profile.name}`;
      descStr = `Secure client payment settlement and invoicing for custom enterprise system agreements.`;
      canonicalUrl = 'https://hrdnsh.com/billing/';
    } else if (currentView === 'terms') {
      titleStr = `Terms of Engagement & Licensing | ${profile.name}`;
      descStr = `Enterprise consulting engagement protocols, licensing terms, and code ownership guarantees.`;
      canonicalUrl = 'https://hrdnsh.com/terms/';
    } else if (currentView === 'privacy') {
      titleStr = `Privacy & Data Governance Standard | ${profile.name}`;
      descStr = `Zero-trust data governance policy and client confidentiality commitments.`;
      canonicalUrl = 'https://hrdnsh.com/privacy/';
    }

    // Set Document title
    document.title = titleStr;

    // Helper functions to update meta element
    const updateMeta = (key: string, value: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // Update Meta and Open Graph details to solve critical issues #3, #4 and #5
    updateMeta('description', descStr);
    
    // Open Graph
    updateMeta('og:title', titleStr, true);
    updateMeta('og:description', descStr, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', 'https://hrdnsh.com/og-image.jpg', true);
    updateMeta('og:type', currentView === 'service-detail' || currentView === 'blog-post' ? 'article' : 'website', true);
    updateMeta('og:locale', locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'bn' ? 'bn_BD' : 'es_ES', true);
    // og:locale:alternate — remove old alternates, then add current ones
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(el => el.remove());
    const localeMap: Record<string, string> = { en: 'en_US', de: 'de_DE', bn: 'bn_BD', es: 'es_ES' };
    const currentFull = localeMap[locale] || 'en_US';
    ['en_US', 'de_DE', 'bn_BD', 'es_ES'].filter(l => l !== currentFull).forEach(alt => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:locale:alternate');
      el.setAttribute('content', alt);
      document.head.appendChild(el);
    });

    // Twitter Card
    updateMeta('twitter:title', titleStr);
    updateMeta('twitter:description', descStr);
    updateMeta('twitter:image', 'https://hrdnsh.com/og-image.jpg');

    // Update Canonical URL relation link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Hreflang tags for multilingual SEO
    const hreflangLocales = ['en', 'de', 'bn', 'es'];
    hreflangLocales.forEach(hl => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hl}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hl);
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://hrdnsh.com/${hl === 'en' ? '' : hl + '/'}${currentView === 'home' ? '' : '?view=' + currentView}${currentView !== 'home' && selectedServiceId ? '&service=' + selectedServiceId : ''}`);
    });
    // x-default
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', `https://hrdnsh.com/${currentView === 'home' ? '' : '?view=' + currentView}${currentView !== 'home' && selectedServiceId ? '&service=' + selectedServiceId : ''}`);

    // 2. JSON-LD structured data graph array setup (Person + local ProfessionalService + FAQ + Service)
    const basePersonSchema = {
      "@type": "Person",
      "@id": "https://hrdnsh.com/#person",
      "name": profile.name,
      "jobTitle": "Sovereign Systems Architect & AI Automation Specialist",
      "url": "https://hrdnsh.com",
      "image": "https://hrdnsh.com/avatar.png",
      "sameAs": [
        "https://github.com/hrdnsh"
      ],
      "knowsAbout": [
        "Sovereign Systems Architect", "AI Agents", "Enterprise RAG", "Python Async Developer", "low-latency ERP", "Cloud Migration", "DevOps", "SRE"
      ]
    };

    const baseServiceSchema = {
      "@type": "ProfessionalService",
      "@id": "https://hrdnsh.com/#service",
      "name": "Haradhan Sharma Sovereign Systems Consulting",
      "url": "https://hrdnsh.com",
      "logo": "https://hrdnsh.com/avatar.png",
      "image": "https://hrdnsh.com/og-image.jpg",
      "description": "Sovereign Systems Architect specializing in production-grade AI agents, RAG pipelines, low-latency ERP implementations, and high-performance server migrations.",
      "telephone": "+8801712270815",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BD"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://hrdnsh.com/#person"
      }
    };

    const faqSchema = {
      "@type": "FAQPage",
      "@id": "https://hrdnsh.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I own 100% of the completed service code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely. Once final invoices are settled, the entire private GitHub repository, Docker blueprints, and administrator keys are fully transferred. There are zero licensing, royalty, or hosting restrictions."
          }
        },
        {
          "@type": "Question",
          "name": "How are APIs and server resource billing managed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All underlying resource costs (e.g., Contabo, Hetzner, DO VPS nodes, OpenAI API keys) are billed directly to your corporate accounts. I assist in setting up strict usage locks, semantic caching layers, and token compression to prevent runaway operational bills."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if the system encounters a bug after launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every single architectural deployment includes an automatic 30-day performance warranty. During this window, any configuration deviations, memory leaks, or execution failures are resolved instantly as priority items. Ongoing weekly Retainers extend this protective SLA infinitely."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer ongoing support after delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Weekly ongoing support is available and includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime with no penalties."
          }
        },
        {
          "@type": "Question",
          "name": "Can I customize the deliverables for my specific needs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals. The final scope is tailored to your business needs."
          }
        },
        {
          "@type": "Question",
          "name": "What do you need from me to get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data and intellectual property protected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure."
          }
        },
        {
          "@type": "Question",
          "name": "What payment methods do you accept?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted. All payments are processed securely with invoices provided."
          }
        },
        {
          "@type": "Question",
          "name": "What if I am not satisfied with the deliverables?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If a deliverable does not meet the agreed scope, it will be revised at no additional cost. The weekly support plan includes unlimited revisions within scope. Full refunds are available before the first deliverable is shipped."
          }
        },
        {
          "@type": "Question",
          "name": "How do you handle communication during the project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I provide daily progress updates via your preferred channel (email, Slack, Telegram, or video calls). A shared project board tracks all tasks, milestones, and blockers. You have full visibility into the development process at all times."
          }
        }
      ]
    };

    const graphArray: any[] = [basePersonSchema, baseServiceSchema];

    // Add FAQ page schema on homepage structure
    if (currentView === 'home') {
      graphArray.push(faqSchema);
    }

    // Add detail card service schema on active individual service views
    if (currentView === 'service-detail' && selectedServiceId) {
      const matched = services.find(s => s.id === selectedServiceId);
      if (matched) {
        graphArray.push({
          "@type": "Service",
          "@id": `https://hrdnsh.com/?view=service-detail&service=${matched.id}#service`,
          "name": matched.title,
          "description": matched.tagline || matched.businessOwner.summary,
          "provider": {
            "@type": "Person",
            "@id": "https://hrdnsh.com/#person"
          },
          "offers": {
            "@type": "Offer",
            "price": matched.pricing.oneTime,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": `https://hrdnsh.com/?view=service-detail&service=${matched.id}`
          }
        });

        // Add service-specific FAQ schema
        graphArray.push({
          "@type": "FAQPage",
          "@id": `https://hrdnsh.com/?view=service-detail&service=${matched.id}#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": `What is included in the ${matched.title} service?`,
              "acceptedAnswer": { "@type": "Answer", "text": `This service includes ${matched.deliverables.length} core deliverables: ${matched.deliverables.join(", ")}. Every deliverable is production-ready and documented.` }
            },
            {
              "@type": "Question",
              "name": `How long does ${matched.title} take to deliver?`,
              "acceptedAnswer": { "@type": "Answer", "text": `${matched.timeline} The initial engagement focuses on architecture and core delivery, with ongoing weekly support available for optimization, updates, and maintenance.` }
            },
            {
              "@type": "Question",
              "name": `What is the pricing for ${matched.title}?`,
              "acceptedAnswer": { "@type": "Answer", "text": `One-time project delivery is $${matched.pricing.oneTime}. Weekly ongoing support is $${matched.pricing.weekly}/week. The one-time fee covers the full initial build. The weekly option is ideal for continuous development, monitoring, and iterative improvements.` }
            },
            {
              "@type": "Question",
              "name": `What technologies are used in ${matched.title}?`,
              "acceptedAnswer": { "@type": "Answer", "text": `Core technologies: ${matched.techStack.join(", ")}. All are production-grade, well-maintained, and chosen for long-term reliability and scalability.` }
            },
            {
              "@type": "Question",
              "name": "Do you offer ongoing support after delivery?",
              "acceptedAnswer": { "@type": "Answer", "text": `Yes. Weekly ongoing support is available at $${matched.pricing.weekly}/week. This includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime.` }
            },
            {
              "@type": "Question",
              "name": "Can I customize the deliverables for my specific needs?",
              "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals. The final scope is tailored to your business needs." }
            },
            {
              "@type": "Question",
              "name": "What do you need from me to get started?",
              "acceptedAnswer": { "@type": "Answer", "text": "To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope." }
            },
            {
              "@type": "Question",
              "name": "Is my data and intellectual property protected?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure." }
            },
            {
              "@type": "Question",
              "name": "What payment methods do you accept?",
              "acceptedAnswer": { "@type": "Answer", "text": "Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted. All payments are processed securely with invoices provided." }
            },
            {
              "@type": "Question",
              "name": "What if I am not satisfied with the deliverables?",
              "acceptedAnswer": { "@type": "Answer", "text": "If a deliverable does not meet the agreed scope, it will be revised at no additional cost. The weekly support plan includes unlimited revisions within scope. Full refunds are available before the first deliverable is shipped." }
            }
          ]
        });
      }
    }

    // Dynamic JSON-LD script mounting
    let script = document.getElementById('json-ld-seo-tag') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-seo-tag';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graphArray
    }, null, 2);

  }, [locale, currentView, selectedServiceId, selectedBlogPostSlug]);

  // Scroll to top on view modification
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedServiceId, selectedBlogPostSlug]);

  // Google Analytics virtual page tracking on internal SPA view transitions
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const pageTitle = selectedServiceId 
        ? `Service Detail: ${selectedServiceId}`
        : selectedBlogPostSlug
        ? `Blog: ${selectedBlogPostSlug}`
        : `Hub View: ${currentView}`;
      const pagePath = selectedServiceId 
        ? `/?view=${currentView}&service=${selectedServiceId}`
        : `/?view=${currentView}`;
        
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle,
        page_path: pagePath,
        page_location: window.location.origin + pagePath
      });
    }
  }, [currentView, selectedServiceId]);

  // Clean URL path ↔ view mapping
  const pathToView = (pathname: string): { view: string; serviceId: string | null; slug: string | null } => {
    const p = pathname.replace(/\/$/, '') || '/';
    if (p === '/' || p === '') return { view: 'home', serviceId: null, slug: null };
    if (p === '/services') return { view: 'services', serviceId: null, slug: null };
    if (p === '/resume') return { view: 'resume', serviceId: null, slug: null };
    if (p === '/consultation') return { view: 'consultation', serviceId: null, slug: null };
    if (p === '/billing') return { view: 'billing-portal', serviceId: null, slug: null };
    if (p === '/recommend') return { view: 'recommend', serviceId: null, slug: null };
    if (p === '/blog') return { view: 'blog', serviceId: null, slug: null };
    // Blog posts: /blog/slug-name/
    const blogMatch = p.match(/^\/blog\/([^/]+)\/?$/);
    if (blogMatch) return { view: 'blog-post', serviceId: null, slug: blogMatch[1] };
    // Services: /services/service-id/
    const svcMatch = p.match(/^\/services\/([^/]+)\/?$/);
    if (svcMatch) return { view: 'service-detail', serviceId: svcMatch[1], slug: null };
    return { view: 'home', serviceId: null, slug: null };
  };

  const viewToPath = (view: string, serviceId: string | null, slug: string | null): string => {
    switch (view) {
      case 'home': return '/';
      case 'services': return '/services/';
      case 'resume': return '/resume/';
      case 'consultation': return '/consultation/';
      case 'billing-portal': return '/billing/';
      case 'recommend': return '/recommend/';
      case 'blog': return '/blog/';
      case 'blog-post': return `/blog/${slug}/`;
      case 'service-detail': return `/services/${serviceId}/`;
      case 'terms': return '/terms/';
      case 'privacy': return '/privacy/';
      default: return '/';
    }
  };

  const handleSetView = (view: string, serviceId: string | null = null, blogSlug: string | null = null) => {
    setCurrentView(view);
    setSelectedServiceId(serviceId);
    setSelectedBlogPostSlug(blogSlug);
    // Push clean URL to history
    const path = viewToPath(view, serviceId, blogSlug);
    window.history.pushState(null, '', path);
  };

  const handleInitiatePayment = (serviceId: string, billing: 'onetime' | 'weekly') => {
    setSelectedServiceId(serviceId);
    setCheckoutBilling(billing);
    setCurrentView('payment');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgText || msgSending) return;
    
    setMsgSending(true);

    // Save contact to local storage CRM list for backup synchronization
    const existingLeads = JSON.parse(localStorage.getItem('haradhan_leads') || '[]');
    const newLead = {
      id: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`,
      name: msgName,
      email: msgEmail,
      message: msgText,
      source: 'Direct Business Contact Form',
      date: new Date().toLocaleString()
    };
    existingLeads.push(newLead);
    localStorage.setItem('haradhan_leads', JSON.stringify(existingLeads));

    try {
      // Direct delivery to me@hrdnsh.com via formsubmit relay
      await fetch('https://formsubmit.co/ajax/me@hrdnsh.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: msgName,
          email: msgEmail,
          message: msgText,
          _subject: `New Strategic Project Briefing: ${msgName}`,
          _replyto: msgEmail,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('Form direct relay note:', err);
    } finally {
      setMsgSending(false);
      setMsgSuccess(true);
      setTimeout(() => {
        setMsgSuccess(false);
        setMsgName('');
        setMsgEmail('');
        setMsgText('');
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-300 overflow-x-hidden flex flex-col justify-between" id="master-app-root">
      
      {/* Dynamic Header */}
      <Header currentView={currentView} setView={handleSetView} locale={locale} setLocale={setLocale} />

      {/* Main Core Viewport Content */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cinematic Executive Hero */}
              <Hero 
                onOpenRecommender={() => setIsRecommenderOpen(true)}
                onExploreServices={() => handleSetView('services')}
                onViewResume={() => handleSetView('resume')}
                onScheduleConsultation={() => handleSetView('consultation')}
                locale={locale}
              />

              {/* Executive Strategic Pillars */}
              <section className="py-20 border-t border-zinc-800 bg-[#09090b]" id="executive-pillars">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>The Executive Dual Advantage</span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                      Physical Industrial Scale <span className="text-amber-400 font-bold">Meets</span> Sovereign Deep-Tech
                    </h2>
                    <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                      Most software engineers have never walked a factory floor, and most factory executives lack software engineering depth. I unify both worlds into high-impact operational leadership.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pillar 1 */}
                    <div className="exec-card p-8 group flex flex-col justify-between hover:border-amber-500/40">
                      <div>
                        <div className="h-12 w-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                          <Factory className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3">
                          10+ Years Factory Floor & PPC Leadership
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                          Led Production Planning & Coordination at Fakir Knitwears Ltd. Master Production Scheduling (MPS), line balancing, cut-to-ship ratios, and zero air-freight penalties across large-scale export manufacturing.
                        </p>
                      </div>
                      <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs font-mono text-zinc-300">
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>TNA Calendar Optimization</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Capacity Balancing & Lead-Time Control</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Thies Computerized Dyeing Pioneer</span></li>
                      </ul>
                    </div>

                    {/* Pillar 2 */}
                    <div className="exec-card p-8 group flex flex-col justify-between hover:border-amber-500/40">
                      <div>
                        <div className="h-12 w-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3">
                          CEO & Nationwide Brand Scale
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                          Founded and scaled an apparel brand reaching 63 districts of Bangladesh with 1,200+ commercial dealership requests. Complete ownership of P&L, supply chain, styling, and dealer networks.
                        </p>
                      </div>
                      <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs font-mono text-zinc-300">
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Nationwide Dealership Models</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>End-to-End Supply Chain Sourcing</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Commercial Strategy & Retail Growth</span></li>
                      </ul>
                    </div>

                    {/* Pillar 3 */}
                    <div className="exec-card p-8 group flex flex-col justify-between hover:border-amber-500/40">
                      <div>
                        <div className="h-12 w-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                          <Cpu className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3">
                          Sovereign AI & Custom ERP Architecture
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                          Architecting zero-data-leak private AI systems (RAG pgvector, OpenClaw, Hermes Agent), custom ERP implementations (Odoo/ERPNext), and high-concurrency async Python systems.
                        </p>
                      </div>
                      <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs font-mono text-zinc-300">
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Zero-Trust Sovereign AI & Private RAG</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Custom Manufacturing ERP Modules</span></li>
                        <li className="flex items-center space-x-2"><Check className="h-3.5 w-3.5 text-amber-400 shrink-0" /><span>Sub-50ms Postgres & Async Backends</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={() => handleSetView('resume')}
                      className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Explore the Full Executive Dossier & Verified Career Chronology</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Core Systems & Architecture Domains Preview */}
              <section className="py-20 border-t border-zinc-800 bg-[#09090b]" id="featured-systems">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-amber-400 font-bold mb-3">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>Core Systems Architecture</span>
                      </div>
                      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                        Production Solutions & Engineering Ecosystems
                      </h2>
                    </div>
                    <button
                      onClick={() => handleSetView('services')}
                      className="inline-flex items-center space-x-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-white transition-colors cursor-pointer self-start md:self-auto"
                    >
                      <span>View All 14 Architectures</span>
                      <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Featured 1: Sovereign AI */}
                    <div 
                      onClick={() => handleSetView('service-detail', 'agentic-ai-rag-orchestration')}
                      className="exec-card p-6 cursor-pointer group flex flex-col justify-between hover:border-amber-500/50"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                            AI & Automation
                          </span>
                          <span className="font-mono text-xs text-zinc-500">SYS-01</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                          Enterprise Agentic AI & Sovereign RAG Infrastructure
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-6">
                          Grounded enterprise intelligence using private vector databases (pgvector), local LLM orchestration (Llama 3, Gemma), and autonomous tool-calling loops with zero data leakage.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono">
                        <span className="text-zinc-500">Timeline: 2-3 weeks</span>
                        <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                          <span>Review Blueprint</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    {/* Featured 2: Industrial ERP */}
                    <div 
                      onClick={() => handleSetView('service-detail', 'industrial-automation-erp')}
                      className="exec-card p-6 cursor-pointer group flex flex-col justify-between hover:border-amber-500/50"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="rounded bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                            Industrial & ERP
                          </span>
                          <span className="font-mono text-xs text-zinc-500">SYS-06</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                          Industrial Intelligence & Custom Manufacturing ERP
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-6">
                          Digitizing composite factory operations with Odoo/ERPNext, real-time cut-to-ship tracking, automated TNA scheduling, and shop-floor MQTT IoT sensor integration.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono">
                        <span className="text-zinc-500">Timeline: 4-6 weeks</span>
                        <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                          <span>Review Blueprint</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    {/* Featured 3: High-Concurrency Backend */}
                    <div 
                      onClick={() => handleSetView('service-detail', 'high-concurrency-backend-optimization')}
                      className="exec-card p-6 cursor-pointer group flex flex-col justify-between hover:border-amber-500/50"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                            Backend & Cloud
                          </span>
                          <span className="font-mono text-xs text-zinc-500">SYS-04</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                          Enterprise Backend Scaling & High-Concurrency Engineering
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-6">
                          Async Python (Django Ninja, FastAPI, Celery, Redis) with deep PostgreSQL query optimization for sub-50ms latency under high surge traffic and 99.99% uptime.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono">
                        <span className="text-zinc-500">Timeline: 1-2 weeks</span>
                        <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                          <span>Review Blueprint</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={() => handleSetView('services')}
                      className="inline-flex items-center space-x-2 rounded bg-amber-500 hover:bg-amber-600 text-zinc-950 px-8 py-3.5 text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                    >
                      <span>Explore the Full 14-Architecture Systems Catalog</span>
                      <ArrowRight className="h-4 w-4 text-zinc-950" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Testimonials Frame */}
              <section className="py-24 bg-white/[0.01] border-t border-white/5" id="testimonials-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-3xl font-extrabold text-white">
                      Strategic Proof of <span className="font-serif italic text-amber-200 font-normal">Excellence</span>
                    </h2>
                    <p className="mt-4  text-orange-500 font-mono uppercase tracking-widest font-bold">
                      Lighthouse audit-verified client response deliverables
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
                    {testimonials.map((test, i) => {
                      // Map each testimonial service to a fine-tuned polished icon
                      const serviceIcons: Record<string, React.ReactNode> = {
                        "AI Agent Setup": <Brain className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                        "Backend Optimization": <Zap className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                        "Industrial ERP": <Factory className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                      };
                      
                      const IconComponent = serviceIcons[test.service] || <Brain className="h-4 w-4 text-orange-400" />;

                      return (
                        <div key={i} className="rounded-sm border border-white/5 bg-[#0a0a0a] p-6 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-colors duration-300 flex flex-col justify-between">
                          
                          {/* Elegant, properly sized quote watermark */}
                          <Quote className="absolute -top-3 -right-3 h-16 w-16 text-orange-500/[0.02] group-hover:text-orange-500/[0.05] pointer-events-none select-none transition-colors duration-300 -rotate-12" />

                          <div>
                            {/* Card Header with stars & service icon */}
                            <div className="flex items-center justify-between mb-5 relative z-10">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, idx) => (
                                  <Star key={idx} className="h-3 w-3 fill-orange-400 text-orange-400" />
                                ))}
                              </div>
                              <div className="h-8 w-8 rounded bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.02] transition-all duration-300">
                                {IconComponent}
                              </div>
                            </div>

                            <p className=" text-zinc-300 font-sans italic leading-relaxed relative z-10">
                              "{test.quote}"
                            </p>
                          </div>

                          <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                            <div>
                              <span className="block  font-bold text-white">{test.author}</span>
                              <span className="text-[16px] text-zinc-500 font-mono uppercase tracking-wider">{test.role}</span>
                            </div>
                            <span className="rounded-sm bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 font-mono text-[14px] uppercase tracking-widest text-orange-400 shrink-0">
                              {test.service}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Advanced FAQ Frame */}
              <section className="py-24 border-t border-white/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-3xl font-extrabold text-white">
                      System <span className="font-serif italic text-amber-200 font-normal">FAQ</span>
                    </h2>
                    <p className="mt-4  text-zinc-500 font-mono uppercase tracking-widest">
                      Frequently reviewed details regarding code ownership, milestone payments, and deployment guarantees.
                    </p>
                  </div>

                  <div className="space-y-4" id="faq-accordions">
                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Do I own 100% of the completed service code?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes, absolutely. Once final invoices are settled, the entire private GitHub repository, Docker blueprints, and administrator keys are fully transferred. There are zero licensing, royalty, or hosting restrictions.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>How are APIs and server resource billing managed?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        All underlying resource costs (e.g., Contabo, Hetzner, DO VPS nodes, OpenAI API keys) are billed directly to your corporate accounts. I assist in setting up strict usage locks, semantic caching layers, and token compression to prevent runaway operational bills.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What happens if the system encounters a bug after launch?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Every single architectural deployment includes an automatic 30-day performance warranty. During this window, any configuration deviations, memory leaks, or execution failures are resolved instantly as priority items. Ongoing weekly Retainers extend this protective SLA infinitely.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Do you offer ongoing support after delivery?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes. Weekly ongoing support is available and includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime with no penalties.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Can I customize the deliverables for my specific needs?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals. The final scope is tailored to your business needs.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What do you need from me to get started?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Is my data and intellectual property protected?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure — work can be done within your VPC or on-premise environment.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What payment methods do you accept?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted. All payments are processed securely with invoices provided for every transaction.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What if I am not satisfied with the deliverables?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        If a deliverable does not meet the agreed scope, it will be revised at no additional cost. The weekly support plan includes unlimited revisions within scope. Full refunds are available before the first deliverable is shipped.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white  flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>How do you handle communication during the project?</span>
                      </h4>
                      <p className=" text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        I provide daily progress updates via your preferred channel (email, Slack, Telegram, or video calls). A shared project board tracks all tasks, milestones, and blockers. You have full visibility into the development process at all times.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* High-Conversion Direct Contact Lead form */}
              <section className="py-24 border-t border-white/5">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 md:p-10 relative overflow-hidden">
                    
                    <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-orange-550/5 blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-xl mx-auto space-y-6">
                      <div className="text-center">
                        <span className="font-mono text-[14px] uppercase text-orange-400 tracking-widest font-bold px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-sm inline-block">
                          Get scannable contract briefings
                        </span>
                        <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-4">
                          Initiate a Scoped <span className="font-serif italic text-amber-200 font-normal">Project Discussion</span>
                        </h2>
                        <p className="text-zinc-500  mt-2 leading-relaxed">
                          Provide your email and requirements. Haradhan will reply under 2 hours with an official technical roadmap or schedule a direct briefing session.
                        </p>
                      </div>

                      {msgSuccess ? (
                        <div className="p-8 rounded-sm border border-orange-500/20 bg-orange-550/10 text-center space-y-2">
                          <CheckCircle2 className="h-8 w-8 text-orange-400 mx-auto animate-bounce" />
                          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest">Request Relayed!</h4>
                          <p className="text-[15px] text-zinc-400 font-sans">Haradhan's email scheduler is now notified. Please watch your inbox for our secure roadmap invoice within <span className="font-mono text-white font-bold">2 hours</span>.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSendMessage} className="space-y-4  font-sans" id="home-contact-form">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-mono text-[14px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Company Representative *</label>
                              <input 
                                type="text"
                                required
                                value={msgName}
                                onChange={(e) => setMsgName(e.target.value)}
                                placeholder="e.g. James R."
                                className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5  text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[14px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Business Contact *</label>
                              <input 
                                type="email"
                                required
                                value={msgEmail}
                                onChange={(e) => setMsgEmail(e.target.value)}
                                placeholder="e.g. james@saasops.com"
                                className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5  text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[14px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Scope or custom modifications needed</label>
                            <textarea 
                              rows={3}
                              required
                              value={msgText}
                              onChange={(e) => setMsgText(e.target.value)}
                              placeholder="e.g. Looking to integrate Private AI Agent system onto our Contabo host and route it via corporate Telegram webhook."
                              className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5  text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707] resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={msgSending}
                            className={`w-full rounded-sm bg-white hover:bg-orange-500 hover:text-white py-3 text-center font-display text-[16px] font-bold uppercase tracking-widest text-zinc-950 shadow-xl cursor-pointer transition-all duration-300 flex items-center justify-center space-x-2 ${msgSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {msgSending ? (
                              <>
                                <span className="inline-block h-4 w-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                                <span>Relaying to me@hrdnsh.com...</span>
                              </>
                            ) : (
                              <span>Submit Project Briefing Request</span>
                            )}
                          </button>
                          
                          <div className="text-center pt-2">
                            <span className="text-xs text-zinc-500 font-mono">
                              Direct inquiry: <a href="mailto:me@hrdnsh.com" className="text-zinc-400 hover:text-amber-400 underline transition-colors">me@hrdnsh.com</a>
                            </span>
                          </div>
                        </form>
                      )}
                    </div>

                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {currentView === 'services' && (
            <motion.div
              key="services-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ServicesGrid 
                onSelectService={(id) => handleSetView('service-detail', id)}
                onInitiatePayment={handleInitiatePayment}
              />
            </motion.div>
          )}

          {currentView === 'service-detail' && selectedServiceId && (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ServiceDetailView 
                serviceId={selectedServiceId}
                onBack={() => handleSetView('home')}
                onInitiatePayment={handleInitiatePayment}
              />
            </motion.div>
          )}

          {currentView === 'payment' && selectedServiceId && (
            <motion.div
              key="payment-checkout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <PaymentCheckout 
                serviceId={selectedServiceId}
                billingType={checkoutBilling}
                onBack={() => handleSetView('service-detail', selectedServiceId)}
                onSuccess={() => {
                  setSelectedServiceId(null);
                  setCurrentView('home');
                }}
              />
            </motion.div>
          )}

          {currentView === 'resume' && (
            <motion.div
              key="resume-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ResumeHub />
            </motion.div>
          )}

          {currentView === 'recommend' && (
            <motion.div
              key="recommend-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <RecommendGrid />
            </motion.div>
          )}

          {currentView === 'blog' && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <BlogIndex onNavigate={(view, slug) => handleSetView(view, null, slug ?? null)} />
            </motion.div>
          )}

          {currentView === 'blog-post' && selectedBlogPostSlug && (
            <motion.div
              key={`blog-post-${selectedBlogPostSlug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <BlogPostPage slug={selectedBlogPostSlug} onNavigate={(view, slug) => handleSetView(view, null, slug ?? null)} />
            </motion.div>
          )}

          {currentView === 'consultation' && (
            <motion.div
              key="consultation-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConsultationScheduler onBackToHome={() => handleSetView('home')} />
            </motion.div>
          )}

          {currentView === 'billing-portal' && (
            <motion.div
              key="billing-portal-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InvoicingPortal onBackToHome={() => handleSetView('home')} />
            </motion.div>
          )}

          {currentView === 'terms' && (
            <motion.div
              key="terms-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TermsOfService onBackToHome={() => handleSetView('home')} />
            </motion.div>
          )}

          {currentView === 'privacy' && (
            <motion.div
              key="privacy-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyPolicy onBackToHome={() => handleSetView('home')} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Interactive Configuration Dialog */}
      <AnimatePresence>
        {isRecommenderOpen && (
          <LeadRecommenderModal 
            isOpen={isRecommenderOpen}
            onClose={() => setIsRecommenderOpen(false)}
            onSelectService={(serviceId) => {
              setIsRecommenderOpen(false);
              handleSetView('service-detail', serviceId);
            }}
          />
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer setView={handleSetView} />

      {/* Floating Book Free Session Button — visible on all pages except consultation */}
      {currentView !== 'consultation' && (
        <FloatingBookButton onBookSession={() => handleSetView('consultation')} />
      )}

    </div>
  );
}
