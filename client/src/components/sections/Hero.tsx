'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { keepVideoPlaying } from '../../lib/keepVideoPlaying';
import { StoreBadges } from '../ui/StoreBadges';
import { DOWNLOAD_ANCHOR, NOTIFY_FORM_URL } from '../../lib/stores';
import { GetTheAppLink } from '../ui/GetTheApp';

// Hero background: a sharp still that always moves (slow CSS drift), with the
// film fading in on top as soon as the browser actually plays it.
//
// Why both: some places refuse to start ANY video without a tap, muted or not,
// and no page code can override them: in-app browsers (Instagram / Facebook /
// LinkedIn WebViews), iOS Low Power Mode, Android Data Saver. There the hero used
// to sit on a frozen, blurry frame until someone tapped. Now it shows the still,
// drifting, and the film takes over only if/when it plays (keepVideoPlaying
// reports 'playing' / 'blocked').
//
// Files are re-encoded (2026-11-18) from the 15 Mbps Higgsfield masters
// (~/Downloads/hf_20260911_193038… landscape, hf_20260912_181321… vertical):
// HEVC for Apple/modern devices, H.264 fallback, phones at full 1080x1920 (was
// 720x1280, upscaled ~1.6x on a 3x iPhone). Stills are frame 0 of each film so
// the cross-fade is seamless. Previous cuts: client/.archive/video/.
const HEVC = 'video/mp4; codecs="hvc1.1.6.L120.90"';
const HERO = {
  desktop: {
    hevc: '/video/hero-v2.hevc.mp4',
    h264: '/video/hero-v2.mp4',
    stillAvif: '/video/hero-v2-still.avif',
    stillJpg: '/video/hero-v2-still.jpg',
  },
  mobile: {
    hevc: '/video/hero-mobile-v2.hevc.mp4',
    h264: '/video/hero-mobile-v2.mp4',
    stillAvif: '/video/hero-mobile-v2-still.avif',
    stillJpg: '/video/hero-mobile-v2-still.jpg',
  },
} as const;
// Matches the `sm` breakpoint used for the mobile-only scrims below.
const MOBILE_QUERY = '(max-width: 640px)';

// Framer Motion drives the mount entrance off animation frames, which a
// background tab does not deliver — the hero would freeze part-way (often at
// opacity 0, i.e. no headline at all) and never recover. Opening the site in a
// background tab (cmd-click, session restore) hit this.
//
// The fix is not "animate later": it is that TEXT VISIBILITY MUST NOT DEPEND ON
// AN ANIMATION RUNNING. If we mounted while hidden, we skip the entrance and
// snap straight to the final state — there is nothing to watch anyway, and
// nothing that can stall.
// Hero entrance, deliberately CSS rather than Framer Motion.
//
// Framer drives animation off requestAnimationFrame, which a background tab
// never delivers: opening the site in a hidden tab (cmd-click, session restore)
// froze the hero at opacity 0 — headline and subtitle simply absent, forever.
// A CSS animation runs on the document timeline instead, so it completes while
// hidden; and because the RESTING style is fully opaque, text is visible even if
// the animation never runs at all. `backwards` holds the from-state during the
// stagger delay so nothing flashes in first.
const entrance = (delay: number): React.CSSProperties => ({
  animation: 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards',
  animationDelay: `${delay}s`,
});

