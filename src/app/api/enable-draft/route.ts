import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

interface VercelJwt {
  bypass: string;
  aud: string;
  iat: number;
  sub: string;
}

const getVercelJwtCookie = (request: NextRequest): string | undefined => {
  const vercelJwtCookie = request.cookies.get('_vercel_jwt');
  if (!vercelJwtCookie) return;
  return vercelJwtCookie.value;
};

const parseVercelJwtCookie = (vercelJwtCookie: string): VercelJwt => {
  const base64Payload = vercelJwtCookie.split('.')[1];
  if (!base64Payload) throw new Error('Malformed `_vercel_jwt` cookie value');

  const base64 = base64Payload.replace('-', '+').replace('_', '/');
  const payload = atob(base64);
  const vercelJwt = JSON.parse(payload);

  assertVercelJwt(vercelJwt);

  return vercelJwt;
};

function assertVercelJwt(value: object): asserts value is VercelJwt {
  const vercelJwt = value as VercelJwt;
  if (typeof vercelJwt.bypass !== 'string')
    throw new TypeError("'bypass' property in VercelJwt is not a string");
  if (typeof vercelJwt.aud !== 'string')
    throw new TypeError("'aud' property in VercelJwt is not a string");
  if (typeof vercelJwt.sub !== 'string')
    throw new TypeError("'sub' property in VercelJwt is not a string");
  if (typeof vercelJwt.iat !== 'number')
    throw new TypeError("'iat' property in VercelJwt is not a number");
}

interface ParsedRequestUrl {
  origin: string;
  host: string;
  path: string;
  bypassToken: string;
  contentfulPreviewSecret: string;
}

const parseRequestUrl = (requestUrl: string | undefined): ParsedRequestUrl => {
  if (!requestUrl) throw new Error('missing `url` value in request');
  const { searchParams, origin, host } = new URL(requestUrl);

  const rawPath = searchParams.get('path') || '';
  const bypassToken = searchParams.get('x-vercel-protection-bypass') || '';
  const contentfulPreviewSecret = searchParams.get('x-contentful-preview-secret') || '';

  // to allow query parameters to be passed through to the redirected URL, the original `path` should already be
  // URI encoded, and thus must be decoded here
  const path = decodeURIComponent(rawPath);

  return { origin, path, host, bypassToken, contentfulPreviewSecret };
};

const buildRedirectUrl = ({
  path,
  base,
  bypassTokenFromQuery,
}: {
  path: string;
  base: string;
  bypassTokenFromQuery?: string;
}): string => {
  const redirectUrl = new URL(path, base);

  // if the bypass token is provided in the query, we assume Vercel has _not_ already set the actual
  // token that bypasses authentication. thus we provided it here, on the redirect
  if (bypassTokenFromQuery) {
    redirectUrl.searchParams.set('x-vercel-protection-bypass', bypassTokenFromQuery);
    redirectUrl.searchParams.set('x-vercel-set-bypass-cookie', 'samesitenone');
  }

  return redirectUrl.toString();
};

function enableDraftMode() {
  draftMode().enable();
  const cookieStore = cookies();
  const cookie = cookieStore.get('__prerender_bypass')!;
  cookies().set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  });
}

export async function GET(request: NextRequest): Promise<Response | void> {
  const {
    origin: base,
    path,
    host,
    bypassToken: bypassTokenFromQuery,
    contentfulPreviewSecret: contentfulPreviewSecretFromQuery,
  } = parseRequestUrl(request.url);
  // if we're in development, we don't need to check, we can just enable draft mode
  if (process.env.NODE_ENV === 'development') {
    enableDraftMode();
    const redirectUrl = buildRedirectUrl({ path, base, bypassTokenFromQuery });
    return redirect(redirectUrl);
  }

  const vercelJwtCookie = getVercelJwtCookie(request);
  let bypassToken: string;
  let aud: string;
  let vercelJwt: VercelJwt | null = null;

  if (bypassTokenFromQuery) {
    bypassToken = bypassTokenFromQuery;
    aud = host;
  } else if (contentfulPreviewSecretFromQuery) {
    bypassToken = contentfulPreviewSecretFromQuery;
    aud = host;
  } else {
    // if we don't have a bypass token from the query we fall back to the _vercel_jwt cookie to find
    // the correct authorization bypass elements
    if (!vercelJwtCookie) {
      return new Response('Missing _vercel_jwt cookie required for authorization bypass', {
        status: 401,
      });
    }
    try {
      vercelJwt = parseVercelJwtCookie(vercelJwtCookie);
    } catch (e) {
      if (!(e instanceof Error)) throw e;
      return new Response('Malformed bypass authorization token in _vercel_jwt cookie', {
        status: 401,
      });
    }
    bypassToken = vercelJwt.bypass;
    aud = vercelJwt.aud;
  }

  // certain Vercel account tiers may not have a VERCEL_AUTOMATION_BYPASS_SECRET, so we fallback to checking the value against the CONTENTFUL_PREVIEW_SECRET
  // env var, which is supported as a workaround for these accounts
  if (
    bypassToken !== process.env.VERCEL_AUTOMATION_BYPASS_SECRET &&
    contentfulPreviewSecretFromQuery !== process.env.CONTENTFUL_PREVIEW_SECRET
  ) {
    return new Response(
      'The bypass token you are authorized with does not match the bypass secret for this deployment. You might need to redeploy or go back and try the link again.',
      { status: 403 },
    );
  }

  if (aud !== host) {
    return new Response(
      `The bypass token you are authorized with is not valid for this host (${host}). You might need to redeploy or go back and try the link again.`,
      { status: 403 },
    );
  }

  if (!path) {
    return new Response('Missing required value for query parameter `path`', {
      status: 400,
    });
  }

  enableDraftMode();

  // if a _vercel_jwt cookie was found, we do _not_ want to pass through the bypassToken to the redirect query. this
  // is because Vercel will not "process" (and remove) the query parameter when a _vercel_jwt cookie is present.
  const bypassTokenForRedirect = vercelJwtCookie ? undefined : bypassTokenFromQuery;

  const redirectUrl = buildRedirectUrl({
    path,
    base,
    bypassTokenFromQuery: bypassTokenForRedirect,
  });
  redirect(redirectUrl);
}
