/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Add the purge paths to remove unused styles in production
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', 
        secondary: '#818CF8', 
        accent: '#D946EF', 
        background: '#1E1E2F',
        surface: '#2D2D3A', 
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

