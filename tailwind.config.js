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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
