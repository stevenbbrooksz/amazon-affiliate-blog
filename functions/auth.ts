type PagesEnv = {
  GITHUB_CLIENT_ID?: string;
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
};

const cookieName = 'decap_oauth_state';

const randomState = () => {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const onRequestGet = async ({ request, env }: PagesContext) => {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Missing GITHUB_CLIENT_ID environment variable.', { status: 500 });
  }

  const requestUrl = new URL(request.url);
  const state = randomState();
  const scope = requestUrl.searchParams.get('scope') || 'repo';
  const redirectUri = new URL('/callback', requestUrl.origin).toString();
  const githubUrl = new URL('https://github.com/login/oauth/authorize');

  githubUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set('redirect_uri', redirectUri);
  githubUrl.searchParams.set('scope', scope);
  githubUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      location: githubUrl.toString(),
      'set-cookie': `${cookieName}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};
