const makePluginName = (plugin) => `eslint-plugin-${plugin}`

module.exports = function showLoaded(rules, extraInstallPkg) {
  function checkExtra([rule, pkg]) {
    if (rules.includes(rule)) {
      installed.push(pkg)
    }
  }

  const installed = rules.map(makePluginName)
  extraInstallPkg.forEach(checkExtra)

  console.log(`
EsLint-config-adjunct loaded the following packages:

  ${installed.join('\n  ')}

`)
}
