module.exports = {
  extends: ['plugin:eslint-comments/recommended'],
  plugins: ['eslint-comments'],
  rules: {
    // Rules are not in recommended config
    'eslint-comments/no-restricted-disable': 0,
    'eslint-comments/no-unused-disable': 0,
    'eslint-comments/no-use': 0,
    'eslint-comments/require-description': 0,
  },
}
