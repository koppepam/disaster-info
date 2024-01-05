/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {    
      colors: {
        LineForest: '#06c755',
        LineHover: '#038B03'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}