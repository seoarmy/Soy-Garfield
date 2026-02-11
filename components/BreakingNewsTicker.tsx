import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ExternalLink, ChevronRight } from 'lucide-react';
import { BreakingNews, getBreakingNews } from '../services/breakingNewsService';

const BreakingNewsTicker: React.FC = () => {
    const [news, setNews] = useState<BreakingNews[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getBreakingNews();
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    useEffect(() => {
        if (news.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 8000); // Cambia cada 8 segundos

        return () => clearInterval(interval);
    }, [news.length]);

    if (loading || news.length === 0) return null;

    const currentNews = news[currentIndex];
    const newsLink = currentNews.relatedArticle
        ? `/article/${currentNews.relatedArticle.slug}`
        : currentNews.externalLink || '#';

    const isExternal = !!currentNews.externalLink;

    return (
        <div className="bg-slate-900 border-b border-slate-800 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 py-3">
                    {/* Badge */}
                    <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white">
                        <Zap size={14} fill="currentColor" className="animate-pulse" />
                        <span className="text-[0.65rem] font-black uppercase tracking-widest">Última Hora</span>
                    </div>

                    {/* News Content */}
                    <div className="flex-1 min-w-0">
                        {isExternal ? (
                            <a
                                href={newsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                                <span className="text-sm font-bold text-white truncate">
                                    {currentNews.title}
                                </span>
                                <ExternalLink size={14} className="text-slate-400 flex-shrink-0" />
                            </a>
                        ) : (
                            <Link
                                to={newsLink}
                                className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                                <span className="text-sm font-bold text-white truncate">
                                    {currentNews.title}
                                </span>
                                <ChevronRight size={14} className="text-slate-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>

                    {/* Category Badge */}
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-[0.6rem] font-black uppercase tracking-widest text-garfield-400">
                            {currentNews.category}
                        </span>
                        {news.length > 1 && (
                            <div className="flex gap-1">
                                {news.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-garfield-500 w-4' : 'bg-slate-600'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNewsTicker;
