import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { bountyPromotions } from '../constants/bounties';
import { Sparkles, Zap, Headphones, BookOpen, PlayCircle, ExternalLink, Tag } from 'lucide-react';
import { Pagination } from '../components/Pagination';

export const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredPosts = posts.filter((p) => p.category === categoryName);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="bg-gray-900 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-xs font-black uppercase tracking-widest text-orange-600">Category Archive</span>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">{categoryName}</h1>
            <p className="mt-6 max-w-2xl text-xl text-gray-400">
              Discover the latest articles, guides, and top-rated products in {categoryName}.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {filteredPosts.length > 0 ? (
              <>
                <div className="flex flex-col gap-6 lg:gap-8">
                  {paginatedPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} layout="list" />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-400">No articles found in this category yet.</h2>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Categories Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Categories
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/category/${cat.name}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Special Offers Widget */}
            <div id="special-offers-widget-category" className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 shadow-sm">
              <h3 className="mb-6 text-base font-black uppercase tracking-wider text-orange-600 flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Special Offers
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {bountyPromotions.map((promo) => {
                  const PromoIcon = { Zap, Headphones, BookOpen, PlayCircle }[promo.icon] || Sparkles;
                  return (
                    <motion.div
                      key={promo.id}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-[2rem] border-2 border-dashed border-orange-200 bg-orange-50/30 p-6 transition-all hover:border-orange-500 hover:bg-white hover:shadow-xl"
                    >
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-200 transition-transform group-hover:scale-110 group-hover:rotate-3">
                            <PromoIcon className="h-6 w-6" />
                          </div>
                          <div className="text-right">
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">{promo.title}</h2>
                            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-tighter">{promo.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="mb-3 text-base font-bold text-gray-900 leading-tight tracking-tight uppercase group-hover:text-orange-600 transition-colors">
                          {promo.benefit}
                        </p>
                        
                        <ul className="mb-6 space-y-2">
                          {promo.points.slice(0, 3).map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500 font-medium leading-snug">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <a 
                          href={promo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full rounded-xl bg-gray-900 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 group-hover:shadow-lg"
                        >
                          {promo.cta} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-orange-100/30 blur-2xl" />
                      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-orange-200/20 blur-2xl" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
