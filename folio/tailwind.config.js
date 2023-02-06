/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica Neue', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: '#F0F0F7',
        secondary: '#111111'
      }
    },
  },
  plugins: [],
  darkMode:'class',
}
