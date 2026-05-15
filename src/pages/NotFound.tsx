import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  Headphones,
  Home,
  Mail,
  PlayCircle,
  Sparkles,
  Tag,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { posts } from '../data/posts';
import { bountyPromotions } from '../constants/bounties';

const offerIcons = { Zap, Headphones, BookOpen, PlayCircle };

export const NotFound: React.FC = () => {
  const categories = useMemo(() => {
    const counts = posts.reduce<Record<string, number>>((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  const latestPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, []);

  const featuredOffers = bountyPromotions;

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute('content') ?? null;
    const robots = existingRobots ?? document.createElement('meta');

    document.title = '404 - Page Not Found | AMZREVIEWS';
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, follow');

    if (!existingRobots) {
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobotsContent) {
        existingRobots.setAttribute('content', previousRobotsContent);
      } else if (robots.parentNode) {
        robots.parentNode.removeChild(robots);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <section className="bg-gray-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 xl:grid-cols-[0.58fr_1.42fr] xl:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-orange-400">
                <Sparkles className="h-4 w-4" />
                Page Not Found
              </div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                404
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
                The guide you opened is unavailable, but the site still has current buying
                guides, category directories, and Amazon membership offers worth checking.
              </p>
              <div className="mt-8 flex flex-nowrap items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-orange-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back Home
                </Link>
                <a
                  href="https://www.amazon.com/Best-Sellers/zgbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-950 transition-all hover:bg-orange-50"
                >
                  Best Sellers
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featuredOffers.map((offer, index) => {
                const OfferIcon = offerIcons[offer.icon as keyof typeof offerIcons] || Sparkles;
                return (
                  <motion.a
                    key={offer.id}
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="group flex h-full min-h-[285px] flex-col rounded-2xl border border-white/10 bg-white p-5 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl xl:min-h-[315px]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                        <OfferIcon className="h-6 w-6" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-300 transition-colors group-hover:text-orange-600" />
                    </div>
                    <p className="min-h-[28px] text-[10px] font-black uppercase tracking-widest text-orange-600">
                      {offer.subtitle}
                    </p>
                    <h2 className="mt-2 min-h-[32px] whitespace-nowrap text-lg font-black leading-tight text-gray-950">
                      {offer.title}
                    </h2>
                    <p className="mt-3 min-h-[52px] text-sm font-semibold leading-6 text-gray-600">
                      {offer.benefit}
                    </p>
                    <span className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-3 py-3 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/20 transition-all group-hover:bg-gray-950">
                      {offer.cta}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-950">
              <Clock className="h-4 w-4 text-orange-600" />
              Latest Guides
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={post.headerImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-widest text-orange-600">
                      <span>{post.category}</span>
                      <span className="text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-black leading-snug text-gray-950 transition-colors group-hover:text-orange-600">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="w-full lg:w-80">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-950">
                <Tag className="h-4 w-4 text-orange-600" />
                Site Directory
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  <BookOpen className="h-4 w-4" />
                  About
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${category.name}`}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                  >
                    <span>{category.name}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-400">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
