/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // Remove the line below since it's included by default in Tailwind CSS 3.3+
    // require('@tailwindcss/line-clamp'),
    // ...
  ],
};
