const isModuleAvailable = require('./is-module-available')

const moduleNotAvailable = (package_) =>
  !isModuleAvailable(package_.split('@')[0])

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
