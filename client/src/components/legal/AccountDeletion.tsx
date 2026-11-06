'use client';

import React from 'react';
import { LegalLayout } from './LegalLayout';
import { useLanguage } from '../../contexts/LanguageContext';

// Public account-deletion page. Google Play's Data safety form links here: the
// page must name the app and its developer, show the steps to request deletion
// (in the app AND without it), and say which data is deleted or kept and for
// how long. Keep it in sync with the backend purge
// (BackendApp: src/modules/account-deletion/account-deletion.service.ts) and
// the app's labels (FrontendApp: src/i18n/fr.ts → deleteAccount, dataExport).

const EMAIL = 'info@mobisoins.com';

type Item = { label: string; detail: string };

type Section = {
  title: string;
  intro?: string[];
  steps?: string[];
  items?: Item[];
  bullets?: string[];
  outro?: string[];
};

type Doc = {
  title: string;
  updatedLabel: string;
  lastUpdated: string;
  lead: string[];
  summaryTitle: string;
  summary: string[];
  sections: Section[];
  privacyHref: string;
};

const CONTENT: Record<'FR' | 'EN', Doc> = {
  FR: {
    title: 'Supprimer votre compte MobiSoins et vos données',
    updatedLabel: 'Dernière mise à jour',
    lastUpdated: '6 novembre 2026',
    lead: [
      'Cette page explique comment demander la suppression de votre compte dans l’application MobiSoins, éditée par MobiSoins Inc. (Montréal, Québec), ainsi que des données qui y sont associées.',
      'La procédure est la même pour tous les types de compte (Patient, Infirmier(ère) et Entreprise), sur Android comme sur iOS. Vous n’avez pas besoin de réinstaller l’application pour faire votre demande.',
    ],
    summaryTitle: 'En bref',
    summary: [
      'Deux façons de demander la suppression : dans l’application, ou par courriel à info@mobisoins.com.',
      'Votre compte est désactivé immédiatement et supprimé définitivement après 30 jours.',
      'Pendant ces 30 jours, vous pouvez annuler la suppression en vous reconnectant.',
      'Seuls les dossiers de visites et de paiements exigés par la loi sont conservés (7 ans), sans votre nom.',
    ],
    sections: [
      {
        title: 'Méthode 1 : dans l’application',
        steps: [
          'Ouvrez l’application MobiSoins et connectez-vous au compte à supprimer.',
          'Touchez l’onglet « Compte », en bas à droite de l’écran.',
          'Touchez votre profil (ou « Informations personnelles »).',
          'Faites défiler jusqu’en bas de l’écran et touchez « Supprimer le compte ».',
          'Confirmez deux fois : touchez « Supprimer le compte », puis « Oui, supprimer mon compte ».',
        ],
        outro: [
          'Votre compte est alors désactivé et vous êtes déconnecté. Un message confirme que le compte est programmé pour suppression.',
        ],
      },
      {
        title: 'Méthode 2 : par courriel, sans l’application',
        steps: [
          'Écrivez à info@mobisoins.com avec l’objet « Suppression de compte ».',
          'Envoyez le message depuis l’adresse courriel de votre compte. Indiquez votre nom et votre type de compte (Patient, Infirmier(ère) ou Entreprise). Si vous vous êtes inscrit avec un numéro de téléphone, indiquez ce numéro.',
          'Pour protéger votre compte, nous vérifions votre identité avant d’agir, par exemple en vous demandant de confirmer un code. Nous ne vous demanderons jamais votre mot de passe.',
          'Après la vérification, nous lançons la suppression et vous la confirmons par courriel. Le même délai de 30 jours s’applique.',
        ],
      },
      {
        title: 'Avant de supprimer votre compte',
        bullets: [
          'Réservation en cours : terminez-la ou annulez-la d’abord. L’application refuse la suppression tant qu’une visite est en cours.',
          'Infirmier(ère)s : tant que vos revenus sont en route vers votre compte bancaire, la suppression est impossible. Elle redevient possible dès que l’argent est reçu, pour que vous soyez toujours payé.',
          'Copie de vos données : vous pouvez en télécharger une copie avant de partir. Dans l’onglet « Compte », touchez votre profil, puis « Exporter mes données ».',
        ],
      },
      {
        title: 'Ce qui se passe ensuite',
        items: [
          {
            label: 'Jour 0',
            detail: 'Votre demande est enregistrée, votre compte est désactivé et vous êtes déconnecté.',
          },
          {
            label: 'Jours 1 à 30',
            detail: 'Vous pouvez changer d’avis : reconnectez-vous et la suppression est annulée automatiquement.',
          },
          {
            label: 'Après 30 jours',
            detail: 'Votre compte et vos données sont supprimés ou dépersonnalisés de façon définitive. Cette étape est irréversible. Vous pourrez ensuite créer un nouveau compte si vous le souhaitez.',
          },
        ],
      },
      {
        title: 'Données supprimées',
        intro: ['Après le délai de 30 jours, nous supprimons :'],
        items: [
          {
            label: 'Votre compte de connexion',
            detail: 'nom, adresse courriel, numéro de téléphone, mot de passe et lien avec Google ou Apple.',
          },
          {
            label: 'Votre profil et vos adresses enregistrées',
            detail: 'y compris leurs coordonnées GPS.',
          },
          {
            label: 'Votre profil santé (patients)',
            detail: 'supprimé en entier : allergies, conditions, médicaments et besoins de soins.',
          },
          {
            label: 'Vos données de position',
            detail: 'dernière position connue et données de suivi en temps réel des visites.',
          },
          {
            label: 'Vos messages',
            detail: 'les conversations échangées dans l’application.',
          },
          {
            label: 'Vos photos et documents',
            detail: 'photo de profil et, pour les infirmier(ère)s, pièces d’identité et documents de permis.',
          },
          {
            label: 'Vos enregistrements audio',
            detail: 'les enregistrements de sécurité faits depuis le Centre de sécurité.',
          },
          {
            label: 'Vos données de paiement',
            detail: 'votre profil client et vos cartes enregistrées chez notre processeur de paiement, Stripe. Pour les infirmier(ère)s : le compte de versement Stripe Connect et le compte bancaire qui y est lié.',
          },
          {
            label: 'Votre profil d’entreprise (comptes Entreprise)',
            detail: 'nom de l’organisation et coordonnées de la personne responsable.',
          },
        ],
      },
      {
        title: 'Données conservées',
        bullets: [
          'Dossiers de visites et de paiements (date, service, montant, reçu) : conservés sept (7) ans pour respecter nos obligations fiscales, comptables et de tenue de dossiers de soins. Ils sont dépersonnalisés : votre nom et vos notes sont retirés. Ils ne servent qu’à ces obligations légales.',
          'Stripe conserve ses propres registres de transactions, comme la loi l’y oblige, selon ses propres règles.',
        ],
      },
      {
        title: 'Questions',
        intro: [
          'Pour toute question sur la suppression de votre compte ou sur vos autres droits (accès, rectification, portabilité), écrivez à notre responsable de la protection des renseignements personnels : info@mobisoins.com.',
          'Pour en savoir plus, consultez notre politique de confidentialité.',
        ],
      },
    ],
    privacyHref: '/confidentialite',
  },
  EN: {
    title: 'Delete your MobiSoins account and data',
    updatedLabel: 'Last updated',
    lastUpdated: 'November 6, 2026',
    lead: [
      'This page explains how to request deletion of your account in the MobiSoins app, published by MobiSoins Inc. (Montreal, Quebec), and of the data linked to it.',
      'The process is the same for every account type (Patient, Nurse and Organization), on Android and iOS. You don’t need to reinstall the app to make a request.',
    ],
    summaryTitle: 'At a glance',
    summary: [
      'Two ways to request deletion: in the app, or by email to info@mobisoins.com.',
      'Your account is deactivated immediately and permanently deleted after 30 days.',
      'During those 30 days, you can cancel the deletion by signing back in.',
      'Only the visit and payment records the law requires are kept (7 years), without your name.',
    ],
    sections: [
      {
        title: 'Method 1: in the app',
        steps: [
          'Open the MobiSoins app and sign in to the account you want to delete.',
          'Tap the "Account" tab, at the bottom right of the screen.',
          'Tap your profile (or "Personal information").',
          'Scroll to the bottom of the screen and tap "Delete account".',
          'Confirm twice: tap "Delete account", then "Yes, delete my account".',
        ],
        outro: [
          'Your account is then deactivated and you are signed out. A message confirms that the account is scheduled for deletion.',
        ],
      },
      {
        title: 'Method 2: by email, without the app',
        steps: [
          'Email info@mobisoins.com with the subject "Account deletion".',
          'Send it from your account’s email address. Include your name and account type (Patient, Nurse or Organization). If you signed up with a phone number, include that number.',
          'To protect your account, we verify your identity before acting, for example by asking you to confirm a code. We will never ask for your password.',
          'Once verified, we start the deletion and confirm it by email. The same 30-day period applies.',
        ],
      },
      {
        title: 'Before you delete your account',
        bullets: [
          'Booking in progress: complete or cancel it first. The app refuses deletion while a visit is in progress.',
          'Nurses: while your earnings are on their way to your bank account, deletion is blocked. It becomes possible as soon as the money arrives, so you always get paid.',
          'Copy of your data: you can download a copy before you leave. In the "Account" tab, tap your profile, then "Export my data".',
        ],
      },
      {
        title: 'What happens next',
        items: [
          {
            label: 'Day 0',
            detail: 'Your request is recorded, your account is deactivated and you are signed out.',
          },
          {
            label: 'Days 1 to 30',
            detail: 'You can change your mind: sign back in and the deletion is cancelled automatically.',
          },
          {
            label: 'After 30 days',
            detail: 'Your account and data are permanently deleted or de-identified. This step cannot be undone. You can create a new account afterwards if you wish.',
          },
        ],
      },
      {
        title: 'Data we delete',
        intro: ['After the 30-day period, we delete:'],
        items: [
          {
            label: 'Your sign-in account',
            detail: 'name, email address, phone number, password and link to Google or Apple.',
          },
          {
            label: 'Your profile and saved addresses',
            detail: 'including their GPS coordinates.',
          },
          {
            label: 'Your health profile (patients)',
            detail: 'deleted in full: allergies, conditions, medications and care needs.',
          },
          {
            label: 'Your location data',
            detail: 'last known location and real-time visit tracking data.',
          },
          {
            label: 'Your messages',
            detail: 'conversations exchanged in the app.',
          },
          {
            label: 'Your photos and documents',
            detail: 'profile photo and, for nurses, ID and licence documents.',
          },
          {
            label: 'Your audio recordings',
            detail: 'safety recordings made from the Safety Centre.',
          },
          {
            label: 'Your payment data',
            detail: 'your customer profile and saved cards with our payment processor, Stripe. For nurses: the Stripe Connect payout account and the bank account linked to it.',
          },
          {
            label: 'Your organization profile (Organization accounts)',
            detail: 'organization name and the contact details of the person in charge.',
          },
        ],
      },
      {
        title: 'Data we keep',
        bullets: [
          'Visit and payment records (date, service, amount, receipt): kept for seven (7) years to meet our tax, accounting and care-record obligations. They are de-identified: your name and notes are removed. They are used for these legal obligations only.',
          'Stripe keeps its own transaction records, as the law requires, under its own rules.',
        ],
      },
      {
        title: 'Questions',
        intro: [
          'For any question about deleting your account or about your other rights (access, correction, portability), email our privacy officer: info@mobisoins.com.',
          'To learn more, read our privacy policy.',
        ],
      },
    ],
    privacyHref: '/en/confidentialite',
  },
};

