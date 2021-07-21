import type { ParsedUrlQuery } from 'querystring';

import { PreviewData } from '@src/pages/api/preview';

import { fetchPage } from './fetchPageApi';

type HandleStaticPropsProps = {
  params?: ParsedUrlQuery | undefined;
  locale?: string | undefined;
  query: string;
  preview?: boolean | undefined;
  previewData?: any;
};

type FailedResult = {
  notFound: true;
};
type SuccessResult = {
  props: {
    slug?: string | null;
    lang?: string | null;
    data: unknown;
    preview: boolean;
  };
};

export type TemplateProps<R> = {
  data: R | null;
  lang: Location;
  preview: boolean;
  slug: string;
};

export const handleStaticProps: (
  props: HandleStaticPropsProps
) => Promise<FailedResult | SuccessResult> = async (props) => {
  const { params, locale, query, preview = false, previewData } = props;

  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }
  const slug =
    typeof params.slug === 'string' ? params.slug : params.slug.join('');

  const pageData = await fetchPage(
    query,
    slug,
    preview,
    previewData as PreviewData
  );

  return {
    props: {
      preview,
      slug: slug || null,
      data: pageData || null,
      lang: locale || null,
    },
    // revalidate: 1,
  };
};
