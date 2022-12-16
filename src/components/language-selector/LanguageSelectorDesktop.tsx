import { LanguageIcon, ChevronDownTrimmedIcon, ChevronUpTrimmedIcon } from '@contentful/f36-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { twMerge } from 'tailwind-merge';

export const LanguageSelectorDesktop = ({ localeName, displayName }) => {
  const { locale, locales } = useRouter();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = e => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="listbox-locale"
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
        className="font-normal uppercase">
        <LanguageIcon width="18px" height="18px" variant="secondary" className="mr-1 ml-1" />
        {localeName(locale)}
        {isOpen ? (
          <ChevronUpTrimmedIcon variant="secondary" className="pl-1" />
        ) : (
          <ChevronDownTrimmedIcon variant="secondary" className="pl-1" />
        )}
      </button>
      <FocusLock disabled={!isOpen} returnFocus={true}>
        <ul
          className={twMerge(
            `fixed mt-1.5 w-24 cursor-pointer rounded-md bg-colorWhite text-center text-base`,
            isOpen ? 'block' : 'hidden',
          )}
          id="listbox-locale"
          role="listbox">
          {locales?.map(availableLocale =>
            availableLocale === locale ? null : (
              <li id={availableLocale} key={availableLocale} role="menuitem">
                <Link
                  className="block py-2"
                  href={{
                    pathname: router.pathname,
                    query: router.query,
                  }}
                  as={router.asPath}
                  locale={availableLocale}
                  onClick={() => setIsOpen(false)}>
                  {displayName(availableLocale).of(localeName(availableLocale))}
                </Link>
              </li>
            ),
          )}
        </ul>
      </FocusLock>
    </>
  );
};
