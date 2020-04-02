module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
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
    {
      files: ['setupJest.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  plugins: ['jest', 'jest-async'],
  rules: {
    'jest/no-disabled-tests': 'off',
  },
}
