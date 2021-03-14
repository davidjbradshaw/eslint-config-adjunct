const { equals, indexOf, pipe, when } = require('ramda')

const { hasAnyDep } = require('./utils')
const isModuleAvailable = require('./is-module-available')
const { consoleLog } = require('./loggers')

const moduleNotAvailable = (pkg) => !isModuleAvailable(pkg.split('@')[0])

const atLatest = when(pipe(indexOf('@'), equals(-1)), (pkg) => `${pkg}@latest`)

module.exports = function checkMissing(rules, extraInstallPackage) {
  const notInstalled = rules
    .map((plugin) => `eslint-plugin-${plugin}`)
    .filter((pkg) => moduleNotAvailable(pkg))

  extraInstallPackage.forEach(([dep, pkg]) => {
    if (hasAnyDep(dep) && moduleNotAvailable(pkg)) {
      notInstalled.push(pkg)
    }
  })

  if (notInstalled.length === 0) return

  const s = notInstalled.length === 1 ? '' : 's'

  consoleLog(`\nOops! Something went wrong! :(

EsLint-config-adjunct could not find the following package${s}

  ${notInstalled.join('\n  ')}

To install the missing package${s}, please run the following command:

  npm install ${notInstalled.map((pkg) => atLatest(pkg)).join(' ')} --save-dev

or

  yarn add ${notInstalled.map((pkg) => atLatest(pkg)).join(' ')} --dev

  `)

  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}
