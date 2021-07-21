import { groq } from 'next-sanity';

import { body, PageBodyResult } from '../../pageBuilder/pageBuilderQueries';

export const pageQuery = groq`
...,
type_,
'slug':slug.current,
footer->{${body}},
${body}
'pageHeader':pageHeader{color},
'site':{
  'navigation':*[_type=='navigation'][0]{
    'main': item[]{
      'key':_key,
      label,
      label_en,
      'slug':internalLink->slug.current,
      'items':item[]{'key':_key,
                      label,
                      label_en,
                      'slug':internalLink->slug.current,
                    }
      }
  },
 'config':*[_type=='configSettings'][0]{
   ...,
 },

}
`;

export type NavigationItem = {
  key: string;
  label: string;
  labelEn: string;
  slug: string;
  items: Omit<NavigationItem, 'items'>[];
};

export type PageResult = {
  type_: 'page' | 'indexPage';
  content: PageBodyResult;
  title?: string;
  title_en?: string;
  slug: null | string;
  footer?: PageBodyResult;
  pageHeader?: { color?: 'white' | 'black' };

  site: {
    config?: {
      kontaktAdress?: string;
      kontaktMail?: string;
      kontaktTel?: string;
      url?: string;
    };
    navigation: {
      main: NavigationItem[];
    };
  };
};
