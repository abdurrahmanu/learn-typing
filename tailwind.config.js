/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
  ssr: false,
  spaLoadingTemplate: 'loading-template.html',
};