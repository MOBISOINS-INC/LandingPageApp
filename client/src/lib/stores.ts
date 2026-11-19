/**
 * Where to get the MobiSoins app. Single source of truth for every store link
 * on the site (hero, header, CTA bands, city and service pages, articles) and
 * for the /app smart link (src/app/app/route.ts).
 *
 * App Store: approved 2026-11, app id 6767878428 (com.mobisoins.app).
 * Google Play: approved 2026-11, package com.mobisoins.android.
 * Plain module (no JSX) so `npm test` can import it: see stores.test.ts.
 */
export const APP_STORE_ID = '6767878428';
export const APP_STORE_URL = `https://apps.apple.com/ca/app/mobisoins/id${APP_STORE_ID}`;
export const PLAY_PACKAGE = 'com.mobisoins.android';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;

/** Short link that opens the right store for the visitor's phone (QR codes, ads, buttons). */
export const SMART_APP_PATH = '/app';

/** Anchor of the store badges in the home hero (where /app sends computers). */
export const DOWNLOAD_ANCHOR = 'telecharger';

/**
 * Google Form kept as a fallback only: for people outside the served cities who
 * want to hear when MobiSoins reaches them. Everyone else downloads the app.
 */
export const NOTIFY_FORM_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

export type Platform = 'ios' | 'android' | 'other';

/**
 * Phone platform from a User-Agent. iPadOS 13+ Safari reports a Mac UA, so an
 * iPad lands on 'other' and sees both badges: harmless, it can pick one.
 */
export function detectPlatform(userAgent: string | null | undefined): Platform {
  const ua = userAgent ?? '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'other';
}

/** Store for a platform, or null when the visitor should choose (computer). */
export function storeUrlFor(platform: Platform): string | null {
  if (platform === 'ios') return APP_STORE_URL;
  if (platform === 'android') return PLAY_STORE_URL;
  return null;
}

/**
 * Language for /app's computer fallback. The page the click came from wins (a
 * French page stays French even in an English-language browser), then the
 * switcher cookie, then the browser's languages; French by default.
 */
export function appLinkLanguage(opts: {
  refererPath?: string | null;
  cookie?: string | null;
  acceptLanguages?: readonly string[];
}): 'FR' | 'EN' {
  const ref = opts.refererPath;
  if (ref) return /^\/en(?:\/|$|[?#])/.test(ref) ? 'EN' : 'FR';
  if (opts.cookie === 'FR' || opts.cookie === 'EN') return opts.cookie;
  const langs = opts.acceptLanguages ?? [];
  if (langs.length > 0 && !langs.some((l) => /^fr(?:-|$)/i.test(l.trim()))) return 'EN';
  return 'FR';
}

/**
 * Path of the page a click came from, when that page is on our own site (a
 * path on someone else's site says nothing about language). Our site = the
 * public domain (with or without www) or the host the request was served on.
 * Netlify hands the server its internal deploy host, never mobisoins.com, so
 * comparing against the request host alone treated every real visitor as external.
 */
export function ownSiteRefererPath(referer: string | null | undefined, ownHosts: readonly (string | null | undefined)[]): string | null {
  if (!referer) return null;
  let url: URL;
  try {
    url = new URL(referer);
  } catch {
    return null;
  }
  const bare = (h: string) => h.toLowerCase().replace(/^www\./, '');
  const mine = new Set(ownHosts.filter((h): h is string => !!h).map(bare));
  return mine.has(bare(url.host)) ? url.pathname : null;
}

/** Where /app sends a visitor: their store, else the badges on the home page in their language. */
export function smartAppTarget(userAgent: string | null | undefined, language: 'FR' | 'EN'): string {
  return storeUrlFor(detectPlatform(userAgent)) ?? `${language === 'EN' ? '/en' : '/'}#${DOWNLOAD_ANCHOR}`;
}
