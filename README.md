<div align="center">
  <img src="https://eslint.org/icon.svg" width="160" alt="">

# eslint-config-adjunct
_A reasonable collection of plugins to use alongside your main ESLint configuration_
</div>

This config is designed to be used alongside your main ESLint setup. It provides a range of useful plugins that are often time‑consuming to configure and offers an easy way to include just the plugins you need, based on your project's dependencies.

## Install

Install with ESLint v9 (Flat Config). Node 20.19 or later (or 22.12 or later) is required.

```sh
npm install -D eslint@^9 eslint-config-adjunct
```

The individual ESLint plugins are declared as optional peer dependencies, so only the ones your project needs get installed (see [Install Dependencies](#install-dependencies) below).

## Configure

ESLint v9 uses Flat Config (`eslint.config.js`). Import and spread `adjunct` as the last part of your config array. For example:

```js
// eslint.config.js
import adjunct from 'eslint-config-adjunct'

export default [
  // ...your base configs (framework/language/etc)
  ...adjunct(), // keep this last so adjunct can apply its overrides
]
```

If you're migrating from shareable configs like `airbnb` or `standard` (which may still publish eslintrc-style configs), you can use the ESLint compatibility helper in your own config:

```js
// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc'
import adjunct from 'eslint-config-adjunct'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default [
  // Convert old-style extends entries to Flat Config:
  ...compat.extends('airbnb'),
  // Your project rules
  // ...
  // Finally, bring in adjunct
  ...adjunct(),
]
```

The config declares its own file patterns for `.html`, `.json` and `.md` files, so a plain `eslint .` also lints JSON, JavaScript inside HTML `<script>` tags, and JavaScript in fenced code blocks in Markdown. No `--ext` flag is needed (ESLint v9 ignores it).

```json
{
  "scripts": {
    "lint": "eslint --color .",
    "lint:fix": "eslint --color --fix ."
  }
}
```

## Install Dependencies

After you have configured ESLint to include this package, the first time you run ESLint it will output the `npm` command to install any missing dependencies required for your project. Copy and run that command and you're ready to lint.

## Plugins

### Code Quality

These two plugins provide a range of code quality rules:

- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

### Languages

The following plugins expand ESLint to work with JSON files, and lint JavaScript contained in HTML and Markdown:

- [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
- [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
- [@eslint/markdown](https://github.com/eslint/markdown)

_Only `js`, `jsx`, `mjs`, `cjs`, `ts` and `tsx` fenced code blocks are linted. Inside them a few [rules](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/rules/markdown.js) relating to globals, unused vars and imports are disabled, and SonarJS is turned off._

### Library Plugins

These plugins are loaded based on the `dependencies`, `devDependencies` and `peerDependencies` in your project's `package.json`. If a supported library is part of your project then its related ESLint plugin will be loaded. The following packages are supported:

- [eslint-plugin-fsa](https://github.com/joseph-galindo/eslint-plugin-fsa)
- [eslint-plugin-lodash](https://github.com/wix/eslint-plugin-lodash)
- [eslint-plugin-lodash-fp](https://github.com/jfmengels/eslint-plugin-lodash-fp)
- [eslint-plugin-ramda](https://github.com/ramda/eslint-plugin-ramda)
- [eslint-plugin-react-redux](https://github.com/DianaSuvorova/eslint-plugin-react-redux#readme)
- [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)

### Practices

The following esLint plugins enforce good coding practices:

- [eslint-plugin-const-case](https://github.com/k03mad/eslint-plugin-const-case#readme)
- [eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)
- [eslint-plugin-no-constructor-bind](https://github.com/markalfred/eslint-plugin-no-constructor-bind)
- [eslint-plugin-no-use-extend-native](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native)
- [eslint-plugin-optimize-regex](https://github.com/BrainMaestro/eslint-plugin-optimize-regex)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-switch-case](https://github.com/lukeapage/eslint-plugin-switch-case)

### Prettier

If prettier is installed, any rules that may conflict with Prettier will be disabled. The plugin should read you Prettier config from your project's root.

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

The prettier configs for different eslint plugins are also automatically included based on which eslint plugins have been installed into your project.

### Security

These plugins add code security rules to ESLint:

- [eslint-plugin-no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [eslint-plugin-no-unsanitized](https://github.com/mozilla/eslint-plugin-no-unsanitized)
- [eslint-plugin-pii](https://github.com/shiva-hack/eslint-plugin-pii)
- [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)
  
Note: `eslint-plugin-xss` has been removed due to incompatibility with ESLint v9.

### Test Libraries

Test plugins are loaded based on which testing tools are installed in your project. The following test plugins are supported:

- [eslint-plugin-ava](https://github.com/avajs/eslint-plugin-ava)
- [eslint-plugin-chai-expect](https://github.com/turbo87/eslint-plugin-chai-expect)
- [eslint-plugin-chai-friendly](https://github.com/ihordiachenko/eslint-plugin-chai-friendly)
- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)
- [eslint-plugin-jasmine](https://github.com/tlvince/eslint-plugin-jasmine)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [eslint-plugin-jest-async](https://www.npmjs.com/package/eslint-plugin-jest-async)
- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)
- [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha)
- [eslint-plugin-mocha-cleanup](https://github.com/onechiporenko/eslint-plugin-mocha-cleanup/)
- [eslint-plugin-qunit](https://github.com/platinumazure/eslint-plugin-qunit)
- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)

_For test files a few [rules](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/rules/test-overrides.js) are turned off, to better support normal unit test code styles._

## Rules

In the most part the default rules are used for the plugins listed above, with the following exceptions.

### Switch-Case

Adds the `fallthrough: 'never'` option to the `newline-between-switch-case` rule.

```js
// Good

switch (foo) {
  case 1:
    something()
    break

  case 2:
  case 3:
    somethingElse()
    break

  default:
    defaultThing()
}
```

### Disabled rules

The following rules are disabled due to them being considered unduly restrictive or unhelpful.

- eslint-comments/no-restricted-disable, no-unused-disable, no-use, require-description
- jest/no-disabled-tests
- lodash/prefer over native rules
- lodash-fp/use-fp
- pii/no-dob (buggy)
- react-redux/prefer-separate-component-file
- react-redux/mapStateToProps-prefer-selectors
- redux-saga/no-unhandled-errors
- sonarjs/unused-import
- unicorn/expiring-todo-comments
- unicorn/filename-case
- unicorn/no-array-for-each
- unicorn/no-null
- unicorn/prefer-number-properties
- unicorn/prefer-optional-catch-binding
- unicorn/prevent-abbreviations

The following rules are disabled due to clashing with other plugins

- import/order
- sort-imports

## License

Copyright &copy; 2019-26 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
