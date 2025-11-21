import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, Category } from '../types';
import ArticleCard from '../components/ArticleCard';
import { ArrowRight, TrendingUp, Search, Mail } from 'lucide-react';

// --- MOCK DATA ---
// In a real app, this would come from a centralized store or API
const allArticles: Article[] = [
  {
    id: '101',
    title: 'Understanding the "Helpful Content" Update',
    excerpt: 'Google\'s latest algorithm update prioritizes user satisfaction. Here is what content creators need to change immediately.',
    author: 'Garfield',
    date: 'Oct 24, 2023',
    category: Category.SEO,
    readTime: '10 min read',
    imageUrl: 'https://picsum.photos/seed/google-algo/800/600',
  },
  {
    id: '102',
    title: 'Python for Marketers: Automating Reporting',
    excerpt: 'Stop manually copying data into spreadsheets. Learn how to use Pandas and the Search Console API.',
    author: 'Garfield',
    date: 'Oct 21, 2023',
    category: Category.ANALYTICS,
    readTime: '15 min read',
    imageUrl: 'https://picsum.photos/seed/python-code/800/600',
  },
  {
    id: '103',
    title: 'The Psychology of Click-Through Rates',
    excerpt: 'Using behavioral psychology principles to improve your ad copy and organic titles.',
    author: 'Emma Watts',
    date: 'Oct 19, 2023',
    category: Category.PPC,
    readTime: '7 min read',
    imageUrl: 'https://picsum.photos/seed/brain-psych/800/600',
  },
  {
    id: '104',
    title: 'Generative AI for Image Creation: A Guide',
    excerpt: 'Comparing Midjourney, DALL-E 3, and Adobe Firefly for marketing assets.',
    author: 'Garfield',
    date: 'Oct 15, 2023',
    category: Category.AI,
    readTime: '9 min read',
    imageUrl: 'https://picsum.photos/seed/gen-art/800/600',
  },
  {
    id: '105',
    title: 'Content Syndication Strategies for 2024',
    excerpt: 'How to republish your content on Medium, LinkedIn, and other platforms without hurting SEO.',
    author: 'David Kim',
    date: 'Oct 12, 2023',
    category: Category.CONTENT,
    readTime: '6 min read',
    imageUrl: 'https://picsum.photos/seed/network/800/600',
  },
   {
    id: 'hero-1',
    title: 'SEO Community Reacts To Adobe’s Semrush Acquisition',
    excerpt: 'Adobe’s purchase comes at a time of AI-driven uncertainty and may be a sign of the importance of data.',
    author: 'Roger Montti',
    date: 'Oct 25, 2024',
    category: Category.SEO,
    readTime: '11 min read',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  },
];

const sidebarArticles: Article[] = [
  {
    id: 'side-1',
    title: 'The Role Of Brand Authority And E-E-A-T In The AI Search Era',
    excerpt: '',
    author: 'SEJ Staff',
    date: '33 mins ago',
    category: Category.SEO,
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'side-2',
    title: 'Repositioning What SEO Success Looks Like',
    excerpt: '',
    author: 'Enterprise Column',
    date: '2 hours ago',
    category: Category.ANALYTICS,
    readTime: '9 min',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
  },
];

const CategoryPage: React.FC = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  // Simple mapping from slug to Category Enum or Display Name
  const getCategoryName = (slug: string | undefined) => {
    switch(slug?.toLowerCase()) {
      case 'seo': return Category.SEO;
      case 'ai': return Category.AI;
      case 'ppc': return Category.PPC;
      case 'content': return Category.CONTENT;
      case 'analytics': return Category.ANALYTICS;
      default: return 'Latest News';
    }
  };

  const categoryName = getCategoryName(slug);
  
  // Filter Logic
  const filteredArticles = allArticles.filter(art => 
    art.category === categoryName || categoryName === 'Latest News'
  );

  return (
    <div className="min-h-screen bg-white pb-16">
      
      {/* Category Header */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="flex text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-garfield-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium capitalize">{slug || 'News'}</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            The latest news, guides, and analysis in {categoryName}. Curated for modern digital marketers and engineers.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: MAIN CONTENT (8 cols) --- */}
          <div className="lg:col-span-8">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-garfield-500" />
                Latest Articles
              </h2>
              <span className="text-sm text-slate-500">Showing {filteredArticles.length} results</span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                 <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500">No articles found for this category yet.</p>
                    <Link to="/" className="text-garfield-600 hover:underline mt-2 inline-block text-sm font-bold">Back to Home</Link>
                 </div>
              )}
            </div>

            {/* Mock Pagination */}
            {filteredArticles.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-slate-400 hover:bg-slate-50 cursor-not-allowed" disabled>Previous</button>
                <button className="px-4 py-2 rounded-lg bg-garfield-500 text-white font-bold">1</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-garfield-600">2</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-garfield-600">3</button>
                <span className="px-2 py-2 text-slate-400">...</span>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 hover:text-garfield-600">Next</button>
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR (4 cols) --- */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Sidebar Ad / Subscribe */}
             <div className="bg-gradient-to-br from-garfield-50 to-orange-100 p-6 rounded-2xl border border-garfield-100 text-center">
               <div className="mx-auto bg-white w-12 h-12 rounded-full flex items-center justify-center text-garfield-500 mb-4 shadow-sm">
                 <Mail size={20} />
               </div>
               <h4 className="font-bold text-slate-900 text-lg mb-2">Newsletter</h4>
               <p className="text-sm text-slate-600 mb-4">Get the best SEO advice directly in your inbox.</p>
               <input type="email" placeholder="Your email" className="w-full rounded-lg border-gray-200 py-2 px-3 text-sm mb-3 focus:ring-garfield-500 focus:border-garfield-500" />
               <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                 Subscribe
               </button>
            </div>

            {/* Latest/Popular Tabs */}
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm bg-white">
              <div className="flex border-b border-gray-100 mb-6">
                <button 
                  onClick={() => setActiveTab('latest')}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${activeTab === 'latest' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Latest
                </button>
                <button 
                  onClick={() => setActiveTab('popular')}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${activeTab === 'popular' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Popular
                </button>
              </div>

              <div className="flex flex-col gap-0">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>

            {/* Search Widget */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
               <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-xs">Search Topics</h4>
               <div className="relative">
                 <input type="text" placeholder="Search..." className="w-full rounded-lg border-gray-200 py-2 px-3 text-sm focus:ring-garfield-500 focus:border-garfield-500 pl-9" />
                 <div className="absolute left-3 top-2.5 text-slate-400"><Search size={14} /></div>
               </div>
            </div>

             {/* Categories Widget */}
            <div>
               <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-xs">Browse Categories</h4>
               <div className="flex flex-col gap-1">
                 {Object.values(Category).map(cat => (
                   <Link 
                      key={cat}
                      to={`/category/${cat.split(' ')[0].toLowerCase()}`} 
                      className="flex items-center justify-between group px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                   >
                     <span className="text-sm text-slate-600 group-hover:text-garfield-600 font-medium">{cat}</span>
                     <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full group-hover:bg-garfield-100 group-hover:text-garfield-600">12</span>
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