import { InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from "./utils/get-serverside-translations";

const Page = ({ }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <h1>Hello world!</h1>;
};

export const getStaticProps = async ({ locale }) => {
    return {
        revalidate: 60,
        props: {
            ...(await getServerSideTranslations(locale)),
        }
    };
};

export default Page;