// From kcd-scripts

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const arrify = require('arrify')
const has = require('lodash/has')
const readPkgUp = require('read-pkg-up')
const { cosmiconfigSync } = require('cosmiconfig')

const { packageJson: pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})

const appDirectory = path.dirname(pkgPath)

const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

// eslint-disable-next-line lodash-fp/no-extraneous-function-wrapping
const hasPkgProp = (props) => arrify(props).some((prop) => has(pkg, prop))

const hasPkgSubProp = (pkgProp) => (props) =>
  hasPkgProp(arrify(props).map((p) => `${pkgProp}.${p}`))

const hasScript = hasPkgSubProp('scripts')
const hasPeerDep = hasPkgSubProp('peerDependencies')
const hasDep = hasPkgSubProp('dependencies')
const hasDevDep = hasPkgSubProp('devDependencies')
const hasAnyDep = (args) =>
  [hasDep, hasDevDep, hasPeerDep].some((fn) => fn(args))

function parseEnv(name, def) {
  if (envIsSet(name)) {
    try {
      return JSON.parse(process.env[name])
    } catch (error) {
      return process.env[name]
    }
  }
  return def
}

function envIsSet(name) {
  return (
    process.env.hasOwnProperty(name) && // eslint-disable-line no-prototype-builtins
    process.env[name] &&
    process.env[name] !== 'undefined'
  )
}

function uniq(arr) {
  return [...new Set(arr)]
}

function writeExtraEntry(name, { cjs, esm }, clean = true) {
  if (clean) {
    rimraf.sync(fromRoot(name))
  }
  mkdirp.sync(fromRoot(name))

  const pkgJson = fromRoot(`${name}/package.json`)
  const entryDir = fromRoot(name)

  fs.writeFileSync(
    pkgJson,
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
  const result = explorerSync.search(pkgPath)

  return result !== null
}

module.exports = {
  appDirectory,
  fromRoot,
  hasFile,
  hasLocalConfig,
  hasPkgProp,
  hasScript,
  hasAnyDep,
  parseEnv,
  pkg,
  uniq,
  writeExtraEntry,
}
