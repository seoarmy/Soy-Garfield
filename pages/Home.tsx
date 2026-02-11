import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../services/articleService';
import { Article } from '../types';
import { ArrowRight, TrendingUp, Mail, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import pietroPhoto from '../assets/pietro.png';
import SEO from '../components/SEO';
import BreakingNewsTicker from '../components/BreakingNewsTicker';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-garfield-500" size={48} />
      </div>
    );
  }

  // Fallback in case of no articles
  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Próximamente más contenido</h2>
          <p className="text-slate-500 mb-8">Estamos preparando las mejores estrategias de SEO & IA para ti.</p>
        </div>
      </div>
    );
  }

  const mainStory = articles[0];
  const sidebarArticles = articles.slice(1, 5);
  const suggestedArticles = articles.slice(0, 3);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 pb-20 lg:pb-0">
      <SEO
        title="Noticias de SEO & IA - Soy Garfield"
        description="El medio de referencia para dominar el futuro del marketing digital con noticias de última hora y estrategias avanzadas de IA."
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://soygarfield.com/#website",
              "url": "https://soygarfield.com",
              "name": "Soy Garfield",
              "description": "Consultoría estratégica de SEO e Inteligencia Artificial",
              "publisher": { "@id": "https://soygarfield.com/#organization" },
              "inLanguage": "es"
            },
            {
              "@type": "Organization",
              "@id": "https://soygarfield.com/#organization",
              "name": "Soy Garfield",
              "url": "https://soygarfield.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://soygarfield.com/assets/pietro.png"
              },
              "sameAs": [
                "https://linkedin.com/in/pietrofiorillo",
                "https://twitter.com/pietrofiorillo"
              ]
            }
          ]
        }}
      />

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Noticias de SEO & IA</h1>

      {/* Top Stories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Story (Left Column) */}
          <div className="lg:col-span-8">
            <Link to={`/article/${mainStory.slug}`} className="group block">
              <div className="relative aspect-[16/9] sm:aspect-video w-full overflow-hidden rounded-3xl mb-6 shadow-2xl">
                <img
                  src={mainStory.imageUrl || pietroPhoto}
                  alt={mainStory.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                  <span className="inline-block bg-garfield-500 text-white text-[0.6rem] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
                    {mainStory.category}
                  </span>
                  <h2 className="text-xl font-black text-white leading-tight">
                    {mainStory.title}
                  </h2>
                </div>
              </div>

              <div className="hidden lg:flex flex-col gap-4">
                <span className="text-xs font-black text-garfield-600 uppercase tracking-[0.3em]">
                  {mainStory.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] group-hover:text-garfield-600 transition-colors">
                  {mainStory.title}
                </h2>
              </div>
            </Link>

            {/* Author Section Separate from Article Link for better UX */}
            <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mt-6">
              <Link to={mainStory.authorSlug ? `/author/${mainStory.authorSlug}` : '/about'} className="flex items-center gap-2 group/author">
                <div className="h-8 w-8 rounded-xl bg-garfield-500 flex items-center justify-center overflow-hidden transition-transform group-hover/author:scale-110 ring-2 ring-white shadow-sm font-black text-[0.5rem]">
                  {mainStory.authorImage ? (
                    <img src={mainStory.authorImage} alt={mainStory.author} className="h-full w-full object-cover" />
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

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 lg:pl-8 lg:border-l border-slate-100">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-garfield-500" />
                  Actualidad
                </h3>
              </div>

              <div className="flex border-b border-slate-100 mb-6">
                <button
                  onClick={() => setActiveTab('latest')}
                  className={`flex-1 pb-4 text-[0.65rem] font-black uppercase tracking-widest text-center transition-all ${activeTab === 'latest' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Lo último
                </button>
                <button
                  onClick={() => setActiveTab('popular')}
                  className={`flex-1 pb-4 text-[0.65rem] font-black uppercase tracking-widest text-center transition-all ${activeTab === 'popular' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Popular
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>

              <div className="mt-8">
                <Link to="/category/seo" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-xs font-black uppercase tracking-widest text-slate-900 transition-all group">
                  Ver toda la actualidad
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
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

          <form
            onSubmit={(e) => { e.preventDefault(); alert('¡Suscrito!'); }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          >
            <input
              type="email"
              required
              placeholder="Tu mejor email"
              className="flex-1 rounded-2xl border-transparent bg-white/10 px-6 py-4 text-white placeholder-slate-500 focus:bg-white/20 focus:ring-2 focus:ring-garfield-500 transition-all outline-none"
            />
            <button
              type="submit"
              className="rounded-2xl bg-garfield-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-garfield-600 transition-all shadow-lg active:scale-95"
            >
              Suscribirse <ArrowRight size={18} className="inline ml-1" />
            </button>
          </form>
        </div>
      </section>

      {/* Suggested Articles Grid */}
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
};

export default Home;