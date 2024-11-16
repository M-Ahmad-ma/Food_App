/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#252836',
        'dark-bg-2': '#1F1D2B',
        'dark-border': '#393C49',
        'primary': '#EA7C69',
        'secondary': '#2E313E',
        'hover': '#393C49',
        'light-text': '#ABBBC2',
        'Form-bg': '#2D303E',
        'light-gray': '#393C49',
        'dark-gray': '#2E313E'
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}

