module.exports = {
  env: {
    jest: true,
  },
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  overrides: [
    {
      files: ['setupJest.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  plugins: ['jest'],
  rules: {
    'jest/no-disabled-tests': 'off',

    // Not included in jest/recommended
    'jest/consistent-test-it': 0,
    'jest/lowercase-name': 0,
    'jest/no-conditional-expect': 0,
    'jest/no-deprecated-functions': 0,
    'jest/no-duplicate-hooks': 0,
    'jest/no-expect-resolves': 0,
    'jest/no-hooks': 0,
    'jest/no-if': 0,
    'jest/no-interpolation-in-snapshots': 0,
    'jest/no-large-snapshots': 0,
    'jest/no-restricted-matchers': 0,
    'jest/no-test-return-statement': 0,
    'jest/no-truthy-falsy': 0,
    'jest/prefer-called-with': 0,
    'jest/prefer-expect-assertions': 0,
    'jest/prefer-hooks-on-top': 0,
    'jest/prefer-inline-snapshots': 0,
    'jest/prefer-spy-on': 0,
    'jest/prefer-strict-equal': 0,
    'jest/prefer-todo': 0,
    'jest/require-to-throw-message': 0,
    'jest/require-top-level-describe': 0,
    'jest/unbound-method': 0,
    'jest/valid-title': 0,
  },
}
