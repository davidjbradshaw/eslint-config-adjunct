const { consoleLog, consolePlugin } = require('./loggers')
const { hasAnyDep } = require('./utils')

module.exports = function showLoaded(rules, extraInstallPackage) {
  const installed = [...rules]

  extraInstallPackage.forEach(([dep, package_]) => {
    if (hasAnyDep(dep)) {
      installed.push(package_)
    }
  })

  consoleLog('\neslint-config-adjunct loaded the following packages:\n')
  installed.forEach((plugin) => consolePlugin(plugin))
}
