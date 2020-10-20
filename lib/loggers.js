const noop = () => undefined
const consolePrefix = (prefix) => process.env.NO_LOGS ? noop : (file) => console.log(`${prefix}${file}`)
const consolePlugin = consolePrefix('  eslint-plugin-')
const consoleConfig = consolePrefix('  eslint-config-')
const consoleLog = consolePrefix('')

module.exports = {
  consolePlugin,
  consoleConfig,
  consoleLog
}
