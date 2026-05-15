import React, { useState, useEffect, useMemo } from 'react';
import { Tag, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { posts } from '../guides';
import { withAmazonAffiliateId } from '../lib/amazonAffiliate';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    return uniqueCategories;
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [categories]);

  if (categories.length === 0) return null;

  const category = categories[currentIndex];
  // Amazon Search URL with category keyword
  const amazonSearchUrl = withAmazonAffiliateId(`https://www.amazon.com/s?k=${encodeURIComponent(category)}`);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
          className="fixed bottom-0 left-0 z-[60] w-full border-t border-orange-500/30 bg-gray-900/95 text-white backdrop-blur-xl md:py-1.5"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-0.5 top-0.5 p-1 text-gray-500 hover:text-white opacity-40 hover:opacity-100 transition-all z-10"
            aria-label="Close banner"
          >
            <X className="h-3 w-3" />
          </button>

          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 md:py-0 lg:px-8 relative">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 text-center md:text-left"
                >
                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-orange-600/20 md:flex">
                    <Tag className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="flex justify-center md:justify-start items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-orange-500">
                      <span className="h-1 w-1 rounded-full bg-orange-600 animate-pulse" />
                      Amazon Search Results
                    </p>
                    <h3 className="mt-0.5 text-base font-black sm:mt-0 tracking-tight md:text-lg">
                      Top Matches for <span className="text-orange-500 uppercase">{category}</span>
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex w-full items-center gap-3 sm:w-auto pb-1 md:pb-0">
                <a
                  href={amazonSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-xl ring-4 ring-orange-500/20 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 sm:flex-none md:py-2.5 md:px-8 group"
                >
                  Shop on Amazon <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
