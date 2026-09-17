import noop from 'lodash/noop.js'

const prefixLogger = (prefix) =>
  process.env.NO_LOGS ? noop : (file) => console.log(`${prefix}${file}`)

export const consolePlugin = prefixLogger('  eslint-plugin-')
export const consoleConfig = prefixLogger('  eslint-config-')
export const consoleLog = prefixLogger('')
export default { consolePlugin, consoleConfig, consoleLog }
