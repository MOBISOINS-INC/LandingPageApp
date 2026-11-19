'use client';

import { useEffect, useRef } from 'react';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SMART_APP_PATH, detectPlatform } from '../../lib/stores';
import { StoreBadges } from './StoreBadges';
import { DISPLAY, Eyebrow } from './editorial';

/**
 * "Télécharger l'app" on every device:
 * - Phones: the link goes to /app, which redirects to the App Store / Google Play
 *   (server-side, logged). Also the no-JavaScript fallback everywhere.
 * - Computers (and iPads, whose Safari reports a Mac): there is no store to open,
 *   so the click opens <GetTheAppDialog>: a QR code for the phone plus both badges.
 *   Before this, computers were redirected to the home page they were already on,
 *   which looked like the button did nothing.
 * One dialog per page (rendered by the Header); links open it with an event.
 */
const OPEN_EVENT = 'mobisoins:get-the-app';

/** onClick for any link to /app: on a computer, open the QR dialog instead of navigating. */
export const handleGetTheAppClick = (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  if (detectPlatform(navigator.userAgent) !== 'other') return; // phone: follow /app to its store
  e.preventDefault();
  window.dispatchEvent(new Event(OPEN_EVENT));
};

export const GetTheAppLink = ({ onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={SMART_APP_PATH}
    {...props}
    onClick={(e) => {
      onClick?.(e);
      handleGetTheAppClick(e);
    }}
  />
);

const COPY = {
  FR: {
    eyebrowPhoto: 'L’application MobiSoins',
    photoTitle: 'Une infirmière à domicile,',
    photoTitleEm: 'en quelques clics.',
    eyebrow: 'Télécharger l’app',
    title: 'Scannez,',
    titleEm: 'c’est parti.',
    scan: 'Pointez l’appareil photo de votre téléphone vers le code : il ouvre l’App Store ou Google Play, selon votre téléphone.',
    or: 'ou téléchargez directement',
    close: 'Fermer',
    qrAlt: 'Code QR vers l’app MobiSoins',
    photoAlt: 'Une infirmière MobiSoins sourit en regardant son téléphone, son sac MobiSoins à l’épaule',
  },
  EN: {
    eyebrowPhoto: 'The MobiSoins app',
    photoTitle: 'A nurse at home,',
    photoTitleEm: 'in a few taps.',
    eyebrow: 'Download the app',
    title: 'Scan,',
    titleEm: 'and you’re set.',
    scan: 'Point your phone’s camera at the code: it opens the App Store or Google Play, depending on your phone.',
    or: 'or download directly',
    close: 'Close',
    qrAlt: 'QR code to the MobiSoins app',
    photoAlt: 'A MobiSoins nurse smiling at her phone, her MobiSoins bag on her shoulder',
  },
} as const;

/** Sage corner bracket framing the QR tile (decorative). */
const Corner = ({ className }: { className: string }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute h-5 w-5 border-leaf ${className}`} />
);


export const GetTheAppDialog = () => {
  const { language } = useLanguage();
  const c = COPY[language];
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => {
      const dialog = ref.current;
      if (!dialog) {
        console.error('[get-the-app] dialog not mounted; cannot open');
        return;
      }
      if (!dialog.open) dialog.showModal();
      console.info('[get-the-app] QR dialog opened');
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="get-the-app-title"
      // A click on the dimmed backdrop (outside the panel) lands on <dialog> itself.
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      className="get-the-app m-auto w-[calc(100%-32px)] max-w-[440px] overflow-hidden rounded-[20px] bg-paper p-0 text-ink shadow-[0_40px_120px_-20px_rgba(0,20,45,0.55)] backdrop:bg-ink-deep/70 backdrop:backdrop-blur-[3px] md:max-w-[900px]"
    >
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Photo panel (computers): a MobiSoins nurse checking her phone (nurses/care-3.png, cropped),
            label + headline low over a short navy scrim so her phone and the logo bag stay in view. */}
        <div className="relative hidden min-h-[580px] overflow-hidden bg-ink-deep md:block">
          <img src="/nurses/get-the-app-nurse.jpg" alt={c.photoAlt} className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,31,64,0.94)_0%,rgba(0,31,64,0.72)_20%,rgba(0,31,64,0)_40%)]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-9 pb-8">
            <Eyebrow onDark>{c.eyebrowPhoto}</Eyebrow>
            <p className="font-display text-[32px] font-light leading-[1.04] tracking-[-0.025em] text-white">
              {c.photoTitle} <em className="text-leaf-on-dark">{c.photoTitleEm}</em>
            </p>
          </div>
        </div>

        {/* QR panel */}
        <div className="relative flex flex-col px-7 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
          <button
            type="button"
            onClick={close}
            aria-label={c.close}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="get-the-app-title" className={`${DISPLAY} mt-3 text-[38px] leading-[1.02] sm:text-[44px]`}>
            {c.title} <em className="text-leaf">{c.titleEm}</em>
          </h2>
          <p className="mt-4 max-w-[340px] text-[15px] leading-[1.6] text-ink-soft">{c.scan}</p>

          {/* QR of https://www.mobisoins.com/app (made with macOS Core Image, decode-checked). */}
          <div className="relative mx-auto mt-8 rounded-2xl bg-white p-5 shadow-[0_18px_40px_-22px_rgba(0,31,64,0.45)] ring-1 ring-rule sm:mx-0 sm:self-start">
            <Corner className="-left-2 -top-2 rounded-tl-[10px] border-l-2 border-t-2" />
            <Corner className="-right-2 -top-2 rounded-tr-[10px] border-r-2 border-t-2" />
            <Corner className="-bottom-2 -left-2 rounded-bl-[10px] border-b-2 border-l-2" />
            <Corner className="-bottom-2 -right-2 rounded-br-[10px] border-b-2 border-r-2" />
            <img src="/app-qr.svg" alt={c.qrAlt} width={184} height={184} className="block h-[184px] w-[184px]" />
          </div>
          <p className="mt-4 text-center font-mono text-[12px] tracking-[0.04em] text-ink-soft sm:text-left">mobisoins.com/app</p>

          <div className="mt-7 flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
            {c.or}
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          </div>
          <StoreBadges size="sm" onDark={false} className="mt-5 justify-center sm:justify-start" />
        </div>
      </div>
    </dialog>
  );
};
