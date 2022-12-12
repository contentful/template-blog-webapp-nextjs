const tokens = require('@contentful/f36-tokens');
const plugin = require('tailwindcss/plugin');

const colors = Object.entries(tokens).reduce((acc, [key, value]) => {
  // Filter Hex colors from the f36-tokens
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    acc[key] = value;
  }

  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      letterSpacing: {
        snug: '-0.011em',
      },
      fontSize: {
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          fontSize: theme('fontSize.xs'),
          color: theme('colors.gray800'),
        },
        h1: {
          fontSize: theme('fontSize.xl'),
          lineHeight: 1.1,
        },
        h2: {
          fontSize: theme('fontSize.xl'),
          lineHeight: 1.28571,
        },
        h3: {
          fontSize: theme('fontSize.base'),
          lineHeight: 1.6,
        },
        h4: {
          fontSize: theme('fontSize.xs'),
          lineHeight: 1.5,
        },
        p: {
          lineHeight: theme('lineHeight.4'),
          fontWeight: theme('fontWeight.normal'),
          letterSpacing: theme('letterSpacing.snug'),
          color: theme('colors.gray600'),
        },
        [`@media (min-width: ${theme('screens.lg')})`]: {
          body: {
            fontSize: theme('fontSize.sm'),
          },
          p: { lineHeight: theme('lineHeight.5') },
          h1: {
            fontSize: theme('fontSize.4xl'),
          },
          h2: {
            fontSize: theme('fontSize.3xl'),
          },
          h3: {
            fontSize: theme('fontSize.xl'),
          },
          h4: {
            fontSize: theme('fontSize.base'),
          },
        },
      });
    }),
  ],
};
