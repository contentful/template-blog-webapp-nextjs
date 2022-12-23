import path from 'path';

import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import { SitemapPagesFieldsFragment } from '@src/lib/__generated/sdk';
import { client } from '@src/lib/client';

type SitemapFieldsWithoutTypename = Omit<SitemapPagesFieldsFragment, '__typename'>;
type SitemapPageCollection = SitemapFieldsWithoutTypename[keyof SitemapFieldsWithoutTypename];

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { locales } = ctx;

  ctx.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const promiseArr = locales?.map(locale => client.sitemapPages({ locale })).filter(Boolean) || [];
  const dataPerLocale: SitemapFieldsWithoutTypename[] = await Promise.all(promiseArr);

  const fields = dataPerLocale
    .map((localeData, index) =>
      Object.values(localeData).flatMap((pageCollection: SitemapPageCollection) =>
        pageCollection?.items.map(item => {
          const localeForUrl =
            locales?.[index] === ctx.defaultLocale ? undefined : locales?.[index];

          const url = new URL(
            path.join(localeForUrl || '', item?.slug || ''),
            process.env.NEXT_PUBLIC_BASE_URL!,
          ).toString();
          return item && !item.seoFields?.excludeFromSitemap
            ? {
                loc: url,
                lastmod: item.sys.publishedAt,
              }
            : undefined;
        }),
      ),
    )
    .flat()
    .filter(Boolean);

  return getServerSideSitemap(ctx, fields);
};

const Sitemap = () => {
  return null;
};

export default Sitemap;
