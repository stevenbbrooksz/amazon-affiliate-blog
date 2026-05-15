import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowLeft, Share2, Bookmark, ExternalLink, Zap, Headphones, BookOpen, PlayCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { posts } from '../data/posts';
import { bountyPromotions } from '../constants/bounties';
import { PostCard } from '../components/PostCard';
import { NotFound } from './NotFound';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postIndex = posts.findIndex((p) => p.id === id);
  const post = posts[postIndex];

  // Navigation posts
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  // Related posts (same category, excluding current post)
  const relatedPosts = posts
    .filter((p) => p.category === post?.category && p.id !== id)
    .slice(0, 3);

  // Categories calculation
  const categories = React.useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="relative h-[60vh] overflow-hidden">
        <img
          src={post.headerImage}
          alt={post.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex justify-center gap-4 text-sm font-black uppercase tracking-widest text-orange-500">
                <span>{post.category}</span>
                <span className="text-white/40">•</span>
                <span>5 Min Read</span>
              </div>
              <h1 className="mb-8 text-4xl font-black tracking-tight text-white sm:text-6xl">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm font-medium text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white">
                    {post.author[0]}
                  </div>
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-12 flex items-center justify-between border-b border-gray-100 pb-8">
              <Link to="/" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Feed
              </Link>
              <div className="flex gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-orange-600 transition-all">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-orange-600 transition-all">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="markdown-body prose prose-lg max-w-none prose-orange">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Post Navigation */}
            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-gray-100 pt-12 sm:grid-cols-2">
              {prevPost ? (
                <Link 
                  to={`/post/${prevPost.id}`}
                  className="group flex items-center gap-4 rounded-3xl border border-gray-100 p-4 transition-all hover:border-orange-200 hover:bg-orange-50/20"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-gray-100">
                    <img 
                      src={prevPost.headerImage} 
                      alt="" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-orange-600">
                      <ChevronLeft className="h-3 w-3" /> Previous Article
                    </span>
                    <span className="text-[15px] font-black leading-tight text-gray-900 line-clamp-2">{prevPost.title}</span>
                  </div>
                </Link>
              ) : <div />}
              
              {nextPost ? (
                <Link 
                  to={`/post/${nextPost.id}`}
                  className="group flex items-center justify-end gap-4 rounded-3xl border border-gray-100 p-4 transition-all hover:border-orange-200 hover:bg-orange-50/20 text-right"
                >
                  <div className="flex flex-col gap-1.5 order-1">
                    <span className="flex items-center justify-end gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-orange-600">
                      Next Article <ChevronRight className="h-3 w-3" />
                    </span>
                    <span className="text-[15px] font-black leading-tight text-gray-900 line-clamp-2">{nextPost.title}</span>
                  </div>
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-gray-100 order-2">
                    <img 
                      src={nextPost.headerImage} 
                      alt="" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
              ) : <div />}
            </div>

            {/* Related Articles Grid */}
            {relatedPosts.length > 0 && (
              <section className="mt-20">
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
                    More in <span className="text-orange-600">{post.category}</span>
                  </h3>
                  <Link 
                    to={`/category/${post.category?.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-bold text-orange-600 hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((rPost, i) => (
                    <PostCard key={rPost.id} post={rPost} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-12">
              <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-black tracking-tight text-gray-900 uppercase">About the Author</h3>
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-2xl bg-gray-100 italic">
                  <img src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} className="grayscale hover:grayscale-0 transition-all" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{post.author}</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Senior editor and product specialist with over 10 years of experience in consumer electronics and lifestyle design.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-black tracking-tight text-gray-900 uppercase">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/category/${cat.name}`}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                    >
                      <span>{cat.name}</span>
                      <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div id="special-offers-widget-detail" className="rounded-3xl border border-orange-100 bg-orange-50/30 p-8 shadow-sm">
                <h3 className="mb-8 text-2xl font-black tracking-tighter text-gray-900 uppercase border-b-2 border-orange-500 pb-2 inline-block">Special Offers</h3>
                <div className="space-y-6">
                  {bountyPromotions.map((promo) => {
                    const PromoIcon = { Zap, Headphones, BookOpen, PlayCircle }[promo.icon] || Sparkles;
                    return (
                      <motion.div
                        key={promo.id}
                        whileHover={{ y: -4 }}
                        className="group relative overflow-hidden rounded-[2rem] border-2 border-dashed border-orange-200 bg-white p-6 transition-all hover:border-orange-500 hover:shadow-xl"
                      >
                        <div className="relative z-10">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-200">
                              <PromoIcon className="h-6 w-6" />
                            </div>
                            <div className="text-right">
                              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-tight">{promo.title}</h2>
                              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-tighter">{promo.subtitle}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-xl font-bold text-gray-900 leading-tight tracking-tight uppercase group-hover:text-orange-600 transition-colors">
                              {promo.benefit}
                            </p>
                          </div>

                          <ul className="mb-6 space-y-2">
                            {promo.points.slice(0, 3).map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-600 font-medium leading-snug">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                {point}
                              </li>
                            ))}
                          </ul>

                          <a 
                            href={promo.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored nofollow"
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gray-900 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600 group-hover:shadow-lg"
                          >
                            {promo.cta} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        
                        {/* Cut-out circles for coupon look */}
                        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-orange-50/50" />
                        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-orange-50/50" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl bg-gray-900 p-8 text-white">
                <h3 className="mb-6 text-lg font-black uppercase tracking-widest text-orange-600">Why Trust Us?</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Every product we recommend undergoes rigorous testing and comparison. Our mission is to provide you with objective, practical advice to help you make informed decisions.
                </p>
                <button className="mt-8 text-sm font-bold underline decoration-orange-600 underline-offset-8 hover:text-orange-600 transition-colors">
                  Learn about our review process
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};
