/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F9F7F5',
          primary: '#795232',
          hover: '#634226',
          secondary: '#C49A6C',
          dark: '#5C3D2E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}