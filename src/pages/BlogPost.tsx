import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { profile, siteData } from '../data/services';

interface BlogPostProps {
  slug: string;
  onNavigate: (view: string, slug?: string | null) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostProps) {
  const post = blogPosts.find(p => p.slug === slug);

  // Inject Article JSON-LD
  React.useEffect(() => {
    if (!post) return;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      author: { "@type": "Person", name: `${profile.fname} ${profile.lname}`, url: siteData.url },
      publisher: { "@type": "Person", name: `${profile.fname} ${profile.lname}`, url: siteData.url },
      datePublished: "2026-06-22T00:00:00+00:00",
      dateModified: "2026-06-22T00:00:00+00:00",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${siteData.url}/blog/${post.slug}/` },
    };
    let script = document.getElementById('json-ld-blog-post') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-blog-post';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLd, null, 2);
    return () => { if (script) script.remove(); };
  }, [post]);

  // Update page title and meta
  React.useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — ${profile.name}`;
    const updateMeta = (key: string, value: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    updateMeta('description', post.description);
    updateMeta('og:title', post.title, true);
    updateMeta('og:description', post.description, true);
    updateMeta('og:url', `${siteData.url}/blog/${post.slug}`, true);
    updateMeta('og:type', 'article', true);
  }, [post]);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center px-4">
        <h3 className="font-display text-xl font-bold text-white">Article not found.</h3>
        <button onClick={() => onNavigate('blog')} className="mt-4 text-orange-500 hover:text-orange-400 text-xs uppercase tracking-widest font-bold">
          ← Back to Blog
        </button>
      </div>
    );
  }

  // Render content paragraphs
  const renderContent = () => {
    return post.content.map((paragraph, i) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={i} className="font-display text-xl font-bold text-white mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={i} className="font-display text-base font-bold text-amber-200 mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('- ')) {
        return <li key={i} className="text-xs text-zinc-300 leading-relaxed ml-4 mb-1">{paragraph.replace('- ', '')}</li>;
      }
      if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ') || paragraph.startsWith('5. ') || paragraph.startsWith('6. ')) {
        return <li key={i} className="text-xs text-zinc-300 leading-relaxed ml-4 mb-1 list-decimal">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
      }
      // Handle bold markdown **text**
      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        // Handle italic markdown *text*
        const italicParts = part.split(/(\*[^*]+\*)/g);
        return italicParts.map((ip, k) => {
          if (ip.startsWith('*') && ip.endsWith('*') && !ip.startsWith('**')) {
            return <em key={`${j}-${k}`} className="text-zinc-400">{ip.slice(1, -1)}</em>;
          }
          return ip;
        });
      });
      return <p key={i} className="text-xs text-zinc-300 leading-relaxed mb-4">{rendered}</p>;
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-zinc-500">
          <li><button onClick={() => onNavigate('home')} className="hover:text-zinc-300 transition-colors">Home</button></li>
          <li>/</li>
          <li><button onClick={() => onNavigate('blog')} className="hover:text-zinc-300 transition-colors">Blog</button></li>
          <li>/</li>
          <li className="text-zinc-300 font-medium truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase">{post.category}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[10px] text-zinc-500">{post.date}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[10px] text-zinc-500">{post.readTime} read</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {post.description}
        </p>
      </header>

      <div className="space-y-0">
        {renderContent()}
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 rounded-sm border border-orange-500/15 bg-orange-500/5">
        <h3 className="font-display text-lg font-bold text-white mb-3">Need help with this technology?</h3>
        <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
          I build production-grade systems in AI, RAG, ERP, and cloud infrastructure. Every engagement starts with a free discovery call.
        </p>
        <button
          onClick={() => onNavigate('consultation')}
          className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all hover:bg-orange-500 hover:text-white cursor-pointer"
        >
          Book a consultation
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
