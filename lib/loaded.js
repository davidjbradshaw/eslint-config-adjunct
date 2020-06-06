module.exports = function showLoaded(rules, extraInstallPackage) {
  const installed = rules.map((plugin) => `eslint-plugin-${plugin}`)

  extraInstallPackage.forEach(([rule, package_]) => {
    if (rules.includes(rule)) {
      installed.push(package_)
    }
  })

  console.log(`
EsLint-config-adjunct loaded the following packages:

  ${installed.join('\n  ')}`)
}
