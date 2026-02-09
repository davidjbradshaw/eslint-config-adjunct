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
  overrides: [
    {
      files: ['**/*.md', '**/*.md/*.*'],
      rules: {
        'eslint-comments/disable-enable-pair': 'off',
        'eslint-comments/no-aggregating-enable': 'off',
        'eslint-comments/no-duplicate-disable': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
        'eslint-comments/no-unused-enable': 'off',
        'eslint-comments/no-restricted-disable': 'off',
        'eslint-comments/no-unused-disable': 'off',
        'eslint-comments/no-use': 'off',
        'eslint-comments/require-description': 'off',
      },
    },
  ],
}
