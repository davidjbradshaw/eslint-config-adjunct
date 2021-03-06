module.exports = {
  extends: ['plugin:json/recommended-with-comments'],
  overrides: [
    {
      files: ['**.json'],
      plugins: ['json'],
      rules: {
        'comma-dangle': 0,
        'no-var': 0,
        'no-unused-vars': 0,
        quotes: 0,
        'quote-props': 0,
        semi: 0,
      },
    },
  ],
  rules: {
    // Not included in json/recommended-with-comments
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
}
