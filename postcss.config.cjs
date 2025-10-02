const stripEmpty = require('./postcss-plugins/strip-empty-custom-props');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    stripEmpty
  ]
}
