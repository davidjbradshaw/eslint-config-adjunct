const isModuleAvailable = require('./isModuleAvailable')

const moduleNotAvailable = (pkg) => !isModuleAvailable(pkg)
const makePluginName = (plugin) => `eslint-plugin-${plugin}`

module.exports = function checkMissing(rules, extraInstallPkg) {
  function checkExtra([rule, pkg]) {
    if (rules.includes(rule) && moduleNotAvailable(pkg)) {
      notInstalled.push(pkg)
    }
  }

  const notInstalled = rules.map(makePluginName).filter(moduleNotAvailable)
  extraInstallPkg.forEach(checkExtra)

  if (notInstalled.length === 0) return

  const s = notInstalled.length === 1 ? '' : 's'

  console.log(`
Oops! Something went wrong! :(
EsLint-config-adjunct could not find the following package${s}
  ${notInstalled.join('\n  ')}
To install the missing package${s}, please run the following command:
  npm install ${notInstalled.join(' ')} --save-dev
or
  yarn add ${notInstalled.join(' ')} --dev
  `)

  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}
