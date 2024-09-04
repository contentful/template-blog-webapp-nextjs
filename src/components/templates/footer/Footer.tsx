'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t-color mt-10 border-t border-gray200">
      <Container className="py-8">
        <h2 className="h4 mb-4">{t('footer.aboutUs')}</h2>
        <div className="max-w-4xl">{t('footer.description')}</div>
        <div className="mt-8">
          {t('footer.powerBy')}{' '}
          <Link
            href="https://www.contentful.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue500"
          >
            Contentful
          </Link>
        </div>
      </Container>
    </footer>
  );
};
