import React from 'react';

import BodyParser from '@lib/pageBuilder/BodyParser';
import { AppLocations } from 'types';

import type { PageResult } from './pageQueries';

export interface PageProps {
  data: PageResult;
  lang: AppLocations;
  preview?: boolean | undefined;
}
const Page: React.FC<PageProps> = (props) => {
  return (
    <div className="min-h-screen">
      <BodyParser lang={props.lang} content={props.data.content} />

      {/* <CookieBar /> */}
    </div>
  );
};

export default Page;
