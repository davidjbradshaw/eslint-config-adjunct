import sonarjs from 'eslint-plugin-sonarjs'

// ESLint does not expand wildcard rule ids such as 'sonarjs/*', so build an
// explicit off-map covering every rule the installed plugin ships.
const allSonarRulesOff = Object.fromEntries(
  Object.keys(sonarjs.rules).map((rule) => [`sonarjs/${rule}`, 'off'])
)

export default [
  {
    plugins: ['sonarjs'],
    extends: ['plugin:sonarjs/recommended'],
    rules: {
      'sonarjs/unused-import': 'off',
    },
  },
  // Do not run SonarJS on Markdown documents, code blocks within them, or JSON
  {
    files: ['**/*.md', '**/*.md/*.{js,jsx,mjs,cjs,ts,tsx}', '**/*.json'],
    rules: allSonarRulesOff,
  },
]
