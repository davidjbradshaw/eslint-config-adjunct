// Native flat config: eslintrc-style overrides converted through FlatCompat are
// bound to this package's directory and the old ['*', '*/**'] glob matched every
// file ESLint walked, so dotfiles and LICENSE were parsed as JavaScript.
export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}', '**/*.json'],
    ignores: ['**/package.json', '**/package-lock.json', '**/tsconfig.json'],
    rules: {
      'no-secrets/no-secrets': 'error',
    },
  },
]
