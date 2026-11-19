'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { useReveal } from '../../hooks/useReveal';
import { StoreBadges } from '../ui/StoreBadges';
import { NOTIFY_FORM_URL } from '../../lib/stores';

export const Newsletter = () => {
  const { t } = useLanguage();
  const { ref, style } = useReveal();

  return (
    <section id="get-the-app" className="bg-ink py-12 text-white lg:py-32">
      <div className="container-custom">
        <div
          ref={ref}
          style={style}
          className="grid grid-cols-1 gap-y-4 text-center lg:text-left lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-x-[120px]"
        >
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="font-display text-[34px] font-light leading-[1.02] tracking-[-0.025em] text-white lg:text-[88px] lg:leading-[0.98] lg:tracking-[-0.03em]">
              {t('v2.ctaTitle1')} <em className="text-leaf-on-dark">{t('v2.ctaTitle2')}</em>
            </h2>
          </div>
          <div className="flex flex-col items-center gap-3 lg:items-stretch lg:gap-4">
            <p className="text-[14px] leading-[1.5] text-white/85 lg:text-[18px]">{t('v2.ctaBody')}</p>
            <StoreBadges size="md" className="justify-center lg:justify-start" />
            <p className="text-[12px] text-white/70 lg:text-[13px]">
              {t('v2.ctaNotServed')}{' '}
              <a href={NOTIFY_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-[3px] hover:text-leaf-on-dark">
                {t('v2.ctaLeaveEmail')}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
