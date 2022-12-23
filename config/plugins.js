const withBundleAnalyzer = require('@next/bundle-analyzer');
const withPWA = require('next-pwa');

module.exports = [
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV !== 'production',
        dest: `public`,
        register: false,
        swSrc: './service-worker.js',
        publicExcludes: ['!favicon/**/*'],
      },
    },
  ],
  [
    withBundleAnalyzer,
    {
      enabled: process.env.BUNDLE_ANALYZE === 'true',
    },
  ],
];
