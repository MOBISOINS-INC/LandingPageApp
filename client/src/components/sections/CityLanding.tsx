'use client';

import Image from 'next/image';
import Link from '@/components/ui/LocaleLink';
import { PageShell } from '@/components/layout/PageShell';
import { useLanguage } from '@/contexts/LanguageContext';
import { CITY_FEATURED_SERVICES, CITY_HUB_PATH, cityPath, getCity } from '@/data/cities';
import type { City } from '@/data/cities';
import { getServiceBySlug } from '@/data/services';
import { serviceSearchName } from '@/lib/serviceSearch';
import { ArrowRight, DISPLAY, Eyebrow } from '@/components/ui/editorial';

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const COPY = {
  FR: {
    crumb: 'Fil d’Ariane',
    home: 'Accueil',
    hub: 'Secteurs desservis',
    eyebrow: 'Secteur desservi',
    h1: 'Infirmière à domicile',
    cta: 'Rejoindre la liste d’attente',
    allServices: 'Voir tous les services',
    servicesTitle: (c: City) => `Les soins les plus demandés ${c.inFr}`,
    more: 'En savoir plus',
    areasTitle: (c: City) => `Partout ${c.inFr}`,
    howTitle: 'Comment ça se passe',
    steps: [
      { t: 'Réservez en ligne', d: 'Choisissez le soin, la date et l’heure qui vous conviennent.' },
      { t: 'Une infirmière se déplace', d: 'Membre de l’OIIQ, elle vient directement chez vous.' },
      { t: 'Le soin est prodigué', d: 'En toute sécurité, dans le confort de votre domicile.' },
      { t: 'Rapport dans l’application', d: 'Un compte rendu clinique est disponible après la visite.' },
    ],
    faqTitle: (c: City) => `Questions fréquentes ${c.inFr}`,
    faq: (c: City) => [
      {
        q: `L’infirmière se déplace-t-elle ${c.inFr} ?`,
        a: `Oui. MobiSoins lance d’abord ses visites dans le Grand Montréal, dont ${c.nameFr}. Inscrivez-vous à la liste d’attente avec votre adresse : nous vous écrivons dès qu’une visite est possible chez vous.`,
      },
      {
        q: 'Mon médecin m’a remis une requête de prise de sang. Est-ce suffisant ?',
        a: 'Oui. L’infirmière fait le prélèvement chez vous à partir de la requête de votre médecin, sans passer par un centre de prélèvement.',
      },
      {
        q: 'Les infirmières sont-elles qualifiées ?',
        a: 'Toutes nos infirmières sont membres de l’Ordre des infirmières et infirmiers du Québec (OIIQ), détiennent une assurance responsabilité civile et ont réussi notre processus de vérification, y compris la vérification des antécédents.',
      },
    ],
    nearbyTitle: (c: City) => `Aussi desservi près ${c.slug === 'ouest-de-l-ile' ? 'de l’Ouest-de-l’Île' : `de ${c.nameFr}`}`,
    nearbyLink: (c: City) => `Infirmière à domicile ${c.inFr}`,
    ctaTitle: (c: City) => `Besoin d’une infirmière ${c.inFr} ?`,
  },
  EN: {
    crumb: 'Breadcrumb',
    home: 'Home',
    hub: 'Service areas',
    eyebrow: 'Service area',
    h1: 'Home care nurse',
    cta: 'Join the waiting list',
    allServices: 'See all services',
    servicesTitle: (c: City) => `Most requested care ${c.inEn}`,
    more: 'Learn more',
    areasTitle: (c: City) => `Across ${c.inEn.replace(/^in /, '')}`,
    howTitle: 'How it works',
    steps: [
      { t: 'Book online', d: 'Pick the service, date and time that work for you.' },
      { t: 'A nurse comes to you', d: 'An OIIQ member, she comes straight to your home.' },
      { t: 'Care is delivered', d: 'Safely, in the comfort of your own home.' },
      { t: 'Report in the app', d: 'A clinical summary is available after the visit.' },
    ],
    faqTitle: (c: City) => `Frequently asked questions ${c.inEn}`,
    faq: (c: City) => [
      {
        q: `Do your nurses come to homes ${c.inEn}?`,
        a: `Yes. MobiSoins is launching first in Greater Montreal, including ${c.nameEn === 'West Island' ? 'the West Island' : c.nameEn}. Join the waiting list with your address and we will let you know as soon as a visit is available where you live.`,
      },
      {
        q: 'My doctor gave me a blood test requisition. Is that enough?',
        a: 'Yes. The nurse takes the sample at your home using your doctor’s requisition, with no trip to a blood collection centre.',
      },
      {
        q: 'Are the nurses qualified?',
        a: 'All our nurses are members of the Ordre des infirmières et infirmiers du Québec (OIIQ), carry professional liability insurance and have passed our screening process, including a background check.',
      },
    ],
    nearbyTitle: (c: City) => `Also served near ${c.nameEn === 'West Island' ? 'the West Island' : c.nameEn}`,
    nearbyLink: (c: City) => `Home care nurse ${c.inEn}`,
    ctaTitle: (c: City) => `Need a nurse ${c.inEn}?`,
  },
} as const;

