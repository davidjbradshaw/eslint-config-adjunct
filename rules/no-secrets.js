module.exports = {
  plugins: ['no-secrets'],
  rules: {
    'no-secrets/no-secrets': 'error',
  },
  overrides: [
    {
      // Plugin does not play well with these filetypes
      files: ['**/*.md', '**/*.json'],
      rules: {
        'no-secrets/no-secrets': 'off',
      },
    },
  ],
}
