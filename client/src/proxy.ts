/**
 * Browser-language redirect, decided on the server before any HTML is sent.
 *
 * A visitor whose browser lists no French language (Accept-Language) and who
 * lands on a French URL gets a 307 to the English twin under /en. Doing it here
 * instead of in the browser means the French page is never downloaded and
 * rendered just to be replaced (a double load that hurt real-user speed).
 *
 * Never redirected: /en pages, crawlers and tools (UA match), requests with no
 * Accept-Language (crawlers, curl, link previews), anyone who picked a language
 * with the switcher (cookie LANG_COOKIE), and non-GET/HEAD requests. Rules live in lib/i18n.ts
 * (englishRedirectFor) and are covered by lib/i18n.test.ts.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE, englishRedirectFor, parseAcceptLanguage } from './lib/i18n';

export function proxy(request: NextRequest) {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') return NextResponse.next();
    // Client-side navigations reach here too (Next.js strips their RSC markers
    // before the proxy, so they cannot be told apart). That is fine: the router
    // follows a proxy redirect, and the switcher writes the cookie before it navigates.

    const { pathname } = request.nextUrl;
    const acceptLanguage = request.headers.get('accept-language');
    const target = englishRedirectFor(
      pathname,
      '',
      request.cookies.get(LANG_COOKIE)?.value ?? null,
      request.headers.get('user-agent') ?? '',
      parseAcceptLanguage(acceptLanguage),
    );
    if (!target) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = target; // query string is kept
    console.info(`[i18n] redirect ${pathname} -> ${target} (accept-language: ${acceptLanguage})`);
    const response = NextResponse.redirect(url, 307);
    // The answer depends on the visitor: never let a cache hand it to someone else.
    response.headers.set('Vary', 'Accept-Language, Cookie');
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  } catch (err) {
    // A language redirect is a nicety: on any error, serve the page as asked.
    console.error('[i18n] language redirect failed, serving the requested page', err);
    return NextResponse.next();
  }
}

export const config = {
  // French pages only: skip /en, Next internals, the API and any file (x.png, sitemap.xml, robots.txt).
  matcher: ['/((?!en(?:/|$)|app(?:/|$)|_next/|api/|.*\\.[a-zA-Z0-9]{2,5}$).*)'],
};
