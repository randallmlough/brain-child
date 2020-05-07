const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    rotate: {
      '10': '10deg',
    },
    extend: {
      colors: {
        primary: {
          100: '#66afd9',
          200: '#4da1d2',
          300: '#3394cc',
          400: '#1a86c5',
          500: '#0079bf', // main
          600: '#006dac',
          700: '#006199',
          800: '#005586',
          900: '#004973',
        },
        secondary: {
          100: '#ccedf2',
          200: '#99dbe5',
          300: '#66c8d7',
          400: '#33b6ca',
          500: '#00a4bd', // secondary
          600: '#008397',
          700: '#006271',
          800: '#00424c',
          900: '#002126',
        },
        black: {
          default: colors.black,
          100: '#d5d9dc',
          200: '#acb2b9',
          300: '#828c96',
          400: '#596573',
          500: '#2f3f50', // secondary
          600: '#263240',
          700: '#1c2630',
          800: '#131920',
          900: '#090d10',
        },
        success: {
          ...colors.green,
        },
        danger: {
          ...colors.red,
        },
        info: {
          ...colors.blue,
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-within'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    borderStyle: ['responsive', 'hover', 'focus', 'focus-within'],
    rotate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
};
