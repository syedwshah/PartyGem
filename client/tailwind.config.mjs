/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.tsx',
    './src/*.tsx',
  ],
  theme: {
    // extend: {
    colors: {
      purpleScheme: {
        light: '#d8b4fe',
        DEFAULT: '#a855f7',
        dark: '#7e22ce',
      },
      // },
      // },
    },
    plugins: [],
  };

