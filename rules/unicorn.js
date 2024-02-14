module.exports = {
  extends: ['plugin:unicorn/recommended'],
  rules: {
    'unicorn/expiring-todo-comments': 0,
    'unicorn/filename-case': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/no-null': 0,
    'unicorn/prefer-number-properties': 0,
    'unicorn/prefer-optional-catch-binding': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/switch-case-braces': ['error', 'avoid'],
  },
}
