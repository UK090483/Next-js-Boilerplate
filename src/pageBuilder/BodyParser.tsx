/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import React from 'react';

import type { AppLocations } from 'types';

import HeroBlock from './Blocks/HeroBlock';
import RichText from './Blocks/RichText';
import SectionBlock from './Blocks/SectionBlock';
import ComponentNotFound from './component_not_found';
import { PageBodyResult } from './pageBuilderQueries';
import ButtonPlug from './Plugs/ButtonPlug';
import EmbedPlug from './Plugs/EmbedPlug';
import ImagePlug from './Plugs/ImagePlug';
import SeoHeaderPlug from './Plugs/SeoHeader';
import SpacerPlug from './Plugs/Spacer';

type ContentParserProps = {
  content: PageBodyResult;
  lang: AppLocations;
  extraComponents?: { [k: string]: React.ReactElement };
};

const BodyParser: React.FC<ContentParserProps> = (props) => {
  const { content, lang, extraComponents } = props;

  return (
    <>
      {content &&
        content.map((blok) => {
          if (extraComponents && extraComponents[blok._type]) {
            return extraComponents[blok._type];
          }

          switch (blok._type) {
            case 'section':
              return <SectionBlock lang={lang} {...blok} key={blok._key} />;
            case 'richText':
              return <RichText {...blok} key={blok._key} />;
            case 'block':
              return <RichText {...blok} key={blok._key} />;
            case 'embed':
              return <EmbedPlug {...blok} key={blok._key} />;
            case 'button':
              return <ButtonPlug {...blok} key={blok._key} />;
            case 'imagePlug':
              return <ImagePlug {...blok} key={blok._key} />;
            case 'seoHeader':
              return <SeoHeaderPlug {...blok} key={blok._key} />;
            case 'hero':
              return <HeroBlock lang={lang} {...blok} key={blok._key} />;
            // case 'quotes':
            //   return <Quotes {...blok} key={blok._key} />;
            // case 'imageGalleryPlug':
            //   return <ImageGalleryPlug {...blok} key={blok._key} />;
            // case 'innerSection':
            //   return <InnerSectionPlug {...blok} key={blok._key} />;
            case 'spacer':
              return <SpacerPlug {...blok} key={blok._key} />;
            // case 'download':
            //   return <DownLoadPlug {...blok} key={blok._key} />;

            default:
              return (
                // @ts-ignore
                <ComponentNotFound type={blok} key={blok._key} />
              );
          }
        })}
    </>
  );
};

export default BodyParser;
