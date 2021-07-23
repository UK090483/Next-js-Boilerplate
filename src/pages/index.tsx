/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { GetStaticProps } from 'next';

import { handleStaticProps } from '@lib/handleStaticProps';
import sanity from '@lib/sanity';
import Nav from '@src/layout/Nav/Nav';
import PageTemplate, { PageProps } from '@src/pageTypes/page/Page';
import { pageQuery } from '@src/pageTypes/page/pageQueries';

const query = `*[_type == 'indexPage'][0]{
  ${pageQuery}
}
`;

const Page: React.FC<PageProps> = (props) => {
  const { data: pageData, lang, preview } = props;

  const { data } = sanity.usePreviewSubscription(query, {
    params: { slug: '/' },
    initialData: pageData,
    enabled: !!preview,
  });

  if (!data) return <div>Page</div>;
  return (
    <>
      <Nav {...data} />
      <PageTemplate lang={lang} data={data} preview={preview} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (props) => {
  return handleStaticProps({ ...props, params: { slug: '/' }, query });
};

export default Page;
