<div align="center">
  <img src="https://eslint.org/icon.svg" width="160" alt="">

# eslint-config-adjunct
_A reasonable collection of *plugins* to use alongside your main esLint configuration_
</div>

This config is designed to be used alongside any of the major esLint configs, such as [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/standard/eslint-config-standard) or [eslint:recommended](https://eslint.org/docs/rules/). It provides a range of useful plugins that are often too time-consuming to setup and provides an easy way to install just the plugins you need, based on your project's dependencies.

## Install

To install this config, run the following command.

```sh
npm install eslint-config-adjunct --save-dev
```

## Configure

Extend your `.eslintrc`, with `adjunct`, which should be the last item in the `extends` array. For example if your using `eslint-config-airbnb` as your main rule set, your `.eslintrc` should look like the following. For more advanced use cases see the example configurations for [TypeScript](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/docs/typescript.md) and [Vue](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/docs/vue.md).

```json
{
  "extends": ["airbnb", "adjunct"]
}
```

You can now include `html`, `json` and `markdown` in the list of files passed to `eslint` to lint any JavaScript contained.

```json
{
  "scripts": {
    "eslint": "eslint --color --ext .html,.js,.json,.jsx,.md *.* src",
    "eslint:fix": "npm run eslint -- --fix"
  }
}
```

## Install Dependencies

After you have configured `eslint` to include this package, the first time you run `eslint` it will output the `npm` command to install the dependencies required for your project. Cut'n'paste this command into the console, and you are then ready to start linting.

## Plugins

### Code Quality

These two plugins provide a range of code quality rules:

- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

### Langauges

The following plugins expand esLint to work with json files, and lint JavaScript contiained in HTML and MarkDown:

- [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
- [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
- [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)

_When linting code snippets in Markdown files, a few [rules](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/rules/markdown.js#L3) relating to globals and unused vars are disabled._

### Library Plugins

These plugins will be loaded in based on your project `dependencies` in `package.json`. If a supported library is part of your project then it's related esLint plugins will be loaded. The following packages are supported:

- [eslint-plugin-fsa](https://github.com/joseph-galindo/eslint-plugin-fsa)
- [eslint-plugin-lodash](https://github.com/wix/eslint-plugin-lodash)
- [eslint-plugin-lodash-fp](https://github.com/jfmengels/eslint-plugin-lodash-fp)
- [eslint-plugin-ramda](https://github.com/ramda/eslint-plugin-ramda)
- [eslint-plugin-react-redux](https://github.com/DianaSuvorova/eslint-plugin-react-redux#readme)
- [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)

### Practices

The following esLint plugins enforce good coding practices:

- [eslint-plugin-const-case](https://github.com/k03mad/eslint-plugin-const-case#readme)
- [eslint-plugin-array-func](https://github.com/freaktechnik/eslint-plugin-array-func)
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

These plugins add code security rules to esLint:

- [eslint-plugin-no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [eslint-plugin-no-unsanitized](https://github.com/mozilla/eslint-plugin-no-unsanitized)
- [eslint-plugin-pii](https://github.com/shiva-hack/eslint-plugin-pii)
- [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)
- [eslint-plugin-xss](https://github.com/Rantanen/eslint-plugin-xss)

### Test Libraries

Test plugins are loaded based on which testing tools you have listed in `devDependencies` of `package.json`. The following test plugins are supported:

- [eslint-plugin-ava](https://github.com/avajs/eslint-plugin-ava)
- [eslint-plugin-chai-expect](https://github.com/turbo87/eslint-plugin-chai-expect)
- [eslint-plugin-chai-friendly](https://github.com/ihordiachenko/eslint-plugin-chai-friendly)
- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)
- [eslint-plugin-jasmine](https://github.com/tlvince/eslint-plugin-jasmine)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [eslint-plugin-jest-async](https://www.npmjs.com/package/eslint-plugin-jest-async)
- [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha)
- [eslint-plugin-mocha-cleanup](https://github.com/onechiporenko/eslint-plugin-mocha-cleanup/)
- [eslint-plugin-qunit](https://github.com/platinumazure/eslint-plugin-qunit)
- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)

_For test files a few [rules](https://github.com/davidjbradshaw/eslint-config-adjunct/blob/master/rules/test-overrides.js) are turned off, to better to support normal unit test code styles._

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

- jest/no-disabled-tests
- react-redux/prefer-separate-component-file
- redux-saga/no-unhandled-errors
- lodash/prefer over native rules
- lodash-fp/use-fp
- unicorn/no-array-for-each
- unicorn/no-fn-reference-in-iterator
- unicorn/no-array-for-each
- unicorn/no-reduce
- unicorn/no-null
- unicorn/prefer-number-properties
- unicorn/prefer-optional-catch-binding
- unicorn/prevent-abbreviations

The following rules are disabled due to clashing with other plugins

- array-func/prefer-array-from
- import/order
- sort-imports

## License

Copyright &copy; 2019-21 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
