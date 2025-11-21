import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Article, Category } from '../types';
import { ArrowRight, Sparkles, TrendingUp, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Extended Mock Data
const mainStory: Article = {
  id: 'hero-1',
  title: 'SEO Community Reacts To Adobe’s Semrush Acquisition',
  excerpt: 'Adobe’s purchase comes at a time of AI-driven uncertainty and may be a sign of the importance of data for helping businesses and marketers who are still trying to find a new way forward.',
  author: 'Roger Montti',
  date: '4 hours ago',
  category: Category.SEO,
  readTime: '11 min read',
  imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  isFeatured: true,
};

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
  {
    id: 'side-3',
    title: 'How To Manage Demand Fluctuation During Key Ecommerce Seasons',
    excerpt: '',
    author: 'PPC Expert',
    date: '5 hours ago',
    category: Category.PPC,
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'side-4',
    title: 'Google Updates Core Web Vitals: What Changed?',
    excerpt: '',
    author: 'Garfield',
    date: '1 day ago',
    category: Category.SEO,
    readTime: '4 min',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
  }
];

const suggestedArticles: Article[] = [
  {
    id: 'grid-1',
    title: 'Agentic AI: The New Frontier of Search',
    excerpt: 'Why autonomous agents are the biggest threat to traditional organic traffic.',
    author: 'Garfield',
    date: 'Oct 24',
    category: Category.AI,
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'grid-2',
    title: 'Content Strategy in a Zero-Click World',
    excerpt: 'Adapting your content funnel for platforms that refuse to send traffic out.',
    author: 'Sarah Jenkins',
    date: 'Oct 22',
    category: Category.CONTENT,
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'grid-3',
    title: 'Advanced Schema Markup for 2025',
    excerpt: 'Going beyond JSON-LD: How to structure data for LLM training bots.',
    author: 'Mike Chen',
    date: 'Oct 20',
    category: Category.SEO,
    readTime: '15 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60',
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Hidden H1 for SEO */}
      <h1>
        <span className="hidden-text sr-only">Soy Garfield | Consultor SEO en Madrid</span>
      </h1>

      {/* Top Stories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Story (Left Column) */}
          <div className="lg:col-span-8">
             <Link to={`/article/${mainStory.id}`} className="group block">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6">
                  <img 
                    src={mainStory.imageUrl} 
                    alt={mainStory.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-1/2"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold text-garfield-600 uppercase tracking-wider">
                    {mainStory.category}
                  </span>
                  {/* H2 for the visual title, allowing H1 to remain hidden for SEO */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight group-hover:text-garfield-600 transition-colors">
                    {mainStory.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium mt-2">
                    <div className="h-6 w-6 rounded-full bg-garfield-100 flex items-center justify-center overflow-hidden">
                       <img src={`https://ui-avatars.com/api/?name=${mainStory.author}&background=f97316&color=fff`} alt={mainStory.author} />
                    </div>
                    <span className="text-slate-900">{mainStory.author}</span>
                    <span>•</span>
                    <span>{mainStory.date}</span>
                    <span>•</span>
                    <span>{mainStory.readTime}</span>
                  </div>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed max-w-3xl">
                    {mainStory.excerpt}
                  </p>
                </div>
             </Link>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 pl-0 lg:pl-4 border-l-0 lg:border-l border-gray-100">
            <div className="sticky top-24">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  onClick={() => setActiveTab('latest')}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider text-center transition-colors ${activeTab === 'latest' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Latest
                </button>
                <button 
                  onClick={() => setActiveTab('popular')}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider text-center transition-colors ${activeTab === 'popular' ? 'text-garfield-600 border-b-2 border-garfield-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Popular
                </button>
              </div>

              {/* List */}
              <div className="flex flex-col gap-0">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <Link to="/blog" className="text-sm font-bold text-slate-900 hover:text-garfield-600 flex items-center justify-center gap-2">
                  See All News <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section (Light Orange) */}
      <section className="bg-garfield-50 py-16 border-y border-garfield-100">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <Mail className="h-12 w-12 text-garfield-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
            Join 75,000+ Digital Leaders
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Learn how to connect search, AI, and PPC into one unstoppable strategy. 
            Delivered to your inbox weekly.
          </p>
          
          <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              required
              placeholder="Email Address*"
              className="flex-1 rounded-lg border-gray-300 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-garfield-500 focus:ring-garfield-500 text-base"
            />
            <input
              type="text"
              placeholder="First Name*"
              className="flex-1 rounded-lg border-gray-300 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-garfield-500 focus:ring-garfield-500 text-base"
            />
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
             <span className="font-bold text-slate-900">Topic of Interests*:</span>
             {['SEO', 'Content', 'Social', 'PPC', 'Digital Marketing'].map(topic => (
               <label key={topic} className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="rounded border-gray-300 text-garfield-600 focus:ring-garfield-500" />
                 {topic}
               </label>
             ))}
          </div>

          <div className="mt-8">
            <button className="rounded-full bg-slate-900 px-10 py-4 text-base font-bold text-white shadow-xl hover:bg-slate-800 transition-transform hover:-translate-y-1">
              Subscribe Now <ArrowRight className="inline ml-1" size={18} />
            </button>
            <p className="mt-4 text-xs text-slate-500">
              By clicking the "Subscribe" button, I agree and accept the <a href="#" className="underline underline-offset-2 decoration-slate-300 hover:text-garfield-600">privacy policy</a> of SoyGarfield.
            </p>
          </div>
        </div>
      </section>

      {/* Suggested Articles Grid */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-slate-900">Suggested Articles</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 hover:border-garfield-500 hover:text-garfield-500 transition-colors">
               <TrendingUp size={20} />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:border-garfield-500 hover:text-garfield-500 transition-colors">
               <Sparkles size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default Home;