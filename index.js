const { FlatCompat } = require('@eslint/eslintrc')
const checkMissing = require('./lib/missing')
const showLoaded = require('./lib/loaded')
const { rules, extraInstallPackage } = require('./configs')

module.exports = function adjunct() {
  // Workaround VS Code/ESLint trying to load twice
  if (!global.hasAdjunctLoaded) {
    checkMissing(rules, extraInstallPackage)
    showLoaded(rules, extraInstallPackage)

    // Disable some rules in unit tests
    rules.push('test-overrides') // eslint-disable-line unicorn/no-array-push-push
    global.hasAdjunctLoaded = true
  }

  const compat = new FlatCompat({ baseDirectory: __dirname })

  const looksFlat = (cfg) => {
    if (Array.isArray(cfg)) return true
    if (!cfg || typeof cfg !== 'object') return false
    const hasFlatKeys = 'languageOptions' in cfg || 'ignores' in cfg || 'processor' in cfg
    const pluginsIsObject = cfg.plugins && !Array.isArray(cfg.plugins)
    return hasFlatKeys || pluginsIsObject
  }

  const resolveExtendsEntry = (entry) => {
    const JS_ONLY_PLUGINS = new Set([
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
    if (typeof entry !== 'string') return []

    const match = entry.match(/^plugin:([^/]+)\/(.+)$/)
    if (match) {
      const [, pluginName, preset] = match
      try {
        const pkg = require(`eslint-plugin-${pluginName}`)
        const configs = (pkg && (pkg.configs || (pkg.default && pkg.default.configs))) || null
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
              const parts = compat.config(chosen).map((p) => normalizePlugins(p))
              try {
                const mod = require(`eslint-plugin-${pluginName}`)
                const pluginObj = (mod && (mod.default || mod)) || null
                parts.forEach((p) => {
                  const hasRulesFor = p.rules && Object.keys(p.rules).some((rk) => rk.startsWith(`${pluginName}/`))
                  const hasPlugin = p.plugins && !Array.isArray(p.plugins) && p.plugins[pluginName]
                  if (hasRulesFor && !hasPlugin && pluginObj) {
                    p.plugins = p.plugins && !Array.isArray(p.plugins) ? p.plugins : {}
                    p.plugins[pluginName] = pluginObj
                  }
                  if (JS_ONLY_PLUGINS.has(pluginName)) {
                    p.files = p.files || ['**/*.{js,jsx,ts,tsx}']
                  }
                })
              } catch {}
              return parts
            }
            const p = normalizePlugins({ ...chosen })
            try {
              const mod = require(`eslint-plugin-${pluginName}`)
              const pluginObj = (mod && (mod.default || mod)) || null
              const hasRulesFor = p.rules && Object.keys(p.rules).some((rk) => rk.startsWith(`${pluginName}/`))
              const hasPlugin = p.plugins && !Array.isArray(p.plugins) && p.plugins[pluginName]
              if (hasRulesFor && !hasPlugin && pluginObj) {
                p.plugins = p.plugins && !Array.isArray(p.plugins) ? p.plugins : {}
                p.plugins[pluginName] = pluginObj
              }
              if (JS_ONLY_PLUGINS.has(pluginName)) {
                p.files = p.files || ['**/*.{js,jsx,ts,tsx}']
              }
            } catch {}
            return [p]
          }
        }
      } catch (error) {
        // fall back to compat for plugin presets with injection
        const parts = compat.extends(entry).map((p) => normalizePlugins(p))
        try {
          const mod = require(`eslint-plugin-${pluginName}`)
          const pluginObj = (mod && (mod.default || mod)) || null
          parts.forEach((p) => {
            const hasRulesFor = p.rules && Object.keys(p.rules).some((rk) => rk.startsWith(`${pluginName}/`))
            const hasPlugin = p.plugins && !Array.isArray(p.plugins) && p.plugins[pluginName]
            if (hasRulesFor && !hasPlugin && pluginObj) {
              p.plugins = p.plugins && !Array.isArray(p.plugins) ? p.plugins : {}
              p.plugins[pluginName] = pluginObj
            }
            if (JS_ONLY_PLUGINS.has(pluginName)) {
              p.files = p.files || ['**/*.{js,jsx,ts,tsx}']
            }
          })
        } catch {}
        return parts
      }
    }
    return compat.extends(entry)
  }

  const convertEslintrcConfig = (cfg) => {
    const parts = []
    const { extends: exts, ...rest } = cfg || {}

    if (Array.isArray(exts)) {
      exts.forEach((e) => {
        const res = resolveExtendsEntry(e).map((p) => normalizePlugins(p))
        parts.push(...res)
      })
    }

    if (!rest || Object.keys(rest).length === 0) return parts

    if ('overrides' in rest) {
      const converted = compat.config(rest).map((p) => normalizePlugins(p))
      // Inject plugin registrations for any plugin rules present
      converted.forEach((p) => {
        if (p && p.rules && typeof p.rules === 'object') {
          const rulePlugins = new Set(
            Object.keys(p.rules)
              .filter((rk) => rk.includes('/'))
              .map((rk) => rk.split('/')[0])
          )
          if (rulePlugins.size > 0) {
            p.plugins = p.plugins && !Array.isArray(p.plugins) ? p.plugins : {}
            for (const name of rulePlugins) {
              try {
                const mod = require(`eslint-plugin-${name}`)
                const pluginObj = (mod && (mod.default || mod)) || null
                if (pluginObj) {
                  p.plugins[name] = pluginObj
                  if (!p.files && new Set(['sonarjs','react-redux','redux-saga','mocha','mocha-cleanup','jasmine','jest','jest-async','jest-dom','cypress','qunit','ava','testing-library','security','unicorn','lodash','lodash-fp','ramda','simple-import-sort','promise','no-constructor-bind','no-use-extend-native','switch-case']).has(name)) {
                    p.files = ['**/*.{js,jsx,ts,tsx}']
                  }
                }
              } catch {}
            }
          }
        }
      })
      parts.push(
        ...converted.filter((p) => {
          const keys = Object.keys(p)
          return !(keys.length === 1 && keys[0] === 'plugins')
        })
      )
      return parts
    }

    const converted = compat.config(rest).map((p) => normalizePlugins(p))
    // Inject plugin registrations for any plugin rules present
    converted.forEach((p) => {
      if (p && p.rules && typeof p.rules === 'object') {
        const rulePlugins = new Set(
          Object.keys(p.rules)
            .filter((rk) => rk.includes('/'))
            .map((rk) => rk.split('/')[0])
        )
        if (rulePlugins.size > 0) {
          p.plugins = p.plugins && !Array.isArray(p.plugins) ? p.plugins : {}
          for (const name of rulePlugins) {
            try {
              const mod = require(`eslint-plugin-${name}`)
              const pluginObj = (mod && (mod.default || mod)) || null
              if (pluginObj) {
                p.plugins[name] = pluginObj
                if (!p.files && new Set(['sonarjs','react-redux','redux-saga','mocha','mocha-cleanup','jasmine','jest','jest-async','jest-dom','cypress','qunit','ava','testing-library','security','unicorn','lodash','lodash-fp','ramda','simple-import-sort','promise','no-constructor-bind','no-use-extend-native','switch-case']).has(name)) {
                  p.files = ['**/*.{js,jsx,ts,tsx}']
                }
              }
            } catch {}
          }
        }
      }
    })
    parts.push(
      ...converted.filter((p) => {
        const keys = Object.keys(p)
        return !(keys.length === 1 && keys[0] === 'plugins')
      })
    )
    return parts
  }

  const normalizePlugins = (obj) => {
    if (obj && obj.plugins && !Array.isArray(obj.plugins)) {
      for (const [name, mod] of Object.entries(obj.plugins)) {
        if (mod && typeof mod === 'object' && 'default' in mod) {
          obj.plugins[name] = mod.default
        }
      }
    }
    return obj
  }

  const flatConfigsRaw = rules
    .map((plugin) => plugin.split('@')[0])
    .map((name) => require(`./rules/${name}`))
    .flatMap((cfg) => (looksFlat(cfg) ? cfg : convertEslintrcConfig(cfg)))
    .map((cfg) => normalizePlugins(cfg))

  const flatConfigs = flatConfigsRaw
    .flat(Infinity)
    .filter((entry) => entry && typeof entry === 'object' && !Array.isArray(entry))

  // Build a single global plugin registry to avoid redefinitions
  const usedPlugins = new Set()
  const localPluginNames = new Set()
  flatConfigs.forEach((cfg) => {
    if (cfg && cfg.rules && typeof cfg.rules === 'object') {
      Object.keys(cfg.rules)
        .filter((rk) => rk.includes('/'))
        .map((rk) => rk.split('/')[0])
        .forEach((name) => usedPlugins.add(name))
    }
    if (cfg && cfg.plugins && !Array.isArray(cfg.plugins)) {
      Object.keys(cfg.plugins).forEach((name) => usedPlugins.add(name))
    }
    if (cfg && typeof cfg.processor === 'string' && cfg.processor.includes('/')) {
      localPluginNames.add(cfg.processor.split('/')[0])
    }
    if (cfg && typeof cfg.language === 'string' && cfg.language.includes('/')) {
      localPluginNames.add(cfg.language.split('/')[0])
    }
  })

  const globalPlugins = {}
  for (const name of usedPlugins) {
    if (localPluginNames.has(name)) continue
    try {
      const mod = require(`eslint-plugin-${name}`)
      globalPlugins[name] = (mod && (mod.default || mod)) || mod
    } catch {}
  }

  // Remove per-object plugins to avoid redefinition errors
  const sanitized = flatConfigs.map((cfg) => {
    if (cfg && cfg.plugins && !Array.isArray(cfg.plugins)) {
      // Keep local plugin registration when using language or processor
      if ('language' in cfg || 'processor' in cfg) {
        return cfg
      }
      const { plugins, ...rest } = cfg
      return rest
    }
    return cfg
  })

  const finalConfigs = globalPlugins && Object.keys(globalPlugins).length > 0 ? [{ plugins: globalPlugins }, ...sanitized] : sanitized

  return finalConfigs
}
