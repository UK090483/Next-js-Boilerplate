/* eslint-disable import/no-cycle */
import React from 'react';

import { groq } from 'next-sanity';

import { imageMeta, ImageMetaResult } from '@lib/queries/snippets';
import { PageBuilderBlockBase } from '@src/pageBuilder/pageBuilderQueries';
import { AppLocations } from 'types';

import Hero from '../../components/Hero';

export const heroBlockQuery = groq`
_type == "hero" => {
 'photo':image{${imageMeta}},
 title,
 text,
 btnText,
 btnLink,
 size
}
`;

export interface HeroBlogResult extends PageBuilderBlockBase {
  _type: 'hero';
  photo?: ImageMetaResult;
  title?: string;
  text?: string;
  btnText?: string;
  btnLink?: string;
  size?: 'full' | '1/2' | '2/3' | '1/3';
}

export interface HeroBlockProps extends HeroBlogResult {
  lang: AppLocations;
}

const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Hero {...props} />;
};

export default HeroBlock;
