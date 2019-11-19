const isModuleAvailable = require('./lib/isModuleAvailable')

// eslint-disable-next-line unicorn/prevent-abbreviations
const moduleNotAvailable = pkg => !isModuleAvailable(pkg)

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
  'unicorn'
]

const notInstalled = rules.map(plugin => `eslint-plugin-${plugin}`).filter(moduleNotAvailable)

if (notInstalled.length !== 0) {
  console.log(`
Oops! Something went wrong! :(

EsLint-config-adjunct could not find the following package(s)

  ${notInstalled.join('\n  ')}

To install the missing packages, please run the following command:

npm install ${notInstalled.join(' ')} --save-dev

  `)
  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}

module.exports = {
  extends: rules.map(plugin => require.resolve(`./rules/${plugin}`)),
}
