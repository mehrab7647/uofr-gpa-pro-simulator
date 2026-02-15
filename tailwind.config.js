/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uofgreen: '#004f2e',
        uofgold: '#ffc82e',
      },
    },
  },
  plugins: [],
}