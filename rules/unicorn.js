module.exports = {
  extends: ['plugin:unicorn/recommended'],
  overrides: [
    {
      files: ['*.md', '**/*.md'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
  rules: {
    'unicorn/prefer-exponentiation-operator': 0,
    'unicorn/regex-shorthand': 0,
    'unicorn/no-fn-reference-in-iterator': 0,
    'unicorn/no-reduce': 0,
    'unicorn/no-null': 0,
    'unicorn/prefer-number-properties': 0,
    'unicorn/prefer-optional-catch-binding': 0,
  },
}
