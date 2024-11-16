module.exports = {
  extends: 'next/core-web-vitals',
  plugins: [],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'warn',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
  },
}
