/**
 * Launch banner timing (components/layout/LaunchBanner.tsx).
 *
 * Owner's rule (2026-11-18): the banner shows on every page load (every refresh),
 * then slides away by itself after about a minute on the site. Nothing is stored:
 * a refresh always brings it back. Moving between pages without a refresh keeps
 * the same clock, so someone browsing for a while doesn't see it again.
 * Plain module so the timing is unit-tested (launchBanner.test.ts).
 */
export const LAUNCH_BANNER_ATTR = 'data-launch-banner';

/** How long the banner stays up after the page loads. */
export const LAUNCH_BANNER_MS = 60_000;

/** Milliseconds the banner should still stay up, given when the page loaded. Never negative. */
export function launchBannerMsLeft(loadedAt: number, now: number, visibleFor: number = LAUNCH_BANNER_MS): number {
  if (!Number.isFinite(loadedAt) || !Number.isFinite(now)) return 0;
  return Math.max(0, Math.min(visibleFor, visibleFor - (now - loadedAt)));
}
