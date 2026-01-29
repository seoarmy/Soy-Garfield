import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Category } from '../types';
import { ARTICLES } from '../data/articles';
import { Filter } from 'lucide-react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Object.values(Category)];

  const filteredArticles = selectedCategory === 'Todos'
    ? ARTICLES
    : ARTICLES.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-24 pb-32">
      <SEO
        title="Blog e Inteligencia"
        description="Archivo profundo de artículos sobre estrategias de SEO moderno y avances en Inteligencia Artificial."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-[0.65rem] font-black text-garfield-600 uppercase tracking-[0.4em] mb-4 block">Conocimiento sin límites</span>
          <h1 className="text-4xl font-black text-slate-900 sm:text-7xl tracking-tighter mb-6">Archivo de Inteligencia</h1>
          <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">Explora guías profundas, análisis de industria y experimentos reales en SEO e IA.</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-3 mr-6 text-slate-400">
            <Filter size={18} />
            <span className="text-[0.6rem] font-black uppercase tracking-[0.3em]">Filtrar</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-2xl px-8 py-4 text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-sm ${selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/40 rotate-1 scale-110'
                : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div key={article.id} className="transition-all duration-500 hover:-translate-y-2">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5">
            <p className="text-slate-500 font-black uppercase tracking-widest text-sm text-center">No hay artículos en esta categoría todavía</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;