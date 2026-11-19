'use client';

import { cn } from '@/lib/utils';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_STORE_URL, PLAY_STORE_URL } from '../../lib/stores';

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { box: string; small: string; big: string; apple: string; play: string }> = {
  sm: { box: 'h-11 gap-2 px-3 rounded-[9px]', small: 'text-[9px]', big: 'text-[15px]', apple: 'h-[19px]', play: 'h-[19px]' },
  md: { box: 'h-[54px] gap-2.5 px-[18px] rounded-[10px]', small: 'text-[10px]', big: 'text-[18px]', apple: 'h-[23px]', play: 'h-[22px]' },
  lg: { box: 'h-[60px] gap-3 px-[22px] rounded-xl', small: 'text-[11px]', big: 'text-[21px]', apple: 'h-[27px]', play: 'h-[25px]' },
};

const COPY = {
  FR: { appleSmall: 'Télécharger dans', appleBig: 'l’App Store', playSmall: 'Disponible sur', appleLabel: 'Télécharger MobiSoins dans l’App Store', playLabel: 'Télécharger MobiSoins sur Google Play' },
  EN: { appleSmall: 'Download on the', appleBig: 'App Store', playSmall: 'Get it on', appleLabel: 'Download MobiSoins on the App Store', playLabel: 'Get MobiSoins on Google Play' },
} as const;

const AppleLogo = ({ className }: { className: string }) => (
  <svg className={cn('w-auto shrink-0', className)} viewBox="0 0 814 1000" fill="white" aria-hidden="true">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-108.3C27.1 766.2 0 633.6 0 506.6c0-204.9 133.4-313.1 264.4-313.1 69.4 0 127.1 45.5 170.4 45.5 41.3 0 106.1-49.2 185.8-49.2zm-181.7-111c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
);

const PlayLogo = ({ className }: { className: string }) => (
  <svg className={cn('w-auto shrink-0', className)} viewBox="0 0 22 24" fill="none" aria-hidden="true">
    <path d="M0.6 0.54L12.4 12L0.6 23.46C0.23 23.16 0 22.7 0 22.17V1.82C0 1.29 0.23 0.84 0.6 0.54Z" fill="#32BBFF" />
    <path d="M16.4 8.08L12.4 12L16.4 15.92L21.2 13.26C22.46 12.56 22.46 11.44 21.2 10.74L16.4 8.08Z" fill="#FFD700" />
    <path d="M0.6 23.46C0.99 23.78 1.52 23.86 2.1 23.56L14.2 16.94L12.4 12L0.6 23.46Z" fill="#FF3B30" />
    <path d="M14.2 7.06L2.1 0.44C1.52 0.14 0.99 0.22 0.6 0.54L12.4 12L14.2 7.06Z" fill="#00E676" />
  </svg>
);

/**
 * App Store + Google Play badges (black, official wording and logos), linking to
 * the live listings. `onDark` adds a hairline border so the black badge reads
 * on the navy/photo grounds; on white it is a plain black badge.
 * Clicks are counted by Plausible's outbound-link script when analytics is on.
 */
export const StoreBadges = ({
  size = 'md',
  onDark = true,
  fill = false,
  className,
}: {
  size?: Size;
  onDark?: boolean;
  /** Stretch the two badges to share the row (phones). */
  fill?: boolean;
  className?: string;
}) => {
  const { language } = useLanguage();
  const c = COPY[language];
  const s = SIZES[size];
  const box = cn(
    'inline-flex items-center bg-black text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-on-dark',
    onDark ? 'border border-white/35' : 'border border-black',
    fill && 'flex-1 min-w-0',
    s.box,
  );
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5 sm:gap-3', className)}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={c.appleLabel} className={box}>
        <AppleLogo className={s.apple} />
        <span className="flex flex-col leading-[1.1]">
          <span className={cn('font-medium', s.small)}>{c.appleSmall}</span>
          <span className={cn('font-semibold tracking-[-0.01em] whitespace-nowrap', s.big)}>{c.appleBig}</span>
        </span>
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={c.playLabel} className={box}>
        <PlayLogo className={s.play} />
        <span className="flex flex-col leading-[1.1]">
          <span className={cn('font-medium uppercase tracking-[0.04em]', s.small)}>{c.playSmall}</span>
          <span className={cn('font-semibold tracking-[-0.01em] whitespace-nowrap', s.big)}>Google Play</span>
        </span>
      </a>
    </div>
  );
};
