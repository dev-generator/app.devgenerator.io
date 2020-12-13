const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: false,
  darkMode: 'class',
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',

      'black': colors.black,
      'white': colors.white,
      'gray': colors.coolGray,
      'red': colors.red,
      'yellow': colors.amber,
      'green': colors.emerald,
      'lime': colors.lime,
      'blue': colors.blue,
      'indigo': colors.indigo,
      'purple': colors.violet,
      'pink': colors.pink,
      'light-blue': colors.lightBlue,
      'amber': colors.amber,
    },
    zIndex: {
      100: '100',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      width: {
        18: '4.5rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'color': theme('colors.gray.800'),
          },
        },

        dark: {
          css: {
            'color': theme('colors.gray.200'),
            'h1': {
              color: theme('colors.gray.50'),
            },
            'h2': {
              color: theme('colors.gray.50'),
            },
            'h3': {
              color: theme('colors.gray.50'),
            },
            'h4': {
              color: theme('colors.gray.50'),
            },
            'h5': {
              color: theme('colors.gray.50'),
            },
            'h6': {
              color: theme('colors.gray.50'),
            },
            'strong': {
              color: theme('colors.gray.100'),
            },
            'code': {
              color: theme('colors.gray.200'),
            },
            'figcaption': {
              color: theme('colors.gray.500'),
            },
            'blockquote': {
              color: theme('colors.gray.200'),
            },
            '::selection': {
              backgroundColor: '#6f7bb635',
            },
          },
        },
      }),
    },
  },
  variants: {
    display: ['responsive', 'dark'],
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],

};
