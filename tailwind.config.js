/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        tertiary: '#d5b775',
        primarySupport: '#36454F',
      },
      fontFamily: {
        'primary': ['GFS Didot', 'serif'],
        'secondary': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
