// From kcd-scripts
import fs from 'node:fs'
import path from 'node:path'

import arrify from 'arrify'
import { cosmiconfigSync } from 'cosmiconfig'
import has from 'lodash/has.js'
import { sync as mkdirpSync } from 'mkdirp'
import readPkgUp from 'read-pkg-up'
import { rimrafSync } from 'rimraf'

// Use process.cwd() directly to avoid non-literal fs realpathSync
const { packageJson: package_, path: packagePath } = readPkgUp.sync({
  cwd: process.cwd(),
})

const appDirectory = path.dirname(packagePath)

// Sanitize segments to avoid path traversal and ensure paths remain inside appDirectory
const sanitizeSegments = (...segments) => {
  const out = []
  for (const seg of segments.flat()) {
    const parts = String(seg).split('/').filter(Boolean)
    for (const part of parts) {
      if (part === '.' || part === '..') continue
      // Whitelist allowed characters: alphanumerics, dashes, underscores, dots
      const safe = [...part].filter((ch) => /[\w.-]/.test(ch)).join('')
      if (safe.length > 0) out.push(safe)
    }
  }
  return out
}

const ensureInsideApp = (targetPath) => {
  const resolved = path.resolve(targetPath)
  const root = path.resolve(appDirectory)
  if (!resolved.startsWith(root)) return root
  return resolved
}

const fromRoot = (...p) =>
  ensureInsideApp(path.join(appDirectory, ...sanitizeSegments(p)))

// Paths are sanitized above; suppress false-positive security warning
// eslint-disable-next-line security/detect-non-literal-fs-filename
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

const hasPackageProperty = (properties) =>
  arrify(properties).some((property) => has(package_, property)) // eslint-disable-line lodash-fp/no-extraneous-function-wrapping

const hasPackageSubProperty = (packageProperty) => (properties) =>
  hasPackageProperty(arrify(properties).map((p) => `${packageProperty}.${p}`))

const hasScript = hasPackageSubProperty('scripts')
const hasPeerDep = hasPackageSubProperty('peerDependencies')
const hasDep = hasPackageSubProperty('dependencies')
const hasDevelopmentDep = hasPackageSubProperty('devDependencies')
const hasAnyDep = (arguments_) =>
  [hasDep, hasDevelopmentDep, hasPeerDep].some((fn) => fn(arguments_))

function environmentIsSet(name) {
  return (
    process.env.hasOwnProperty(name) &&
    process.env[name] &&
    process.env[name] !== 'undefined'
  )
}

function parseEnvironment(name, def) {
  if (environmentIsSet(name)) {
    try {
      return JSON.parse(process.env[name])
    } catch (error) {
      // If it's not a JSON parse error, do not ignore it
      if (!(error instanceof SyntaxError)) throw error
      return process.env[name]
    }
  }
  return def
}

function uniq(array) {
  return [...new Set(array)]
}

function writeExtraEntry(name, { cjs, esm }, clean = true) {
  if (clean) {
    rimrafSync(fromRoot(name))
  }
  mkdirpSync(fromRoot(name))

  const packageJson = fromRoot(`${name}/package.json`)
  const entryDir = fromRoot(name)

  // Paths are sanitized and constrained to appDirectory via fromRoot
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(
    packageJson,
    JSON.stringify(
      {
        main: path.relative(entryDir, cjs),
        'jsnext:main': path.relative(entryDir, esm),
        module: path.relative(entryDir, esm),
      },
      null,
      2
    )
  )
}

function hasLocalConfig(moduleName, searchOptions = {}) {
  const explorerSync = cosmiconfigSync(moduleName, searchOptions)
  const result = explorerSync.search(packagePath)

  return result !== null
}
export { appDirectory, fromRoot, hasFile }
export const hasLocalConfigExport = hasLocalConfig
export const hasPkgProp = hasPackageProperty
export { hasAnyDep, hasScript }
export const parseEnv = parseEnvironment
export const pkg = package_
export { uniq, writeExtraEntry }
export default {
  appDirectory,
  fromRoot,
  hasFile,
  hasLocalConfig,
  hasPkgProp: hasPackageProperty,
  hasScript,
  hasAnyDep,
  parseEnv: parseEnvironment,
  pkg: package_,
  uniq,
  writeExtraEntry,
}
