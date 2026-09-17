import isModuleAvailable from '../lib/is-module-available.js'
import { consoleConfig } from '../lib/loggers.js'
import { hasAnyDep } from '../lib/utils.js'

const configs = ['prettier']

const optionalConfigs = [
  ['@typescript-eslint/eslint-plugin', 'prettier/@typescript-eslint'],
  'babel',
  'flowtype',
  'react',
  ['eslint-config-standard', 'prettier/standard'],
  'vue',
  'unicorn',
]

optionalConfigs.forEach((optConfig) => {
  const config =
    typeof optConfig === 'string'
      ? [`eslint-plugin-${optConfig}`, `prettier/${optConfig}`]
      : optConfig

  if (hasAnyDep(config[0]) && isModuleAvailable(config[1]))
    configs.push(config[1])
})

if (!globalThis.hasAdjunctPrettierLoaded) {
  configs.map((config) => consoleConfig(config))
  globalThis.hasAdjunctPrettierLoaded = true
}

export default {
  extends: configs,
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**.md', '**.json'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
