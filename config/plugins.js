const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = [
  [
    withBundleAnalyzer,
    {
      enabled: process.env.BUNDLE_ANALYZE === 'true',
    },
  ],
];
