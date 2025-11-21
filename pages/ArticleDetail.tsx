
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, Category } from '../types';
import ArticleCard from '../components/ArticleCard';
import { Clock, Calendar, Share2, Linkedin, Twitter, Facebook, Bookmark, ArrowRight, List, Quote, Download, CheckCircle2 } from 'lucide-react';

// --- MOCK DATA FOR DEMO PURPOSES ---
// In a real app, this would fetch from an API based on ID
const articleData: Article = {
  id: 'hero-1',
  title: 'SEO Community Reacts To Adobe’s Semrush Acquisition',
  excerpt: 'Adobe’s purchase comes at a time of AI-driven uncertainty and may be a sign of the importance of data for helping businesses and marketers who are still trying to find a new way forward.',
  author: 'Roger Montti',
  date: 'October 25, 2024',
  category: Category.SEO,
  readTime: '11 min read',
  imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
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
];

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  // In a real app: const { data } = useFetchArticle(id);
  
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  return (
    <div className="min-h-screen bg-white pb-16">
      
      {/* Reading Progress Bar (Optional visual flair) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
        <div className="h-full bg-garfield-500 w-1/3"></div> {/* Mock progress */}
      </div>

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-slate-500">
            <Link to="/" className="hover:text-garfield-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-garfield-600">{articleData.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 truncate max-w-xs sm:max-w-none">{articleData.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: MAIN CONTENT (8 cols) --- */}
          <div className="lg:col-span-8">
            
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-md bg-garfield-50 px-2.5 py-1 text-sm font-bold text-garfield-700 ring-1 ring-inset ring-garfield-600/20">
                  {articleData.category}
                </span>
                <span className="text-sm text-slate-500 font-medium">{articleData.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                {articleData.title}
              </h1>
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${articleData.author}&background=f97316&color=fff`} alt={articleData.author} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{articleData.author}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar size={12} />
                      <span>{articleData.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-[#1DA1F2] hover:bg-slate-50 rounded-full transition-colors"><Twitter size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-50 rounded-full transition-colors"><Linkedin size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-[#1877F2] hover:bg-slate-50 rounded-full transition-colors"><Facebook size={20} /></button>
                  <div className="h-4 w-px bg-gray-200 mx-1"></div>
                  <button className="p-2 text-slate-400 hover:text-garfield-600 hover:bg-garfield-50 rounded-full transition-colors"><Bookmark size={20} /></button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-10 shadow-lg">
              <img 
                src={articleData.imageUrl} 
                alt={articleData.title} 
                className="h-full w-full object-cover"
              />
            </div>

            {/* Table of Contents (Indice) */}
            <div className="mb-10 bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold uppercase tracking-wider text-sm">
                <List size={18} className="text-garfield-600" />
                In This Article
              </div>
              <ul className="space-y-2">
                {['The Shift to AI Search', 'Adobe & Semrush: The Details', 'Impact on Enterprise SEO', 'Data Comparison: Old vs New', 'The Future of Keyword Research'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-garfield-500 mt-1">•</span>
                    <a href="#" className="text-slate-600 hover:text-garfield-600 hover:underline underline-offset-2 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Body */}
            <article className="prose prose-lg prose-slate max-w-none text-slate-700">
              <p className="lead text-xl text-slate-600 mb-6">
                The SEO landscape is shifting beneath our feet. With Adobe's recent acquisition of a major SEO toolset, the consolidation of data analytics and creative suites signals a new era: <strong>The Age of Data-Driven Creativity.</strong>
              </p>

              {/* CITATION COMPONENT */}
              <div className="my-10 p-8 bg-garfield-50 rounded-r-2xl border-l-4 border-garfield-500 relative shadow-sm">
                <Quote className="absolute top-6 right-6 text-garfield-200 h-10 w-10 rotate-180" />
                <p className="italic text-xl text-slate-800 mb-4 relative z-10 font-serif leading-relaxed">
                  "The future of search isn't about keywords. It's about context, intent, and the seamless integration of real-time proprietary data into the creative process."
                </p>
                <cite className="block text-sm font-bold text-garfield-700 not-italic uppercase tracking-wide">
                  — Sarah Jenkins, VP of Search Strategy
                </cite>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Shift to AI Search</h2>
              <p className="mb-4">
                Traditional search engines are evolving into answer engines. This means the classic "10 blue links" are being pushed down by AI-generated snapshots. For marketers, this acquisition suggests that proprietary data—the kind Semrush holds in abundance—is the new oil.
              </p>

              {/* BUTTON COMPONENT */}
              <div className="my-10 flex justify-center">
                <button className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-garfield-600 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-garfield-500 focus:ring-offset-2">
                  <Download className="h-5 w-5" />
                  Download The 2025 SEO Report
                  <span className="absolute right-0 top-0 -mt-2 -mr-2 h-4 w-4 animate-ping rounded-full bg-garfield-400 opacity-75"></span>
                </button>
              </div>

              <p className="mb-6">
                Adobe's move isn't just about buying a tool; it's about integrating search intelligence directly into the content creation workflow. Imagine designing an image in Photoshop and getting real-time SEO feedback on alt text and file naming based on current search trends.
              </p>

              {/* Conversion Component (Inline) */}
              <div className="my-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-garfield-500 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                
                <h3 className="relative text-2xl sm:text-3xl font-bold text-white mb-2">
                  Do you want more traffic?
                </h3>
                <div className="h-1 w-16 bg-garfield-500 mx-auto mb-4 rounded-full"></div>
                
                <p className="relative text-slate-300 mb-8 max-w-lg mx-auto">
                  Hey, I'm Garfield. I'm determined to make your business grow using the latest AI strategies. My only question is, will it be yours?
                </p>
                
                <div className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="text" 
                    placeholder="Your website URL" 
                    className="flex-1 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-garfield-500 outline-none"
                  />
                  <button className="bg-garfield-500 hover:bg-garfield-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-garfield-500/30 uppercase tracking-wide text-sm">
                    Analyze Now
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">Key Takeaways for 2025</h2>
              
              {/* BULLET LIST COMPONENT */}
              <div className="mb-10 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <ul className="space-y-4 list-none p-0 m-0">
                  {[
                    'Focus on Entity Optimization over keyword density to satisfy LLM training data requirements.',
                    'Prepare for Zero-Click searches via AI snapshots by structuring data effectively.',
                    'Build brand authority to survive E-E-A-T updates, as verified authors become ranking factors.',
                    'Integrate proprietary data sources to create content that AI cannot hallucinate.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-700">
                       <CheckCircle2 className="h-6 w-6 text-garfield-500 flex-shrink-0 mt-0.5" />
                       <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Data Comparison: Old vs New</h2>
              <p className="mb-6">
                Let's look at how tool consolidation affects the typical SEO workflow. The following table illustrates the time savings potential of an integrated Adobe-Semrush stack.
              </p>

              {/* Styled Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-200">Feature</th>
                      <th className="px-6 py-4 border-b border-gray-200">Traditional Workflow</th>
                      <th className="px-6 py-4 border-b border-gray-200 text-garfield-600">Integrated Workflow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">Keyword Research</td>
                      <td className="px-6 py-4 text-slate-600">External Tool Export -> CSV</td>
                      <td className="px-6 py-4 text-slate-600">In-App Sidebar Suggestions</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">Content Optimization</td>
                      <td className="px-6 py-4 text-slate-600">Copy/Paste to Editor</td>
                      <td className="px-6 py-4 text-slate-600">Real-time Grading</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">Analytics Reporting</td>
                      <td className="px-6 py-4 text-slate-600">Weekly PDF Generation</td>
                      <td className="px-6 py-4 text-slate-600">Live Dashboard Embeds</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Future of Keyword Research</h2>
              <p className="mb-4">
                Keywords are not dying, but they are changing. We are moving from "strings" to "things"—entities. 
                Understanding the semantic relationship between your brand and the topics you cover is now more critical than volume metrics.
              </p>
            </article>

            {/* Author Box Footer */}
            <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="h-20 w-20 rounded-full bg-white p-1 ring-2 ring-slate-200 flex-shrink-0">
                <img 
                  src={`https://ui-avatars.com/api/?name=${articleData.author}&background=f97316&color=fff`} 
                  alt="Author" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">About {articleData.author}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Roger Montti is a search marketer with over 20 years of experience. He specializes in advanced on-page optimization and link building strategies. He is a frequent speaker at major SEO conferences.
                </p>
                <a href="#" className="inline-flex items-center text-sm font-bold text-garfield-600 hover:text-garfield-700">
                  View all articles <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: SIDEBAR (4 cols) --- */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
               <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-xs">Search Publication</h4>
               <div className="relative">
                 <input type="text" placeholder="Search topic..." className="w-full rounded-lg border-gray-200 py-2 px-3 text-sm focus:ring-garfield-500 focus:border-garfield-500" />
                 <div className="absolute right-3 top-2.5 text-slate-400"><ArrowRight size={14} /></div>
               </div>
            </div>

            {/* Latest/Popular Tabs */}
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm bg-white sticky top-24">
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
              
              {/* Sidebar Ad / Promo */}
              <div className="mt-8 bg-slate-900 rounded-lg p-6 text-center text-white">
                 <div className="mb-3 font-bold text-lg">Master AI SEO</div>
                 <p className="text-xs text-slate-400 mb-4">Get the checklist used by top agencies.</p>
                 <button className="w-full bg-garfield-500 hover:bg-garfield-600 text-white text-xs font-bold py-3 px-4 rounded transition-colors uppercase tracking-wider">
                   Download PDF
                 </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div>
               <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-xs">Categories</h4>
               <div className="flex flex-wrap gap-2">
                 {Object.values(Category).map(cat => (
                   <Link to={`/blog?cat=${cat}`} key={cat} className="bg-white border border-slate-200 hover:border-garfield-500 hover:text-garfield-600 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                     {cat}
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

export default ArticleDetail;
