module.exports = {
  plugins: ['array-func'],
  // extends: ['plugin:array-func/recommended'],
  rules: {
    // Rule disabled due to clash with Unicorn
    'array-func/prefer-array-from': 'off',

    // Rules not in recommended config
    'array-func/prefer-flat': 0,
    'array-func/prefer-flat-map': 0,

    // Rules in recommended config
    'array-func/from-map': 'error',
    'array-func/no-unnecessary-this-arg': 'error',
    'array-func/avoid-reverse': 'error',
  },
}
