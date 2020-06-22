module.exports = {
  overrides: [
    {
      plugins: ['no-secrets'],
      rules: {
        'no-secrets/no-secrets': 'error',
      },
      files: ['*', '*/**'],
      excludedFiles: [
        'package.json',
        '**/package.json',
        'package-lock.json',
        '**/package-lock.json',
        'tsconfig.json',
        '**/tsconfig.json',
      ],
    },
  ],
}
