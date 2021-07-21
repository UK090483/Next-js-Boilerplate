import React from 'react';

import { GetStaticProps } from 'next';

import { handleStaticProps } from '@lib/handleStaticProps';
import sanity from '@lib/sanity';
import PageTemplate, { PageProps } from '@src/pageTypes/page/Page';
import { pageQuery } from '@src/pageTypes/page/pageQueries';

const query = `*[_type == 'indexPage'][0]{
  ${pageQuery}
}
`;

const Page: React.FC<PageProps> = (props) => {
  const { data, lang, preview } = props;

  const { data: pageData } = sanity.usePreviewSubscription(query, {
    params: { slug: '/' },
    initialData: data,
    enabled: !!preview,
  });

  if (!pageData) return <div>Page</div>;
  return <PageTemplate lang={lang} data={pageData} preview={preview} />;
};

export const getStaticProps: GetStaticProps = async (props) => {
  return handleStaticProps({ ...props, params: { slug: '/' }, query });
};

export default Page;
