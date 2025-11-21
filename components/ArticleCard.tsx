import React from 'react';
import { Article } from '../types';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
        <div className="flex-1">
          <span className="text-xs font-bold text-garfield-600 uppercase tracking-wider mb-1 block">
            {article.category}
          </span>
          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-garfield-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group flex flex-col bg-white h-full">
      <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-4">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="text-garfield-600 uppercase">{article.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{article.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-garfield-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.excerpt}
        </p>
        
        <div className="flex items-center gap-2 border-t border-gray-100 pt-4 mt-auto">
          <div className="h-6 w-6 rounded-full bg-slate-100 overflow-hidden">
             <img src={`https://ui-avatars.com/api/?name=${article.author}&background=random&color=fff`} alt={article.author} />
          </div>
          <span className="text-xs font-bold text-slate-700">{article.author}</span>
          <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
            <Clock size={12} /> {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;