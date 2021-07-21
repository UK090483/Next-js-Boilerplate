import React from 'react';

import classNames from 'classnames';

import { PageBuilderBlockBase } from '@src/pageBuilder/pageBuilderQueries';
import { AppLocations, AppSizes } from 'types';

import Section from '../../components/Section';
import BodyParser from '../BodyParser';
import { richTextQuery } from './RichText';

export const sectionBlockQuery = `
_type == "section" => {
  title,
  bgColor,
  type,
  topSpace,
  bottomSpace,
  ${richTextQuery},
}
`;

export interface SectionResult extends PageBuilderBlockBase {
  _type: 'section';
  title: null | string;
  bgColor: null | string;
  type: null | 'text' | 'hero';
  topSpace: null | AppSizes;
  bottomSpace: null | AppSizes;
  content: null | any;
  contentEn: null | any;
}

interface SectionBlockProps extends SectionResult {
  lang: AppLocations;
}

const SectionBlock: React.FC<SectionBlockProps> = (props) => {
  const { type, bgColor, content, bottomSpace, topSpace, lang, contentEn } =
    props;

  const preparedContent = lang === 'en' && contentEn ? contentEn : content;

  return (
    <Section
      className={classNames(
        { 'pt-10': topSpace === 's' },
        { 'pt-20': topSpace === 'm' },
        { 'pt-32': topSpace === 'l' },
        { 'pt-44': topSpace === 'xl' },
        { 'pt-60': topSpace === 'xxl' },
        { 'pb-10': bottomSpace === 's' },
        { 'pb-20': bottomSpace === 'm' },
        { 'pb-32': bottomSpace === 'l' },
        { 'pb-44': bottomSpace === 'xl' },
        { 'pb-60': bottomSpace === 'xxl' },
        { 'pb-0.5': !bottomSpace }
      )}
      type={type}
      backgroundColor={bgColor || 'white'}
    >
      {content && <BodyParser lang={lang} content={preparedContent} />}
    </Section>
  );
};

export default SectionBlock;