// Turns the contact email and the "privacy policy" phrase into links.
function rich(text: string, privacyHref: string): React.ReactNode {
  const parts = text.split(/(info@mobisoins.com|politique de confidentialité|privacy policy)/);
  return parts.map((part, i) => {
    if (part === EMAIL) {
      return (
        <a key={i} href={`mailto:${EMAIL}?subject=${encodeURIComponent('Suppression de compte / Account deletion')}`}>
          {EMAIL}
        </a>
      );
    }
    if (part === 'politique de confidentialité' || part === 'privacy policy') {
      return (
        <a key={i} href={privacyHref}>
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export const AccountDeletion = () => {
  const { language } = useLanguage();
  const doc = CONTENT[language];
  const r = (text: string) => rich(text, doc.privacyHref);
  return (
    <LegalLayout title={doc.title} lastUpdated={doc.lastUpdated} updatedLabel={doc.updatedLabel}>
      {doc.lead.map((para) => (
        <p key={para}>{r(para)}</p>
      ))}

      <section className="rounded-lg border border-[#0a1f38]/15 bg-[#f5f8fa] px-6 py-5">
        <h2>{doc.summaryTitle}</h2>
        <ul>
          {doc.summary.map((line) => (
            <li key={line}>{r(line)}</li>
          ))}
        </ul>
      </section>

      {doc.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.intro?.map((para) => (
            <p key={para}>{r(para)}</p>
          ))}
          {section.steps && (
            <ol className="mb-4 list-decimal pl-6">
              {section.steps.map((step) => (
                <li key={step}>{r(step)}</li>
              ))}
            </ol>
          )}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>{language === 'FR' ? ' : ' : ': '}{r(item.detail)}
                </li>
              ))}
            </ul>
          )}
          {section.bullets && (
            <ul>
              {section.bullets.map((line) => (
                <li key={line}>{r(line)}</li>
              ))}
            </ul>
          )}
          {section.outro?.map((para) => (
            <p key={para}>{r(para)}</p>
          ))}
        </section>
      ))}
    </LegalLayout>
  );
};
