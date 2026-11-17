/**
 * Visitor analytics (Plausible). Cookieless, so no consent banner is needed
 * under Quebec's Law 25. Driven by env vars so nothing loads until the owner
 * has an account:
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  the site as added in Plausible, e.g. "mobisoins.com" (required)
 *   NEXT_PUBLIC_PLAUSIBLE_SRC     script URL (optional). Default: the script that also
 *                                 counts clicks to other sites, i.e. the waitlist Google
 *                                 Form, as "Outbound Link: Click". Paste the URL from
 *                                 Plausible's snippet here if it gives a site-specific one.
 *
 * NEXT_PUBLIC_* values are baked in at build time: set them in Netlify, then redeploy.
 */
export const PLAUSIBLE_DEFAULT_SRC = 'https://plausible.io/js/script.outbound-links.js';

/** Queues events fired before the script loads; also accepts the newer init() snippet. */
export const PLAUSIBLE_STUB =
  'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};' +
  'window.plausible.init=window.plausible.init||function(o){window.plausible.o=o||{}};';

export interface AnalyticsConfig {
  domain: string;
  src: string;
}

export function analyticsConfig(env: Record<string, string | undefined>): AnalyticsConfig | undefined {
  const domain = env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!domain) return undefined;
  const src = env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() || PLAUSIBLE_DEFAULT_SRC;
  if (!/^https:\/\//.test(src)) {
    console.error(`[analytics] NEXT_PUBLIC_PLAUSIBLE_SRC must be an https URL, got "${src}"; analytics disabled`);
    return undefined;
  }
  return { domain, src };
}
