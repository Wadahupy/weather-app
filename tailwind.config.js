/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17153B',
        secondary: '#2E236C',
        teriary: '#433D8B',
        quaternary: '#C8ACD6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        heading: ['Lobster', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

