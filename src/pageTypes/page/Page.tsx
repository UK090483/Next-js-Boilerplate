import React from 'react';

import BodyParser from '@src/pageBuilder/BodyParser';
import { AppLocations } from 'types';

import type { PageResult } from './pageQueries';

export interface PageProps {
  data: PageResult;
  lang: AppLocations;
  preview?: boolean | undefined;
}
const Page: React.FC<PageProps> = (props) => {
  // const { preview = false, data } = props;
  // const { content, pageHeader, title_en, site } = data;
  // const title = props.lang === 'en' && title_en ? title_en : props.data.title;

  return (
    <div className="min-h-screen">
      <BodyParser lang={props.lang} content={props.data.content} />

      {/* <CookieBar /> */}
    </div>
  );
};

export default Page;
