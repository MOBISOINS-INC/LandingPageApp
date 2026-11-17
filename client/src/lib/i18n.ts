/**
 * Locale routing. French lives at the root (/services), English under /en
 * (/en/services). The language shown is derived from the URL, never from
 * browser storage, so each URL always serves one language to people and to
 * search engines alike.
 */
export type Language = 'FR' | 'EN';

export const EN_PREFIX = '/en';

export const localeFromPath = (pathname: string | null | undefined): Language =>
  pathname === EN_PREFIX || pathname?.startsWith(`${EN_PREFIX}/`) || pathname?.startsWith(`${EN_PREFIX}#`) ? 'EN' : 'FR';

/** "/en/services/x" -> "/services/x", "/en" -> "/". Leaves French paths alone. */
export const stripLocale = (pathname: string): string => {
  if (localeFromPath(pathname) === 'FR') return pathname;
  const rest = pathname.slice(EN_PREFIX.length);
  return rest === '' || rest.startsWith('#') ? `/${rest}` : rest;
};

/** Internal site paths get the locale prefix; external links, assets and hashes pass through. */
export const localizePath = (href: string, lang: Language): string => {
  if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_next') || href.startsWith('/api')) return href;
  if (/\.[a-z0-9]{2,5}($|[?#])/i.test(href)) return href; // files: /favicon.png, /doc.pdf
  const base = stripLocale(href);
  if (lang === 'FR') return base;
  return base === '/' ? EN_PREFIX : base.startsWith('/#') ? `${EN_PREFIX}${base.slice(1)}` : `${EN_PREFIX}${base}`;
};

/** Crawlers keep no cookies, so they would be redirected on every visit and the
 *  French pages would drop out of the index. They always get the URL as asked.
 *  "google"/"bing" also cover tools whose UA has no "bot" (Google-InspectionTool,
 *  GoogleOther, BingPreview). */
const BOT_UA = /bot|crawl|spider|slurp|google|bing|facebookexternalhit|embedly|preview|lighthouse|headless|pagespeed/i;

/** Cookie holding the language picked with the switcher ('FR' | 'EN'). The
 *  server-side redirect (src/proxy.ts) reads it, so it must be a cookie, not
 *  localStorage. Strictly a preference: no tracking. */
export const LANG_COOKIE = 'lang';
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Accept-Language header -> language tags, best first, as the browser ranks
 * them. Tags with q=0 ("not acceptable") and the "*" wildcard are dropped.
 * "en-US,en;q=0.9,fr;q=0.8" -> ["en-US", "en", "fr"].
 */
export const parseAcceptLanguage = (header: string | null | undefined): string[] =>
  (header ?? '')
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const q = qParam === undefined ? 1 : Number(qParam.slice(2));
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0, index };
    })
    .filter((l) => l.tag !== '' && l.tag !== '*' && l.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)
    .map((l) => l.tag);

/** A BCP 47 tag whose primary language is French: "fr", "fr-CA", "FR-fr". ("en-FR" is not.) */
const isFrench = (tag: string): boolean => /^fr(?:-|$)/i.test(tag.trim());

/**
 * English is the default language for non-French browsers: a visitor whose
 * browser lists no French language and who lands on a French URL is sent to
 * its English twin. A French-speaking browser (any accepted language starting
 * with "fr") stays on the French URL. Anyone who has picked a language with the
 * switcher (cookie 'FR' or 'EN') is never redirected again.
 *
 * No language list at all (no Accept-Language header: crawlers, curl, link
 * previews) means no redirect, so the French URL is always what gets indexed.
 * Called server-side by src/proxy.ts before the page is sent.
 */
export const englishRedirectFor = (
  pathname: string,
  hash: string,
  saved: string | null,
  userAgent: string,
  languages: readonly string[],
): string | null => {
  if (saved === 'FR' || saved === 'EN') return null;
  if (BOT_UA.test(userAgent)) return null;
  if (localeFromPath(pathname) === 'EN') return null;
  if (languages.length === 0) return null;
  if (languages.some(isFrench)) return null;
  return localizePath(pathname + hash, 'EN');
};
