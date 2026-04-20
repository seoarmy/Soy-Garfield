'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Clock, Calendar, Linkedin, Twitter, Facebook, MessageSquare, Quote, Tag, Copy, Check, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import ArticleCard from '../../../components/ArticleCard';
import NewsletterForm from '../../../components/NewsletterForm';
import { Article } from '../../../types';

const CodeBlock = ({ value }: { value: any }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-10 rounded-[1.5rem] overflow-hidden bg-[#0d1117] shadow-2xl border border-slate-800/50 group transition-all duration-300 hover:border-garfield-500/30">
      <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2 text-[0.6rem] font-black text-garfield-500 uppercase tracking-[0.2em]">
          <Terminal size={12} strokeWidth={2.5} />
          {value.language || 'Code'}
        </div>
        <div className="w-14"></div>
      </div>
      <div className="relative">
        <button
          onClick={() => { navigator.clipboard.writeText(value.code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 hover:bg-garfield-500 hover:text-white text-slate-400 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {copied ? <Check size={16} strokeWidth={2.5} className="text-white" /> : <Copy size={16} strokeWidth={2} />}
        </button>
        <div className="p-6 md:p-8 overflow-x-auto">
          <pre className="font-mono text-sm md:text-base leading-relaxed text-slate-300">
            <code>{value.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl lg:text-2xl font-black text-slate-900 mt-10 mb-4 tracking-tight">{children}</h3>,
    normal: ({ children }: any) => <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">{children}</p>,
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-12">
        <img src={value.asset?.url || ''} alt={value.alt || ''} className="w-full rounded-[2.5rem] shadow-xl" />
        {value.caption && <figcaption className="mt-4 text-center text-sm text-slate-400 font-medium italic">{value.caption}</figcaption>}
      </figure>
    ),
    quote: ({ value }: any) => (
      <blockquote className="my-16 px-8 sm:px-12 py-14 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-[60px]"></div>
        <span className="absolute -top-6 -left-2 text-[12rem] font-serif leading-none text-white/5 select-none">"</span>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-garfield-500/10 border border-garfield-500/20 flex items-center justify-center text-garfield-500">
              <Quote size={24} fill="currentColor" />
            </div>
          </div>
          <p className="text-lg sm:text-xl font-bold italic leading-relaxed mb-6 text-slate-100/90">"{value.text}"</p>
          {value.author && (
            <footer className="flex items-center gap-4">
              <div className="h-0.5 w-8 bg-garfield-500 rounded-full"></div>
              <cite className="text-garfield-400 font-black uppercase tracking-[0.3em] text-[0.65rem] not-italic">{value.author}</cite>
            </footer>
          )}
        </div>
      </blockquote>
    ),
    checklist: ({ value }: any) => (
      <div className="space-y-4 my-8">
        {value.items?.map((item: string, i: number) => (
          <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center">
            <div className="h-8 w-8 rounded-full bg-garfield-500 flex items-center justify-center shadow-lg text-white">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    ),
    codeBlock: ({ value }: any) => <CodeBlock value={value} />,
  },
  list: {
    bullet: ({ children }: any) => <ul className="space-y-4 my-8 pl-2">{children}</ul>,
    number: ({ children }: any) => <ol className="space-y-4 my-8 pl-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex gap-4 items-start group">
        <div className="mt-2 h-2 w-2 rounded-full bg-garfield-500 shrink-0"></div>
        <span className="text-xl text-slate-600 font-medium leading-relaxed">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="flex gap-5 items-start mb-4">
        <span className="text-xl text-slate-600 font-medium leading-relaxed">{children}</span>
      </li>
    ),
  },
};

interface Props {
  article: Article;
  relatedArticles: Article[];
  sidebarArticles: Article[];
}

export default function ArticleClient({ article, relatedArticles, sidebarArticles }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const authorLink = article.authorSlug ? `/author/${article.authorSlug}` : '/about';
  const categorySlugMap: Record<string, string> = { 'SEO': 'seo', 'IA': 'ia', 'Social Media': 'social-media', 'Analítica': 'analitica' };

  const share = (network: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(urls[network], '_blank');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[150] bg-slate-100">
        <div className="h-full bg-garfield-500 transition-all duration-300 shadow-[0_0_10px_rgb(249,115,22,0.5)]" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-slate-50/50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/" className="hover:text-garfield-600 transition-colors">Inicio</Link>
            <span className="mx-3 opacity-30">›</span>
            <Link href={`/category/${categorySlugMap[article.category] || article.category.toLowerCase()}`} className="hover:text-garfield-600 transition-colors">{article.category}</Link>
            <span className="mx-3 opacity-30 hidden sm:block">›</span>
            <span className="text-slate-900 truncate max-w-[200px] hidden sm:block">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Main Content */}
          <div className="lg:col-span-8">
            <header className="mb-12 lg:mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-flex items-center rounded-full bg-garfield-500 px-5 py-2 text-[0.6rem] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-garfield-500/20">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] mb-8 lg:mb-10 tracking-tight">
                {article.title}
              </h1>

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-[0.6rem] font-black text-slate-500 uppercase tracking-widest border border-slate-200 hover:border-garfield-400 hover:text-garfield-600 transition-colors">
                      <Tag size={12} />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-y border-slate-100 py-6">
                <Link href={authorLink} className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-garfield-100 overflow-hidden ring-4 ring-slate-50 shadow-inner transition-transform group-hover:scale-110 relative">
                    {article.authorImage ? (
                      <Image src={article.authorImage} alt={article.author} fill sizes="48px" className="object-cover" />
                    ) : (
                      <span className="text-white text-xl font-black flex items-center justify-center h-full">{article.author?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] leading-none mb-1.5 group-hover:text-garfield-600 transition-colors">{article.author}</div>
                    <div className="flex items-center gap-2 text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-3">
                  {['linkedin', 'facebook', 'whatsapp'].map((network) => (
                    <button
                      key={network}
                      onClick={() => share(network)}
                      className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-slate-900 hover:text-white"
                      aria-label={`Compartir en ${network}`}
                    >
                      {network === 'linkedin' && <Linkedin size={20} strokeWidth={1.5} />}
                      {network === 'facebook' && <Facebook size={20} strokeWidth={1.5} />}
                      {network === 'whatsapp' && <MessageSquare size={20} strokeWidth={1.5} />}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] mb-12 shadow-2xl">
              <Image src={article.imageUrl} alt={article.title} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
            </div>

            {/* Article Body */}
            <article className="max-w-none">
              <PortableText value={article.content as any} components={portableTextComponents} />

              <div className="my-16 flex flex-col sm:flex-row items-center justify-center gap-4 py-12 border-y border-slate-100">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">¿Te ha gustado este artículo?</span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => share('linkedin')}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white text-[0.65rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                  >
                    <Linkedin size={16} />
                    Compartir en LinkedIn
                  </button>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-slate-900 text-slate-900 text-[0.65rem] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                  >
                    <MessageSquare size={16} />
                    Consultoría Pro
                  </Link>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-24 pt-16 border-t border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-widest">Sigue leyendo sobre {article.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {relatedArticles.map(a => <ArticleCard key={a.id} article={a} />)}
                </div>
              </div>
            )}

            {/* Author Box */}
            <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left">
                <Link href={authorLink} className="h-32 w-32 rounded-[2.5rem] bg-white/10 p-2 flex-shrink-0 overflow-hidden block relative">
                  {article.authorImage && <Image src={article.authorImage} alt={article.author} fill sizes="128px" className="rounded-[2rem] object-cover" />}
                </Link>
                <div>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-garfield-400 mb-3 block">{article.authorRole || 'Experto en Marketing Digital e IA'}</span>
                  <Link href={authorLink} className="text-3xl font-black mb-4 leading-none block hover:text-garfield-500 transition-colors">{article.author}</Link>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                    {article.authorBio || 'Consultor estratégico ayudando a empresas a navegar la transición hacia un futuro impulsado por la inteligencia artificial.'}
                  </p>
                  <Link href={authorLink} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-garfield-500 transition-all">
                    Descubre mi trayectoria <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-garfield-500 rounded-full opacity-20 blur-2xl"></div>
              <h4 className="text-2xl font-black mb-6 leading-tight">Impulsa tu negocio con IA</h4>
              <p className="text-sm text-slate-400 font-medium mb-10">Implementamos sistemas de agentes para dominar tu nicho de mercado.</p>
              <Link href="/contact" className="flex items-center justify-center gap-3 w-full bg-garfield-500 hover:bg-white hover:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-garfield-500/20">
                <MessageSquare size={18} />
                Consultoría Pro
              </Link>
            </div>

            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                  <div className="h-1 w-12 bg-garfield-500"></div>
                  Destacados
                </h4>
                <div className="flex flex-col gap-3">
                  {sidebarArticles.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                <h4 className="text-lg font-black text-slate-900 mb-4">Estrategia Semanal</h4>
                <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-widest">Noticias de SEO & IA</p>
                <NewsletterForm />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
