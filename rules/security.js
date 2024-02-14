module.exports = {
  plugins: ['security'],
  extends: ['plugin:security/recommended-legacy'],
  rules: {
    'security/detect-object-injection': 0,
  },
}
