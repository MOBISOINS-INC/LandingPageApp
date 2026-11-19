/**
 * Service areas: one landing page per city at /infirmiere-a-domicile/<slug>
 * (English twin under /en). Confirmed by the owner on 2026-11-17: these are
 * places a nurse can actually go.
 *
 * Every page carries its own wording (lead + local paragraph) and its own
 * neighbourhoods and neighbours, so the pages are not copies of one another
 * with the city name swapped; Google treats such copies as doorway pages.
 * Neighbourhoods are listed only where they are official boroughs/sectors or
 * well-established names; when in doubt, none are listed.
 *
 * General, factual wording only: no prices, no wait-time promises, no clinic
 * names. Booking is open in all of them (site FAQ); other cities use the out-of-area email form.
 */

export interface City {
  slug: string;
  /** Proper name as shown: "Montréal" / "Montreal". */
  nameFr: string;
  nameEn: string;
  /** Name with its preposition, for titles and sentences: "à Laval", "dans l’Ouest-de-l’Île". */
  inFr: string;
  inEn: string;
  regionFr: string;
  regionEn: string;
  /** Municipalities a page stands for when it covers several (schema areaServed). Defaults to the city itself. */
  municipalities?: string[];
  leadFr: string;
  leadEn: string;
  localFr: string;
  localEn: string;
  /** Official boroughs/sectors or well-established neighbourhood names. Proper nouns, same in both languages. */
  areas: string[];
  /** Slugs of nearby service-area pages, linked at the foot of the page. */
  nearby: string[];
}

