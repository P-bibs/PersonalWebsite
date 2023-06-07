module.exports = {
  content: [
      '_site/**/*.html',
      '_site/**/*.njk',
      '_includes/**/*.njk',
      '_includes/**/*.njk',
  ],
  safelist: [],
  theme: {
    extend: {
      colors: {
        change: 'transparent',
      },
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}
