import path from 'path';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { SeoFieldsFragment } from '@src/lib/__generated/sdk';

const generateUrl = (locale: string, slug: string) =>
  new URL(path.join(locale, slug), process.env.NEXT_PUBLIC_BASE_URL!).toString();

export const SeoFields = ({
  pageTitle,
  pageDescription,
  noindex,
  nofollow,
  canonicalUrl,
  shareImagesCollection,
}: SeoFieldsFragment) => {
  const { locale, locales, asPath } = useRouter();

  const url = generateUrl(locale || '', asPath);

  const languageAlternates =
    locales?.map(locale => ({
      hrefLang: locale,
      href: generateUrl(locale, asPath),
    })) || [];

  return (
    <NextSeo
      title={pageTitle || undefined}
      description={pageDescription || undefined}
      canonical={canonicalUrl || url || ''}
      nofollow={nofollow || false}
      noindex={noindex || false}
      languageAlternates={languageAlternates}
      openGraph={{
        type: 'website',
        locale: locale,
        url: url || '',
        title: pageTitle || undefined,
        description: pageDescription || undefined,
        images: shareImagesCollection?.items.map(item => ({
          url: item?.url || '',
          width: item?.width || 0,
          height: item?.height || 0,
          alt: item?.description || '',
          type: item?.contentType || '',
        })),
      }}
      twitter={{
        site: url,
        cardType: 'summary_large_image',
      }}
    />
  );
};
