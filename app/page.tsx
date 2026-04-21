import { getArticles } from '../services/articleService';
import { getBreakingNews } from '../services/breakingNewsService';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import ArticleCard from '../components/ArticleCard';
import NewsletterForm from '../components/NewsletterForm';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 60;

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Noticias de SEO & IA | Soy Garfield | Pietro Fiorillo',
  description: 'El medio de referencia para dominar el futuro del marketing digital con noticias de última hora y estrategias avanzadas de IA.',
  alternates: { canonical: BASE_URL },
  openGraph: { url: BASE_URL, images: [{ url: `${BASE_URL}/SOY-garfiel-logo.png`, width: 600, height: 60 }] },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Soy Garfield',
      description: 'Consultoría estratégica de SEO e Inteligencia Artificial',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'es',
    },
    {
      '@type': ['Organization', 'NewsMediaOrganization'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Soy Garfield',
      url: BASE_URL,
      publishingPrinciples: `${BASE_URL}/sobre/politica-editorial`,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/SOY-garfiel-logo.png`, width: 600, height: 60 },
      description: 'Publicación especializada en SEO e Inteligencia Artificial en español.',
      foundingDate: '2024',
      inLanguage: 'es',
      sameAs: [
        'https://www.linkedin.com/in/pietrofiorillo/',
        'https://twitter.com/pietrofiorillo',
        'https://www.instagram.com/theseoarmy/',
        'https://www.youtube.com/@thegarfieldofseo',
      ],
    },
  ],
};

export default async function HomePage() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Próximamente más contenido</h2>
          <p className="text-slate-500">Estamos preparando las mejores estrategias de SEO & IA para ti.</p>
        </div>
      </main>
    );
  }

  const mainStory = articles[0];
  const sidebarArticles = articles.slice(1, 5);
  const suggestedArticles = articles.slice(0, 3);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="text-center pt-6 text-sm sm:text-base font-black tracking-[0.2em] uppercase text-slate-700">Noticias de SEO & IA</h1>

      <BreakingNewsTicker />

      {/* Top Stories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Story */}
          <div className="lg:col-span-8">
            <Link href={`/article/${mainStory.slug}`} className="group block">
              <div className="relative aspect-[16/9] sm:aspect-video w-full overflow-hidden rounded-3xl mb-6 shadow-2xl">
                <Image
                  src={mainStory.imageUrl}
                  alt={mainStory.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                  <span className="inline-block bg-garfield-500 text-white text-[0.6rem] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
                    {mainStory.category}
                  </span>
                  <h2 className="text-xl font-black text-white leading-tight">{mainStory.title}</h2>
                </div>
              </div>

              <div className="hidden lg:flex flex-col gap-4">
                <span className="text-xs font-black text-garfield-600 uppercase tracking-[0.3em]">{mainStory.category}</span>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] group-hover:text-garfield-600 transition-colors">
                  {mainStory.title}
                </h2>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mt-6">
              <Link href={mainStory.authorSlug ? `/author/${mainStory.authorSlug}` : '/about'} className="flex items-center gap-2 group/author">
                <div className="h-8 w-8 rounded-xl bg-garfield-500 flex items-center justify-center overflow-hidden transition-transform group-hover/author:scale-110 ring-2 ring-white shadow-sm font-black text-[0.5rem] relative">
                  {mainStory.authorImage ? (
                    <Image src={mainStory.authorImage} alt={mainStory.author} fill sizes="32px" className="object-cover" />
                  ) : (
                    <span className="text-white">{mainStory.author?.charAt(0)}</span>
                  )}
                </div>
                <span className="text-slate-900 group-hover/author:text-garfield-600 transition-colors">{mainStory.author || 'Pietro Fiorillo'}</span>
              </Link>
              <span>•</span>
              <span>{mainStory.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {mainStory.readTime}</span>
            </div>

            <p className="hidden lg:block mt-6 text-lg text-slate-500 leading-relaxed max-w-3xl font-medium">
              {mainStory.excerpt}
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:pl-8 lg:border-l border-slate-100">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-garfield-500" />
                  Actualidad
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>

              <div className="mt-8">
                <Link href="/category/seo" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-xs font-black uppercase tracking-widest text-slate-900 transition-all group">
                  Ver toda la actualidad
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-900 py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-garfield-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            Domina el futuro con <span className="text-garfield-500">IA y SEO</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
            Recibe semanalmente estrategias avanzadas directamente en tu bandeja de entrada.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Suggested Articles */}
      <section className="py-16 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-[0.65rem] font-black text-garfield-600 uppercase tracking-[0.4em] mb-2 block">Selección especial</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Lecturas recomendadas</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedArticles.map((article) => (
            <div key={article.id} className="transition-all hover:-translate-y-2 duration-300">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
