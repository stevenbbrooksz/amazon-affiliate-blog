import { renderDecapAuthCallback } from './oauth-response';

type PagesEnv = {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_ALLOWED_USERS?: string;
  GITHUB_ALLOWED_ORGS?: string;
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
};

const cookieName = 'decap_oauth_state';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const getCookie = (request: Request, name: string) => {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
};

const splitList = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const fetchGithubJson = async <T>(url: string, token: string) => {
  const response = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': 'decap-cms-cloudflare-pages',
      'x-github-api-version': '2022-11-28',
    },
  });

  if (!response.ok) return null;
  return (await response.json()) as T;
};

const isAuthorizedUser = async (token: string, env: PagesEnv) => {
  const allowedUsers = splitList(env.GITHUB_ALLOWED_USERS);
  const allowedOrgs = splitList(env.GITHUB_ALLOWED_ORGS);

  if (!allowedUsers.length && !allowedOrgs.length) return false;

  const user = await fetchGithubJson<{ login: string }>('https://api.github.com/user', token);
  const login = user?.login?.toLowerCase();

  if (!login) return false;
  if (allowedUsers.includes(login)) return true;
  if (!allowedOrgs.length) return false;

  const orgs = await fetchGithubJson<{ login: string }[]>('https://api.github.com/user/orgs', token);
  return Array.isArray(orgs) && orgs.some((org) => allowedOrgs.includes(org.login.toLowerCase()));
};

export const onRequestGet = async ({ request, env }: PagesContext) => {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable.', { status: 500 });
  }

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state') || '';
  const expectedState = getCookie(request, cookieName);

  if (!code) {
    return new Response('Missing GitHub OAuth code.', { status: 400 });
  }

  if (!expectedState || state !== expectedState) {
    return new Response('Invalid GitHub OAuth state.', { status: 400 });
  }

  const redirectUri = new URL('/callback', requestUrl.origin).toString();
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'user-agent': 'decap-cms-cloudflare-pages',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
      state,
    }),
  });

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string; error_description?: string };

  if (!tokenResponse.ok || !tokenData.access_token) {
    const error = tokenData.error_description || tokenData.error || 'GitHub token exchange failed.';
    return new Response(escapeHtml(error), { status: 502 });
  }

  if (!splitList(env.GITHUB_ALLOWED_USERS).length && !splitList(env.GITHUB_ALLOWED_ORGS).length) {
    return new Response('Missing GITHUB_ALLOWED_USERS or GITHUB_ALLOWED_ORGS environment variable.', { status: 500 });
  }

  if (!(await isAuthorizedUser(tokenData.access_token, env))) {
    return new Response('This GitHub account is not allowed to access this CMS.', { status: 403 });
  }

  return new Response(renderDecapAuthCallback({ token: tokenData.access_token, provider: 'github' }), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'set-cookie': `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
};
