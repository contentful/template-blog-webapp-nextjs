import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Urbanist } from 'next/font/google';
import { useRouter } from 'next/router';
import './utils/globals.css';

import { Layout } from '@src/components/templates/layout';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps: _pageProps }: AppProps) => {
  const { locale } = useRouter();

  const pageProps = Object.assign({}, _pageProps, { previewActive: true });
  return (
    <ContentfulLivePreviewProvider enableInspectorMode enableLiveUpdates locale={locale ?? 'en-US'}>
      <>
        <main className={`${urbanist.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <div id="portal" className={`${urbanist.variable} font-sans`} />
      </>
    </ContentfulLivePreviewProvider>
  );
};

export default appWithTranslation(App);
