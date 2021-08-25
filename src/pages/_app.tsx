/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// @ts-ignore
import { PageTransition } from 'next-page-transitions';
import { AppProps as NextAppProps } from 'next/app';

import '../styles/main.css';

import { useRouter } from 'next/router';

import PreviewIndicator from '@lib/PreviewIndicator';
import useLytics from '@lib/useLytics';
import Footer from '@src/layout/Footer';
import { Meta } from '@src/layout/Meta';
import { PageProps } from '@src/pageTypes/page/Page';

import Nav from '../layout/Nav/Nav';

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  const { routeChange, init } = useLytics();
  const router = useRouter();
  React.useEffect(() => {
    init();
    const handleRouteChange = () => {
      routeChange();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [routeChange, init, router.events]);

  return (
    <main className="mx-auto bg-white max-w-app_max_width">
      {!pageProps.preview && <Nav {...pageProps.data} />}
      <Meta {...pageProps.data} />
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} />
      </PageTransition>
      <Footer {...pageProps.data} />
      {pageProps.preview && <PreviewIndicator />}
    </main>
  );
};

export default MyApp;
