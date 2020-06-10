module.exports = {
  overrides: [
    {
      files: ['*.json', '**/*.json'],
      excludedFiles: ['package.json', '**/package.js'],
      extends: ['plugin:json/recommended-with-comments'],
      plugins: ['json'],
    },
  ],
}
