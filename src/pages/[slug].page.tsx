import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { useBlogPostPage, useLandingPage } from '@src/_ctf-private';
import { ArticleContent, ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { client } from '@src/lib/client';

const Page = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();

  /**
   * TODO: this is a main-private feature, and should be removed from the main branch during the split
   */
  const { data: blogPostData } = useBlogPostPage({
    slug: props.blogPost.slug,
    initialData: props.blogPost,
  });
  const { data: landingPage } = useLandingPage({
    initialData: undefined,
    customKey: 'landingBlogDetailPage',
  });

  const blogPost = useContentfulLiveUpdates(blogPostData);
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;

  const isFeatured = landingPage?.featuredBlogPost?.slug === blogPost?.slug || props.isFeatured;

  if (!blogPost || !relatedPosts) return null;

  return (
    <>
      {blogPost.seoFields && <SeoFields {...blogPost.seoFields} />}
      <Container>
        <ArticleHero article={blogPost} isFeatured={isFeatured} isReversedLayout={true} />
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

export const getServerSideProps: GetServerSideProps = async ({ params, locale, query }) => {
  const preview = Boolean(query.preview);

  if (!params?.slug || !locale) {
    return {
      notFound: true,
    };
  }

  const gqlClient = client;

  try {
    const [blogPageData, landingPageData] = await Promise.all([
      gqlClient.pageBlogPost({ slug: params.slug.toString(), locale, preview }),
      gqlClient.pageLanding({ locale, preview }),
    ]);

    const blogPost = blogPageData.pageBlogPostCollection?.items[0];
    const landingPage = landingPageData.pageLandingCollection?.items[0];

    const isFeatured = landingPage?.featuredBlogPost?.slug === blogPost?.slug;

    if (!blogPost) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        previewActive: !!preview,
        blogPost,
        isFeatured,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
