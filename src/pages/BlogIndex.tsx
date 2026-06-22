import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { profile, siteData } from '../data/services';

interface BlogIndexProps {
  onNavigate: (view: string, slug?: string | null) => void;
}

export default function BlogIndex({ onNavigate }: BlogIndexProps) {
  // Inject Blog JSON-LD
  React.useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${profile.fname}'s Technical Blog — AI, ERP, and Infrastructure`,
      description: "In-depth articles on Sovereign AI, RAG systems, ERPNext, Odoo, LLM deployment, and industrial automation.",
      url: `${siteData.url}/blog`,
      publisher: {
        "@type": "Person",
        "@id": `${siteData.url}#person`,
        name: `${profile.fname} ${profile.lname}`,
      },
    };
    let script = document.getElementById('json-ld-blog-index') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-blog-index';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLd, null, 2);
    return () => { if (script) script.remove(); };
  }, []);

  // Update page title and meta
  React.useEffect(() => {
    document.title = `Blog — AI, ERP & Infrastructure Articles — ${profile.name}`;
    const updateMeta = (key: string, value: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    updateMeta('description', 'In-depth technical articles on Sovereign AI, private RAG systems, ERPNext, Odoo, LLM self-hosting, and AI automation for businesses.');
    updateMeta('og:title', `Blog — AI, ERP & Infrastructure — ${profile.name}`, true);
    updateMeta('og:description', 'Technical articles on Sovereign AI, RAG systems, ERPNext, Odoo, and LLM infrastructure.', true);
    updateMeta('og:url', `${siteData.url}/blog`, true);
    updateMeta('og:type', 'website', true);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-sm border border-orange-500/20 bg-orange-500/5 px-4 py-2 mb-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Technical Blog</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
          Deep dives into <span className="font-serif italic text-amber-200 font-normal">AI, ERP & Infrastructure</span>
        </h1>
        <p className="mt-6 text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Practical articles on Sovereign AI deployment, private RAG systems, ERPNext/Odoo implementation, and self-hosted LLM infrastructure. Written from real project experience.
        </p>
      </div>

      {/* Article Grid */}
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <button
            key={post.slug}
            onClick={() => onNavigate('blog-post', post.slug)}
            className="group block w-full text-left rounded-sm border border-white/5 bg-white/[0.01] p-6 sm:p-8 transition-all duration-200 hover:border-orange-500/20 hover:bg-white/[0.02] cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase">{post.category}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[10px] text-zinc-500">{post.date}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[10px] text-zinc-500">{post.readTime} read</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed text-xs">
                  {post.description}
                </p>
              </div>
              <div className="shrink-0 self-center sm:self-start">
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
