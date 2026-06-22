import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, CheckCircle2, HelpCircle, Star, Quote, Brain, Zap, Factory } from 'lucide-react';

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

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
  const [checkoutBilling, setCheckoutBilling] = useState<'onetime' | 'weekly'>('onetime');
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [locale, setLocale] = useState<string>('en');

  // Forms for simple contact sub-sheet
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSuccess, setMsgSuccess] = useState(false);

  // 1. Initial Load Deep Link Param Sync
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const serviceParam = params.get('service');
    const slugParam = params.get('slug');

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
  }, []);

  // 2. Browser PopState State Synchronizer (History Back/Forward Support)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') || 'home';
      const serviceParam = params.get('service');
      const slugParam = params.get('slug');
      
      setCurrentView(viewParam === 'invoicing' ? 'billing-portal' : viewParam);
      setSelectedServiceId(serviceParam || null);
      setSelectedBlogPostSlug(slugParam || null);
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

  // 3. Active Change pushing to History State for SEO accessibility and direct sharing
  useEffect(() => {
    const url = new URL(window.location.href);
    const prevView = url.searchParams.get('view');
    const prevService = url.searchParams.get('service');
    const prevSlug = url.searchParams.get('slug');
    
    if (currentView === 'home') {
      url.searchParams.delete('view');
      url.searchParams.delete('service');
      url.searchParams.delete('slug');
    } else {
      url.searchParams.set('view', currentView);
      if (currentView === 'service-detail' && selectedServiceId) {
        url.searchParams.set('service', selectedServiceId);
      } else {
        url.searchParams.delete('service');
      }
      if (currentView === 'blog-post' && selectedBlogPostSlug) {
        url.searchParams.set('slug', selectedBlogPostSlug);
      } else {
        url.searchParams.delete('slug');
      }
    }

    if (url.searchParams.get('view') !== prevView || url.searchParams.get('service') !== prevService || url.searchParams.get('slug') !== prevSlug) {
      window.history.pushState(null, '', url.pathname + url.search);
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
        titleStr = `${matched.title} | ${profile.name} Consulting`;
        descStr = matched.tagline || matched.businessOwner.summary;
        canonicalUrl = `https://hrdnsh.com/?view=service-detail&service=${selectedServiceId}`;
      }
    } else if (currentView === 'resume') {
      titleStr = `Official Resume & Tech Stack | ${profile.name}`;
      descStr = `Comprehensive background on Python Async Optimizations, Cloud migrations, autonomous RAG stacks, and modern SRE of Haradhan Sharma.`;
      canonicalUrl = 'https://hrdnsh.com/?view=resume';
    } else if (currentView === 'recommend') {
      titleStr = `Recommended Infrastructure & Tools | ${profile.name}`;
      descStr = `Highly curated hosting recommendation, cloud servers, local database solutions, and domain providers utilized by Haradhan Sharma.`;
      canonicalUrl = 'https://hrdnsh.com/?view=recommend';
    } else if (currentView === 'blog') {
      titleStr = `Blog — AI, ERP & Infrastructure Articles | ${profile.name}`;
      descStr = `In-depth technical articles on Sovereign AI, private RAG systems, ERPNext, Odoo, LLM self-hosting, and AI automation for businesses.`;
      canonicalUrl = 'https://hrdnsh.com/?view=blog';
    } else if (currentView === 'blog-post' && selectedBlogPostSlug) {
      const foundPost = blogPosts.find(p => p.slug === selectedBlogPostSlug);
      if (foundPost) {
        titleStr = `${foundPost.title} | ${profile.name}`;
        descStr = foundPost.description;
        canonicalUrl = `https://hrdnsh.com/?view=blog-post&slug=${selectedBlogPostSlug}`;
      }
    } else if (currentView === 'consultation') {
      titleStr = `Book an SLA Deployment Consultation | ${profile.name}`;
      descStr = `Schedule a direct enterprise scope-definition meeting or urgent virtual deployment brief with Haradhan Sharma.`;
      canonicalUrl = 'https://hrdnsh.com/?view=consultation';
    } else if (currentView === 'billing-portal' || currentView === 'payment') {
      titleStr = `Invoicing & Payment Portal | ${profile.name}`;
      descStr = `Secure client-side escrow checkouts and payment reconciliations for custom system developments.`;
      canonicalUrl = `https://hrdnsh.com/?view=${currentView}`;
    } else if (currentView === 'terms') {
      titleStr = `Terms of Service & Licensing | ${profile.name}`;
      descStr = `Governance terms, container resource ownership models, cloud SLA guarantees, and dispute resolutions.`;
      canonicalUrl = 'https://hrdnsh.com/?view=terms';
    } else if (currentView === 'privacy') {
      titleStr = `Privacy Protection Standard | ${profile.name}`;
      descStr = `Information detailing diagnostic logging frameworks, contact caches, real-time calendars, and zero-monetization storage buffers.`;
      canonicalUrl = 'https://hrdnsh.com/?view=privacy';
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

  const handleSetView = (view: string, serviceId: string | null = null, blogSlug: string | null = null) => {
    setCurrentView(view);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    if (blogSlug !== undefined) {
      setSelectedBlogPostSlug(blogSlug);
    }
  };

  const handleInitiatePayment = (serviceId: string, billing: 'onetime' | 'weekly') => {
    setSelectedServiceId(serviceId);
    setCheckoutBilling(billing);
    setCurrentView('payment');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgText) return;
    
    // Save contact to local storage CRM list for future Google Sheets synchronization
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

    setMsgSuccess(true);
    setTimeout(() => {
      setMsgSuccess(false);
      setMsgName('');
      setMsgEmail('');
      setMsgText('');
    }, 4000);
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
              {/* Cinematic Hero */}
              <Hero 
                onOpenRecommender={() => setIsRecommenderOpen(true)}
                onExploreServices={() => {
                  const el = document.getElementById('services-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                locale={locale}
              />

              {/* Dynamic Catalog */}
              <ServicesGrid 
                onSelectService={(id) => handleSetView('service-detail', id)}
                onInitiatePayment={handleInitiatePayment}
              />

              {/* Testimonials Frame */}
              <section className="py-24 bg-white/[0.01] border-t border-white/5" id="testimonials-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-3xl font-extrabold text-white">
                      Strategic Proof of <span className="font-serif italic text-amber-200 font-normal">Excellence</span>
                    </h2>
                    <p className="mt-4 text-xs text-orange-500 font-mono uppercase tracking-widest font-bold">
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

                            <p className="text-xs text-zinc-300 font-sans italic leading-relaxed relative z-10">
                              "{test.quote}"
                            </p>
                          </div>

                          <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                            <div>
                              <span className="block text-xs font-bold text-white">{test.author}</span>
                              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{test.role}</span>
                            </div>
                            <span className="rounded-sm bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-orange-400 shrink-0">
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
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-3xl font-extrabold text-white">
                      System <span className="font-serif italic text-amber-200 font-normal">FAQ</span>
                    </h2>
                    <p className="mt-4 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                      Frequently reviewed details regarding code ownership, milestone payments, and deployment guarantees.
                    </p>
                  </div>

                  <div className="space-y-4" id="faq-accordions">
                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Do I own 100% of the completed service code?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes, absolutely. Once final invoices are settled, the entire private GitHub repository, Docker blueprints, and administrator keys are fully transferred. There are zero licensing, royalty, or hosting restrictions.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>How are APIs and server resource billing managed?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        All underlying resource costs (e.g., Contabo, Hetzner, DO VPS nodes, OpenAI API keys) are billed directly to your corporate accounts. I assist in setting up strict usage locks, semantic caching layers, and token compression to prevent runaway operational bills.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What happens if the system encounters a bug after launch?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Every single architectural deployment includes an automatic 30-day performance warranty. During this window, any configuration deviations, memory leaks, or execution failures are resolved instantly as priority items. Ongoing weekly Retainers extend this protective SLA infinitely.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Do you offer ongoing support after delivery?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes. Weekly ongoing support is available and includes monitoring, bug fixes, performance optimization, security patches, and iterative feature development. You can cancel anytime with no penalties.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Can I customize the deliverables for my specific needs?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Absolutely. The listed deliverables are a starting framework. Every engagement begins with a discovery call to understand your specific requirements, constraints, and goals. The final scope is tailored to your business needs.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What do you need from me to get started?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        To begin, I need: (1) A clear description of your project goals and requirements, (2) Access to any existing systems, codebases, or documentation, (3) Your preferred communication channel. A 30-minute discovery call is usually sufficient to define the full scope.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>Is my data and intellectual property protected?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Yes. All work product, code, and documentation become your intellectual property upon payment. NDAs are signed when required. For AI/RAG projects, your data never leaves your infrastructure — work can be done within your VPC or on-premise environment.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What payment methods do you accept?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        Stripe (credit/debit cards), bank wire transfer (IBAN/SWIFT), bKash (Bangladesh), USDT (TRC20), and USDC (Solana) are all accepted. All payments are processed securely with invoices provided for every transaction.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>What if I am not satisfied with the deliverables?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
                        If a deliverable does not meet the agreed scope, it will be revised at no additional cost. The weekly support plan includes unlimited revisions within scope. Full refunds are available before the first deliverable is shipped.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-orange-500/20 transition-colors duration-300">
                      <h4 className="font-display font-semibold text-white text-xs flex items-center space-x-2">
                        <HelpCircle className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <span>How do you handle communication during the project?</span>
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 pl-6.5">
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
                        <span className="font-mono text-[9px] uppercase text-orange-400 tracking-widest font-bold px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-sm inline-block">
                          Get scannable contract briefings
                        </span>
                        <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-4">
                          Initiate a Scoped <span className="font-serif italic text-amber-200 font-normal">Project Discussion</span>
                        </h2>
                        <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                          Provide your email and requirements. Haradhan will reply under 2 hours with an official technical roadmap or schedule a direct briefing session.
                        </p>
                      </div>

                      {msgSuccess ? (
                        <div className="p-8 rounded-sm border border-orange-500/20 bg-orange-550/10 text-center space-y-2">
                          <CheckCircle2 className="h-8 w-8 text-orange-400 mx-auto animate-bounce" />
                          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest">Request Relayed!</h4>
                          <p className="text-[11px] text-zinc-400 font-sans">Haradhan's email scheduler is now notified. Please watch your inbox for our secure roadmap invoice within <span className="font-mono text-white font-bold">2 hours</span>.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-sans" id="home-contact-form">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Company Representative *</label>
                              <input 
                                type="text"
                                required
                                value={msgName}
                                onChange={(e) => setMsgName(e.target.value)}
                                placeholder="e.g. James R."
                                className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Business Contact *</label>
                              <input 
                                type="email"
                                required
                                value={msgEmail}
                                onChange={(e) => setMsgEmail(e.target.value)}
                                placeholder="e.g. james@saasops.com"
                                className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Scope or custom modifications needed</label>
                            <textarea 
                              rows={3}
                              required
                              value={msgText}
                              onChange={(e) => setMsgText(e.target.value)}
                              placeholder="e.g. Looking to integrate Private AI Agent system onto our Contabo host and route it via corporate Telegram webhook."
                              className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707] resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full rounded-sm bg-white hover:bg-orange-500 hover:text-white py-3 text-center font-display text-[10px] font-bold uppercase tracking-widest text-zinc-950 shadow-xl cursor-pointer transition-colors duration-300"
                          >
                            Submit Project Briefing Request
                          </button>
                        </form>
                      )}
                    </div>

                  </div>
                </div>
              </section>

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
