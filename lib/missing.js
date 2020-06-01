const isModuleAvailable = require('./isModuleAvailable')

const moduleNotAvailable = (pkg) => !isModuleAvailable(pkg.split('@')[0])

module.exports = function checkMissing(rules, extraInstallPkg) {
  const notInstalled = rules
    .map((plugin) => `eslint-plugin-${plugin}`)
    .filter((pkg) => moduleNotAvailable(pkg))

  extraInstallPkg.forEach(([rule, pkg]) => {
    if (rules.includes(rule) && moduleNotAvailable(pkg)) {
      notInstalled.push(pkg)
    }
  })

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
