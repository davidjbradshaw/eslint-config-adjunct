import markdown from '@eslint/markdown'

const markdownConfigs = markdown?.configs || markdown

export default [
  // Use the official flat config for Markdown
  markdownConfigs.recommended,

  // Relax certain rules inside fenced code blocks
  {
    files: ['**/*.md/*.*'],
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
