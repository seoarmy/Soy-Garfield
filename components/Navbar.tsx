import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Zap } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Latest News', path: '/' },
  { label: 'SEO', path: '/category/seo' },
  { label: 'AI & Agents', path: '/category/ai' },
  { label: 'Content Strategy', path: '/category/content' },
  { label: 'About', path: '/about' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-garfield-500 text-white transition-transform group-hover:scale-105">
                <Zap size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                  Soy<span className="text-garfield-600">Garfield</span>
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">
                  Journal of Digital Marketing
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-bold transition-colors uppercase tracking-wide ${
                    location.pathname === item.path 
                      ? 'text-garfield-600' 
                      : 'text-slate-600 hover:text-garfield-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-garfield-600 transition-colors">
              <Search size={20} />
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <Link 
              to="/write"
              className="text-sm font-bold text-slate-900 hover:text-garfield-600 transition-colors"
            >
              Write For Us
            </Link>
            <Link 
              to="/contact"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-garfield-600 transition-colors shadow-lg shadow-slate-900/10"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-garfield-50 hover:text-garfield-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
                to="/write"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-garfield-50 hover:text-garfield-600"
              >
                Write For Us
            </Link>
            <div className="mt-4 px-3 border-t border-gray-100 pt-4">
               <Link 
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-lg bg-garfield-500 px-4 py-3 text-sm font-bold text-white hover:bg-garfield-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;