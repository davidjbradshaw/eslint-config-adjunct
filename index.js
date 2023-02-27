const checkMissing = require('./lib/missing')
const showLoaded = require('./lib/loaded')
const { hasAnyDep } = require('./lib/utils')
const { rules, extraInstallPackage } = require('./configs')

// Workaround VS Code trying to run this file twice!
if (!global.hasAdjunctLoaded) {
  checkMissing(rules, extraInstallPackage)
  showLoaded(rules, [])

  if (hasAnyDep('prettier')) rules.push('prettier')

  // Disable some rules in unit tests
  rules.push('test-overrides') // eslint-disable-line unicorn/no-array-push-push
  global.hasAdjunctLoaded = true
}

module.exports = {
  extends: rules.map((plugin) =>
    require.resolve(`./rules/${plugin.split('@')[0]}`)
  ),
}
