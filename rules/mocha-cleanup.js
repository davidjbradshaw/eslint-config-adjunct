module.exports = {
  extends: ['plugin:mocha-cleanup/recommended-no-limits'],
  plugins: ['mocha-cleanup'],
  rules: {
    // Rules are not in recommended config
    'mocha-cleanup/asserts-limit': 0,
    'mocha-cleanup/complexity-it': 0,
    'mocha-cleanup/disallow-stub-window': 0,
    'mocha-cleanup/disallowed-usage': 0,
  },
}
