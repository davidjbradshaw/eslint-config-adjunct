import isModuleAvailable from './lib/is-module-available.js'
import { hasAnyDep } from './lib/utils.js'

// Base rules
export const rules = [
  // 'array-func',
  'const-case',
  'eslint-comments',
  'html',
  'json',
  // 'json-format',
  'no-constructor-bind',
  'no-use-extend-native',
  'optimize-regex',
  'promise',
  'simple-import-sort',
  'sonarjs',
  'markdown',
  'switch-case',
  'unicorn',

  // Security Rules
  'no-secrets',
  'no-unsanitized',
  'pii',
  'security',
  // 'xss', // Removed: incompatible with ESLint v9 flat config
]

// Optionals rules besed on project dependencies
const depRules = [
  ['redux', 'fsa'],
  'lodash',
  ['lodash', 'lodash-fp'],
  'ramda',
  'react-redux',
  'redux-saga',
]

const testRules = [
  'ava',
  ['chai', 'chai-expect'],
  ['chai', 'chai-friendly'],
  'cypress',
  'jasmine',
  'jest',
  ['jest', 'jest-async'],
  'jest-dom',
  ['@testing-library/jest-dom', 'jest-dom'],
  'mocha',
  ['mocha', 'mocha-cleanup'],
  'qunit',
  ['grunt-contrib-qunit', 'qunit'],
  ['@testing-library/dom', 'testing-library'],
]

depRules.forEach((depRule) => {
  const rule = typeof depRule === 'string' ? [depRule, depRule] : depRule
  if (hasAnyDep(rule[0])) rules.push(rule[1])
})

testRules.forEach((depRule) => {
  const rule = typeof depRule === 'string' ? [depRule, depRule] : depRule
  if (isModuleAvailable(rule[0])) rules.push(rule[1])
})

if (hasAnyDep('prettier')) rules.push('prettier')

// Extra required optional packages
export const extraInstallPackage = [['prettier', 'eslint-config-prettier']]
export default { rules, extraInstallPackage }
