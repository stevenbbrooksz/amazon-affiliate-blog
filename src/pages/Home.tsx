import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { bountyPromotions } from '../constants/bounties';
import { ExternalLink, ChevronRight, Sparkles, Search, Tag, Clock, Zap, Headphones, BookOpen, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categoryPath, guidePath, posts } from '../guides';
import { PostCard } from '../components/PostCard';
import { Pagination } from '../components/Pagination';
import { withAmazonAffiliateId } from '../lib/amazonAffiliate';
import { SITE_SETTINGS } from '../generated/site-settings.generated';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // 按搜索词过滤文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 近期文章（最近的3篇）
  const recentPosts = posts.slice(0, 3);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-[var(--site-surface,#fafafa)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-20">
        <div className="absolute inset-0 opacity-30">
           <img 
            src={SITE_SETTINGS.heroImageUrl} 
            alt="Hero Background" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-500 backdrop-blur-sm border border-orange-500/30">
              <Sparkles className="h-4 w-4" />
              {SITE_SETTINGS.heroEyebrow}
            </div>
            <h1 className="mb-4 text-4xl font-black text-white sm:text-6xl">
              {SITE_SETTINGS.heroTitleAccent ? SITE_SETTINGS.heroTitle.replace(SITE_SETTINGS.heroTitleAccent, '') : SITE_SETTINGS.heroTitle}
              {SITE_SETTINGS.heroTitleAccent ? <span className="text-orange-600">{SITE_SETTINGS.heroTitleAccent}</span> : null}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {SITE_SETTINGS.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          
          {/* Left Column: Article Stream */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
                {searchQuery ? `Search Results: "${searchQuery}"` : "All Articles"}
              </h2>
              <span className="text-sm font-medium text-gray-400 tracking-widest">{filteredPosts.length} ARTICLES</span>
            </div>
            
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid gap-12">
                  {paginatedPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 py-24 text-center">
                <p className="text-gray-400 font-medium">No posts found matching your search. Try different keywords.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-sm font-bold text-orange-600 hover:underline"
                >
                  Show all articles
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="w-full lg:w-80 order-1 lg:order-2">
            <div className="sticky top-28 space-y-12">
              {/* Search Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                <Search className="h-4 w-4" /> Site Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all border border-transparent focus:border-transparent"
                />
              </div>
            </div>

            {/* Special Offers Widget */}
            <div id="special-offers-widget" className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 shadow-sm">
              <h3 className="mb-6 text-base font-black uppercase tracking-wider text-orange-600 flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Special Offers
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
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
                          href={withAmazonAffiliateId(promo.url)}
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

            {/* Categories Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Categories
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={categoryPath(cat.name)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Recent Posts
              </h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link key={post.id} to={guidePath(post.id)} className="group flex gap-4 items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                      <img 
                        src={post.headerImage} 
                        alt={post.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-relaxed group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h4>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-400">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
