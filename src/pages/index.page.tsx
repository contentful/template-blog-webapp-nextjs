import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { parse, stringify } from 'flatted';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { fetchEntries, getAllBlogsForHome } from '@src/lib/restClient';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const postData = parse(props.posts);
  const pageData = parse(props.page);

  const page = useContentfulLiveUpdates(pageData);
  const posts = useContentfulLiveUpdates(postData);

  if (!page?.fields?.featuredBlogPost || !posts) return;

  return (
    <>
      {page.fields.seoFields && <SeoFields {...page.fields.seoFields} />}
      <Container>
        <Link href={`/${page?.fields?.featuredBlogPost?.fields.slug}`}>
          <ArticleHero article={page?.fields?.featuredBlogPost} />
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const landingPageData = await getAllBlogsForHome();
    const page = landingPageData[0];

    const blogPostsData = await fetchEntries({
      limit: 6,
      // @ts-expect-error
      'fields.slug[ne]': page?.fields?.featuredBlogPost.fields?.slug,
      content_type: 'pageBlogPost',
    });

    const posts = stringify(blogPostsData);

    if (!posts) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    const props = {
      previewActive: !!preview,
      ...(await getServerSideTranslations(locale)),
      page: stringify(page),
      posts,
    };

    return {
      revalidate: revalidateDuration,
      props,
    };
  } catch (error) {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
