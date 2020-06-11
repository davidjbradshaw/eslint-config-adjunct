module.exports = {
  overrides: [
    {
      files: ['*.json', '**/*.json'],
      // excludedFiles: ['package.json', '**/package.json'],
      extends: ['plugin:json/recommended-with-comments'],
      plugins: ['json'],
    },
  ],
}
