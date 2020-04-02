module.exports = {
  extends: ['plugin:switch-case/recommended'],
  plugins: ['switch-case'],
  rules: {
    'switch-case/newline-between-switch-case': [
      'error',
      'always',
      { fallthrough: 'never' },
    ],
  },
}
