export const renderDecapAuthCallback = (content: Record<string, string>) => {
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
