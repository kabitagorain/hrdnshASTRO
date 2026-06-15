import React, { useState, useMemo } from 'react';
import { recommendations } from '../data/services';
import { 
  DollarSign, Check, ExternalLink, Compass 
} from 'lucide-react';

export default function RecommendGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories list
  const categoriesList = useMemo(() => {
    return ['All', ...recommendations.map(c => c.category)];
  }, []);

  // Filtered recommendations list
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'All') return recommendations;
    return recommendations.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="recommendations-hub">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-orange-500/10 text-orange-400 mb-4 border border-orange-500/10">
          <Compass className="h-5 w-5 text-orange-400" />
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Architectural Tooling & <span className="font-serif italic text-amber-200 font-normal">Recommendations</span>
        </h1>
        <p className="mt-4 text-xs font-mono uppercase tracking-wider text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A hand-picked selection of servers, edge protection registries, and development engines. 
          Tested and used daily by Haradhan Sharma in multi-user industrial environments.
        </p>
      </div>

      {/* Category Tab List Filters */}
      <div className="flex justify-center overflow-x-auto pb-4 mb-12 border-b border-white/5 gap-2 no-scrollbar">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-sm px-4 py-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-orange-500/10 border border-orange-500/50 text-orange-400 font-extrabold shadow-md'
                : 'border border-white/10 hover:border-zinc-500 bg-white/[0.01] text-zinc-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Category grids */}
      <div className="space-y-16">
        {filteredCategories.map((categoryObj, idx) => (
          <div key={idx} className="space-y-6">
            
            {/* Category title */}
            <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
              <span className="text-2xl">{categoryObj.icon}</span>
              <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">{categoryObj.category}</h2>
            </div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryObj.items.map((item, idy) => (
                <div
                  key={idy}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-orange-500/35 hover:scale-[1.01] duration-355"
                >
                  <div>
                    {/* Badge and Tag */}
                    <div className="flex items-center justify-between mb-4">
                      {item.badge ? (
                        <span className={`rounded-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 text-orange-400`}>
                          {item.badge}
                        </span>
                      ) : (
                        <span className="h-4.5" />
                      )}
                      
                      <span className="font-mono text-[10px] text-zinc-400 flex items-center space-x-0.5 font-semibold">
                        <DollarSign className="h-3 w-3" />
                        <span>Starting: {item.startingPrice}</span>
                      </span>
                    </div>

                    {/* Name & Tagline */}
                    <h3 className="font-display text-base font-bold text-white tracking-tight flex items-center justify-between group-hover:text-orange-400 transition-colors duration-300">
                      <span>{item.name}</span>
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-widest font-bold pb-3 border-b border-white/[0.04]">
                      {item.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-xs text-zinc-300 leading-relaxed font-sans font-normal mb-5">
                      {item.description}
                    </p>

                    {/* Checklist Pros */}
                    <div className="space-y-1.5 mb-6">
                      <span className="block font-mono text-[10px] uppercase text-zinc-400 tracking-widest font-bold">Pros / Criteria</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                        {item.pros.map((pro, i) => (
                          <div key={i} className="flex items-center text-[10px] text-zinc-300 font-sans">
                            <Check className="h-3.5 w-3.5 text-orange-400 mr-2 shrink-0" />
                            <span className="truncate">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Affiliate External URL Link Button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-full rounded-sm border border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-orange-500/40 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-200 hover:text-white transition-all flex items-center justify-center space-x-1.5 duration-300"
                  >
                    <span>Deploy Ecosystem</span>
                    <ExternalLink className="h-3.5 w-3.5 text-orange-500" />
                  </a>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
