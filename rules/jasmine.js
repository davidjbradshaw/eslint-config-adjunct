export default {
  env: {
    jasmine: true,
  },
  extends: ['plugin:jasmine/recommended'],
  plugins: ['jasmine'],
  rules: {
    'jasmine/valid-expect': 0,
  },
}
