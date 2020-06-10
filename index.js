const checkMissing = require('./lib/missing')
const showLoaded = require('./lib/loaded')
const { rules, extraInstallPackage } = require('./configs')

checkMissing(rules, extraInstallPackage)
showLoaded(rules, [])

// Disable some rules in unit tests
rules.push('test-overrides')

module.exports = {
  extends: rules.map((plugin) =>
    require.resolve(`./rules/${plugin.split('@')[0]}`)
  ),
}
