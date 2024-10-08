/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], 
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'title-text': 'rgba(255, 255, 255, 1)',
        'non-title-text': 'rgba(209, 213, 219, 1)',
      },
      screens: {
        'md': '900px',
        'lg': '1180px',
        'h-md': { 'raw': '(min-height: 500px)' },
        'h-lg': { 'raw': '(min-height: 1000px)' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

