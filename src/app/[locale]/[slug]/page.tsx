import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ArticleContent, ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';
import initTranslations from '@src/i18n';
import { defaultLocale, locales } from '@src/i18n/config';
import { client, previewClient } from '@src/lib/client';

export async function generateMetadata({
  params: { locale, slug },
}: BlogPageProps): Promise<Metadata> {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;

  const { pageBlogPostCollection } = await gqlClient.pageBlogPost({ locale, slug, preview });
  const blogPost = pageBlogPostCollection?.items[0];

  const languages = Object.fromEntries(
    locales.map(locale => [locale, locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`]),
  );
  const metadata: Metadata = {
    alternates: {
      canonical: slug,
      languages,
    },
  };

  if (blogPost?.seoFields) {
    metadata.title = blogPost.seoFields.pageTitle;
    metadata.description = blogPost.seoFields.pageDescription;
    metadata.robots = {
      follow: !blogPost.seoFields.nofollow,
      index: !blogPost.seoFields.noindex,
    };
  }

  return metadata;
}

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<BlogPageProps['params'][]> {
  const gqlClient = client;
  const { pageBlogPostCollection } = await gqlClient.pageBlogPostCollection({ locale, limit: 100 });

  if (!pageBlogPostCollection?.items) {
    throw new Error('No blog posts found');
  }

  return pageBlogPostCollection.items
    .filter((blogPost): blogPost is NonNullable<typeof blogPost> => Boolean(blogPost?.slug))
    .map(blogPost => {
      return {
        locale,
        slug: blogPost.slug!,
      };
    });
}

interface BlogPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function Page({ params: { locale, slug } }: BlogPageProps) {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;
  const { t } = await initTranslations({ locale });
  const { pageBlogPostCollection } = await gqlClient.pageBlogPost({ locale, slug, preview });
  const { pageLandingCollection } = await gqlClient.pageLanding({ locale, preview });
  const landingPage = pageLandingCollection?.items[0];
  const blogPost = pageBlogPostCollection?.items[0];
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;
  const isFeatured = Boolean(
    blogPost?.slug && landingPage?.featuredBlogPost?.slug === blogPost.slug,
  );

  if (!blogPost) {
    notFound();
  }

  return (
    <>
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
}
