import type { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;
import Link from 'next/link';
import { getArticlesByTag, getAllTags } from '../../../services/articleService';
import ArticleCard from '../../../components/ArticleCard';
import NewsletterForm from '../../../components/NewsletterForm';
import { Tag, ChevronRight, Zap } from 'lucide-react';

const BASE_URL = 'https://soygarfield.com';

interface Props {
  params: Promise<{ slug: string }>;
}

function tagToLabel(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-')) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug).replace(/-/g, ' ');
  const label = tagToLabel(tag);
  return {
    title: `${label} — Artículos etiquetados | Soy Garfield`,
    description: `Todos los artículos sobre ${label} en Soy Garfield. Guías técnicas, análisis y estrategias SEO & IA en español.`,
    alternates: { canonical: `${BASE_URL}/tag/${slug}` },
    openGraph: {
      title: `${label} — Soy Garfield`,
      description: `Artículos sobre ${label}: SEO técnico, IA y marketing digital.`,
      url: `${BASE_URL}/tag/${slug}`,
      locale: 'es_AR',
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;

  // Resolve exact Sanity tag (case-insensitive match against stored tags)
  const allTags = await getAllTags();
  const exactTag =
    allTags.find((t) => t.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()) ??
    decodeURIComponent(slug).replace(/-/g, ' ');

  const label = tagToLabel(exactTag);

  const articles = await getArticlesByTag(exactTag);

  const relatedTags = allTags.filter((t) => t.toLowerCase() !== exactTag.toLowerCase()).slice(0, 12);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Etiquetas', item: `${BASE_URL}/tag` },
      { '@type': 'ListItem', position: 3, name: label, item: `${BASE_URL}/tag/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 text-center lg:text-left">
          <nav className="flex items-center justify-center lg:justify-start text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} className="mx-4 opacity-30" />
            <span className="text-garfield-500">#{label}</span>
          </nav>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-garfield-500 text-xs font-black uppercase tracking-[0.4em] mb-8">
              <Tag size={16} />
              Etiqueta
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
              #{label}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {articles.length} {articles.length === 1 ? 'artículo' : 'artículos'} etiquetados con{' '}
              <span className="text-white">{label}</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-16 border-b border-slate-100 pb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
                <Tag size={20} className="text-garfield-500" />
                Artículos sobre {label}
              </h2>
              <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">
                {articles.length} {articles.length === 1 ? 'Artículo' : 'Artículos'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-20">
              {articles.length > 0 ? (
                articles.map((article) => <ArticleCard key={article.id} article={article} />)
              ) : (
                <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <Zap size={40} className="mx-auto text-slate-300 mb-8" />
                  <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
                    Próximamente contenido sobre {label}
                  </h3>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-16">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-3xl"></div>
              <h4 className="text-3xl font-black mb-6 tracking-tight">Estrategia Semanal</h4>
              <p className="text-sm text-slate-400 mb-10 font-medium">Únete a los mejores profesionales del sector.</p>
              <NewsletterForm variant="light" />
            </div>

            {relatedTags.length > 0 && (
              <div className="bg-slate-50 rounded-[3rem] p-10">
                <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center flex items-center justify-center gap-3">
                  <Tag size={14} />
                  Otros temas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {relatedTags.map((t) => (
                    <Link
                      key={t}
                      href={`/tag/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, '-'))}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-transparent hover:border-garfield-500 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-garfield-600 transition-all"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
