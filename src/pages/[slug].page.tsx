import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleContent, ArticleHero } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = ({ blogPost, isFeatured }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      {blogPost.seoFields && <SeoFields {...blogPost.seoFields} />}
      <ArticleHero article={blogPost} isFeatured={isFeatured} isReversedLayout={true} />
      <ArticleContent article={blogPost} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  try {
    const [blogPagedata, landingePageData] = await Promise.all([
      client.pageBlogPost({ slug: params.slug.toString(), locale }),
      client.pageLanding({ locale }),
    ]);

    const blogPost = blogPagedata.pageBlogPostCollection?.items[0];
    const landingPage = landingePageData.pageLandingCollection?.items[0];

    const isFeatured = landingPage?.featuredBlogPost?.slug === blogPost?.slug;

    if (!blogPost) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        blogPost,
        isFeatured,
      },
    };
  } catch {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const dataPerLocale = locales
    ? await Promise.all(locales.map(locale => client.pageBlogPostCollection({ locale })))
    : [];

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageBlogPostCollection?.items.map(blogPost =>
        blogPost?.slug
          ? {
              params: {
                slug: blogPost.slug,
              },
              locale: locales?.[index],
            }
          : undefined,
      ),
    )
    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
