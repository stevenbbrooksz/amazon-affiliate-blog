type PagesEnv = {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
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

const renderCallback = (content: Record<string, string>) => {
  const payload = JSON.stringify(content);
  const message = `authorization:github:success:${payload}`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Authorizing...</title>
  </head>
  <body>
    <script>
      const message = ${JSON.stringify(message)};
      function sendAuthorization() {
        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
          window.opener.postMessage(message, "*");
          window.close();
        }
      }
      window.addEventListener("message", sendAuthorization, false);
      sendAuthorization();
    </script>
    <p>Authorization complete. You can close this window.</p>
  </body>
</html>`;
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

  return new Response(renderCallback({ token: tokenData.access_token, provider: 'github' }), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'set-cookie': `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
};
