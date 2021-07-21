/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */

import React from 'react';

// @ts-ignore
import BlockContent from '@sanity/block-content-to-react';

import LinkMark, { linkMarkQuery } from '../marks/link';
import { PageBuilderBlockBase } from '../pageBuilderQueries';
import ButtonPlug, { buttonPlugQuery } from '../Plugs/ButtonPlug';
import { downloadPlugQuery } from '../Plugs/DownLoadPlug';
import EmbedPlug, { embedPlugQuery } from '../Plugs/EmbedPlug';
import { imageGalleryPlugQuery } from '../Plugs/ImageGaleriePlug';
import { imagePlugQuery } from '../Plugs/ImagePlug';
import { innerSectionPlugQuery } from '../Plugs/innerSection';

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
}
`;

export const richTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${buttonPlugQuery},
  ${embedPlugQuery},
  ${imagePlugQuery},
  ${imageGalleryPlugQuery},
  ${innerSectionPlugQuery},
  ${downloadPlugQuery},
}
`;

export interface RichTextQueryResult extends PageBuilderBlockBase {
  _type: 'richText' | 'block';
  content: any[];
}

const link = (props: any) => {
  return <LinkMark {...props.mark}>{props.children}</LinkMark>;
};

const list = (props: any) => {
  return (
    <ul
      className={`${'list-disc'} list-outside pl-8 text-base-fluid pb-3 leading-[1.1em]`}
    >
      {props.children}
    </ul>
  );
};

const classes: { [k: string]: string } = {
  'custom-header-big': 'header-big',
  'custom-header-medium': 'header-medium',
  'custom-header-small': 'header-small',
  'custom-subHeader': 'subheader',
  normal: 'text-normal',
  'custom-small': 'text-small',
  'custom-xsmall': 'text-xsmall',
};

const BlockRenderer = (props: any) => {
  const { style = 'normal' } = props.node;

  if (/^custom/.test(style) || style === 'normal') {
    return React.createElement(
      'p',
      { className: `${classes[style]}` },
      props.children
    );
  }

  if (style === 'blockquote') {
    return <blockquote>- {props.children}</blockquote>;
  }

  return BlockContent.defaultSerializers.types.block(props);
};

const serializer = {
  list,
  types: {
    button: ButtonPlug,
    embed: EmbedPlug,
    block: BlockRenderer,
  },
  marks: {
    link,
  },
};

const RichText = (props: any) => {
  const isBlock = props._type === 'block';
  return (
    <div className="prose prose-lg max-w-none">
      <BlockContent
        blocks={isBlock ? props : props.content}
        serializers={serializer}
      />
    </div>
  );
};

export default RichText;
