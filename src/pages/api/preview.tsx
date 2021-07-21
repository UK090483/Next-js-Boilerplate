import { NextApiRequest, NextApiResponse } from 'next';

export interface PreviewData {
  token: string | undefined;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Bail if no secret or slug defined

  const { type, slug } = req.query;
  if (req.query.token !== 'HULL' || !req.query.type) {
    return res.status(401).json({ message: 'Invalid preview request' });
  }

  const prevData: PreviewData = { token: process.env.SANITY_API_TOKEN };

  res.setPreviewData(prevData, {
    maxAge: 2000000,
  });

  if (type === 'indexPage') {
    return res.redirect('/');
  }

  const preparedSlug = `${type === 'page' ? '' : `/${type}`}/${slug}`;

  return res.redirect(preparedSlug);
}
