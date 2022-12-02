import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';


const App = ({ Component, pageProps }: AppProps) => {
    return (
        <main>
            <Component {...pageProps} />
        </main>
    );
};

export default appWithTranslation(App);