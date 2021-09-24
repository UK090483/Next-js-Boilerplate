/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { GetStaticProps } from 'next';

import Nav from '@components/layout/Nav/Nav';
import { handleStaticProps } from '@lib/api/handleStaticProps';
// import sanity from '@lib/sanity';
import PageTemplate, { PageProps } from '@src/pageTypes/page/Page';
import { pageQuery } from '@src/pageTypes/page/pageQueries';

const query = `*[_type == 'page' && slug.current == 'home'][0]{
  ${pageQuery}
}
`;

const Page: React.FC<PageProps> = (props) => {
  const { data: pageData, lang, preview } = props;

  // const { data } = sanity.usePreviewSubscription(query, {
  //   params: { slug: '/' },
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
  return handleStaticProps({ ...props, params: { slug: '/' }, query });
};

export default Page;
