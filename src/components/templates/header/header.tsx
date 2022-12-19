import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  return (
    <header className="pt-4 pb-8 lg:pt-5 xl:py-10">
      <nav>
        <Container className="flex items-center justify-between py-2">
          <Link href="/">
            <BlogLogo />
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
