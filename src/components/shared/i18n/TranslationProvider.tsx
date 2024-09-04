'use client';

import { createInstance } from 'i18next';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import initTranslations, { type InitTranslationsProps } from '@src/i18n/';

interface TranslationProviderProps {
  children: ReactNode;
  locale: InitTranslationsProps['locale'];
  namespaces?: InitTranslationsProps['namespaces'];
  resources: InitTranslationsProps['resources'];
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProviderProps) {
  const i18n = createInstance();

  initTranslations({ locale, namespaces, i18nInstance: i18n, resources });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
