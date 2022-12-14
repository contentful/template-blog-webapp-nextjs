import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import './utils/globals.css';
import { Urbanist } from '@next/font/google'

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${urbanist.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default appWithTranslation(App);
