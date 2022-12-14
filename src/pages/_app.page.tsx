import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import './utils/globals.css';
import { Urbanist } from '@next/font/google'
import Head from 'next/head';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${urbanist.variable} font-sans`}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
};

export default appWithTranslation(App);
