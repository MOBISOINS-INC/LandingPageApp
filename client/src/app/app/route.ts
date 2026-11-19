/**
 * /app: one link for "get the app" (buttons, QR codes, ads, social bios).
 * iPhone → App Store, Android → Google Play, anything else → the store badges
 * on the home page in the visitor's language. Rules: lib/stores.ts (tested).
 *
 * Lives outside the (fr) and /en route groups and is excluded from the
 * language proxy (src/proxy.ts matcher), so English browsers are not bounced to /en/app.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE, parseAcceptLanguage } from '../../lib/i18n';
import { appLinkLanguage, detectPlatform, smartAppTarget } from '../../lib/stores';

export const dynamic = 'force-dynamic';

/** Path of the referring page when it is on this site (another site's path says nothing about language). */
function sameSiteRefererPath(request: NextRequest): string | null {
  const referer = request.headers.get('referer');
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return url.host === request.nextUrl.host ? url.pathname : null;
  } catch {
    return null;
  }
}

function languageOf(request: NextRequest): 'FR' | 'EN' {
  return appLinkLanguage({
    refererPath: sameSiteRefererPath(request),
    cookie: request.cookies.get(LANG_COOKIE)?.value ?? null,
    acceptLanguages: parseAcceptLanguage(request.headers.get('accept-language')),
  });
}

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent');
  let target = '/';
  try {
    target = smartAppTarget(ua, languageOf(request));
    console.info(`[app-link] ${detectPlatform(ua)} -> ${target} (ref: ${request.headers.get('referer') ?? '-'})`);
  } catch (err) {
    // Never strand a visitor: fall back to the home page, where both badges are.
    console.error('[app-link] could not pick a store, sending to home', err);
  }
  const response = NextResponse.redirect(new URL(target, request.url), 302);
  // Depends on the device: never let a shared cache hand an iPhone's answer to an Android.
  response.headers.set('Vary', 'User-Agent, Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
