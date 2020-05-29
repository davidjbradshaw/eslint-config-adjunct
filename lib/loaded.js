module.exports = function showLoaded(rules, extraInstallPkg) {
  const installed = rules.map((plugin) => `eslint-plugin-${plugin}`)

  extraInstallPkg.forEach(([rule, pkg]) => {
    if (rules.includes(rule)) {
      installed.push(pkg)
    }
  })

  console.log(`
EsLint-config-adjunct loaded the following packages:

  ${installed.join('\n  ')}`)

  if (!rules.includes('prettier')) {
    console.log(' ')
  }
}
