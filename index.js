module.exports = {
  extends: [
    './rules/array-func',
    './rules/eslint-comments',
    './rules/html',
    './rules/json-format',
    './rules/markdown',
    './rules/no-constructor-bind',
    './rules/no-secrets',
    './rules/no-use-extend-native',
    './rules/optimize-regex',
    './rules/promise',
    './rules/sonar',
    './rules/simple-import-sort',
    './rules/switch-case',
    './rules/unicorn',
  ].map(require.resolve),
}
