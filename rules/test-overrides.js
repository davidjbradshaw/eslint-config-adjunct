// eslint-disable-next-line no-console
console.log(' ')

module.exports = {
  overrides: [
    {
      files: [
        '**/*.spec.{j,t}s',
        '**/*.test.{j,t}s',
        '**/test/**',
        '**/tests/**',
        '**/__test__/**',
        '**/__tests__/**',
      ],
      rules: {
        'func-names': 'off',
        'global-require': 'off',
        'no-shadow': 'off',
        'max-lines': 'off',
        'max-nested-callbacks': 'off',
        'max-statements': 'off',
        'promise/always-return': 'off',
        'promise/no-callback-in-promise': 'off',
        'security/detect-non-literal-regexp': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
      },
    },
  ],
}
