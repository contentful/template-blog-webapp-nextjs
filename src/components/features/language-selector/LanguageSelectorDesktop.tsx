import { LanguageIcon, ChevronDownTrimmedIcon, ChevronUpTrimmedIcon } from '@contentful/f36-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { twMerge } from 'tailwind-merge';

const useClickOutside = (ref, setIsOpen) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsOpen]);
};

export const LanguageSelectorDesktop = ({ localeName, displayName }) => {
  const router = useRouter();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const localesToShow = router.locales?.filter(locale => locale !== router.locale);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(containerRef, setIsOpen);

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();

        setIsOpen(currentState => !currentState);
        break;
      case 'Escape':
        e.preventDefault();

        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleMenuItemKeydown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.stopPropagation();
        e.preventDefault();

        e.currentTarget?.click();

        break;
      case 'ArrowUp':
      case 'ArrowDown':
        e.stopPropagation();
        e.preventDefault();

        const items = [...(menuRef.current?.children || [])];

        if (e.key === 'ArrowUp') {
          (items?.[index - 1] || items?.[items.length - 1])?.querySelector('a')?.focus();
        }

        if (e.key === 'ArrowDown') {
          (items?.[index + 1] || items?.[0])?.querySelector('a')?.focus();
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-locale"
        className="flex items-center font-normal uppercase"
        onClick={() => setIsOpen(currentState => !currentState)}
      >
        <LanguageIcon width="18px" height="18px" variant="secondary" className="mr-1 ml-1" />
        {localeName(router.locale)}
        {isOpen ? (
          <ChevronUpTrimmedIcon variant="secondary" className="pl-1" />
        ) : (
          <ChevronDownTrimmedIcon variant="secondary" className="pl-1" />
        )}
      </button>
      <FocusLock disabled={!isOpen} returnFocus={true}>
        <ul
          ref={menuRef}
          className={twMerge(
            'top-100 absolute right-0 z-10 w-24 translate-y-3 cursor-pointer rounded-md bg-colorWhite text-center text-base shadow',
            isOpen ? 'block' : 'hidden',
          )}
          id="menu-locale"
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          {localesToShow?.map((availableLocale, index) => (
            <li key={availableLocale} role="none">
              <Link
                onKeyDown={e => handleMenuItemKeydown(e, index)}
                role="menuitem"
                className="block py-2"
                href={{
                  pathname: router.pathname,
                  query: router.query,
                }}
                as={router.asPath}
                locale={availableLocale}
                onClick={() => setIsOpen(false)}
              >
                {displayName(availableLocale).of(localeName(availableLocale))}
              </Link>
            </li>
          ))}
        </ul>
      </FocusLock>
    </div>
  );
};
