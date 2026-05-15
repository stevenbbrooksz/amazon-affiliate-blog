import { posts, guidePath, categoryPath } from './guides';
import { SITE_SETTINGS } from './generated/site-settings.generated';

export const SITE_URL = SITE_SETTINGS.siteUrl;
export const SITE_NAME = SITE_SETTINGS.siteName;

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

const categories = [...new Set(posts.map((post) => post.category))].sort();

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: '/',
    title: SITE_SETTINGS.defaultSeoTitle,
    description: SITE_SETTINGS.defaultSeoDescription,
  },
  {
    path: '/about',
    title: `About ${SITE_NAME}`,
    description: `Learn how ${SITE_NAME} researches products, writes buying guides, and discloses affiliate relationships.`,
  },
  {
    path: '/contact',
    title: `Contact ${SITE_NAME}`,
    description: `Contact ${SITE_NAME} for editorial questions, affiliate corrections, product submissions, and partnership inquiries.`,
  },
  ...categories.map((category) => ({
    path: categoryPath(category),
    title: `${category} Guides - ${SITE_NAME}`,
    description: `Browse Amazon affiliate buying guides and product recommendations in ${category}.`,
  })),
  ...posts.map((post) => ({
    path: guidePath(post.id),
    title: `${post.title} - ${SITE_NAME}`,
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
