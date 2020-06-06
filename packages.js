const { hasAnyDep } = require('./lib/utils')

// Base rules
const rules = [
  'array-func',
  'eslint-comments',
  'html',
  'json-format',
  'markdown',
  'no-constructor-bind',
  'no-use-extend-native',
  'optimize-regex',
  'promise',
  'simple-import-sort',
  'switch-case',
  'unicorn',

  // Security Rules
  'no-secrets@0.5.4',
  'no-unsanitized',
  'scanjs-rules',
  'security',
  'sonarjs',
]

// Optionals rules besed on project dependencies
const depRules = [
  ['redux', 'fsa'],
  'lodash',
  ['lodash', 'lodash-fp'],
  'ramda',
  'react-redux',
  'redux-saga',

  // Test tools
  'ava',
  ['chai', 'chai-expect'],
  ['chai', 'chai-friendly'],
  'jasmine',
  'jest',
  ['jest', 'jest-async'],
  'mocha',
  ['mocha', 'mocha-cleanup'],
  'qunit',
  ['grunt-contrib-qunit', 'qunit'],
  'cypress',
  'prettier',
]

depRules.forEach((depRule) => {
  const rule = typeof depRule === 'string' ? [depRule, depRule] : depRule
  if (hasAnyDep(rule[0])) rules.push(rule[1])
})

// Extra required optional packages
const extraInstallPackage = [['prettier', 'eslint-config-prettier']]

module.exports = { rules, extraInstallPackage }