export function CityLanding({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const c = COPY[language];
  const en = language === 'EN';
  const city = getCity(slug);
  if (!city) return null; // the server layout already 404s unknown cities
  const name = en ? city.nameEn : city.nameFr;
  const services = CITY_FEATURED_SERVICES.map((s) => getServiceBySlug(s)?.service).filter((s) => s !== undefined);
  const nearby = city.nearby.map(getCity).filter((n) => n !== undefined);

  return (
    <PageShell>
      <div className="bg-paper">
        {/* ========== Title ========== */}
        <section className="pt-8 sm:pt-10 lg:pt-14">
          <div className="container-custom flex flex-col gap-8 lg:gap-12">
            <nav aria-label={c.crumb} className="flex flex-wrap items-center gap-3 text-[14px] font-medium text-ink-soft">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">{c.home}</Link>
              <span aria-hidden="true" className="text-ink-faint">/</span>
              <Link href={CITY_HUB_PATH} className="inline-flex min-h-11 items-center hover:text-ink">{c.hub}</Link>
              <span aria-hidden="true" className="text-ink-faint">/</span>
              <span className="text-ink">{name}</span>
            </nav>

            <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-20">
              <div className="flex flex-col gap-6">
                <Eyebrow>{c.eyebrow} · {en ? city.regionEn : city.regionFr}</Eyebrow>
                <h1 className={`${DISPLAY} text-[44px] leading-none tracking-[-0.03em] sm:text-[60px] lg:text-[72px]`}>
                  {c.h1} <em className="text-leaf">{en ? city.inEn : city.inFr}</em>
                </h1>
                <p className="max-w-[560px] text-[16px] leading-[1.7] text-ink-soft lg:text-[18px]">
                  {en ? city.leadEn : city.leadFr}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href={WAITLIST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded bg-ink px-7 text-[16px] font-semibold text-white transition-colors hover:bg-ink-deep"
                  >
                    {c.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowRight /></span>
                  </a>
                  <Link href="/services" className="inline-flex min-h-11 items-center border-b border-leaf pb-1 text-[16px] font-semibold text-ink">
                    {c.allServices}
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded">
                <Image
                  src="/about/hero-street.jpg"
                  alt={en ? `A MobiSoins nurse on her way to a patient ${city.inEn}` : `Infirmière MobiSoins en route vers un patient ${city.inFr}`}
                  width={1983}
                  height={793}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="block h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== Local paragraph ========== */}
        <section className="pt-14 lg:pt-20">
          <div className="container-custom border-t border-rule pt-10 lg:pt-14">
            <p className="max-w-[860px] font-display text-[22px] font-light leading-[1.45] tracking-[-0.01em] text-ink lg:text-[30px]">
              {en ? city.localEn : city.localFr}
            </p>
          </div>
        </section>

        {/* ========== Most requested services ========== */}
        <section className="py-14 lg:py-20">
          <div className="container-custom flex flex-col gap-8">
            <h2 className={`${DISPLAY} text-[32px] leading-[1.06] lg:text-[44px]`}>{c.servicesTitle(city)}</h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-md border border-rule bg-white p-6 transition-colors hover:border-leaf"
                  >
                    <h3 className="font-sans text-[18px] font-semibold leading-[1.3] tracking-normal text-ink">
                      {serviceSearchName(s.slug, language)}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-ink-soft">{en ? s.shortEn : s.shortFr}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[14px] font-semibold text-leaf-text">
                      {c.more}
                      <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========== Neighbourhoods ========== */}
        {city.areas.length > 0 && (
          <section className="pb-14 lg:pb-20">
            <div className="container-custom grid grid-cols-1 gap-y-6 border-t border-rule pt-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-x-24 lg:pt-14">
              <h2 className={`${DISPLAY} text-[32px] leading-[1.06] lg:text-[44px]`}>{c.areasTitle(city)}</h2>
              <ul className="m-0 flex list-none flex-wrap content-start gap-2.5 p-0">
                {city.areas.map((a) => (
                  <li key={a} className="rounded-full bg-leaf-tint px-4 py-2.5 text-[15px] font-medium text-leaf-text">{a}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ========== How it works ========== */}
        <section className="pb-14 lg:pb-20">
          <div className="container-custom grid grid-cols-1 gap-y-6 border-t border-rule pt-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-x-24 lg:pt-14">
            <h2 className={`${DISPLAY} text-[32px] leading-[1.06] lg:text-[44px]`}>{c.howTitle}</h2>
            <ol className="m-0 flex list-none flex-col p-0">
              {c.steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[52px_minmax(0,1fr)] items-baseline gap-x-4 border-b border-rule py-6 lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-x-6">
                  <span className="font-display text-[32px] font-light leading-none text-ink-faint lg:text-[40px]">0{i + 1}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-[18px] font-semibold tracking-normal text-ink">{s.t}</h3>
                    <p className="text-[15px] leading-[1.6] text-ink-soft">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="pb-14 lg:pb-20">
          <div className="container-custom grid grid-cols-1 gap-y-6 border-t border-rule pt-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-x-24 lg:pt-14">
            <h2 className={`${DISPLAY} text-[32px] leading-[1.06] lg:text-[44px]`}>{c.faqTitle(city)}</h2>
            <div className="flex flex-col">
              {c.faq(city).map((f) => (
                <div key={f.q} className="border-b border-rule py-5">
                  <h3 className="font-sans text-[18px] font-semibold tracking-normal text-ink">{f.q}</h3>
                  <p className="mt-2 text-[16px] leading-[1.65] text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Nearby ========== */}
        {nearby.length > 0 && (
          <section className="pb-16 lg:pb-24">
            <div className="container-custom flex flex-col gap-4 border-t border-rule pt-10">
              <h2><Eyebrow>{c.nearbyTitle(city)}</Eyebrow></h2>
              <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={cityPath(n.slug)} className="inline-flex min-h-11 items-center text-[17px] font-medium text-ink underline decoration-leaf underline-offset-4 hover:text-leaf-text">
                      {c.nearbyLink(n)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ========== Closing CTA ========== */}
        <section className="bg-ink py-[72px] text-white lg:py-28">
          <div className="container-custom grid grid-cols-1 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-x-[120px]">
            <h2 className="font-display text-[40px] font-light leading-none tracking-[-0.03em] text-white lg:text-[68px]">{c.ctaTitle(city)}</h2>
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
