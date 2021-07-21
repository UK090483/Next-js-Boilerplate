import { groq } from 'next-sanity';

import { body, PageBodyResult } from '../../pageBuilder/pageBuilderQueries';

export const pageQuery = groq`
...,
type_,
'slug':slug.current,
footer->{${body}},
${body}
'site':{
  'navigation':*[_type=='navigation'][0]{
    'main': item[]{
      label,
      label_en,
      'items':item[]{
                      label,
                      label_en,
                      slug
                    }
      }
  }
}
`;

export type PageResult = {
  type_: 'page' | 'indexPage';
  content: PageBodyResult;
  title?: string;
  title_en?: string;
  slug: null | string;
  footer?: PageBodyResult;

  site: {
    navigation: {
      main: { label: string; labelEn: string; slug: string }[];
    };
  };
};
