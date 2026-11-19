'use client';

import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GetTheAppLink } from '../ui/GetTheApp';
import { LAUNCH_BANNER_ATTR, launchBannerMsLeft } from '../../lib/launchBanner';

const hide = (why: string) => {
  document.documentElement.setAttribute(LAUNCH_BANNER_ATTR, 'off');
  console.info(`[launch-banner] hidden (${why})`);
};

/**
 * Thin launch bar at the very top of the fixed header: "MobiSoins est maintenant
 * sur l'App Store et Google Play". Shows on every page load, then slides away
 * after a minute (lib/launchBanner.ts); the × closes it sooner. Nothing is stored,
 * so a refresh brings it back. The clock is the page load (performance.timeOrigin),
 * not this component: the header remounts on each page, and moving between pages
 * must not restart the minute.
 */
export const LaunchBanner = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const left = launchBannerMsLeft(performance.timeOrigin, Date.now());
    if (left === 0) {
      hide('time up');
      return;
    }
    const timer = window.setTimeout(() => hide('time up'), left);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="launch-banner relative flex h-[var(--launch-banner-h)] items-center justify-center overflow-hidden bg-leaf-on-dark pl-4 pr-12 text-ink-deep">
      <p className="min-w-0 truncate text-[13px] sm:text-[14.5px]">
        <span className="font-semibold sm:hidden">{t('hero.launchBannerShort')}</span>
        <span className="hidden font-semibold sm:inline">{t('hero.launchBanner')}</span>{' '}
        <GetTheAppLink className="font-semibold underline underline-offset-[3px] hover:text-ink">
          <span className="sm:hidden">→</span>
          <span className="hidden sm:inline">{t('hero.launchBannerCta')} →</span>
        </GetTheAppLink>
      </p>
      <button
        type="button"
        onClick={() => hide('closed')}
        aria-label={t('hero.launchBannerClose')}
        className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-ink-deep hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
};
