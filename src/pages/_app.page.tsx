import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import './utils/globals.css';

const spaceGrotesk = localFont({
  src: [
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const urbanist = localFont({
  src: [
    {
      path: './utils/fonts/urbanist-v10-latin-300.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-500.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-600.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './utils/fonts/urbanist-v10-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
};

export default appWithTranslation(App);
