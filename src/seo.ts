import { posts, guidePath, categoryPath } from './guides';

export const SITE_URL = 'https://amazon-affiliate-blog.pages.dev';
export const SITE_NAME = 'AMZREVIEWS';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

const categories = [...new Set(posts.map((post) => post.category))].sort();

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: '/',
    title: 'AMZREVIEWS - Amazon Affiliate Buying Guides',
    description: 'Amazon affiliate buying guides, product comparisons, and practical recommendations for home office, smart home, outdoor gear, and lifestyle products.',
  },
  {
    path: '/about',
    title: 'About AMZREVIEWS',
    description: 'Learn how AMZREVIEWS researches Amazon products, writes buying guides, and discloses affiliate relationships.',
  },
  {
    path: '/contact',
    title: 'Contact AMZREVIEWS',
    description: 'Contact AMZREVIEWS for editorial questions, affiliate corrections, product submissions, and partnership inquiries.',
  },
  ...categories.map((category) => ({
    path: categoryPath(category),
    title: `${category} Guides - AMZREVIEWS`,
    description: `Browse Amazon affiliate buying guides and product recommendations in ${category}.`,
  })),
  ...posts.map((post) => ({
    path: guidePath(post.id),
    title: `${post.title} - AMZREVIEWS`,
    description: post.excerpt,
  })),
];

export function normalizePath(pathname: string) {
  if (pathname === '') return '/';
  const cleanPath = pathname.split('?')[0].split('#')[0];
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    return cleanPath.slice(0, -1);
  }
  return cleanPath || '/';
}

export function getSeoForPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return SEO_ROUTES.find((route) => route.path === normalized) ?? SEO_ROUTES[0];
}

export function canonicalUrl(pathname: string) {
  return `${SITE_URL}${normalizePath(pathname)}`;
}
