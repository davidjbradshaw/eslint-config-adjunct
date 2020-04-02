module.exports = {
  extends: ['prettier', 'prettier/react', 'prettier/unicorn'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.md'],
      parserOptions: {
        ecmacFeatures: {
          impliedStrict: true,
        },
      },
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
