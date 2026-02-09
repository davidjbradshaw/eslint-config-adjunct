## TypeScript

All of the packages in eslint-config-adjunct work fine with TypeScript. Below are two ESLint v9 Flat Config examples: a modern setup using `typescript-eslint` flat presets, and an alternative using `FlatCompat` to reuse legacy shareable configs like Airbnb.

### Modern (typescript-eslint flat presets)

```js
// eslint.config.js
import tseslint from 'typescript-eslint'
import adjunct from 'eslint-config-adjunct'

export default [
  // Recommended TypeScript rules
  ...tseslint.configs.recommended,
  // If you want type-aware rules, include one of the following and set parserOptions.project
  // ...tseslint.configs.recommendedTypeChecked,
  // or: ...tseslint.configs.strictTypeChecked,
  // then add your parserOptions.project
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },

  // Keep adjunct last so its overrides apply appropriately
  ...adjunct(),
]
```

### Using legacy shareable configs (Airbnb) via FlatCompat

```js
// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc'
import adjunct from 'eslint-config-adjunct'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default [
  // TypeScript-ESLint recommended presets (legacy extends)
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),

  // Airbnb TypeScript + hooks (legacy extends)
  ...compat.extends('airbnb-typescript'),
  ...compat.extends('airbnb/hooks'),

  // Type-aware parser options
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Finally, adjunct
  ...adjunct(),
]
```
