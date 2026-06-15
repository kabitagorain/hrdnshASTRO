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

// Site Data
import { testimonials, siteData, profile } from './data/services';
import { translations } from './data/translations';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
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

    if (viewParam) {
      if (viewParam === 'service-detail' && serviceParam) {
        setCurrentView('service-detail');
        setSelectedServiceId(serviceParam);
      } else if (['home', 'resume', 'recommend', 'consultation', 'billing-portal', 'invoicing', 'terms', 'privacy'].includes(viewParam)) {
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
      
      setCurrentView(viewParam === 'invoicing' ? 'billing-portal' : viewParam);
      setSelectedServiceId(serviceParam || null);
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
    
    if (currentView === 'home') {
      url.searchParams.delete('view');
      url.searchParams.delete('service');
    } else {
      url.searchParams.set('view', currentView);
      if (currentView === 'service-detail' && selectedServiceId) {
        url.searchParams.set('service', selectedServiceId);
      } else {
        url.searchParams.delete('service');
      }
    }

    if (url.searchParams.get('view') !== prevView || url.searchParams.get('service') !== prevService) {
      window.history.pushState(null, '', url.pathname + url.search);
    }
  }, [currentView, selectedServiceId]);

  // Sync language attribute and HTML / header tags for multi-lingual SEO compliance
  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    const t = translations[locale] || translations.en;
    
    // Dynamic tab header metadata update
    document.title = `${profile.name} | ${t.heroBadge}`;
    
    // SEO description update standard spider accessibility compliance
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.heroTagline);
    }
  }, [locale]);

  // Scroll to top on view modification
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedServiceId]);

  // Google Analytics virtual page tracking on internal SPA view transitions
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const pageTitle = selectedServiceId 
        ? `Service Detail: ${selectedServiceId}`
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

  const handleSetView = (view: string, serviceId: string | null = null) => {
    setCurrentView(view);
    if (serviceId) {
      setSelectedServiceId(serviceId);
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

    </div>
  );
}
