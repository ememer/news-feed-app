/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindTheme = require('tailwindcss/defaultTheme');

const screenPercentages = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90];

const createMinMaxSpacing = (screenUnit) => ({
  ...tailwindTheme.spacing,
  ...screenPercentages.reduce(
    (acc, percentage) => ({
      ...acc,
      [`${percentage}-s`]: `${percentage}${screenUnit}`,
    }),
    {},
  ),
});

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: createMinMaxSpacing('vh'),
      maxWidth: createMinMaxSpacing('vw'),
      minHeight: createMinMaxSpacing('vh'),
      minWidth: createMinMaxSpacing('vw'),
      height: {
        '5h': '5vh',
        '10h': '10vh',
        '20h': '20vh',
        '30h': '30vh',
        '40h': '40vh',
        '50h': '50vh',
        '60h': '60vh',
        '70h': '70vh',
        '80h': '80vh',
        '90h': '90vh',
        '100h': '100vh',
      },
      colors: {
        'hot-ping': {
          50: '#fef1f7',
          100: '#fee5f1',
          200: '#ffcbe5',
          300: '#ffa1cd',
          400: '#ff74b1',
          500: '#fa3a89',
          600: '#ea1863',
          700: '#cc0a4b',
          800: '#a80c3e',
          900: '#8c0f36',
        },
        haiti: {
          50: '#ecf2ff',
          100: '#dbe6ff',
          200: '#bfcfff',
          300: '#98b0ff',
          400: '#7083ff',
          500: '#4e58ff',
          600: '#332ffc',
          700: '#2a23df',
          800: '#231fb4',
          900: '#060619',
        },
        'prussian-blue': {
          50: '#eef9ff',
          100: '#dcf3ff',
          200: '#b2e8ff',
          300: '#6dd7ff',
          400: '#20c3ff',
          500: '#00abff',
          600: '#0089df',
          700: '#006cb4',
          800: '#005c94',
          900: '#002f4c',
        },
        'pickled-bluewood': {
          50: '#f2f8f9',
          100: '#ddedf0',
          200: '#bedce3',
          300: '#91c2cf',
          400: '#5da0b3',
          500: '#428498',
          600: '#396c81',
          700: '#345a6a',
          800: '#314c59',
          900: '#293c47',
        },
        bunker: {
          50: '#f3f9fa',
          100: '#d7e9f0',
          200: '#aed2e1',
          300: '#7eb0ca',
          400: '#538cae',
          500: '#397093',
          600: '#2c5775',
          700: '#26485f',
          800: '#223b4d',
          900: '#070b0e',
        },
        woodsmoke: {
          50: '#f5f8f8',
          100: '#dde7ea',
          200: '#bbcdd4',
          300: '#91abb7',
          400: '#6a8897',
          500: '#506c7c',
          600: '#3f5562',
          700: '#354550',
          800: '#2d3a42',
          900: '#0d1012',
        },
        shark: {
          50: '#f3f6f8',
          100: '#e1e6ec',
          200: '#c6d0db',
          300: '#9faec1',
          400: '#7085a0',
          500: '#546986',
          600: '#495871',
          700: '#404b5e',
          800: '#3a4250',
          900: '#1c1f26',
        },
        asphalt: {
          50: '#fdf2f6',
          100: '#fae4ea',
          200: '#f5c2d4',
          300: '#ed8caf',
          400: '#e14f86',
          500: '#cf2866',
          600: '#b0194d',
          700: '#8e163e',
          800: '#761636',
          900: '#19060c',
        },
      },
    },
  },
  plugins: [],
};
