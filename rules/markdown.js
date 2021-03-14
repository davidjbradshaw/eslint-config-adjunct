module.exports = {
  plugins: ['markdown'],
  overrides: [
    {
      files: ['*.md', '**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['*.md/*.js', '**/*.md/*.js'],
      rules: {
        'global-require': 'off',
        'import/no-unresolved': 'off',
        'import/order': 'off',
        'no-undef': 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        'prefer-reflect': 'off',
        strict: 'off',
      },
    },
  ],
}
