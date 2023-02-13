import {
  ConsentDrawerAction,
  injectOsanoGlobalStyles,
} from '@contentful/experience-consent-manager';
import { useTranslation } from 'next-i18next';

import { useCtfConsent } from './useCtfConsent';

injectOsanoGlobalStyles();

export const CtfConsentManager = () => {
  const { t } = useTranslation();

  const { data: consentManager } = useCtfConsent();

  return consentManager ? (
    <ConsentDrawerAction
      consentManager={consentManager}
      renderAction={({ openDrawer, disabled }) => (
        <button className="mt-6 font-medium underline" onClick={openDrawer} disabled={disabled}>
          {t('footer.manageConsent')}
        </button>
      )}
    />
  ) : null;
};
