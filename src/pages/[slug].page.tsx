import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { parse, stringify } from 'flatted';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleContent, ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { getAllBlogs, getAllBlogsForHome, getBlog } from '@src/lib/restClient';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const blogPost = useContentfulLiveUpdates(parse(props.blogPost));

  const relatedPosts = blogPost?.fields.relatedBlogPosts;

  if (!blogPost || !relatedPosts) return null;

  return (
    <>
      {blogPost.seoFields && <SeoFields {...blogPost.seoFields.fields} />}
      <Container>
        <ArticleHero article={blogPost} isFeatured={props.isFeatured} isReversedLayout={true} />
      </Container>
      <Container className="mt-8 max-w-4xl">
        <ArticleContent article={blogPost} />
      </Container>
      {relatedPosts && (
        <Container className="mt-8 max-w-5xl">
          <h2 className="mb-4 md:mb-6">{t('article.relatedArticles')}</h2>
          <ArticleTileGrid className="md:grid-cols-2" articles={relatedPosts} />
        </Container>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  draftMode: preview = true,
}) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  try {
    const [blogPageData, landingPageData] = await Promise.all([
      getBlog(params.slug.toString()),
      getAllBlogsForHome(),
    ]);

    const blogPost = blogPageData;
    const landingPage = landingPageData[0];

    const isFeatured = landingPage?.fields.featuredBlogPost?.slug === blogPost?.fields.slug;

    //const post = await getBlog(params.slug as string);

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
        previewActive: !!preview,
        blogPost: stringify(blogPost),
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

// @ts-expect-error
export const getStaticPaths: GetStaticPaths = async () => {
  const dataPerLocale = await getAllBlogs();

  const paths = dataPerLocale
    .map(blogPost =>
      blogPost?.fields.slug
        ? {
            params: {
              slug: blogPost.fields.slug,
            },
          }
        : undefined,
    )

    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
