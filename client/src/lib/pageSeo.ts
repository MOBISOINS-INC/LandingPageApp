import type { Metadata } from 'next';
import { pageMetadata } from './seo';
import type { Language } from './i18n';

/** Titles and descriptions for the fixed pages, in both languages. */
const PAGES = {
  home: {
    path: '/',
    FR: ['Soins infirmiers à domicile à Montréal, Québec', 'Soins infirmiers à domicile par des infirmières membres de l’OIIQ à Montréal, Laval et Longueuil. Réservez dans l’app MobiSoins, sur l’App Store et Google Play.'],
    EN: ['Home Nursing Care in Montreal, Quebec', 'Home nursing care by OIIQ-licensed nurses in Montreal, Laval and Longueuil. Book in the MobiSoins app, on the App Store and Google Play.'],
  },
  apropos: {
    path: '/apropos',
    FR: ['À propos : soins infirmiers à domicile à Montréal', 'Qui est derrière MobiSoins : une équipe québécoise qui offre des soins infirmiers à domicile à Montréal, Laval et Longueuil, par des infirmières de l’OIIQ.'],
    EN: ['About Us: Home Nursing in Montreal', 'Who is behind MobiSoins: a Quebec team offering home nursing care in Montreal, Laval and Longueuil, delivered by OIIQ-licensed nurses.'],
  },
  contact: {
    path: '/contact',
    FR: ['Contact : infirmière à domicile à Montréal', 'Une question sur les soins infirmiers à domicile à Montréal, Laval ou Longueuil, ou un partenariat ? Écrivez à l’équipe MobiSoins.'],
    EN: ['Contact: Home Nurse in Montreal', 'A question about home nursing care in Montreal, Laval or Longueuil, or a partnership? Write to the MobiSoins team.'],
  },
  faq: {
    path: '/faq',
    FR: ['Questions fréquentes : soins à domicile à Montréal', 'Réservation, infirmières OIIQ, secteurs desservis (Montréal, Laval, Longueuil), reçus d’assurance : les réponses aux questions fréquentes.'],
    EN: ['FAQ: Home Nursing Care in Montreal', 'Booking, OIIQ nurses, service areas (Montreal, Laval, Longueuil), insurance receipts: answers to common questions about MobiSoins.'],
  },
  services: {
    path: '/services',
    FR: ['Tous nos services infirmiers à domicile à Montréal', 'Prises de sang, pansements, vaccins, suivi du diabète et de la tension, soins aux aînés : à domicile à Montréal, Laval et Longueuil.'],
    EN: ['All Our Home Nursing Services in Montreal', 'Blood draws, dressings, vaccines, diabetes and blood-pressure follow-up, senior care: at home in Montreal, Laval and Longueuil.'],
  },
  articles: {
    path: '/articles',
    FR: ['Articles et guides santé à domicile au Québec', 'Guides pratiques sur les soins infirmiers à domicile à Montréal et au Québec, la télésanté et le soutien aux aînés, par l’équipe MobiSoins.'],
    EN: ['Home Health Articles and Guides, Quebec', 'Practical guides on home nursing care in Montreal and Quebec, telehealth and supporting seniors, written by the MobiSoins team.'],
  },
  confidentialite: {
    path: '/confidentialite',
    FR: ['Politique de confidentialité', 'Comment MobiSoins recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25 du Québec.'],
    EN: ['Privacy Policy', 'How MobiSoins collects, uses and protects your personal information, in compliance with Quebec’s Law 25.'],
  },
  conditions: {
    path: '/conditions',
    FR: ['Conditions d’utilisation', 'Les conditions qui encadrent l’utilisation du site et des services MobiSoins.'],
    EN: ['Terms of Service', 'The terms that govern the use of the MobiSoins website and services.'],
  },
  cookies: {
    path: '/cookies',
    FR: ['Politique relative aux témoins', 'Les témoins (cookies) utilisés sur le site MobiSoins et comment gérer vos préférences.'],
    EN: ['Cookie Policy', 'The cookies used on the MobiSoins website and how to manage your preferences.'],
  },
  'suppression-compte': {
    path: '/suppression-compte',
    FR: ['Supprimer votre compte', 'Comment supprimer votre compte MobiSoins et vos données, dans l’application ou par courriel.'],
    EN: ['Delete your account', 'How to delete your MobiSoins account and data, in the app or by email.'],
  },
} as const;

export type StaticPage = keyof typeof PAGES;

export function staticPageMetadata(page: StaticPage, lang: Language): Metadata {
  const entry = PAGES[page];
  const [title, description] = entry[lang];
  return pageMetadata({ title, description, path: entry.path, lang });
}
