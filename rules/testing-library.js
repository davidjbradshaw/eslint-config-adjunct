module.exports = {
  extends: ['plugin:testing-library/recommended'],
  rules: {
    // Not included in jest/recommended
    'testing-library/await-fire-event': 0,
    'testing-library/consistent-data-testid': 0,
    'testing-library/no-debug': 0,
    'testing-library/no-dom-import': 0,
    'testing-library/no-manual-cleanup': 0,
    'testing-library/no-wait-for-empty-callback': 0,
    'testing-library/prefer-explicit-assert': 0,
    'testing-library/prefer-presence-queries': 0,
    'testing-library/prefer-screen-queries': 0,
    'testing-library/prefer-wait-for': 0,
  },
}
