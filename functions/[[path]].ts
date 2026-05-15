import { validCategories, validGuidePaths } from './route-data';

type PagesEnv = {
  ASSETS: {
    fetch(input: Request | string | URL): Promise<Response>;
  };
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
  next(): Promise<Response>;
};

const validStaticRoutes = new Set(['/', '/about', '/contact']);
const validGuidePathSet = new Set<string>(validGuidePaths);
const validCategorySet = new Set<string>(validCategories);

const normalizePathname = (pathname: string) => {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
};

const decodePathPart = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const isValidAppRoute = (pathname: string) => {
  const path = normalizePathname(pathname);

  if (validStaticRoutes.has(path)) {
    return true;
  }

  const guideMatch = path.match(/^\/guides\/([^/]+)$/);
  if (guideMatch) {
    return validGuidePathSet.has(`/guides/${decodePathPart(guideMatch[1])}`);
  }

  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    return validCategorySet.has(decodePathPart(categoryMatch[1]));
  }

  return false;
};

const isAssetLikePath = (pathname: string) => {
  return /\.[a-z0-9]+$/i.test(pathname);
};

const isStaticAdminPath = (pathname: string) => {
  return pathname === '/admin' || pathname.startsWith('/admin/');
};

const serveAppShell = async (context: PagesContext, status: 200 | 404) => {
  const url = new URL(context.request.url);
  const indexUrl = new URL('/', url);
  const assetResponse = await context.env.ASSETS.fetch(new Request(indexUrl, context.request));
  const headers = new Headers(assetResponse.headers);

  headers.set('content-type', 'text/html; charset=utf-8');

  if (status === 404) {
    headers.set('x-robots-tag', 'noindex, follow');
  }

  return new Response(assetResponse.body, {
    status,
    headers,
  });
};

export const onRequest = async (context: PagesContext) => {
  const url = new URL(context.request.url);

  if (isStaticAdminPath(url.pathname)) {
    return context.next();
  }

  if (isAssetLikePath(url.pathname)) {
    return context.next();
  }

  return serveAppShell(context, isValidAppRoute(url.pathname) ? 200 : 404);
};
