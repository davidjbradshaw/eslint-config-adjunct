const markdownMod = require('@eslint/markdown')
const markdown = markdownMod && markdownMod.configs ? markdownMod : markdownMod.default

module.exports = [
  // Use the official flat config for Markdown
  markdown.configs.recommended,

  // Relax certain rules inside fenced code blocks
  {
    files: ['**/*.md/*.*'],
    rules: {
      'sonarjs/*': 'off',
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
  // And at document-level for Markdown files
  {
    files: ['**/*.md'],
    rules: {
      'sonarjs/*': 'off',
    },
  },
]
