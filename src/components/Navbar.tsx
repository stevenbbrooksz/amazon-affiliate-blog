import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, ShoppingBag, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { categoryPath, posts } from '../guides';
import { withAmazonAffiliateId } from '../lib/amazonAffiliate';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);

  const categories = Array.from(new Set(posts.map(p => p.category)));
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white transition-transform group-hover:rotate-12">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              AMZ<span className="text-orange-600">REVIEWS</span>
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-bold transition-colors hover:text-orange-600 ${
                  location.pathname === '/' ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                Home
              </Link>

              {/* Guides Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsGuidesOpen(true)}
                onMouseLeave={() => setIsGuidesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-orange-600 ${
                    location.pathname.startsWith('/category') ? 'text-orange-600' : 'text-gray-600'
                  }`}
                >
                  Guides <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isGuidesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isGuidesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5"
                    >
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={categoryPath(category)}
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/about"
                className={`text-sm font-bold transition-colors hover:text-orange-600 ${
                  location.pathname === '/about' ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-bold transition-colors hover:text-orange-600 ${
                  location.pathname === '/contact' ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a 
              href={withAmazonAffiliateId('https://www.amazon.com/Best-Sellers/zgbs')}
              target="_blank" 
              className="hidden lg:block rounded-full bg-gray-900 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-gray-800"
            >
              Best Sellers
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-bold text-gray-900"
              >
                Home
              </Link>
              
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-orange-600">Guides</p>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={categoryPath(category)}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 font-medium pl-4"
                  >
                    {category}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-bold text-gray-900"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-bold text-gray-900"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
