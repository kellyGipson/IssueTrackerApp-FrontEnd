const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      width: {
        '18': '4.25rem',
      },
      height: {
        '18': '4.25rem',
      }
    },
    screens: {
      'xs': '384px'
    },
  },
  plugins: [],
}
