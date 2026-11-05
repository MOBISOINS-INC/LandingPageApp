'use client';

import { LegalLayout } from './LegalLayout';
import { TERMS } from './termsContent';
import { useLanguage } from '../../contexts/LanguageContext';

// The public terms are the app's terms, generated into termsContent.ts from
// FrontendApp/src/data/legal.ts. The old hand-written page here contradicted
// the app (a 24-hour refund rule the product never had), which a store
// reviewer reads as misleading billing terms.
export const TermsOfService = () => {
  const { language } = useLanguage();
  const doc = TERMS[language];
  return (
    <LegalLayout
      title={doc.title}
      lastUpdated={doc.lastUpdated}
      updatedLabel={language === 'EN' ? 'Last updated' : 'Dernière mise à jour'}
    >
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
