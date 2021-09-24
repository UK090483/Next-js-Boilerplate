/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';

import Nav from '@components/layout/Nav/Nav';
import { AppLocations } from 'types';

import { getAllDocPaths } from '../lib/api/fetchDocPath';
import { handleStaticProps } from '../lib/api/handleStaticProps';
// import sanity from '../lib/sanity';
import PageTemplate from '../pageTypes/page/Page';
import { pageQuery, PageResult } from '../pageTypes/page/pageQueries';

export type PageProps = {
  data: PageResult | null;
  lang: AppLocations;
  slug: string;
  preview: boolean | undefined;
};

const query = `*[_type == "page" && slug.current == $slug][0]{
  ${pageQuery}
}`;

const Page: React.FC<PageProps> = (props) => {
  const { data: pageData, lang, preview } = props;

  // const { data } = sanity.usePreviewSubscription(query, {
  //   params: { slug },
  //   initialData: pageData,
  //   enabled: !!preview,
  // });

  if (!pageData) return <div>Page</div>;

  return (
    <>
      <Nav {...pageData} />
      <PageTemplate lang={lang} data={pageData} preview={preview} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (props) => {
  return handleStaticProps({ ...props, query });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return getAllDocPaths('page');
};

export default Page;
