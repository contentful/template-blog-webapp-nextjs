import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Urbanist } from 'next/font/google';
import { useRouter } from 'next/router';

import { CtfCustomQueryClientProvider } from '@src/_ctf-private';
import { CtfSegmentAnalytics } from '@src/_ctf-private/ctf-analytics';
import { Layout } from '@src/components/templates/layout';
import './utils/globals.css';
import '@contentful/live-preview/style.css';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode={pageProps.previewActive}
      enableLiveUpdates={pageProps.previewActive}
      locale={locale || 'en-US'}>
      <CtfCustomQueryClientProvider>
        <CtfSegmentAnalytics />
        <main className={`${urbanist.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <div id="portal" className={`${urbanist.variable} font-sans`} />
      </CtfCustomQueryClientProvider>
    </ContentfulLivePreviewProvider>
  );
};

export default appWithTranslation(App);
