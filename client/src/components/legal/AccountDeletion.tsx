'use client';

import { LegalLayout } from './LegalLayout';
import { useLanguage } from '../../contexts/LanguageContext';

// Public account-deletion page: Google Play requires a web link where users can
// request deletion of their account and data without reinstalling the app.
const CONTENT = {
  FR: {
    title: 'Supprimer votre compte MobiSoins',
    updatedLabel: 'Dernière mise à jour',
    lastUpdated: '4 novembre 2026',
    sections: [
      {
        title: 'Dans l’application',
        body: [
          'Ouvrez l’application MobiSoins et connectez-vous.',
          'Ouvrez l’onglet Compte, touchez votre profil (ou « Informations personnelles »), puis Supprimer le compte, et confirmez.',
          'Votre compte est désactivé immédiatement et supprimé définitivement après 30 jours. Si vous vous reconnectez avant ce délai, la suppression est annulée.',
        ],
      },
      {
        title: 'Sans l’application',
        body: [
          'Écrivez à privacy@mobisoins.com depuis l’adresse courriel de votre compte, avec l’objet « Suppression de compte ». Si votre compte utilise un numéro de téléphone, indiquez-le dans le message.',
          'Nous vérifions votre identité, puis nous supprimons votre compte et vous le confirmons par courriel dans un délai de 30 jours.',
        ],
      },
      {
        title: 'Données supprimées',
        body: [
          'Votre profil, vos coordonnées, vos adresses, vos données de santé, vos données de localisation, vos messages et vos documents sont effacés ou anonymisés dans un délai de 30 jours.',
        ],
      },
      {
        title: 'Données conservées',
        body: [
          'Les reçus de paiement et les pièces comptables liées aux visites complétées sont conservés sept (7) ans, comme l’exige la loi. Ils ne servent qu’à cette fin.',
          'Une réservation en cours doit être terminée ou annulée avant la suppression.',
        ],
      },
    ],
  },
  EN: {
    title: 'Delete your MobiSoins account',
    updatedLabel: 'Last updated',
    lastUpdated: 'November 4, 2026',
    sections: [
      {
        title: 'In the app',
        body: [
          'Open the MobiSoins app and sign in.',
          'Open the Account tab, tap your profile (or "Personal information"), then Delete account, and confirm.',
          'Your account is deactivated immediately and permanently deleted after 30 days. If you sign back in before then, the deletion is cancelled.',
        ],
      },
      {
        title: 'Without the app',
        body: [
          'Email privacy@mobisoins.com from your account’s email address with the subject “Account deletion”. If your account uses a phone number, include it in the message.',
          'We verify your identity, then delete your account and confirm by email within 30 days.',
        ],
      },
      {
        title: 'Data we delete',
        body: [
          'Your profile, contact details, addresses, health data, location data, messages and documents are erased or anonymized within 30 days.',
        ],
      },
      {
        title: 'Data we keep',
        body: [
          'Payment receipts and accounting records for completed visits are kept for seven (7) years, as the law requires. They are used for that purpose only.',
          'A booking in progress must be completed or cancelled before deletion.',
        ],
      },
    ],
  },
} as const;

export const AccountDeletion = () => {
  const { language } = useLanguage();
  const doc = CONTENT[language];
  return (
    <LegalLayout title={doc.title} lastUpdated={doc.lastUpdated} updatedLabel={doc.updatedLabel}>
      {doc.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </section>
      ))}
    </LegalLayout>
  );
};
