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
      'blue': colors.blue,
      'indigo': colors.indigo,
      'purple': colors.violet,
      'pink': colors.pink,
      'light-blue': colors.lightBlue,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      width: {
        18: '4.5rem',
      },
    },
  },
  variants: {
    display: ['responsive', 'dark'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],

};
