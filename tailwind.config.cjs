module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#122B38',
        'brand-green': '#0B9444',
        'brand-light-gray': '#EEF0F1',
        'brand-salmon': '#F28166',
        'brand-orange': '#FF5004'
      },
      spacing: {
        '7': '1.75rem',
        '9': '2.25rem'
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.04)',
        md: '0 4px 6px rgba(0,0,0,0.06)'
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      fontFamily: {
        sans: ['FKGroteskNeue', 'Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
