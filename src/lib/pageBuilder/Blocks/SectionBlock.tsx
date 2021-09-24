/* eslint-disable import/no-cycle */
import React from 'react';

import classNames from 'classnames';

import { PageBuilderBlockBase } from '@lib/pageBuilder/pageBuilderQueries';
import { AppColor, AppLocations, AppSizes } from 'types';

import Section from '../../../components/Section';
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
  bgColor: null | AppColor;
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
  const {
    type,
    bgColor,
    content,
    bottomSpace,
    topSpace,
    lang,
    contentEn,
    title,
  } = props;

  const preparedContent = lang === 'en' && contentEn ? contentEn : content;

  return (
    <Section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(title ? { id: title } : {})}
      className={classNames(
        'column-2',
        { 'pt-5 md:pt-10': topSpace === 's' },
        { 'pt-9 md:pt-20': topSpace === 'm' },
        { 'pt-12 md:pt-32': topSpace === 'l' },
        { 'pt-16 md:pt-44': topSpace === 'xl' },
        { 'pt-24 md:pt-60': topSpace === 'xxl' },
        { 'pb-5 md:pb-10': bottomSpace === 's' },
        { 'pb-9 md:pb-20': bottomSpace === 'm' },
        { 'pb-16 md:pb-32': bottomSpace === 'l' },
        { 'pb-12 md:pb-44': bottomSpace === 'xl' },
        { 'pb-24 md:pb-60': bottomSpace === 'xxl' },
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
