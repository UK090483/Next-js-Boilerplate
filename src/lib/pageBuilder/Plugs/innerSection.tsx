/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

import classNames from 'classnames';

import { AppLocations } from 'types';

import { RichTextQueryResult } from '../Blocks/RichText';
import BodyParser from '../BodyParser';
import { buttonPlugQuery } from './ButtonPlug';
import { downloadPlugQuery } from './DownLoadPlug';
import { embedPlugQuery } from './EmbedPlug';
import { imageGalleryPlugQuery } from './ImageGaleriePlug';
import { imagePlugQuery } from './ImagePlug';

const richTextQuery = `
content[]{
  ...,
  ${buttonPlugQuery},
  ${embedPlugQuery},
  ${imagePlugQuery},
  ${imageGalleryPlugQuery},
  ${downloadPlugQuery},
}
`;

export const innerSectionPlugQuery = ` 
_type == "innerSection" => {
  _type,
  _key,
  'items':items[]{${richTextQuery}}
}
`;
export type InnerSectionPlugResult = {
  _type: 'innerSection';
  _key: string;
  lang: AppLocations;
  items: RichTextQueryResult[];
  rows?: number;
  rows_mobile?: number;
};

const InnerSectionPlug: React.FC<InnerSectionPlugResult> = (props) => {
  const { items, lang, rows_mobile, rows } = props;
  return (
    <div
      className={classNames(
        'grid grid-flow-row gap-2',
        { 'grid-cols-1': rows_mobile === 1 },
        { 'grid-cols-2': rows_mobile === 2 },
        { 'grid-cols-3': rows_mobile === 3 },
        { 'grid-cols-4': rows_mobile === 4 },
        { 'grid-cols-5': rows_mobile === 5 },
        { 'grid-cols-6': rows_mobile === 6 },
        { 'grid-cols-7': rows_mobile === 7 },
        { 'grid-cols-8': rows_mobile === 8 },
        { 'md:grid-cols-1': rows === 1 },
        { 'md:grid-cols-2': rows === 2 },
        { 'md:grid-cols-3': rows === 3 },
        { 'md:grid-cols-4': rows === 4 },
        { 'md:grid-cols-5': rows === 5 },
        { 'md:grid-cols-6': rows === 6 },
        { 'md:grid-cols-7': rows === 7 },
        { 'md:grid-cols-8': rows === 8 }
      )}
    >
      {items &&
        items.map((item) => {
          return (
            // eslint-disable-next-line no-underscore-dangle
            <div className="py-2 " key={item._key}>
              <BodyParser lang={lang} content={item.content} />
            </div>
          );
        })}
    </div>
  );
};

export default InnerSectionPlug;
