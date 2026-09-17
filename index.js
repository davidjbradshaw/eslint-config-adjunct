import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'

import { extraInstallPackage, rules } from './configs.js'
import showLoaded from './lib/loaded.js'
import checkMissing from './lib/missing.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Synchronous require() that can also load ESM-only packages (Node >= 20.19 / 22.12)
const require = createRequire(import.meta.url)

// Plugins that should only apply to JS/TS files
const jsOnlyPlugins = new Set([
  'sonarjs',
  'react-redux',
  'redux-saga',
  'mocha',
  'mocha-cleanup',
  'jasmine',
  'jest',
  'jest-async',
  'jest-dom',
  'cypress',
  'qunit',
  'ava',
  'testing-library',
  'security',
  'unicorn',
  'lodash',
  'lodash-fp',
  'ramda',
  'simple-import-sort',
  'promise',
  'no-constructor-bind',
  'no-use-extend-native',
  'switch-case',
])

const isModuleNotFound = (error) =>
  error &&
  (error.code === 'MODULE_NOT_FOUND' ||
    error.code === 'ERR_MODULE_NOT_FOUND' ||
    /Cannot find module/.test(error.message))

// Load a module by name, unwrapping ESM default exports. Returns null if not installed.
const tryRequire = (id) => {
  try {
    // Ids are built from the fixed rules list in configs.js, not user input
    // eslint-disable-next-line security/detect-non-literal-require
    const mod = require(id)
    return mod?.default ?? mod
  } catch (error) {
    if (isModuleNotFound(error)) return null
    throw error
  }
}

const pluginCache = new Map()
const loadPlugin = (name) => {
  if (!pluginCache.has(name)) {
    pluginCache.set(name, tryRequire(`eslint-plugin-${name}`))
  }
  return pluginCache.get(name)
}

const loadRuleModule = (name) => tryRequire(`./rules/${name.split('@')[0]}.js`)

// Identify if a config is already in flat format
const looksFlat = (cfg) => {
  if (!cfg || typeof cfg !== 'object') return false
  // If using eslintrc-style keys, force compat conversion
  if ('extends' in cfg) return false
  if (Array.isArray(cfg.plugins)) return false
  const hasFlatKeys =
    'languageOptions' in cfg ||
    'ignores' in cfg ||
    'processor' in cfg ||
    'files' in cfg
  const pluginsIsObject = cfg.plugins && !Array.isArray(cfg.plugins)
  return hasFlatKeys || pluginsIsObject
}

const normalizePlugins = (obj) => {
  if (obj && obj.plugins && !Array.isArray(obj.plugins)) {
    for (const [name, mod] of Object.entries(obj.plugins)) {
      if (mod && typeof mod === 'object' && 'default' in mod) {
        obj.plugins[name] = mod.default
      }
    }
  } else if (obj && Array.isArray(obj.plugins)) {
    // Remove array-style plugin entries; plugins are registered globally
    delete obj.plugins
  }
  return obj
}

const resolvePluginPreset = (compat, pluginName, preset, entry) => {
  const pkg = loadPlugin(pluginName)
  const configs = pkg?.configs || null
  if (configs) {
    const flatKey = `flat/${preset}`
    const chosen = configs[flatKey] || configs[preset]
    if (chosen) {
      if (
        Array.isArray(chosen.plugins) ||
        typeof chosen.extends === 'string' ||
        Array.isArray(chosen.extends) ||
        'env' in chosen
      ) {
        return compat.config(chosen).map((p) => normalizePlugins(p))
      }
      return [normalizePlugins({ ...chosen })]
    }
  }
  return compat.extends(entry).map((p) => normalizePlugins(p))
}

const resolveExtendsEntry = (compat, entry) => {
  if (typeof entry !== 'string') return []
  const match = entry.match(/^plugin:([^/]+)\/(.+)$/)
  if (!match) return compat.extends(entry).map((p) => normalizePlugins(p))
  const [, pluginName, preset] = match
  return resolvePluginPreset(compat, pluginName, preset, entry)
}

const convertEslintrcConfig = (compat, cfg) => {
  const parts = []
  const { extends: exts, ...rest } = cfg || {}

  if (Array.isArray(exts)) {
    exts.forEach((e) => {
      const res = resolveExtendsEntry(compat, e)
      parts.push(...res)
    })
  }

  if (!rest || Object.keys(rest).length === 0) return parts

  const converted = compat.config(rest).map((p) => normalizePlugins(p))
  // Filter out pure plugins-only entries
  parts.push(
    ...converted.filter((p) => {
      const keys = Object.keys(p)
      return !(keys.length === 1 && keys[0] === 'plugins')
    })
  )
  return parts
}

