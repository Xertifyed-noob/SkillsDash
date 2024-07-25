/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Add the purge paths to remove unused styles in production
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Example primary color
        secondary: '#818CF8', // Example secondary color
        accent: '#D946EF', // Example accent color
        background: '#1E1E2F', // Dark background color
        surface: '#2D2D3A', // Surface color for cards, etc.
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

