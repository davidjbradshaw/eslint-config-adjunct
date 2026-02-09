const jsonPlugin = require('eslint-plugin-json')

const preset =
  (jsonPlugin && jsonPlugin.configs && (jsonPlugin.configs['recommended-with-comments'] || jsonPlugin.configs.recommended)) || {}

module.exports = [
  // Bring in the JSON plugin's flat config preset directly if available
  preset,

  // Project-specific tweaks for JSON files
  {
    files: ['**/*.json'],
    rules: {
      'comma-dangle': 0,
      'no-var': 0,
      'no-unused-vars': 0,
      quotes: 0,
      'quote-props': 0,
      semi: 0,
    },
  },

  // Explicitly turn off json/* rules not included in the preset
  {
    rules: {
      'json/colon-expected': 0,
      'json/comma-expected': 0,
      'json/comma-or-close-backet-expected': 0,
      'json/comma-or-close-brace-expected': 0,
      'json/comment-not-permitted': 0,
      'json/duplicate-key': 0,
      'json/enum-value-mismatch': 0,
      'json/invalid-character': 0,
      'json/invalid-escape-character': 0,
      'json/invalid-unicode': 0,
      'json/json': 0,
      'json/property-expected': 0,
      'json/schema-resolve-error': 0,
      'json/trailing-comma': 0,
      'json/undefined': 0,
      'json/unexpected-end-of-comment': 0,
      'json/unexpected-end-of-number': 0,
      'json/unexpected-end-of-string': 0,
      'json/unknown': 0,
      'json/value-expected': 0,
    },
  },
]