export const Hero = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  // 'loading' → still shown; 'playing' → film faded in; 'still' → film refused, still keeps drifting.
  const [mode, setMode] = useState<'loading' | 'playing' | 'still'>('loading');

  // Playback must never need a tap: keepVideoPlaying retries on every resume
  // signal, on the first gesture anywhere, and when playback stalls; where the
  // browser refuses outright, it reports 'blocked' and the drifting still stays.
  // prefers-reduced-motion wins: still only, no drift.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const preferHevc = v.canPlayType(HEVC) !== '';
    return keepVideoPlaying(v, {
      reduceMotion: !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
      // Pick the cut here rather than with <source media> alone (browsers only
      // honour that at first load); re-picked when the viewport crosses the
      // breakpoint (rotation, resize).
      sourceQuery: MOBILE_QUERY,
      pickSource: () => {
        const cut = window.matchMedia?.(MOBILE_QUERY).matches ? HERO.mobile : HERO.desktop;
        return preferHevc ? { src: cut.hevc, fallback: cut.h264 } : { src: cut.h264 };
      },
      onState: (state) => setMode(state === 'playing' ? 'playing' : 'still'),
    });
  }, []);

  return (
    <section
      aria-label="Infirmière MobiSoins arrivant à domicile"
      data-hero-mode={mode}
      className="relative w-full min-h-screen flex items-end overflow-hidden"
      style={{ backgroundColor: '#031226' }}
    >
      {/* The still: always there, always sharp, gently drifting. The film covers it once it plays. */}
      <picture className="hero-still absolute inset-0" aria-hidden="true">
        <source media={MOBILE_QUERY} type="image/avif" srcSet={HERO.mobile.stillAvif} />
        <source media={MOBILE_QUERY} srcSet={HERO.mobile.stillJpg} />
        <source type="image/avif" srcSet={HERO.desktop.stillAvif} />
        <img src={HERO.desktop.stillJpg} alt="" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
      </picture>
      {/* Film — muted/looping/inline, transparent until it really plays, then fades in. */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        {/* In the server HTML so the browser starts fetching/autoplaying before any
            JS. It takes the first entry it can play: HEVC, else H.264 (also its
            fallback if HEVC fails to decode). keepVideoPlaying re-picks on resize. */}
        <source src={HERO.mobile.hevc} type={HEVC} media={MOBILE_QUERY} />
        <source src={HERO.mobile.h264} type="video/mp4" media={MOBILE_QUERY} />
        <source src={HERO.desktop.hevc} type={HEVC} />
        <source src={HERO.desktop.h264} type="video/mp4" />
      </video>
      <style>{'.hero-video::-webkit-media-controls,.hero-video::-webkit-media-controls-start-playback-button,.hero-video::-webkit-media-controls-overlay-play-button{display:none!important;-webkit-appearance:none;opacity:0;}.hero-video,.hero-still img{object-position:50% 50%;}@media (max-width:640px){.hero-video,.hero-still img{object-position:50% 42%;}}'}</style>

      {/* Global cool-down: a light overall tint keeps the footage from washing out
          the white type without dulling the whole frame. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(3,10,22,0.14)' }}
      />
      {/* Elliptical scrim anchored bottom-left, under the copy block. Radial (not a
          hard-edged panel) so it reads as a lighting falloff, never as a box. */}
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background:
            'radial-gradient(120% 95% at 0% 100%, rgba(2,9,20,0.92) 0%, rgba(2,9,20,0.78) 26%, rgba(2,9,20,0.48) 48%, rgba(2,9,20,0.18) 66%, rgba(2,9,20,0) 82%)',
        }}
      />
      {/* Desktop scrim — anchored mid-left, under the centred copy */}
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          background:
            'radial-gradient(105% 85% at 0% 55%, rgba(2,9,20,0.7) 0%, rgba(2,9,20,0.45) 30%, rgba(2,9,20,0.16) 56%, rgba(2,9,20,0) 78%)',
        }}
      />
      {/* Mobile bottom fade — dissolves the video into the navy the mobile page still uses */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,18,38,0) 0%, rgba(3,18,38,0.35) 40%, rgba(3,18,38,0.8) 70%, #031226 92%, #031226 100%)',
        }}
      />
      {/* Mobile only: gentle bottom-up gradient so the bottom-anchored text sits on a
          calm base (transparent up top keeps the nurse's face clear). */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,18,38,0) 0%, rgba(3,18,38,0.25) 45%, rgba(3,18,38,0.6) 78%, rgba(3,18,38,0.85) 100%)',
        }}
      />
      {/* Mobile only: small top scrim so the logo/menu seat cleanly on a bright sky */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none sm:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(3,18,38,0.5) 0%, rgba(3,18,38,0) 100%)' }}
      />

      <div className="container-custom w-full relative z-10 pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[40rem]">
          {/* The eyebrow sits INSIDE the h1 (looks the same) so the page's main
              heading still says where we are: "Grand Montréal, Québec" +
              "infirmière à domicile en un clic". Copy: src/data/heroCopy.ts. */}
          <h1
            className="mb-5 font-display text-[2.9rem] font-light leading-none tracking-[-0.025em] sm:mb-7 sm:text-[clamp(3.4rem,5.4vw,5.25rem)] sm:leading-[0.98]"
            style={{
              ...entrance(0.08),
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(2,9,20,0.5), 0 6px 34px rgba(2,9,20,0.7)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            <span
              className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-leaf-on-dark sm:mb-7 sm:text-[13px]"
              style={{ textShadow: 'none', fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              <span className="h-px w-5 shrink-0 bg-leaf-on-dark sm:w-7" aria-hidden="true" />
              {t('v2.heroBadge')}
            </span>
            {/* Space so the heading text reads "…Québec Une infirmière…", not "QuébecUne". */}
            {' '}
            {t('hero.title')}{' '}
            {/* 1.1em: Newsreader's light italic draws ~8% narrower and thinner than
                the roman, so at the same size "en un clic" read smaller than the
                white words (owner, 2026-11-19). Bumped so both halves look equal. */}
            <em className="text-leaf-on-dark" style={{ fontSize: '1.1em' }}>{t('hero.titleHighlight')}.</em>
          </h1>

          <p
            className="mb-7 max-w-[470px] text-[16px] leading-[1.55] text-white/85 sm:mb-8 sm:text-[19px]"
            style={{ ...entrance(0.16), textShadow: '0 1px 12px rgba(2,9,20,0.6)' }}
          >
            <span className="sm:hidden">{t('hero.subtitleShort')}</span>
            <span className="hidden sm:inline">{t('hero.subtitle')}</span>
          </p>

          {/* Get the app. Phones: one button that opens their own store (/app
              decides from the device), the two badges under it. Computers: the
              badges are the call to action. */}
          <div id={DOWNLOAD_ANCHOR} className="scroll-mt-28" style={entrance(0.24)}>
            <GetTheAppLink
              className="group mb-2.5 flex h-[52px] w-full items-center justify-center gap-2.5 rounded bg-white px-5 text-[16px] font-semibold text-ink transition-colors hover:bg-leaf-on-dark hover:text-ink-deep sm:hidden"
            >
              {t('hero.downloadApp')}
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
              </svg>
            </GetTheAppLink>
            <p className="mb-5 text-center text-[12.5px] text-white/70 sm:hidden">{t('hero.downloadHint')}</p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <StoreBadges size="sm" fill className="w-full flex-nowrap sm:hidden" />
              <StoreBadges size="lg" className="hidden sm:flex" />
              <a
                href="#how-it-works"
                className="hidden self-center border-b border-white/50 pb-[3px] text-[16px] font-medium text-white transition-colors hover:border-white sm:inline"
              >
                {t('v2.heroCtaSecondary')}
              </a>
            </div>

            <p
              className="mt-5 text-center text-[13px] text-white/75 sm:mt-6 sm:text-left sm:text-[14px]"
              style={{ textShadow: '0 1px 12px rgba(2,9,20,0.6)' }}
            >
              {t('hero.notServed')}{' '}
              <a href={NOTIFY_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-[3px] hover:text-leaf-on-dark">
                {t('hero.leaveEmail')}
              </a>
              {t('hero.leaveEmailSuffix')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
