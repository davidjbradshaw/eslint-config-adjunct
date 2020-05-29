const { hasAnyDep } = require('../lib/utils')

const configs = ['prettier']

const optionalConfigs = [
  ['@typescript-eslint/eslint-plugin', 'prettier/@typescript-eslint'],
  'babel',
  'flowtype',
  'react',
  'standard',
  'vue',
  'unicorn',
]

optionalConfigs.forEach((optConfig) => {
  const config =
    typeof optConfig === 'string'
      ? [`eslint-plugin-${optConfig}`, `prettier/${optConfig}`]
      : optConfig

  if (hasAnyDep(config[0])) configs.push(config[1])
})

console.log(`  eslint-config-${configs.join('\n  eslint-config-')}\n`)

module.exports = {
  extends: configs,
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.md'],
      parserOptions: {
        ecmacFeatures: {
          impliedStrict: true,
        },
      },
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
