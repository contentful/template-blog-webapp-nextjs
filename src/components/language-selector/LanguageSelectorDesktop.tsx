import { LanguageIcon, ChevronDownTrimmedIcon, ChevronUpTrimmedIcon } from '@contentful/f36-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const LanguageSelectorDesktop = ({ localeName, displayName }) => {
  const { locale, locales } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        className="font-normal uppercase">
        <LanguageIcon width="18px" height="18px" variant="secondary" className="mr-1 ml-1" />
        {localeName(locale)}
        {isOpen ? (
          <ChevronUpTrimmedIcon variant="secondary" className="pl-1" />
        ) : (
          <ChevronDownTrimmedIcon variant="secondary" className="pl-1" />
        )}
      </div>
      <ul
        className={twMerge(
          `absolute mt-1.5 w-24 cursor-pointer rounded-md bg-colorWhite py-3 text-center text-base`,
          isOpen ? 'block' : 'hidden',
        )}
        role="listbox"
        tabIndex={-1}>
        {locales?.map(availableLocale =>
          availableLocale === locale ? null : (
            <li
              key={availableLocale}
              onClick={() => {
                router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
                  locale: availableLocale,
                });
                setIsOpen(false);
              }}
              role="menuitem">
              {displayName(availableLocale).of(localeName(availableLocale))}
            </li>
          ),
        )}
      </ul>
    </>
  );
};
