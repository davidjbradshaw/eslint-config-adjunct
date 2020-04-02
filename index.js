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
  'no-secrets',
  'no-use-extend-native',
  'optimize-regex',
  'promise',
  'sonarjs',
  'simple-import-sort',
  'switch-case',
  'unicorn',
]

// Optionals rules besed on project dependencies
const depRules = ['jest', ['fsa', 'redux'], 'prettier']
depRules.forEach((depRule) => {
  const rule = typeof depRule === 'string' ? [depRule, depRule] : depRule
  if (hasAnyDep(rule[1])) rules.push(rule[0])
})

// Extra required optional packages
const extraInstallPkg = [
  ['prettier', 'eslint-config-prettier'],
  ['jest', 'eslint-plugin-jest-async'],
]

checkMissing(rules, extraInstallPkg)
showLoaded(rules, extraInstallPkg)

module.exports = {
  extends: rules.map((plugin) => require.resolve(`./rules/${plugin}`)),
}
