// Which hero film a device gets. Pure and framework-free so it is unit-tested
// (heroSources.test.ts) and shared by the <source> tags and keepVideoPlaying.
//
// Tiers (2026-11-24):
//  - desktopHi: 3840x2160 HEVC, from the Topaz 4K upscale of the Higgsfield
//    master (~/Downloads/mobisoins-hero-landing-4K.mp4). Only for screens that
//    can show the extra pixels AND decode HEVC level 5.0.
//  - mobileHi: 1440x2560 HEVC, downscaled from the vertical 4K upscale
//    (~/Downloads/mobisoins-hero-landing-mobile-4K.mp4). No phone has a
//    2160-wide screen, so a full 2160x3840 file would only cost data and battery.
//  - desktop / mobile: the 1080p films that shipped on 2026-11-18. They stay as
//    the default and as the fallback, so a device that cannot use a Hi tier gets
//    exactly what it got before.
import type { VideoSource } from './keepVideoPlaying';

// HEVC Main profile, level 4.0 (enough for 1080p) and level 5.0 (needed for
// 1440x2560 and 3840x2160). A browser that cannot decode the level skips that
// <source> / answers '' to canPlayType, and falls to the next tier.
export const HEVC = 'video/mp4; codecs="hvc1.1.6.L120.90"';
export const HEVC_HI = 'video/mp4; codecs="hvc1.1.6.L150.90"';

// Matches the `sm` breakpoint used for the mobile-only scrims in Hero.tsx.
export const MOBILE_QUERY = '(max-width: 640px)';
// Screens where 1080p is visibly soft: anything wider than Full HD in CSS
// pixels, or a laptop/desktop-sized viewport on a high-density (Retina) panel.
export const HIRES_QUERY = '(min-width: 1921px), (min-width: 1024px) and (min-resolution: 1.5dppx)';

export const HERO = {
  desktop: {
    hevc: '/video/hero-v2.hevc.mp4',
    h264: '/video/hero-v2.mp4',
    stillAvif: '/video/hero-v2-still.avif',
    stillJpg: '/video/hero-v2-still.jpg',
  },
  desktopHi: {
    hevc: '/video/hero-v3-4k.hevc.mp4',
  },
  mobile: {
    hevc: '/video/hero-mobile-v2.hevc.mp4',
    h264: '/video/hero-mobile-v2.mp4',
    stillAvif: '/video/hero-mobile-v2-still.avif',
    stillJpg: '/video/hero-mobile-v2-still.jpg',
  },
  mobileHi: {
    hevc: '/video/hero-mobile-v3.hevc.mp4',
  },
} as const;

export interface HeroEnv {
  /** Viewport matches MOBILE_QUERY. */
  mobile: boolean;
  /** Viewport matches HIRES_QUERY. */
  hiRes: boolean;
  /** canPlayType(HEVC) !== '' */
  canHevc: boolean;
  /** canPlayType(HEVC_HI) !== '' */
  canHevcHi: boolean;
  /** navigator.connection.saveData — the visitor asked for less data. */
  saveData: boolean;
}

export function pickHeroSource(env: HeroEnv): VideoSource {
  const base = env.mobile ? HERO.mobile : HERO.desktop;
  // The Hi tiers need working HEVC at both levels; saveData always wins.
  const hiOk = env.canHevc && env.canHevcHi && !env.saveData;
  if (hiOk && env.mobile) return { src: HERO.mobileHi.hevc, fallback: base.h264 };
  if (hiOk && env.hiRes) return { src: HERO.desktopHi.hevc, fallback: base.h264 };
  return env.canHevc ? { src: base.hevc, fallback: base.h264 } : { src: base.h264 };
}
