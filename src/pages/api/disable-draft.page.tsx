import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';

export default async function exit(_, res) {
  // Exit the current user from "Draft Mode".
  res.setDraftMode({ enable: false });

  // Override cookie header for draft mode for usage in live-preview
  // https://github.com/vercel/next.js/issues/49927
  // https://github.com/vercel/next.js/blob/62af2007ce78fdbff33013a8145efbcacbf6b8e2/packages/next/src/server/api-utils/node.ts#L293
  const headers = res.getHeader('Set-Cookie');
  if (Array.isArray(headers)) {
    res.setHeader(
      'Set-Cookie',
      headers.map((cookie: string) => {
        if (cookie.includes(COOKIE_NAME_PRERENDER_BYPASS)) {
          return cookie.replace('SameSite=Lax', 'SameSite=None; Secure');
        }
        return cookie;
      }),
    );
  }

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });
  res.end();
}
