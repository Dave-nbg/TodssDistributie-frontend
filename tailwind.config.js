module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'primary': {
          300: '#736CB7',
          500: '#655db0',
          700: '#5C55A0'
        },
        'secondary': {
          500: '#ffe59a',
          700: '#d3ba75',
        },
        'accent': {
          500: '#ef8665',
        }
      },

  }},
  plugins: [],
}
