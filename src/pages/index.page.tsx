import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { parse, stringify } from 'flatted';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { fetchAssets, fetchEntries, getAllBlogsForHome } from '@src/lib/restClient';
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
      // @TODO: added to avoid premature circular dependency
      include: 0,
      content_type: 'pageBlogPost',
    });

    // @TODO: Workaround for missing author and featuredImage
    // if we remove the include: 0 from the fetchEntries query
    // we should remove this workaround
    const postsWithAuthor = await Promise.all(
      blogPostsData.map(async post => {
        // @ts-expect-error
        const authorId = post?.fields?.author?.sys?.id;
        // @ts-expect-error
        const featuredImageId = post?.fields?.featuredImage?.sys?.id;

        const fields = post?.fields;
        if (authorId) {
          const author = (await fetchEntries({
            limit: 1,
            'sys.id': authorId,
            include: 0,
          })) as any[];

          fields.author = author[0];
        }

        if (featuredImageId) {
          const featuredImage = (await fetchAssets({
            limit: 1,
            'sys.id': featuredImageId,
            include: 0,
          })) as any[];

          fields.featuredImage = featuredImage[0];
        }

        const data = {
          ...post,
          fields,
        };

        return data;
      }),
    );

    const posts = stringify(postsWithAuthor);

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
