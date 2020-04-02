module.exports = {
  extends: ['plugin:mocha/recommended'],
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.test.js'],
      rules: {
        'func-names': 'off',
        'global-require': 'off',
        'no-shadow': 'off',
        'max-lines': 'off',
        'max-nested-callbacks': 'off',
        'max-statements': 'off',
      },
    },
  ],
  plugins: ['mocha'],
}
