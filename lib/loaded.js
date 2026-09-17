import { consoleLog, consolePlugin } from './loggers.js'
import { hasAnyDep } from './utils.js'

export default function showLoaded(rules, extraInstallPackage) {
  const installed = [...rules]

  extraInstallPackage.forEach(([dep, package_]) => {
    if (hasAnyDep(dep)) {
      installed.push(package_)
    }
  })

  consoleLog('\neslint-config-adjunct loaded the following packages:\n')
  installed.forEach((plugin) => consolePlugin(plugin))
}
