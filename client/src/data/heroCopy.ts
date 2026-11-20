// Homepage hero copy (FR + EN), kept apart so a test can guard it.
//
// 2026-11-19, owner: the headline is "Une infirmière à domicile en un clic"
// (the "un clic" promise of the ads), NOT a city name, but the hero must still
// say we serve Montréal AND its surroundings, in Québec: "very important".
// So the place lives in the eyebrow (rendered INSIDE the <h1>, which keeps
// "Montréal" in the page's main heading for search) and in the line under it.
// Only name areas from src/data/cities.ts (Laval, Longueuil, Rive-Sud,
// Rive-Nord are all covered there).
export const HERO_COPY = {
  FR: {
    badge: 'Infirmières autorisées OIIQ · Grand Montréal, Québec',
    title: 'Une infirmière à domicile',
    titleHighlight: 'en un clic',
    subtitle:
      'Des infirmières autorisées chez vous, à Montréal et ses environs : Laval, Longueuil, Rive-Sud et Rive-Nord, au Québec.',
    subtitleShort: 'Des infirmières autorisées chez vous, partout dans le Grand Montréal, au Québec.',
  },
  EN: {
    badge: 'Licensed OIIQ nurses · Greater Montreal, Quebec',
    title: 'A home care nurse',
    titleHighlight: 'in one click',
    subtitle:
      'Licensed nurses at your door in Montreal and the surrounding area: Laval, Longueuil, the South Shore and the North Shore, Quebec.',
    subtitleShort: 'Licensed nurses at your door, across Greater Montreal, Quebec.',
  },
} as const;
