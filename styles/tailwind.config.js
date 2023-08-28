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
      boxShadow: {
        'hard': '4px 4px 0 0 var(--tw-shadow-color)'
      },
      screens: {
        '-md': { max: '767px' },
      },
      colors: {
        change: 'transparent',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
