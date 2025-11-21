import React from 'react';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-garfield-500 text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Soy<span className="text-garfield-600">Garfield</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Bringing success to SEO pros, AI engineers, and marketers daily. 
              Designed with an AI mood for the modern web.
            </p>
          </div>
          
          {/* Column 2: Publication */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Publication</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Latest News</Link></li>
              <li><Link to="/category/seo" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">SEO Guides</Link></li>
              <li><Link to="/category/ai" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">AI Engineering</Link></li>
              <li><Link to="/category/content" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Content Strategy</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal (New) */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/sitemap" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Sitemap</Link></li>
              <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Github size={20} /></a>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-xs text-slate-500 mb-2 font-medium">Subscribe to updates</p>
               <Link to="/write" className="text-xs font-bold text-garfield-600 hover:text-garfield-700 uppercase tracking-wide">
                 Join Newsletter &rarr;
               </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} SoyGarfield. All rights reserved.
          </p>
          <div className="flex gap-6">
             <Link to="/privacy" className="text-xs text-slate-400 hover:text-garfield-600">Privacy</Link>
             <Link to="/terms" className="text-xs text-slate-400 hover:text-garfield-600">Terms</Link>
             <Link to="/sitemap" className="text-xs text-slate-400 hover:text-garfield-600">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;