import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Category, Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../services/articleService';
import { TrendingUp, Mail, ChevronRight, Zap, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const CategoryPage: React.FC = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategoryName = (slug: string | undefined) => {
    if (!slug) return 'Últimas Noticias';
    const slugMap: Record<string, Category> = {
      'seo': Category.SEO,
      'ia': Category.IA,
    };
    return slugMap[slug.toLowerCase()] || 'Últimas Noticias';
  };

  const categoryName = getCategoryName(slug);

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

  const filteredArticles = articles.filter(art =>
    categoryName === 'Últimas Noticias' ? true : art.category === categoryName
  );

  const sidebarArticles = articles.filter(a => a.category !== categoryName).slice(0, 3);

  const baseUrl = 'https://soygarfield.com';
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryName,
        "item": `${baseUrl}/category/${slug?.toLowerCase() || ''}`
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-garfield-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      <SEO
        title={`Estrategia y Artículos de ${categoryName}`}
        description={`Explora nuestra biblioteca técnica sobre ${categoryName}. Guías avanzadas, experimentos y análisis para potenciar tu estrategia digital.`}
        schemaData={breadcrumbSchema}
      />

      {/* Modern Header */}
      <div className="bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 text-center lg:text-left">
          <nav className="flex items-center justify-center lg:justify-start text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} className="mx-4 opacity-30" />
            <span className="text-garfield-500">{categoryName}</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                {categoryName}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Estrategias avanzadas y análisis técnico sobre <span className="text-white">{categoryName}</span> para dominar el ecosistema digital.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-16 border-b border-slate-100 pb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
                <TrendingUp size={20} className="text-garfield-500" />
                Archivo de {categoryName}
              </h2>
              <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">{filteredArticles.length} Artículos</span>
            </div>

            <div className="grid grid-cols-1 gap-20">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="bg-white w-24 h-24 rounded-full mx-auto flex items-center justify-center text-slate-300 mb-8 shadow-2xl">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Próximamente más contenido</h3>
                  <Link to="/" className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all shadow-2xl">
                    Volver al Inicio
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-16">
            <div>
              <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                <div className="h-1 w-12 bg-garfield-500"></div>
                Otras categorías
              </h4>
              <div className="flex flex-col gap-3">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-3xl"></div>
              <Mail className="h-12 w-12 text-garfield-500 mb-8" />
              <h4 className="text-3xl font-black mb-6 tracking-tight">Estrategia Semanal</h4>
              <p className="text-sm text-slate-400 mb-10 font-medium">Únete a los mejores profesionales del sector.</p>
              <form className="space-y-4">
                <input type="email" placeholder="Tu email profesional" className="w-full bg-white/5 border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:bg-white/10 transition-all outline-none border mb-2" />
                <button className="w-full bg-garfield-500 text-white py-5 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest shadow-xl shadow-garfield-500/20 active:scale-95 transition-all">Suscribirse ahora</button>
              </form>
            </div>

            {/* Explore */}
            <div className="bg-slate-50 rounded-[3rem] p-10">
              <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center">Explorar temas</h4>
              <div className="flex flex-col gap-4">
                {Object.values(Category).map(cat => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase()}`}
                    className={`flex items-center justify-between group p-6 rounded-3xl border-2 transition-all ${categoryName === cat ? 'bg-white border-garfield-500 shadow-xl' : 'bg-white border-transparent hover:border-slate-200'
                      }`}
                  >
                    <span className="text-sm font-black uppercase tracking-widest">{cat}</span>
                    <ChevronRight size={18} className={`transition-transform group-hover:translate-x-1 ${categoryName === cat ? 'text-garfield-500' : 'text-slate-300'}`} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CategoryPage;