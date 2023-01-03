import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nConfig from 'next-i18next.config';

const { i18n } = i18nConfig;

export const getServerSideTranslations = (locale?: string) => {
  return serverSideTranslations(locale || i18n.defaultLocale, ['common']);
};
