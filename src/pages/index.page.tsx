import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { CtfXrayFrameDynamic } from '@src/_ctf-private/ctf-xray';
import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { createPreviewClient } from '@src/pages/utils/create-preview-client';

const Page = ({ page, posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  if (!page?.featuredBlogPost || !posts) return;

  return (
    <CtfXrayFrameDynamic entry={page}>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container>
        <Link href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
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
    </CtfXrayFrameDynamic>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  draftMode: preview,
  previewData,
}) => {
  const gqlClient = preview ? createPreviewClient(previewData) : client;

  try {
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
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
        posts,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
