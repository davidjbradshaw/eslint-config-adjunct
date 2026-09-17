export default {
  plugins: ['sonarjs'],
  extends: ['plugin:sonarjs/recommended'],
  rules: {
    'sonarjs/unused-import': 'off',
  },
  overrides: [
    {
      files: ['**/*.md', '**/*.json'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['**/*.md', '**/*.md/*.*'],
      rules: {
        'sonarjs/*': 'off',
      },
    },
  ],
}
