import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
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
    <section className="py-24 border-t border-white/5" id="services-catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Hardened Production{' '}
            <span className="font-serif italic text-amber-200 font-normal">
              Architectures
            </span>
          </h2>
          <p className="mt-4 text-xs text-zinc-400 tracking-wider uppercase font-mono max-w-2xl mx-auto leading-relaxed">
            Explore 14 specialized, battle-tested engineering ecosystems. Select any architecture blueprint below 
            to review comprehensive technical deliverables, timeline commitments, and business owner ROI guarantees.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 pb-6 border-b border-white/5">
          
          {/* Category Filters (Horizontal Scroll on Mobile) */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 grow">
            <Filter className="h-3.5 w-3.5 text-zinc-400 shrink-0 hidden sm:block" />
            <div className="flex space-x-1 pl-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer rounded-sm ${
                    selectedCategory === cat
                      ? 'bg-orange-500/10 border border-orange-500/50 text-orange-400 font-extrabold'
                      : 'border border-white/10 hover:border-zinc-500 bg-white/[0.01] text-zinc-300 hover:text-white'
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
              placeholder="Search technologies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-white/[0.02] px-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500/50 focus:bg-[#080808] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/5 rounded-sm bg-white/[0.01]">
            <span className="text-3xl text-zinc-500 block mb-3">⚡</span>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">No Matching System Blueprint Found</h4>
            <p className="text-zinc-400 text-xs mt-1">Try refining your search keyword or clearing the active category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-list">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] p-6 shadow-2xl transition-all hover:border-orange-500/35 hover:scale-[1.015] duration-300"
              >
                {/* Background linear gloss */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-amber-500/0 group-hover:from-orange-500/[0.03] group-hover:to-amber-500/[0.02] transition-all duration-500" />
                
                {/* Number Watermark */}
                <span className="absolute -bottom-6 -right-2 font-display text-8xl font-bold text-zinc-800/10 pointer-events-none group-hover:text-orange-500/10 transition-colors">
                  {service.number}
                </span>

                <div>
                  {/* Category Banner */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-sm bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold text-orange-400 uppercase tracking-widest font-mono">
                      {service.category}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      SYS-{service.number}
                    </span>
                  </div>

                  {/* Title and Icon */}
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors flex items-center space-x-2">
                    <span className="text-lg inline-block shrink-0">{service.icon}</span>
                    <span>{service.title}</span>
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-6 line-clamp-3">
                    {service.tagline}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {service.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-sm bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-zinc-350 border border-white/10 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.techStack.length > 4 && (
                      <span className="font-mono text-[10px] text-zinc-400 pl-1 mt-1 font-semibold">
                        +{service.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing / CTA row */}
                <div className="relative z-10 border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-zinc-400 tracking-widest font-bold">Contract Budget</span>
                    <p className="font-display font-black text-white text-md">
                      ${service.pricing.oneTime}
                      <span className="text-[11px] text-zinc-400 font-normal">.00</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="rounded-sm border border-white/10 hover:border-orange-500/60 bg-transparent px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center space-x-1 shadow-lg"
                    >
                      <span>Explore Detail</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-orange-500" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
