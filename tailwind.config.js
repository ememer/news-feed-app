/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
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
      },
    },
  },
  plugins: [],
};
