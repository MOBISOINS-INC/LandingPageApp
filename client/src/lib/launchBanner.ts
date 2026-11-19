/**
 * Launch banner (components/layout/LaunchBanner.tsx). It stays up for the whole
 * visit; the × sets this attribute on <html> to close it (globals.css collapses
 * it and the page offset). No timer, nothing stored: see launchBanner.test.ts.
 */
export const LAUNCH_BANNER_ATTR = 'data-launch-banner';
