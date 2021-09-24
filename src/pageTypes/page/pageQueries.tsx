/* eslint-disable import/no-cycle */
import { groq } from 'next-sanity';

import { siteQuery } from '@lib/queries/siteQuery';
import type { SiteResult } from '@lib/queries/siteQuery';

import { body, PageBodyResult } from '../../lib/pageBuilder/pageBuilderQueries';

export const pageQuery = groq`
...,
type_,
'slug':slug.current,
footer->{${body}},
${body}
'pageHeader':pageHeader{color,withOutLogo},
'site':${siteQuery}
`;

export type PageResult = {
  type_: 'page' | 'indexPage';
  content: PageBodyResult;
  title?: string;
  title_en?: string;
  slug: null | string;
  footer?: PageBodyResult;
  pageHeader?: { color?: 'white' | 'black'; withOutLogo?: boolean };
  site: SiteResult;
};
