const { equals, indexOf, pipe, when } = require('ramda')

const isModuleAvailable = require('eslint-config-adjunct/lib/is-module-available')
const { consoleLog } = require('eslint-config-adjunct/lib/loggers')

const moduleNotAvailable = (package_) =>
  !isModuleAvailable(package_.split('@')[0])

const atLatest = when(pipe(indexOf('@'), equals(-1)), (pkg) => `${pkg}@latest`)

module.exports = function checkMissing(rules, extraInstallPackage) {
  const notInstalled = rules
    .map((plugin) => `eslint-plugin-${plugin}`)
    .filter((package_) => moduleNotAvailable(package_))

  extraInstallPackage.forEach(([rule, package_]) => {
    if (rules.includes(rule) && moduleNotAvailable(package_)) {
      notInstalled.push(package_)
    }
  })

  if (notInstalled.length === 0) return

  const s = notInstalled.length === 1 ? '' : 's'

  consoleLog(`\nOops! Something went wrong! :(

EsLint-config-adjunct could not find the following package${s}

  ${notInstalled.join('\n  ')}

To install the missing package${s}, please run the following command:

  npm install ${notInstalled.map(atLatest).join(' ')} --save-dev

or

  yarn add ${notInstalled.map(atLatest).join(' ')} --dev

  `)

  process.exit(1) // eslint-disable-line unicorn/no-process-exit
}
