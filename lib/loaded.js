const { consoleLog, consolePlugin } = require('./loggers')

module.exports = function showLoaded(rules, extraInstallPackage) {
  const installed = [...rules]

  extraInstallPackage.forEach(([rule, package_]) => {
    if (rules.includes(rule)) {
      installed.push(package_)
    }
  })

  consoleLog('\neslint-config-adjunct loaded the following packages:\n')
  installed.forEach((plugin) => consolePlugin(plugin))
}
