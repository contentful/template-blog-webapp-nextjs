import { useTranslation } from 'next-i18next';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';
import { LinkWithPersistedQuery } from '@src/components/shared/link';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <LinkWithPersistedQuery href="/" title={t('common.homepage')}>
            <BlogLogo />
          </LinkWithPersistedQuery>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
