'use client';

import { LegalLayout } from './LegalLayout';
import { PRIVACY } from './privacyContent';
import { useLanguage } from '../../contexts/LanguageContext';

export const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const doc = PRIVACY[language];
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
