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
        'dark-theme-primary': "#18191a"
      }
    },
  },
  variants: {},
  plugins: ['tailwindcss'],
}