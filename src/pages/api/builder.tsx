import { NextApiRequest, NextApiResponse } from 'next';

import { fetchPage } from '../../lib/api/fetchPageApi';

const cache: { [k: string]: any } = {};

export const getData = async (
  query: string,
  slug: string,
  preview: boolean
) => {
  if (cache[slug]) {
    console.log(`${slug} from cash`);
    console.log(cache);
    return cache[slug];
  }
  const pageData = await fetchPage(query, slug, preview);

  cache[slug] = pageData;

  return pageData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, slug } = JSON.parse(req.body);
  const data = await getData(query, slug, false);
  return res.status(200).json(data || {});
}
