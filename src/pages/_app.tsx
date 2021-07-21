/* eslint-disable react/jsx-props-no-spreading */
import { AppProps as NextAppProps } from 'next/app';

import '../styles/main.css';
import { PageProps } from '@src/pageTypes/page/Page';

import Nav from '../layout/Nav';

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  const navData = pageProps.data.site.navigation.main;
  return (
    <main className="mx-auto prose prose-2xl">
      <Nav items={navData} />
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
