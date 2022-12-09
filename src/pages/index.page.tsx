import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <h1 className="text-3xl font-bold underline">{page.featuredBlogPost.title}</h1>;
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
