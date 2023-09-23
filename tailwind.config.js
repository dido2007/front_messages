/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Tsukimi Rounded', 'sans-serif'],
        subtitle: ['MuseoModerno', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-color': '#0E3768',
        'secondary-color': '#4C87CD',
        'common-text': '#FFFFFF',
      }
    },
  },
  plugins: [require("daisyui")],
}
