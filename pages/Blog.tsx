import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Article, Category } from '../types';
import { Filter } from 'lucide-react';

// Mock Data (Expanded)
const blogArticles: Article[] = [
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
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.values(Category)];

  const filteredArticles = selectedCategory === 'All' 
    ? blogArticles 
    : blogArticles.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">News & Analysis</h1>
          <p className="mt-4 text-lg text-slate-500">Deep dives into the mechanics of modern marketing.</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 mr-4 text-slate-400">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-600 hover:bg-garfield-50 hover:text-garfield-600 ring-1 ring-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;