module.exports = {
  plugins: ['sonarjs'],
  extends: ['plugin:sonarjs/recommended'],
  overrides: [
    {
      files: ['**.md', '**.json'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
}
