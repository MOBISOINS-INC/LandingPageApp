'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { GetTheAppLink } from '../ui/GetTheApp';
import { LAUNCH_BANNER_ATTR } from '../../lib/launchBanner';

/**
 * Thin launch bar at the very top of the fixed header: "MobiSoins est maintenant
 * sur l'App Store et Google Play". Owner's rule (2026-11-19, "very important"):
 * it NEVER leaves on its own — no timer. It stays the whole visit; only the ×
 * closes it, for this page view (nothing is stored, a refresh brings it back).
 * Guarded by lib/launchBanner.test.ts.
 */
export const LaunchBanner = () => {
  const { t } = useLanguage();

  const close = () => {
    document.documentElement.setAttribute(LAUNCH_BANNER_ATTR, 'off');
    console.info('[launch-banner] closed by the visitor');
  };

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
        onClick={close}
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
