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

  // Laid on the header's own grid (container-custom): the message starts where the
  // logo starts, and the × sits exactly over the menu button (same 18px icon, same
  // 2px stroke, same column). The whole message is the link, not just the arrow.
  return (
    <div className="launch-banner h-[var(--launch-banner-h)] overflow-hidden bg-leaf-on-dark text-ink-deep">
      <div className="container-custom flex h-full items-center gap-2 sm:gap-3">
        <GetTheAppLink className="group flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-semibold min-[390px]:text-[13px] sm:justify-center sm:text-[14.5px]">
          <span className="truncate">
            <span className="sm:hidden">{t('hero.launchBannerShort')}</span>
            <span className="hidden sm:inline">{t('hero.launchBanner')}</span>
          </span>
          <span className="hidden shrink-0 underline underline-offset-[3px] sm:inline">{t('hero.launchBannerCta')}</span>
          <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </GetTheAppLink>
        <button
          type="button"
          onClick={close}
          aria-label={t('hero.launchBannerClose')}
          className="-mr-1 flex h-10 w-11 shrink-0 items-center justify-center rounded-lg text-ink-deep transition-colors hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};
