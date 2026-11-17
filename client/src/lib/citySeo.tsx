import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITY_HUB_PATH, allCitySlugs, cityPath, getCity } from '../data/cities';
import { absoluteUrl, jsonLd, pageMetadata } from './seo';
import { ORGANIZATION_ID } from './organizationLd';
import { localizePath } from './i18n';
import type { Language } from './i18n';
import { CITY_HUB_DESCRIPTION, CITY_HUB_TITLE, citySearchDescription, citySearchTitle } from './citySearch';

export type CityParams = Promise<{ city: string }>;

export const cityStaticParams = () => allCitySlugs().map((city) => ({ city }));

const CITY_IMAGE = '/about/hero-street.jpg';

export const cityHubMetadata = (lang: Language): Metadata =>
  pageMetadata({ title: CITY_HUB_TITLE[lang], description: CITY_HUB_DESCRIPTION[lang], path: CITY_HUB_PATH, lang, image: CITY_IMAGE });

export async function cityMetadata(params: CityParams, lang: Language): Promise<Metadata> {
  const city = getCity((await params).city);
  if (!city) return {};
  return pageMetadata({
    title: citySearchTitle(city.slug, lang),
    description: citySearchDescription(city.slug, lang),
    path: cityPath(city.slug),
    lang,
    image: CITY_IMAGE,
  });
}

/** Server layout body for a city page: 404 on unknown slugs, plus its structured data. */
export async function CityLayout({ children, params, lang }: { children: React.ReactNode; params: CityParams; lang: Language }) {
  const city = getCity((await params).city);
  if (!city) notFound();
  const en = lang === 'EN';
  const url = (path: string) => absoluteUrl(localizePath(path, lang));
  const places = (city.municipalities ?? [city.nameFr]).map((name) => ({
    '@type': 'City',
    name,
    containedInPlace: { '@type': 'State', name: 'Québec', containedInPlace: { '@type': 'Country', name: 'Canada' } },
  }));
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url(cityPath(city.slug))}#service`,
        serviceType: en ? 'Home nursing care' : 'Soins infirmiers à domicile',
        name: citySearchTitle(city.slug, lang),
        description: en ? city.leadEn : city.leadFr,
        url: url(cityPath(city.slug)),
        provider: { '@id': ORGANIZATION_ID },
        areaServed: places,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Accueil', item: url('/') },
          { '@type': 'ListItem', position: 2, name: en ? 'Service areas' : 'Secteurs desservis', item: url(CITY_HUB_PATH) },
          { '@type': 'ListItem', position: 3, name: en ? city.nameEn : city.nameFr, item: url(cityPath(city.slug)) },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      {children}
    </>
  );
}
