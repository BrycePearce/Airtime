module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        'dark-theme-light': "#242526",
        'dark-theme-primary': "#18191a",
      },
      textColor: {
        'dark-primary': "#9ccafd"
      },
      opacity: {
        '10': '0.1',
        '60': '0.6'
      },
      height: {
        '42': '11rem'
      }
    },
  },
  variants: {},
  plugins: ['tailwindcss'],
}