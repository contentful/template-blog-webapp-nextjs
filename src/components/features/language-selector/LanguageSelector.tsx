'use client';

import { LanguageSelectorDesktop } from '@src/components/features/language-selector/LanguageSelectorDesktop';
import { LanguageSelectorMobile } from '@src/components/features/language-selector/LanguageSelectorMobile';
import { locales } from '@src/i18n/config';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  return locales && locales.length > 1 ? (
    <>
      <div className="hidden md:block">
        <LanguageSelectorDesktop displayName={displayName} localeName={localeName} />
      </div>

      <div className="block md:hidden">
        <LanguageSelectorMobile displayName={displayName} localeName={localeName} />
      </div>
    </>
  ) : null;
};
