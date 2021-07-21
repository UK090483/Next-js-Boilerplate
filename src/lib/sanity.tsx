import {
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
} from 'next-sanity';

import { config } from './config';

export const imageBuilder = createImageUrlBuilder(config);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
