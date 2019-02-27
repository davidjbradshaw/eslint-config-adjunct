module.exports = {
  plugins: ['array-func'],
  extends: ['plugin:array-func/recommended'],
  rules: {
    // Rules not in recommended config
    'array-func/prefer-flat': 0,
    'array-func/prefer-flat-map': 0
  }
}