export const CITIES: City[] = [
  {
    slug: 'montreal',
    nameFr: 'Montréal', nameEn: 'Montreal',
    inFr: 'à Montréal', inEn: 'in Montreal',
    regionFr: 'Île de Montréal', regionEn: 'Island of Montreal',
    leadFr: 'Prise de sang, pansement, vaccin ou visite auprès d’un parent âgé : une infirmière membre de l’OIIQ vient chez vous, dans tous les arrondissements de Montréal, sans salle d’attente ni déplacement.',
    leadEn: 'A blood test, a dressing change, a vaccine or a visit to an aging parent: an OIIQ-licensed nurse comes to your home, in every Montreal borough, with no waiting room and no trip across town.',
    localFr: 'Notre bureau est à LaSalle, au cœur du territoire que nous desservons. Que vous habitiez un appartement du Plateau, une maison de Rivière-des-Prairies ou une résidence pour aînés de Côte-des-Neiges, le soin se fait chez vous, au moment qui vous convient.',
    localEn: 'Our office is in LaSalle, at the heart of the area we serve. Whether you live in a Plateau walk-up, a house in Rivière-des-Prairies or a seniors’ residence in Côte-des-Neiges, the care happens at home, at a time that suits you.',
    areas: [
      'Ahuntsic-Cartierville', 'Anjou', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Lachine', 'LaSalle',
      'Le Plateau-Mont-Royal', 'Le Sud-Ouest', 'L’Île-Bizard–Sainte-Geneviève', 'Mercier–Hochelaga-Maisonneuve',
      'Montréal-Nord', 'Outremont', 'Pierrefonds-Roxboro', 'Rivière-des-Prairies–Pointe-aux-Trembles',
      'Rosemont–La Petite-Patrie', 'Saint-Laurent', 'Saint-Léonard', 'Verdun', 'Ville-Marie',
      'Villeray–Saint-Michel–Parc-Extension',
    ],
    nearby: ['ouest-de-l-ile', 'laval', 'longueuil', 'brossard'],
  },
  {
    slug: 'ouest-de-l-ile',
    nameFr: 'Ouest-de-l’Île', nameEn: 'West Island',
    inFr: 'dans l’Ouest-de-l’Île', inEn: 'in the West Island',
    regionFr: 'Île de Montréal', regionEn: 'Island of Montreal',
    municipalities: ['Pointe-Claire', 'Dollard-des-Ormeaux', 'Kirkland', 'Beaconsfield', 'Dorval'],
    leadFr: 'De Dorval à Beaconsfield, une infirmière membre de l’OIIQ se déplace chez vous pour vos prises de sang, pansements, vaccins et suivis, en français ou en anglais.',
    leadEn: 'From Dorval to Beaconsfield, an OIIQ-licensed nurse comes to your home for blood tests, dressings, vaccines and follow-ups, in English or French.',
    localFr: 'Dans l’Ouest-de-l’Île, les distances sont longues et les rendez-vous en clinique demandent souvent une voiture. Nos infirmières viennent à vous à Pointe-Claire, Dollard-des-Ormeaux, Kirkland, Beaconsfield et Dorval.',
    localEn: 'In the West Island, distances are long and a clinic appointment usually means a drive. Our nurses come to you in Pointe-Claire, Dollard-des-Ormeaux, Kirkland, Beaconsfield and Dorval.',
    areas: ['Pointe-Claire', 'Dollard-des-Ormeaux', 'Kirkland', 'Beaconsfield', 'Dorval'],
    nearby: ['montreal', 'vaudreuil-dorion', 'laval'],
  },
  {
    slug: 'laval',
    nameFr: 'Laval', nameEn: 'Laval',
    inFr: 'à Laval', inEn: 'in Laval',
    regionFr: 'Laval', regionEn: 'Laval',
    leadFr: 'Prise de sang, pansement, vaccin ou suivi d’un proche âgé : une infirmière membre de l’OIIQ vient chez vous, de Chomedey à Sainte-Rose, sans salle d’attente ni trajet.',
    leadEn: 'A blood test, a dressing, a vaccine or a check-in on an aging relative: an OIIQ-licensed nurse comes to your home, from Chomedey to Sainte-Rose, with no waiting room and no drive.',
    localFr: 'L’infirmière se déplace dans tous les quartiers de l’île Jésus. Indiquez votre adresse en vous inscrivant : nous vous écrivons dès qu’une visite est possible chez vous.',
    localEn: 'Our nurses travel to every part of Île Jésus. Give us your address when you sign up and we will let you know as soon as a visit is available where you live.',
    areas: [
      'Chomedey', 'Laval-des-Rapides', 'Pont-Viau', 'Vimont', 'Auteuil', 'Sainte-Rose', 'Fabreville',
      'Sainte-Dorothée', 'Laval-Ouest', 'Duvernay', 'Saint-François', 'Saint-Vincent-de-Paul', 'Îles-Laval',
    ],
    nearby: ['montreal', 'terrebonne', 'blainville', 'repentigny'],
  },
  {
    slug: 'longueuil',
    nameFr: 'Longueuil', nameEn: 'Longueuil',
    inFr: 'à Longueuil', inEn: 'in Longueuil',
    regionFr: 'Rive-Sud', regionEn: 'South Shore',
    leadFr: 'Une infirmière membre de l’OIIQ vient chez vous dans le Vieux-Longueuil, à Saint-Hubert ou à Greenfield Park : prises de sang, pansements, vaccins et suivis à domicile.',
    leadEn: 'An OIIQ-licensed nurse comes to your home in Old Longueuil, Saint-Hubert or Greenfield Park: blood tests, dressings, vaccines and follow-ups, without leaving the house.',
    localFr: 'Plus besoin de traverser le pont ni de chercher un stationnement près d’une clinique pour un soin de quelques minutes. L’infirmière apporte le matériel nécessaire et le soin se fait dans le confort de votre maison.',
    localEn: 'No more crossing the bridge or hunting for parking near a clinic for a few minutes of care. The nurse brings everything needed and the care happens in the comfort of your home.',
    areas: ['Le Vieux-Longueuil', 'Saint-Hubert', 'Greenfield Park', 'LeMoyne'],
    nearby: ['brossard', 'saint-lambert', 'boucherville', 'montreal'],
  },
  {
    slug: 'brossard',
    nameFr: 'Brossard', nameEn: 'Brossard',
    inFr: 'à Brossard', inEn: 'in Brossard',
    regionFr: 'Rive-Sud', regionEn: 'South Shore',
    leadFr: 'Vaccins des enfants, prise de sang sur ordonnance ou suivi de la tension : à Brossard, ces soins se font chez vous, avec une infirmière membre de l’OIIQ.',
    leadEn: 'Children’s vaccines, a prescribed blood test or blood-pressure checks: in Brossard, this care happens in your own home, with an OIIQ-licensed nurse.',
    localFr: 'Une visite à domicile évite les embouteillages du boulevard Taschereau et l’attente en clinique, un avantage réel pour les aînés, les nouveaux parents et les personnes qui se remettent d’une chirurgie.',
    localEn: 'A home visit spares you the traffic on Taschereau Boulevard and the wait at a clinic, a real help for seniors, new parents and anyone recovering from surgery.',
    areas: [],
    nearby: ['longueuil', 'saint-lambert', 'chateauguay', 'montreal'],
  },
  {
    slug: 'saint-lambert',
    nameFr: 'Saint-Lambert', nameEn: 'Saint-Lambert',
    inFr: 'à Saint-Lambert', inEn: 'in Saint-Lambert',
    regionFr: 'Rive-Sud', regionEn: 'South Shore',
    leadFr: 'À Saint-Lambert, une infirmière membre de l’OIIQ vient chez vous pour vos soins courants : prises de sang, pansements, injections, vaccins et suivi de la tension.',
    leadEn: 'In Saint-Lambert, an OIIQ-licensed nurse comes to your home for everyday care: blood tests, dressings, injections, vaccines and blood-pressure checks.',
    localFr: 'Pour les aînés du Vieux Saint-Lambert comme pour les familles, le soin à domicile évite un déplacement pour quelques minutes de soins, et laisse le temps de poser ses questions à l’infirmière.',
    localEn: 'For seniors in Old Saint-Lambert and for busy families alike, care at home saves a trip for a few minutes of treatment, and leaves time to ask the nurse your questions.',
    areas: ['Vieux Saint-Lambert'],
    nearby: ['longueuil', 'brossard', 'montreal'],
  },
  {
    slug: 'boucherville',
    nameFr: 'Boucherville', nameEn: 'Boucherville',
    inFr: 'à Boucherville', inEn: 'in Boucherville',
    regionFr: 'Rive-Sud', regionEn: 'South Shore',
    leadFr: 'À Boucherville, une infirmière membre de l’OIIQ se déplace chez vous pour une prise de sang, un pansement, un vaccin ou le suivi d’un parent âgé.',
    leadEn: 'In Boucherville, an OIIQ-licensed nurse comes to your home for a blood test, a dressing, a vaccine or a check-in on an aging parent.',
    localFr: 'Du Vieux-Boucherville aux quartiers plus récents, l’infirmière apporte le matériel stérile et vous explique chaque étape, sans que vous ayez à quitter la maison.',
    localEn: 'From Old Boucherville to the newer neighbourhoods, the nurse brings sterile supplies and explains every step, without you having to leave home.',
    areas: ['Vieux-Boucherville'],
    nearby: ['longueuil', 'saint-lambert', 'montreal'],
  },
  {
    slug: 'terrebonne',
    nameFr: 'Terrebonne', nameEn: 'Terrebonne',
    inFr: 'à Terrebonne', inEn: 'in Terrebonne',
    regionFr: 'Rive-Nord', regionEn: 'North Shore',
    leadFr: 'À Terrebonne, Lachenaie et La Plaine, une infirmière membre de l’OIIQ vient chez vous pour vos prises de sang, pansements, vaccins et suivis de santé.',
    leadEn: 'In Terrebonne, Lachenaie and La Plaine, an OIIQ-licensed nurse comes to your home for blood tests, dressings, vaccines and health follow-ups.',
    localFr: 'Sur la Rive-Nord, un rendez-vous en clinique peut prendre une demi-journée entre le trajet et l’attente. À domicile, le soin se fait à l’heure convenue, chez vous.',
    localEn: 'On the North Shore, a clinic appointment can take half a day between the drive and the wait. At home, the care happens at the agreed time, where you live.',
    areas: ['Vieux-Terrebonne', 'Lachenaie', 'La Plaine'],
    nearby: ['laval', 'repentigny', 'blainville'],
  },
  {
    slug: 'repentigny',
    nameFr: 'Repentigny', nameEn: 'Repentigny',
    inFr: 'à Repentigny', inEn: 'in Repentigny',
    regionFr: 'Rive-Nord', regionEn: 'North Shore',
    leadFr: 'À Repentigny et Le Gardeur, faites venir l’infirmière plutôt que d’aller à la clinique : une professionnelle membre de l’OIIQ s’occupe de votre prise de sang, d’un vaccin ou d’un suivi.',
    leadEn: 'In Repentigny and Le Gardeur, have the nurse come to you instead of going to the clinic: an OIIQ-licensed professional handles your blood test, a vaccine or a follow-up.',
    localFr: 'Les soins à domicile sont particulièrement utiles après une hospitalisation ou une chirurgie, quand se déplacer est difficile et que les soins doivent se répéter.',
    localEn: 'Home care is especially useful after a hospital stay or surgery, when getting around is hard and the care has to be repeated.',
    areas: ['Le Gardeur'],
    nearby: ['terrebonne', 'laval', 'montreal'],
  },
  {
    slug: 'blainville',
    nameFr: 'Blainville', nameEn: 'Blainville',
    inFr: 'à Blainville', inEn: 'in Blainville',
    regionFr: 'Rive-Nord', regionEn: 'North Shore',
    leadFr: 'Suivi du diabète, injections prescrites ou pansement après une chirurgie : à Blainville, une infirmière membre de l’OIIQ prend le relais à domicile.',
    leadEn: 'Diabetes follow-up, prescribed injections or a dressing after surgery: in Blainville, an OIIQ-licensed nurse takes care of it at your home.',
    localFr: 'Pour les familles et les proches aidants des Basses-Laurentides, le soin à domicile évite un trajet et une attente pour un geste qui dure souvent quelques minutes.',
    localEn: 'For families and caregivers in the Lower Laurentians, care at home saves a drive and a wait for something that often takes only a few minutes.',
    areas: [],
    nearby: ['laval', 'terrebonne', 'montreal'],
  },
  {
    slug: 'vaudreuil-dorion',
    nameFr: 'Vaudreuil-Dorion', nameEn: 'Vaudreuil-Dorion',
    inFr: 'à Vaudreuil-Dorion', inEn: 'in Vaudreuil-Dorion',
    regionFr: 'Vaudreuil-Soulanges', regionEn: 'Vaudreuil-Soulanges',
    leadFr: 'Une prise de sang, les vaccins de toute la famille ou une visite auprès d’un parent âgé : à Vaudreuil-Dorion, l’infirmière membre de l’OIIQ vient à la maison.',
    leadEn: 'A blood test, the whole family’s vaccines or a visit to an aging parent: in Vaudreuil-Dorion, an OIIQ-licensed nurse comes to the house.',
    localFr: 'À l’ouest de l’île de Montréal, la visite à domicile vous évite de prendre la route pour un soin court, et convient aussi bien aux aînés qu’aux familles avec de jeunes enfants.',
    localEn: 'West of the island of Montreal, a home visit spares you the drive for a short treatment, and suits seniors and families with young children alike.',
    areas: [],
    nearby: ['ouest-de-l-ile', 'chateauguay', 'montreal'],
  },
  {
    slug: 'chateauguay',
    nameFr: 'Châteauguay', nameEn: 'Châteauguay',
    inFr: 'à Châteauguay', inEn: 'in Châteauguay',
    regionFr: 'Rive-Sud', regionEn: 'South Shore',
    leadFr: 'Besoin d’un retrait de points, d’un lavage d’oreilles ou d’un vaccin ? À Châteauguay, une infirmière membre de l’OIIQ se déplace jusqu’à votre porte.',
    leadEn: 'Need stitches removed, your ears irrigated or a vaccine? In Châteauguay, an OIIQ-licensed nurse comes right to your door.',
    localFr: 'Après une chirurgie, avec un nouveau-né ou pour un parent âgé, recevoir les soins à la maison évite les déplacements répétés vers la clinique.',
    localEn: 'After surgery, with a newborn or for an aging parent, getting care at home saves repeated trips to the clinic.',
    areas: [],
    nearby: ['brossard', 'vaudreuil-dorion', 'montreal'],
  },
];

export const CITY_HUB_PATH = '/infirmiere-a-domicile';
export const cityPath = (slug: string) => `${CITY_HUB_PATH}/${slug}`;
export const getCity = (slug: string): City | undefined => CITIES.find((c) => c.slug === slug);
export const allCitySlugs = (): string[] => CITIES.map((c) => c.slug);

/** Services featured on every city page (most searched). Each must exist in data/services.ts. */
export const CITY_FEATURED_SERVICES = ['prise-sang', 'pansements', 'grippe', 'suivi-diabete', 'soins-domicile-aines', 'retrait-points'];
