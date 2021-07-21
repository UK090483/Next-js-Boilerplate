/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// @ts-ignore
import { PageTransition } from 'next-page-transitions';
import { AppProps as NextAppProps } from 'next/app';

import '../styles/main.css';
import Footer from '@src/layout/Footer';
import { PageProps } from '@src/pageTypes/page/Page';

import Nav from '../layout/Nav';

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <main>
      <Nav {...pageProps.data} />
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} />
      </PageTransition>
      <Footer {...pageProps.data} />
    </main>
  );
};

export default MyApp;
