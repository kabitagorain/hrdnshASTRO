import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, ShieldCheck, Terminal, Cpu, Clock, CheckCircle } from 'lucide-react';
import { services } from '../data/services';

interface ServicesGridProps {
  onSelectService: (serviceId: string) => void;
  onInitiatePayment: (serviceId: string, billing: 'onetime' | 'weekly') => void;
}

export default function ServicesGrid({ onSelectService, onInitiatePayment }: ServicesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories extraction
  const categories = useMemo(() => {
    const list = new Set(services.map(s => s.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-16 md:py-24" id="services-catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page / Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-zinc-300 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            <span>Systems & Architecture Catalog</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Production Engineering <span className="text-amber-400 font-bold">Ecosystems</span>
          </h1>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Explore 14 specialized, production-ready engineering blueprints across Sovereign AI, Custom Industrial ERP, High-Concurrency Backends, and Cloud Infrastructure Hardening.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 pb-6 border-b border-zinc-800">
          
          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 grow">
            <Filter className="h-3.5 w-3.5 text-zinc-400 shrink-0 hidden sm:block" />
            <div className="flex space-x-1 pl-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-zinc-950 shadow-sm'
                      : 'border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-900/80 px-9 py-2 text-xs font-sans text-white placeholder-zinc-500 focus:border-amber-500/60 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded bg-zinc-950/40">
            <span className="text-3xl text-zinc-500 block mb-3">⚡</span>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">No Matching System Blueprint Found</h4>
            <p className="text-zinc-400 text-xs mt-1">Try refining your search keyword or clearing the active category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-list">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="exec-card p-6 cursor-pointer group flex flex-col justify-between hover:border-amber-500/50 transition-all duration-200"
              >
                <div>
                  {/* Category Banner & Code */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 text-[11px] font-bold text-zinc-300 uppercase tracking-wider font-mono">
                      {service.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      SYS-{service.number}
                    </span>
                  </div>

                  {/* Title in Roboto Condensed */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-4">
                    {service.tagline}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="rounded bg-black/60 border border-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.techStack.length > 4 && (
                      <span className="rounded bg-black/60 border border-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 font-medium">
                        +{service.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-zinc-400 text-xs font-mono">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{service.timeline.split(';')[0]}</span>
                  </div>

                  <span className="font-display text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                    <span>Review Blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
