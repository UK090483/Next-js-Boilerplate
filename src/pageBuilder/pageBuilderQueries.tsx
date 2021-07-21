/* eslint-disable import/no-cycle */
import { heroBlockQuery, HeroBlogResult } from './Blocks/HeroBlock';
import { richTextQuery, RichTextQueryResult } from './Blocks/RichText';
import { sectionBlockQuery, SectionResult } from './Blocks/SectionBlock';
import { ButtonPlugResult } from './Plugs/ButtonPlug';
import { DownloadPlugResult } from './Plugs/DownLoadPlug';
import { EmbedPlugResult } from './Plugs/EmbedPlug';
import { ImageGalleryPlugResult } from './Plugs/ImageGaleriePlug';
import { ImagePlugResult } from './Plugs/ImagePlug';
import { InnerSectionPlugResult } from './Plugs/innerSection';
import { SeoHeaderPlugResult } from './Plugs/SeoHeader';
import { SpacerPlugResult } from './Plugs/Spacer';

export type PageBuilderBlockBase = {
  _type: string;
  _key: string;
};

export const body = `
content[]{
  ...,
  ${sectionBlockQuery},
  ${richTextQuery},
  ${heroBlockQuery}
},
`;

export type PageBodyResult = (
  | SectionResult
  | RichTextQueryResult
  | EmbedPlugResult
  | ButtonPlugResult
  | ImagePlugResult
  | SeoHeaderPlugResult
  | ImageGalleryPlugResult
  | InnerSectionPlugResult
  | SpacerPlugResult
  | DownloadPlugResult
  | HeroBlogResult
)[];
