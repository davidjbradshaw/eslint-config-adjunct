const { consoleLog, consolePlugin } = require('eslint-config-adjunct/lib/loggers')

module.exports = function showLoaded(rules, extraInstallPackage) {
  const installed = rules.map((plugin) => `eslint-plugin-${plugin}`)

  extraInstallPackage.forEach(([rule, package_]) => {
    if (rules.includes(rule)) {
      installed.push(package_)
    }
  })

  consoleLog('\nEsLint-config-adjunct loaded the following packages:\n')
  installed.forEach(consolePlugin)
}
