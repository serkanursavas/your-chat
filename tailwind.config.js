/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6096B4',
        secondary: '#93BFCF',
        grey: '#BDCDD6',
        beige: '#EEE9DA'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
