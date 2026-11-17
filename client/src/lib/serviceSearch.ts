/**
 * What search engines show for each service page: the <title> and the meta
 * description. Kept apart from data/services.ts, which mirrors the app's
 * catalog wording ("Grippe", "Prise de sang"), because catalog names that work
 * inside a category list are ambiguous or identical once they stand alone in
 * Google: "Grippe à domicile" reads as "flu at home", and the check-up and lab
 * blood draws had the same title. Every title names the city.
 *
 * Plain module (no JSX, no Next imports) so `npm test` can check every title.
 */
import { getServiceBySlug } from '../data/services.ts';
import type { Language } from './i18n.ts';

/** City in every service title: the main search term after the service itself. */
export const TITLE_CITY = { FR: 'Montréal', EN: 'Montreal' } as const;

/** The three launch cities named in service descriptions (all served areas: data/cities.ts). */
export const AREA_PHRASE = { FR: 'Montréal, Laval et Longueuil', EN: 'Montreal, Laval and Longueuil' } as const;

/** Google cuts meta descriptions around 155-160 characters. */
export const MAX_DESCRIPTION = 158;

/**
 * Search-facing name, where the catalog name is not clear enough on its own.
 * Services not listed here use their catalog name.
 */
const SEARCH_NAMES: Record<string, { FR: string; EN: string }> = {
  catheters: { FR: 'Soins de cathéter', EN: 'Catheter care' },
  'medication-im-sc': { FR: 'Injections IM/SC', EN: 'IM/SC injections' },
  grippe: { FR: 'Vaccin contre la grippe', EN: 'Flu shot' },
  covid: { FR: 'Vaccin COVID-19', EN: 'COVID-19 vaccine' },
  voyage: { FR: 'Vaccins voyage', EN: 'Travel vaccines' },
  'carnet-vaccinal': { FR: 'Mise à jour du carnet vaccinal', EN: 'Vaccination record update' },
  'suivi-diabete': { FR: 'Suivi du diabète', EN: 'Diabetes follow-up' },
  'suivi-tension': { FR: 'Suivi de la tension artérielle', EN: 'Blood-pressure monitoring' },
  'bilan-complet': { FR: 'Bilan de santé complet', EN: 'Complete health check-up' },
  // The two blood draws: one for a prescribed check-up requisition, one for lab analysis.
  'prise-sang': { FR: 'Prise de sang sur ordonnance', EN: 'Prescribed blood test' },
  'prise-sang-labo': { FR: 'Prélèvement sanguin pour le labo', EN: 'Blood sample for lab analysis' },
  'depistage-its': { FR: 'Dépistage ITSS (MST)', EN: 'STI screening' },
  'consultation-conseil': { FR: 'Consultation en santé sexuelle', EN: 'Sexual-health consultation' },
  'suivi-contraception': { FR: 'Suivi de la contraception', EN: 'Contraception follow-up' },
  'vaccins-enfant': { FR: 'Vaccins pour enfants', EN: 'Children’s vaccines' },
  'suivi-bebe': { FR: 'Suivi de bébé', EN: 'Baby follow-up' },
  'soins-domicile-aines': { FR: 'Soins infirmiers pour aînés', EN: 'Nursing care for seniors' },
  'suivi-tension-aines': { FR: 'Suivi de la tension des aînés', EN: 'Seniors’ blood-pressure checks' },
  'aide-medication': { FR: 'Aide à la médication', EN: 'Medication assistance' },
  'analyse-urine': { FR: 'Analyse d’urine', EN: 'Urine test' },
};

/** Corporate services happen at the workplace, not at home. */
const isCorporate = (categoryId: string) => categoryId === 'enterprises';

export function serviceSearchName(slug: string, lang: Language): string {
  const found = getServiceBySlug(slug);
  if (!found) throw new Error(`serviceSearchName: unknown service "${slug}"`);
  return SEARCH_NAMES[slug]?.[lang] ?? (lang === 'EN' ? found.service.nameEn : found.service.nameFr);
}

/** "Vaccin contre la grippe à domicile à Montréal" / "Flu shot at home in Montreal" (brand added by pageMetadata). */
export function serviceSearchTitle(slug: string, lang: Language): string {
  const found = getServiceBySlug(slug);
  if (!found) throw new Error(`serviceSearchTitle: unknown service "${slug}"`);
  const name = serviceSearchName(slug, lang);
  const corporate = isCorporate(found.category.id);
  if (lang === 'EN') return `${name} ${corporate ? 'at work' : 'at home'} in ${TITLE_CITY.EN}`;
  return `${name} ${corporate ? 'en entreprise' : 'à domicile'} à ${TITLE_CITY.FR}`;
}

/** Cut at a word boundary so the description fits in a search result. */
export function clampDescription(text: string, max = MAX_DESCRIPTION): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[\s,;:.–-]+$/, '')}…`;
}

/** Where and by whom first (what a searcher scans for), then what the care is. */
export function serviceSearchDescription(slug: string, lang: Language): string {
  const found = getServiceBySlug(slug);
  if (!found) throw new Error(`serviceSearchDescription: unknown service "${slug}"`);
  const { service, category } = found;
  const corporate = isCorporate(category.id);
  const lead =
    lang === 'EN'
      ? `${corporate ? 'At your workplace' : 'At home'} in ${AREA_PHRASE.EN}, by an OIIQ-licensed nurse.`
      : `${corporate ? 'En entreprise' : 'À domicile'} à ${AREA_PHRASE.FR} par une infirmière de l’OIIQ.`;
  return clampDescription(`${lead} ${lang === 'EN' ? service.shortEn : service.shortFr}`);
}
