const checkMissing = require('./lib/missing')
const showLoaded = require('./lib/loaded')
const { hasAnyDep } = require('./lib/utils')

// Base rules
const rules = [
  'array-func',
  'eslint-comments',
  'html',
  'json-format',
  'markdown',
  'no-constructor-bind',
  // 'no-secrets', // latest version is buggy
  'no-use-extend-native',
  'optimize-regex',
  'promise',
  'sonarjs',
  'simple-import-sort',
  'switch-case',
  'unicorn',
]

// Optionals rules besed on project dependencies
const depRules = [
  'lodash',
  ['lodash', 'lodash-fp'],
  'ramda',
  'react-redux',
  ['redux', 'fsa'],
  'redux-saga',
  'jasmine',
  'jest',
  ['jest', 'jest-async'],
  'mocha',
  'cypress',
  'prettier',
]

depRules.forEach((depRule) => {
  const rule = typeof depRule === 'string' ? [depRule, depRule] : depRule
  if (hasAnyDep(rule[0])) rules.push(rule[1])
})

// Extra required optional packages
const extraInstallPkg = [['prettier', 'eslint-config-prettier']]

checkMissing(rules, extraInstallPkg)
showLoaded(rules, [])

// Disable some rules in unit tests
rules.push('test-overrides')

module.exports = {
  extends: rules.map((plugin) => require.resolve(`./rules/${plugin}`)),
}
