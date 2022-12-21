import { Urbanist } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import './utils/globals.css';

import { CtfCustomQueryClientProvider } from '@src/_ctf-private';
import { Layout } from '@src/components/templates/layout';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CtfCustomQueryClientProvider>
      <main className={`${urbanist.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      <div id="portal" className={`${urbanist.variable} font-sans`} />
    </CtfCustomQueryClientProvider>
  );
};

export default appWithTranslation(App);
