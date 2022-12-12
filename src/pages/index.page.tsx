import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { Container } from '@src/components/shared/container';
import { client } from '@src/lib/client';
import { SeoFields } from '@src/components/features/seo';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
   <>
    {page.seoFields && <SeoFields {...page.seoFields} />}
    <Container>
      <h1>h1- {page.featuredBlogPost.title}</h1>
      <h2>h2 - {page.featuredBlogPost.title}</h2>
      <h3>h3 - {page.featuredBlogPost.title}</h3>
      <h4>h4 - {page.featuredBlogPost.title}</h4>
      <p>p - Foo bar</p>
    </Container>
   </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const data = await client.pageLanding({ locale });

    const page = data.pageLandingCollection?.items[0];

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      props: {
        revalidate: revalidateDuration,
        ...(await getServerSideTranslations(locale)),
        page,
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
