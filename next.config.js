/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId),
    //   })
    // );

    return config;
  },

  env: {
    // Needed for Sanity powered data
    SANITY_PROJECT_DATASET: process.env.SANITY_PROJECT_DATASET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
  i18n: {
    locales: ['da-Dk', 'en'],
    defaultLocale: 'da-Dk',
    localeDetection: false,
  },
});
