import Link from 'next/link';

import { Container } from '@src/components/shared/container';
import initTranslations from '@src/i18n';
import { defaultLocale } from '@src/i18n/config';

export default async function NotFound() {
  const { t } = await initTranslations({ locale: defaultLocale });

  return (
    <Container>
      <h1 className="h2">{t('notFound.title')}</h1>
      <p className="mt-4">
        {t('notFound.description')}

        <Link className="text-blue500" href="/" />
      </p>
    </Container>
  );
}
