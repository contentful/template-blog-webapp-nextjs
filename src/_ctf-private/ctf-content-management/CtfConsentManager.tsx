import { injectOsanoGlobalStyles } from '@contentful/experience-consent-manager';
import { useTranslation } from 'next-i18next';

import { useCtfConsent } from './useCtfConsent';

injectOsanoGlobalStyles();

export const CtfConsentManager = () => {
  const { t } = useTranslation();

  const { data: consentManager } = useCtfConsent();

  const handleConsentChange = () => {
    consentManager?.showConsentDrawer();
  };

  return (
    <button className="mt-6 font-medium underline" onClick={handleConsentChange}>
      {t('footer.manageConsent')}
    </button>
  );
};
