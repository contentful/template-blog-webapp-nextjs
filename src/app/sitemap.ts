import path from 'node:path';

import type { MetadataRoute } from 'next';

import { defaultLocale, locales } from '@src/i18n/config';
import type { SitemapPagesFieldsFragment } from '@src/lib/__generated/sdk';
import { client } from '@src/lib/client';

type SitemapFieldsWithoutTypename = Omit<SitemapPagesFieldsFragment, '__typename'>;
type SitemapPageCollection = SitemapFieldsWithoutTypename[keyof SitemapFieldsWithoutTypename];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const promises =
    locales?.map(locale => client.sitemapPages({ locale })).filter(page => Boolean(page)) || [];
  const dataPerLocale: SitemapFieldsWithoutTypename[] = await Promise.all(promises);
  const fields = dataPerLocale
    .flatMap((localeData, index) =>
      Object.values(localeData).flatMap((pageCollection: SitemapPageCollection) =>
        pageCollection?.items.map(item => {
          const localeForUrl = locales?.[index] === defaultLocale ? undefined : locales?.[index];
          const url = new URL(
            path.join(localeForUrl || '', item?.slug || ''),
            process.env.NEXT_PUBLIC_BASE_URL!,
          ).toString();

          return item && !item.seoFields?.excludeFromSitemap
            ? {
                lastModified: item.sys.publishedAt,
                url,
              }
            : undefined;
        }),
      ),
    )
    .filter(field => field !== undefined);

  return fields;
}
