import markdown from '@eslint/markdown'

const markdownConfigs = markdown?.configs || markdown

export default [
  // Lint Markdown syntax with the official recommended config
  ...markdownConfigs.recommended,
  // Extract fenced code blocks so the code inside them is linted as well
  ...markdownConfigs.processor,

  // Relax certain rules inside fenced JavaScript/TypeScript code blocks.
  // Only JS-family blocks are matched, otherwise ESLint would run the
  // JavaScript parser over sh/yaml/etc. snippets.
  {
    files: ['**/*.md/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'global-require': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'off',
      'no-undef': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'prefer-reflect': 'off',
      strict: 'off',
    },
  },
]
