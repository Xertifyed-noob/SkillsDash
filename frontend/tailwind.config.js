/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Add the purge paths to remove unused styles in production
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'title-text': 'rgba(255, 255, 255, 1)',
        'non-title-text': 'rgba(209, 213, 219, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

