import { useRouter } from 'next/router';

import { LanguageSelectorDesktop } from './LanguageSelectorDesktop';
import { LanguageSelectorMobile } from './LanguageSelectorMobile';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  const { locales } = useRouter();

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
