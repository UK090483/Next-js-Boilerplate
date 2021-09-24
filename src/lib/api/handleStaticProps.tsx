import type { ParsedUrlQuery } from 'querystring';

import { getData } from '../../pages/api/builder';

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
  const { params, locale, query, preview = false } = props;

  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }
  const slug =
    typeof params.slug === 'string' ? params.slug : params.slug.join('');

  // try {
  //   console.log(process.env.VERCEL_URL);
  //   const cashedData = await fetch(
  //     `http://${process.env.VERCEL_URL}/api/builder`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({ query, slug, preview }),
  //     }
  //   );

  //   const cashedDataJson = await cashedData.json();

  //   return {
  //     props: {
  //       preview,
  //       slug: slug || null,
  //       data: cashedDataJson || null,
  //       lang: locale || null,
  //     },
  //     revalidate: 1,
  //   };
  // } catch (error) {
  //   console.log(error);
  // }

  const pageData = await getData(query, slug, preview);

  return {
    props: {
      preview,
      slug: slug || null,
      data: pageData || null,
      lang: locale || null,
    },
    revalidate: 1,
  };
};
