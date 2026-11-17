/**
 * Search-facing title and description for the service-area pages
 * (/infirmiere-a-domicile and /infirmiere-a-domicile/<city>). Plain module so
 * `npm test` can check every one.
 */
import { getCity } from '../data/cities.ts';
import type { Language } from './i18n.ts';
import { clampDescription } from './serviceSearch.ts';

/** "Infirmière à domicile à Laval" / "Home Care Nurse in Laval" (brand added by pageMetadata). */
export function citySearchTitle(slug: string, lang: Language): string {
  const city = getCity(slug);
  if (!city) throw new Error(`citySearchTitle: unknown city "${slug}"`);
  return lang === 'EN' ? `Home Care Nurse ${city.inEn}` : `Infirmière à domicile ${city.inFr}`;
}

export function citySearchDescription(slug: string, lang: Language): string {
  const city = getCity(slug);
  if (!city) throw new Error(`citySearchDescription: unknown city "${slug}"`);
  return clampDescription(
    lang === 'EN'
      ? `An OIIQ-licensed nurse at home ${city.inEn}: blood tests, dressings, vaccines, diabetes follow-up and senior care. Join the MobiSoins waitlist.`
      : `Une infirmière membre de l’OIIQ à domicile ${city.inFr} : prises de sang, pansements, vaccins, suivi du diabète et soins aux aînés. Liste d’attente MobiSoins.`,
  );
}

export const CITY_HUB_TITLE = {
  FR: 'Infirmière à domicile dans le Grand Montréal : secteurs',
  EN: 'Home Care Nurse in Greater Montreal: Service Areas',
} as const;

export const CITY_HUB_DESCRIPTION = {
  FR: clampDescription('Soins infirmiers à domicile à Montréal, Laval, Longueuil, sur la Rive-Sud et la Rive-Nord : trouvez votre ville et inscrivez-vous à la liste d’attente.'),
  EN: clampDescription('Home nursing care in Montreal, Laval, Longueuil and on the South and North Shores: find your city and join the MobiSoins waitlist.'),
} as const;
