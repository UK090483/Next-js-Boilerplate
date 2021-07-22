import type { PreviewData } from '../pages/api/preview';
import { getSanityClient } from './sanity.server';

export const fetchPage = async (
  query: string,
  slug: string,
  preview: boolean,
  previewData?: PreviewData
) => {
  if (preview) {
    console.log('preview Active');
  }
  if (preview && (!previewData || !previewData?.token)) {
    console.log('preview token is missing');
  }

  let pageData;

  if (process.env.NODE_ENV === 'development' && !preview) {
    pageData = await getSanityClient({
      active: !!preview,
      token: previewData?.token,
    }).fetch(query, {
      slug,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    pageData = await getSanityClient().fetch(query, {
      slug,
    });
  }

  return pageData;
};
