import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { useBlogPosts, useLandingPage } from '@src/_ctf-private';
import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { LinkWithPersistedQuery } from '@src/components/shared/link';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client } from '@src/lib/client';

const Page = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();

  /**
   * TODO: this is a main-private feature, and should be removed from the main branch during the split
   */
  const { data: pageData } = useLandingPage({ initialData: props.page, customKey: 'landingPage' });
  const { data: postsData } = useBlogPosts({
    initialData: props.posts,
    limit: 6,
    order: PageBlogPostOrder.PublishedDateDesc,
    where: {
      slug_not: pageData?.featuredBlogPost?.slug,
    },
  });

  const page = useContentfulLiveUpdates(pageData);
  const posts = useContentfulLiveUpdates(postsData);

  if (!page?.featuredBlogPost || !posts) return;

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container>
        <LinkWithPersistedQuery href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </LinkWithPersistedQuery>
      </Container>

      {/* Tutorial: contentful-and-the-starter-template.md */}
      {/* Uncomment the line below to make the Greeting field available to render */}
      {/*<Container>*/}
      {/*  <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}</div>*/}
      {/*</Container>*/}

      <Container className="my-8  md:mb-10 lg:mb-16">
        <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
        <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const preview = Boolean(query.preview);

  try {
    const gqlClient = client;

    const landingPageData = await gqlClient.pageLanding({ locale, preview });
    const page = landingPageData.pageLandingCollection?.items[0];

    const blogPostsData = await gqlClient.pageBlogPostCollection({
      limit: 6,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,
      where: {
        slug_not: page?.featuredBlogPost?.slug,
      },
      preview,
    });
    const posts = blogPostsData.pageBlogPostCollection?.items;

    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        previewActive: !!preview,
        page,
        posts,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
