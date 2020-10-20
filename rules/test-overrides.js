require('../lib/loggers').consoleLog('  eslint-test-overrides\n')

module.exports = {
  overrides: [
    {
      files: [
        '*.spec.js',
        '*.spec.ts',
        '*.spec.jsx',
        '*.spec.tsx',
        '*.test.js',
        '*.test.ts',
        '*.test.jsx',
        '*.test.tsx',
        '**/tests/**',
        '**/test/**',
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
