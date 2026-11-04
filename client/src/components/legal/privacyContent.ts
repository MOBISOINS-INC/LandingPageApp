// Generated from FrontendApp/src/data/legal.ts (PRIVACY_FR / PRIVACY_EN) so the
// public policy and the in-app policy say the same thing. Edit the app file and
// regenerate; do not hand-edit this one.
import type { Language } from '../../lib/i18n';

export interface PrivacySection {
  title: string;
  body: string[];
}

export interface PrivacyDoc {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

export const PRIVACY: Record<Language, PrivacyDoc> = {
  "FR": {
    "title": "Politique de confidentialité",
    "lastUpdated": "4 novembre 2026",
    "sections": [
      {
        "title": "1. Introduction",
        "body": [
          "MobiSoins (« nous », « notre ») s'engage à protéger la vie privée de ses utilisateurs. La présente politique décrit les renseignements personnels que nous recueillons, les raisons de leur collecte, leur utilisation, leur communication, leur conservation, ainsi que les droits dont vous disposez.",
          "Elle s'applique à l'Application MobiSoins et aux services associés, et complète nos Conditions d'utilisation."
        ]
      },
      {
        "title": "2. Responsable et portée",
        "body": [
          "MobiSoins est responsable des renseignements personnels traités dans le cadre de l'Application. Notre responsable de la protection des renseignements personnels peut être joint à privacy@mobisoins.com.",
          "En utilisant l'Application, vous reconnaissez avoir pris connaissance de la présente politique."
        ]
      },
      {
        "title": "3. Renseignements que nous recueillons",
        "body": [
          "Données d'identité : nom, prénom, date de naissance.",
          "Données de contact : adresse courriel, numéro de téléphone, adresse postale.",
          "Données de compte : identifiants, mot de passe (haché), rôle, préférences.",
          "Données de paiement : traitées et stockées par Stripe — nous ne conservons aucun numéro de carte.",
          "Données de santé : informations communiquées dans le cadre d'une réservation (allergies, traitements, notes pour l'Infirmier).",
          "Données professionnelles (Infirmiers) : licence, ordre professionnel, qualifications et, le cas échéant, résultats de vérifications.",
          "Données techniques : adresse IP, identifiant d'appareil, type d'appareil, journaux d'utilisation.",
          "Données de localisation : adresse de la visite et, avec votre autorisation, position de votre appareil (position précise pour les Infirmiers, y compris en arrière-plan pendant une visite active). Voir la section 8."
        ]
      },
      {
        "title": "4. Comment nous recueillons vos données",
        "body": [
          "Directement auprès de vous, lorsque vous créez un compte, complétez votre profil, effectuez une réservation ou contactez le support.",
          "Automatiquement, lors de votre utilisation de l'Application (données techniques, de localisation et d'usage).",
          "Auprès de tiers, tels que nos prestataires de paiement et de vérification, dans la mesure nécessaire à la fourniture du service."
        ]
      },
      {
        "title": "5. Finalités du traitement",
        "body": [
          "Fournir, exploiter, sécuriser et améliorer le service.",
          "Gérer les comptes, les réservations, les paiements et la facturation.",
          "Communiquer avec vous (notifications de visite, support, alertes de sécurité).",
          "Vérifier l'identité et la qualification des Infirmiers.",
          "Respecter nos obligations légales, réglementaires, fiscales et comptables.",
          "Détecter, prévenir et traiter la fraude, les abus et les incidents de sécurité."
        ]
      },
      {
        "title": "6. Fondement du traitement et consentement",
        "body": [
          "Nous traitons vos renseignements personnels sur la base de votre consentement, de l'exécution de notre contrat avec vous, du respect de nos obligations légales et de nos intérêts légitimes (par exemple la sécurité et la prévention de la fraude).",
          "Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment, sans que cela n'affecte la licéité des traitements antérieurs."
        ]
      },
      {
        "title": "7. Données de santé",
        "body": [
          "Les données médicales saisies dans le cadre d'une réservation sont des renseignements sensibles. Elles sont visibles uniquement par l'Infirmier sélectionné et le Patient concerné, selon le principe du besoin de savoir.",
          "Elles ne sont jamais commercialisées ni partagées avec des tiers à des fins de marketing ou de profilage. L'accès interne est restreint et journalisé."
        ]
      },
      {
        "title": "8. Données de localisation",
        "body": [
          "Patients : nous recueillons l'adresse de la visite que vous saisissez. Si vous l'autorisez, nous utilisons aussi la position de votre appareil, uniquement lorsque l'Application est ouverte, pour placer le repère de l'adresse sur la carte. Nous n'accédons jamais à la position d'un Patient en arrière-plan.",
          "Infirmiers : nous recueillons la position précise (GPS) de votre appareil. Lorsque vous êtes en ligne et que l'Application est ouverte, elle sert à vous proposer les visites à proximité.",
          "Infirmiers, pendant une visite acceptée : MobiSoins recueille votre position en continu, y compris en arrière-plan, même lorsque l'Application est fermée ou n'est pas utilisée. Elle est partagée en temps réel avec le Patient concerné afin qu'il puisse suivre votre arrivée, et elle sert à confirmer votre arrivée au domicile du Patient. La collecte en arrière-plan s'arrête dès la fin de la visite.",
          "Avant toute demande d'accès à la position en arrière-plan, l'Application affiche un avis expliquant cette collecte et vous demande votre accord. Vous pouvez refuser ou retirer cette autorisation à tout moment dans les réglages de votre appareil ; le suivi de l'arrivée en temps réel ne sera alors plus disponible pour le Patient.",
          "Nous ne conservons pas l'historique de vos déplacements : seule la dernière position connue est enregistrée et elle est remplacée à chaque mise à jour. Les coordonnées nécessaires au calcul des itinéraires sont transmises à Mapbox.",
          "Les données de localisation ne sont jamais vendues ni utilisées à des fins publicitaires."
        ]
      },
      {
        "title": "9. Communication à des tiers",
        "body": [
          "Stripe — traitement des paiements (norme PCI-DSS).",
          "Amazon Web Services — hébergement et authentification (Cognito).",
          "Google Firebase — messagerie entre Patient et Infirmier et notifications.",
          "Mapbox — cartes et calcul des itinéraires.",
          "Sentry — rapports de plantage et diagnostics techniques, sans données de santé.",
          "Infirmiers acceptés sur la plateforme — uniquement les informations strictement nécessaires à la visite.",
          "Conseillers, auditeurs ou acquéreurs potentiels — dans le cadre d'une opération d'entreprise, sous conditions de confidentialité.",
          "Autorités publiques compétentes — uniquement lorsque la loi l'exige ou pour protéger nos droits et la sécurité d'autrui.",
          "Aucune donnée n'est vendue."
        ]
      },
      {
        "title": "10. Sous-traitants et fournisseurs",
        "body": [
          "Nous faisons appel à des fournisseurs de services qui traitent des renseignements pour notre compte, sous contrat, uniquement selon nos instructions et avec des garanties de protection appropriées.",
          "Ces fournisseurs ne sont pas autorisés à utiliser vos renseignements à leurs propres fins."
        ]
      },
      {
        "title": "11. Hébergement et résidence des données",
        "body": [
          "Nous nous efforçons d'héberger les renseignements personnels au Canada (région ca-central-1) lorsque cela est possible.",
          "Certains sous-traitants peuvent toutefois traiter des données à l'extérieur du Canada (voir la section sur les transferts internationaux)."
        ]
      },
      {
        "title": "12. Sécurité",
        "body": [
          "Vos données sont chiffrées en transit (TLS 1.2 ou supérieur) et au repos.",
          "L'accès interne est restreint aux personnes autorisées et journalisé.",
          "Les paiements sont conformes à la norme PCI-DSS via Stripe. Malgré ces mesures, aucun système n'est totalement infaillible."
        ]
      },
      {
        "title": "13. Conservation des données",
        "body": [
          "Nous conservons vos renseignements tant que votre compte est actif et aussi longtemps que nécessaire aux finalités décrites.",
          "À la suppression du compte, les renseignements personnels sont effacés ou anonymisés dans un délai de trente (30) jours, sauf obligation légale de conservation (par exemple, pièces comptables conservées sept (7) ans).",
          "Vous pouvez supprimer votre compte dans l'Application (Compte > Mon profil > Supprimer le compte) ou en suivant les instructions publiées à https://www.mobisoins.com/suppression-compte."
        ]
      },
      {
        "title": "14. Vos droits (Loi 25 et LPRPDE)",
        "body": [
          "Conformément à la Loi 25 (Québec) et à la LPRPDE (Canada), vous disposez des droits suivants :",
          "Accéder aux renseignements que nous détenons à votre sujet.",
          "Demander la rectification de renseignements inexacts ou incomplets.",
          "Demander leur effacement, sous réserve de nos obligations légales.",
          "Vous opposer au traitement ou en demander la limitation, dans les limites prévues par la loi.",
          "Demander la portabilité de vos renseignements dans un format technologique structuré et couramment utilisé.",
          "Retirer votre consentement à tout moment, pour les traitements fondés sur le consentement.",
          "Pour exercer ces droits, contactez : privacy@mobisoins.com. Nous répondrons dans les délais prévus par la loi."
        ]
      },
      {
        "title": "15. Communications marketing",
        "body": [
          "Nous pouvons vous envoyer des communications promotionnelles si vous y avez consenti. Vous pouvez vous désabonner à tout moment via le lien de désabonnement ou en nous contactant.",
          "Les communications transactionnelles essentielles (réservations, sécurité, mises à jour de service) ne sont pas des communications marketing et continueront tant que vous disposez d'un compte."
        ]
      },
      {
        "title": "16. Témoins et traceurs",
        "body": [
          "L'Application n'utilise pas de témoins (cookies) tiers à des fins publicitaires.",
          "Des journaux techniques anonymisés et des identifiants d'appareil peuvent être utilisés à des fins de diagnostic, de sécurité et d'amélioration du service."
        ]
      },
      {
        "title": "17. Décision automatisée",
        "body": [
          "Nous ne prenons pas de décision produisant des effets juridiques à votre égard fondée exclusivement sur un traitement automatisé, sans intervention humaine.",
          "Si une telle pratique devait être introduite, nous vous en informerions et vous offririons les recours prévus par la loi."
        ]
      },
      {
        "title": "18. Incidents de confidentialité",
        "body": [
          "En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous prendrons des mesures raisonnables pour le contenir et nous aviserons les personnes concernées et les autorités compétentes (notamment la Commission d'accès à l'information du Québec) conformément à la loi."
        ]
      },
      {
        "title": "19. Mineurs",
        "body": [
          "L'Application n'est pas destinée aux personnes de moins de 18 ans et nous ne recueillons pas sciemment leurs renseignements. Si vous pensez qu'un mineur a créé un compte, contactez-nous : nous procéderons à sa suppression sans délai."
        ]
      },
      {
        "title": "20. Transferts internationaux",
        "body": [
          "Vos renseignements peuvent être traités à l'extérieur du Canada par certains de nos sous-traitants (notamment AWS et Stripe).",
          "Dans ce cas, nous nous assurons que des garanties appropriées (clauses contractuelles, certifications, évaluations des facteurs relatifs à la vie privée) sont en place pour protéger vos renseignements."
        ]
      },
      {
        "title": "21. Responsable et plaintes",
        "body": [
          "Pour toute question, demande ou plainte relative à vos renseignements personnels, contactez notre responsable de la protection des renseignements personnels à privacy@mobisoins.com.",
          "Si vous estimez que vos droits n'ont pas été respectés, vous pouvez déposer une plainte auprès de la Commission d'accès à l'information du Québec ou du Commissariat à la protection de la vie privée du Canada."
        ]
      },
      {
        "title": "22. Modifications de la politique",
        "body": [
          "Cette politique peut évoluer. Vous serez informé de tout changement substantiel via l'Application ou par courriel.",
          "La date de dernière mise à jour figure en tête de document."
        ]
      },
      {
        "title": "23. Contact",
        "body": [
          "Responsable de la protection des renseignements personnels",
          "MobiSoins — privacy@mobisoins.com"
        ]
      }
    ]
  },
  "EN": {
    "title": "Privacy Policy",
    "lastUpdated": "November 4, 2026",
    "sections": [
      {
        "title": "1. Introduction",
        "body": [
          "MobiSoins (\"we\", \"us\") is committed to protecting our users' privacy. This policy explains what personal information we collect, why, how we use, disclose, and retain it, and the rights you have.",
          "It applies to the MobiSoins App and related services and supplements our Terms of Use."
        ]
      },
      {
        "title": "2. Who we are and scope",
        "body": [
          "MobiSoins is responsible for the personal information processed through the App. Our Privacy Officer can be reached at privacy@mobisoins.com.",
          "By using the App, you acknowledge that you have read this policy."
        ]
      },
      {
        "title": "3. Information we collect",
        "body": [
          "Identity data: first name, last name, date of birth.",
          "Contact data: email address, phone number, postal address.",
          "Account data: credentials, hashed password, role, preferences.",
          "Payment data: processed and stored by Stripe — we never retain card numbers.",
          "Health data: information you provide as part of a booking (allergies, treatments, notes for the Nurse).",
          "Professional data (Nurses): license, professional order, qualifications, and where applicable verification results.",
          "Technical data: IP address, device identifier, device type, usage logs.",
          "Location data: the visit address and, with your permission, your device location (precise location for Nurses, including in the background during an active visit). See section 8."
        ]
      },
      {
        "title": "4. How we collect your data",
        "body": [
          "Directly from you, when you create an account, complete your profile, make a booking, or contact support.",
          "Automatically, as you use the App (technical, location, and usage data).",
          "From third parties, such as our payment and verification providers, to the extent necessary to provide the service."
        ]
      },
      {
        "title": "5. Purposes of processing",
        "body": [
          "Provide, operate, secure, and improve the service.",
          "Manage accounts, bookings, payments, and invoicing.",
          "Communicate with you (visit notifications, support, security alerts).",
          "Verify Nurse identity and qualifications.",
          "Comply with legal, regulatory, tax, and accounting obligations.",
          "Detect, prevent, and respond to fraud, abuse, and security incidents."
        ]
      },
      {
        "title": "6. Legal basis and consent",
        "body": [
          "We process your personal information based on your consent, the performance of our contract with you, compliance with our legal obligations, and our legitimate interests (for example security and fraud prevention).",
          "Where processing is based on your consent, you may withdraw it at any time, without affecting the lawfulness of prior processing."
        ]
      },
      {
        "title": "7. Health data",
        "body": [
          "Medical information entered as part of a booking is sensitive information. It is visible only to the assigned Nurse and the Patient, on a need-to-know basis.",
          "It is never sold or shared with third parties for marketing or profiling. Internal access is restricted and audit-logged."
        ]
      },
      {
        "title": "8. Location data",
        "body": [
          "Patients: we collect the visit address you enter. With your permission, we also use your device location, only while the App is open, to place the address pin on the map. We never access a Patient's location in the background.",
          "Nurses: we collect your device's precise (GPS) location. While you are online and the App is open, it is used to offer you nearby visits.",
          "Nurses, during an accepted visit: MobiSoins collects your location continuously, including in the background, even when the App is closed or not in use. It is shared in real time with the Patient concerned so they can follow your arrival, and it is used to confirm your arrival at the Patient's home. Background collection stops as soon as the visit ends.",
          "Before any request for background location access, the App shows a notice explaining this collection and asks for your agreement. You can refuse or withdraw this permission at any time in your device settings; live arrival tracking will then no longer be available to the Patient.",
          "We do not keep a history of your movements: only your last known position is stored, and it is replaced at each update. Coordinates needed to compute routes are sent to Mapbox.",
          "Location data is never sold or used for advertising."
        ]
      },
      {
        "title": "9. Disclosure to third parties",
        "body": [
          "Stripe — payment processing (PCI-DSS compliant).",
          "Amazon Web Services — hosting and authentication (Cognito).",
          "Google Firebase — Patient–Nurse messaging and notifications.",
          "Mapbox — maps and route calculation.",
          "Sentry — crash reports and technical diagnostics, without health data.",
          "Nurses on the platform — only the information strictly necessary for the visit.",
          "Advisors, auditors, or potential acquirers — in connection with a corporate transaction, under confidentiality terms.",
          "Public authorities — only when required by law or to protect our rights and the safety of others.",
          "No data is sold."
        ]
      },
      {
        "title": "10. Service providers and sub-processors",
        "body": [
          "We use service providers that process information on our behalf, under contract, only on our instructions and with appropriate protection safeguards.",
          "These providers are not authorized to use your information for their own purposes."
        ]
      },
      {
        "title": "11. Hosting and data residency",
        "body": [
          "We strive to host personal information in Canada (the ca-central-1 region) where possible.",
          "Some sub-processors may, however, process data outside Canada (see the international transfers section)."
        ]
      },
      {
        "title": "12. Security",
        "body": [
          "Your data is encrypted in transit (TLS 1.2 or higher) and at rest.",
          "Internal access is restricted to authorized personnel and audit-logged.",
          "Payments are PCI-DSS compliant via Stripe. Despite these measures, no system is completely infallible."
        ]
      },
      {
        "title": "13. Data retention",
        "body": [
          "We retain your information for as long as your account is active and as long as necessary for the purposes described.",
          "On account deletion, personal data is erased or anonymized within thirty (30) days, except where the law requires longer retention (for example, accounting records kept for seven (7) years).",
          "You can delete your account in the App (Account > My profile > Delete account) or by following the instructions at https://www.mobisoins.com/en/suppression-compte."
        ]
      },
      {
        "title": "14. Your rights (Law 25 and PIPEDA)",
        "body": [
          "Under Quebec's Law 25 and Canada's PIPEDA, you have the right to:",
          "Access the information we hold about you.",
          "Request correction of inaccurate or incomplete information.",
          "Request erasure, subject to our legal obligations.",
          "Object to or request restriction of processing, within the limits of the law.",
          "Request portability of your information in a structured, commonly used technological format.",
          "Withdraw consent at any time, for processing based on consent.",
          "To exercise these rights, contact: privacy@mobisoins.com. We will respond within the timeframes required by law."
        ]
      },
      {
        "title": "15. Marketing communications",
        "body": [
          "We may send you promotional communications if you have consented. You may opt out at any time via the unsubscribe link or by contacting us.",
          "Essential transactional communications (bookings, security, service updates) are not marketing communications and will continue while you have an account."
        ]
      },
      {
        "title": "16. Cookies and trackers",
        "body": [
          "The App does not use third-party cookies for advertising.",
          "Anonymized technical logs and device identifiers may be used for diagnostics, security, and service improvement."
        ]
      },
      {
        "title": "17. Automated decision-making",
        "body": [
          "We do not make decisions producing legal effects about you based solely on automated processing, without human involvement.",
          "If such a practice were introduced, we would inform you and offer the recourse provided by law."
        ]
      },
      {
        "title": "18. Privacy incidents",
        "body": [
          "In the event of a confidentiality incident presenting a risk of serious harm, we will take reasonable steps to contain it and will notify affected individuals and the competent authorities (notably Quebec's Commission d'accès à l'information) in accordance with the law."
        ]
      },
      {
        "title": "19. Minors",
        "body": [
          "The App is not intended for individuals under 18 and we do not knowingly collect their information. If you believe a minor has created an account, contact us — we will delete it without delay."
        ]
      },
      {
        "title": "20. International transfers",
        "body": [
          "Your information may be processed outside Canada by some of our sub-processors (notably AWS and Stripe).",
          "In that case, we ensure appropriate safeguards (contractual clauses, certifications, privacy impact assessments) are in place to protect your information."
        ]
      },
      {
        "title": "21. Privacy Officer and complaints",
        "body": [
          "For any question, request, or complaint regarding your personal information, contact our Privacy Officer at privacy@mobisoins.com.",
          "If you believe your rights have not been respected, you may file a complaint with Quebec's Commission d'accès à l'information or the Office of the Privacy Commissioner of Canada."
        ]
      },
      {
        "title": "22. Changes to this policy",
        "body": [
          "This policy may evolve. Material changes will be communicated via the App or by email.",
          "The \"Last updated\" date appears at the top of the document."
        ]
      },
      {
        "title": "23. Contact",
        "body": [
          "Privacy Officer",
          "MobiSoins — privacy@mobisoins.com"
        ]
      }
    ]
  }
};