const flattenConfigEntry = (compat, cfg) => {
  if (Array.isArray(cfg)) {
    return cfg.flatMap((sub) => flattenConfigEntry(compat, sub))
  }
  if (looksFlat(cfg)) {
    return [normalizePlugins(cfg)]
  }
  return convertEslintrcConfig(compat, cfg)
}

const buildFlatConfigs = (compat, ruleNames) => {
  const out = []
  for (const ruleName of ruleNames) {
    const exported = loadRuleModule(ruleName)
    if (!exported) continue
    const entries = Array.isArray(exported) ? exported : [exported]
    entries.forEach((cfg) => {
      out.push(...flattenConfigEntry(compat, cfg))
    })
  }
  return out
}

const collectPluginUsage = (flatConfigs) => {
  const usedPlugins = new Set()
  const localPluginNames = new Set()
  flatConfigs.forEach((cfg) => {
    if (cfg?.rules) {
      for (const rk of Object.keys(cfg.rules)) {
        const idx = rk.indexOf('/')
        if (idx > 0) usedPlugins.add(rk.slice(0, idx))
      }
    }
    // Plugins declared directly (e.g. html, which has no rules of its own)
    if (cfg?.plugins && !Array.isArray(cfg.plugins)) {
      for (const name of Object.keys(cfg.plugins)) usedPlugins.add(name)
    }
    if (cfg && typeof cfg.language === 'string' && cfg.language.includes('/')) {
      localPluginNames.add(cfg.language.split('/')[0])
    }
    if (
      cfg &&
      typeof cfg.processor === 'string' &&
      cfg.processor.includes('/')
    ) {
      localPluginNames.add(cfg.processor.split('/')[0])
    }
  })
  return { usedPlugins, localPluginNames }
}

const getGlobalPlugins = (usedPlugins, localPluginNames) => {
  const globalPlugins = {}
  for (const name of usedPlugins) {
    if (localPluginNames.has(name)) continue
    const mod = loadPlugin(name)
    if (mod) globalPlugins[name] = mod
  }
  return globalPlugins
}

function initOnce() {
  // Workaround VS Code/ESLint trying to load twice
  if (!globalThis.hasAdjunctLoaded) {
    checkMissing(rules, extraInstallPackage)
    showLoaded(rules, extraInstallPackage)
    // Disable some rules in unit tests
    rules.push('test-overrides')
    globalThis.hasAdjunctLoaded = true
  }
}

const sanitizeConfigs = (flatConfigs) => {
  return flatConfigs.map((cfg) => {
    // Restrict JS-only plugin rules to JS/TS files
    if (cfg && cfg.rules && !('files' in cfg)) {
      const ruleKeys = Object.keys(cfg.rules)
      for (const rk of ruleKeys) {
        const idx = rk.indexOf('/')
        if (idx > 0) {
          const name = rk.slice(0, idx)
          if (jsOnlyPlugins.has(name)) {
            cfg.files = ['**/*.{js,jsx,ts,tsx}']
            break
          }
        }
      }
    }
    if (cfg && cfg.plugins && !Array.isArray(cfg.plugins)) {
      // Keep local plugin registration when using language or processor
      if ('language' in cfg || 'processor' in cfg) return cfg
      const { plugins, ...rest } = cfg
      return rest
    }
    return cfg
  })
}

const buildFinalConfigs = (sanitized, globalPlugins) => {
  const base =
    globalPlugins && Object.keys(globalPlugins).length > 0
      ? [{ plugins: globalPlugins }, ...sanitized]
      : sanitized
  // Allow internal config imports
  base.push({
    files: ['index.js'],
    rules: { 'ava/no-import-test-files': 'off' },
  })
  return base
}

function adjunct() {
  initOnce()

  const compat = new FlatCompat({ baseDirectory: __dirname })

  // Load rule configs and convert to flat format
  const flatConfigs = buildFlatConfigs(compat, rules)

  // Collect plugin usage to register globally
  const { usedPlugins, localPluginNames } = collectPluginUsage(flatConfigs)

  const globalPlugins = getGlobalPlugins(usedPlugins, localPluginNames)

  // Remove per-object plugins to avoid redefinition errors
  const sanitized = sanitizeConfigs(flatConfigs)
  return buildFinalConfigs(sanitized, globalPlugins)
}

export default adjunct
