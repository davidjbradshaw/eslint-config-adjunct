## Vue

Example Vue configuration with Airbnb rules using ESLint v9 Flat Config. Since many Vue and Airbnb presets publish eslintrc-style configs, this example uses `FlatCompat` to convert them, then adds Adjunct.

```js
// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc'
import adjunct from 'eslint-config-adjunct'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default [
  // Vue recommended rules (legacy extends)
  ...compat.extends('plugin:vue/recommended'),

  // Airbnb base + Vue combo presets (legacy extends)
  ...compat.extends('@vue/airbnb'),
  // If using TypeScript, you might also add:
  // ...compat.extends('@vue/typescript/recommended'),

  // Your project rules
  {
    rules: {
      // Example toggles
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  // Finally, adjunct (keep last)
  ...adjunct(),
]
```
