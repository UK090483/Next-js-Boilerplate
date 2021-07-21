/* eslint-disable import/no-cycle */
import React from 'react';

import { groq } from 'next-sanity';

import { imageMeta, ImageMetaResult } from '@lib/queries/snippets';
import { PageBuilderBlockBase } from '@src/pageBuilder/pageBuilderQueries';
import { AppLocations } from 'types';

import Hero from '../../components/Hero';

export const heroBlockQuery = groq`
_type == "hero" => {
 'photo':image{${imageMeta}}
}
`;

export interface HeroBlogResult extends PageBuilderBlockBase {
  _type: 'hero';
  photo?: ImageMetaResult;
}

interface HeroBlockProps extends HeroBlogResult {
  lang: AppLocations;
}

const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { photo } = props;

  return <Hero photo={photo} />;
};

export default HeroBlock;
