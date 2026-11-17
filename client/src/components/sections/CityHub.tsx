'use client';

import Link from '@/components/ui/LocaleLink';
import { PageShell } from '@/components/layout/PageShell';
import { useLanguage } from '@/contexts/LanguageContext';
import { CITIES, cityPath } from '@/data/cities';
import { ArrowRight, DISPLAY, Eyebrow } from '@/components/ui/editorial';

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const COPY = {
  FR: {
    crumb: 'Fil d’Ariane',
    home: 'Accueil',
    eyebrow: 'Secteurs desservis',
    h1: 'Infirmière à domicile',
    h1em: 'dans le Grand Montréal',
    lead: 'Une infirmière membre de l’OIIQ vient chez vous pour une prise de sang, un pansement, un vaccin ou le suivi d’un proche. Trouvez votre ville ci-dessous.',
    link: (inFr: string) => `Infirmière à domicile ${inFr}`,
    missing: 'Votre ville n’est pas dans la liste ? Inscrivez-la sur la liste d’attente : nous élargissons le service à mesure que les demandes arrivent.',
    cta: 'Rejoindre la liste d’attente',
  },
  EN: {
    crumb: 'Breadcrumb',
    home: 'Home',
    eyebrow: 'Service areas',
    h1: 'Home care nurse',
    h1em: 'in Greater Montreal',
    lead: 'An OIIQ-licensed nurse comes to your home for a blood test, a dressing, a vaccine or a check-in on a loved one. Find your city below.',
    link: (inEn: string) => `Home care nurse ${inEn}`,
    missing: 'Don’t see your city? Add it on the waiting list: we expand the service as requests come in.',
    cta: 'Join the waiting list',
  },
} as const;

export function CityHub() {
  const { language } = useLanguage();
  const c = COPY[language];
  const en = language === 'EN';
  // Group by region, keeping the order of data/cities.ts.
  const regions: { name: string; cities: typeof CITIES }[] = [];
  for (const city of CITIES) {
    const name = en ? city.regionEn : city.regionFr;
    const group = regions.find((r) => r.name === name);
    if (group) group.cities.push(city);
    else regions.push({ name, cities: [city] });
  }

  return (
    <PageShell>
      <div className="bg-paper">
        <section className="pt-8 sm:pt-10 lg:pt-14">
          <div className="container-custom flex flex-col gap-8 lg:gap-12">
            <nav aria-label={c.crumb} className="flex items-center gap-3 text-[14px] font-medium text-ink-soft">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">{c.home}</Link>
              <span aria-hidden="true" className="text-ink-faint">/</span>
              <span className="text-ink">{c.eyebrow}</span>
            </nav>
            <div className="flex max-w-[900px] flex-col gap-6">
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h1 className={`${DISPLAY} text-[44px] leading-none tracking-[-0.03em] sm:text-[60px] lg:text-[72px]`}>
                {c.h1} <em className="text-leaf">{c.h1em}</em>
              </h1>
              <p className="max-w-[640px] text-[16px] leading-[1.7] text-ink-soft lg:text-[18px]">{c.lead}</p>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="container-custom flex flex-col">
            {regions.map((r) => (
              <div key={r.name} className="grid grid-cols-1 gap-y-4 border-t border-rule py-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-x-24">
                <h2 className={`${DISPLAY} text-[28px] leading-[1.1] lg:text-[36px]`}>{r.name}</h2>
                <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2">
                  {r.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={cityPath(city.slug)}
                        className="group flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 text-[17px] font-medium text-ink hover:text-leaf-text"
                      >
                        {c.link(en ? city.inEn : city.inFr)}
                        <span className="text-leaf transition-transform duration-300 group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="max-w-[720px] border-t border-rule pt-8 text-[16px] leading-[1.7] text-ink-soft">{c.missing}</p>
          </div>
        </section>

        <section className="bg-ink py-[72px] text-white lg:py-24">
          <div className="container-custom flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-display text-[36px] font-light leading-none tracking-[-0.03em] text-white lg:text-[56px]">{c.h1} {c.h1em}</h2>
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded bg-white px-7 text-[16px] font-semibold text-ink transition-colors hover:bg-leaf-on-dark hover:text-ink-deep"
            >
              {c.cta}
              <ArrowRight />
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
