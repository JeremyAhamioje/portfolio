/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',   // <-- covers app.tsx and anything in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
