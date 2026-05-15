import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { categoryPath, posts } from '../guides';

export const Footer: React.FC = () => {
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);

  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <footer className="bg-gray-900 pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="mb-6 text-2xl font-black italic tracking-tighter">
              AMZ<span className="text-orange-600">REVIEWS</span>
            </h2>
            <p className="mb-8 max-w-md text-gray-400">
              Your trusted source for honest, in-depth reviews and guides for everything you need for your home, office, and adventures. We test so you can buy with confidence.
            </p>

          </div>
          
          <div>
            <button 
              onClick={() => setIsLinksOpen(!isLinksOpen)}
              className="flex w-full items-center justify-between border-b border-gray-800 pb-4 mb-6 text-sm font-bold uppercase tracking-widest text-left lg:hidden"
            >
              Quick Links
              <ChevronDown className={`h-4 w-4 transition-transform ${isLinksOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <h3 className="hidden lg:block mb-6 text-sm font-bold uppercase tracking-widest">Quick Links</h3>
            
            {/* Desktop List */}
            <div className="hidden lg:block">
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="relative">
                  <button 
                    onMouseEnter={() => setIsGuidesOpen(true)}
                    onMouseLeave={() => setIsGuidesOpen(false)}
                    className="flex items-center gap-1 hover:text-white transition-colors group"
                  >
                    Guides <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isGuidesOpen ? 'rotate-180' : ''}`} />
                    
                    <AnimatePresence>
                      {isGuidesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute bottom-full left-0 mb-2 w-48 rounded-xl bg-gray-800 p-2 shadow-2xl ring-1 ring-white/10 z-50"
                        >
                          {categories.map((category) => (
                            <Link
                              key={category}
                              to={categoryPath(category)}
                              className="block rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                              {category}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Mobile Collapsible */}
            <AnimatePresence>
              {isLinksOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <ul className="space-y-4 pb-4 text-sm text-gray-400">
                    <li className="space-y-3 pt-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">Guides</p>
                      <div className="grid grid-cols-2 gap-2 pl-2">
                        {categories.map((category) => (
                          <Link
                            key={category}
                            to={categoryPath(category)}
                            className="text-xs hover:text-white transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </li>
                    <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                    <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <button 
              onClick={() => setIsLegalOpen(!isLegalOpen)}
              className="flex w-full items-center justify-between border-b border-gray-800 pb-4 mb-6 text-sm font-bold uppercase tracking-widest text-left lg:hidden"
            >
              Legal
              <ChevronDown className={`h-4 w-4 transition-transform ${isLegalOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <h3 className="hidden lg:block mb-6 text-sm font-bold uppercase tracking-widest">Legal</h3>
            
            {/* Desktop List */}
            <div className="hidden lg:block">
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate Disclosure</a></li>
              </ul>
            </div>

            {/* Mobile Collapsible */}
            <AnimatePresence>
              {isLegalOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <ul className="space-y-4 pb-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Affiliate Disclosure</a></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-20 border-t border-gray-800 pt-10 text-center">
          <p className="text-xs text-gray-500">
            © 2024 AMZReviews. As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
};
