import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Urbanist } from 'next/font/google';
import { useRouter } from 'next/router';

import { CtfCustomQueryClientProvider } from '@src/_ctf-private';
import { CtfSegmentAnalytics } from '@src/_ctf-private/ctf-analytics';
import { Layout } from '@src/components/templates/layout';
import './utils/globals.css';

const allowedOriginList = [
  'https://app.contentful.com',
  'https://app.eu.contentful.com',
  'https://app.flinkly.com',
  'https://app.eu.flinkly.com',
  'https://app.quirely.com',
  'https://app.eu.quirely.com',
  'http://localhost:3001',
];

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();

  // As this project uses static pages and it's not completly migrated to the draft mode,
  // we have to enable the live preview features always.
  // This can be adjusted onces the client-side preview is dropped.
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode={true}
      enableLiveUpdates={true}
      locale={locale || 'en-US'}
      targetOrigin={allowedOriginList}>
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
