import {
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
} from 'next-sanity';

import { config } from './config';

export const imageBuilder = createImageUrlBuilder(config);
const theExport: {
  // https://github.com/microsoft/TypeScript/issues/9944
  [index: string]: any;
} = {
  usePreviewSubscription: createPreviewSubscriptionHook(config),
};

export default theExport;
