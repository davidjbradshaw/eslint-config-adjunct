# eslint-config-adjunct

> _A reasonable collection of *plugins* to use alongside your main esLint configuration._

This config is designed to be used alongside any of the major esLint configs, such as [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/standard/eslint-config-standard) or [eslint:recommended](https://eslint.org/docs/rules/). It provides a range of useful plugins that are often too time consuming to setup and provides an easy way to install just the plugins you need on your project's dependancies.

## Install

To install this config, run the following command.

```sh
npm install eslint-config-adjunct --save-dev
```

## Configure

Extend your `.eslintrc`, with `adjunct`, which should be the last item in the `extends` array. For example if your using `eslint-config-airbnb` as your main rule set, your `.eslintrc` should look like this:

```json
{
  "extends": ["airbnb", "adjunct"]
}
```

You can now include `html`, `json` and `markdown` in the list of files passed to esLint to have any contained JavaScript linted.

```json
{
  "scripts": {
    "eslint": "eslint --color *.{html,js,json,jsx,md} src/*.{html,js,json,jsx,md}",
    "eslint:fix": "npm run eslint -- --fix"
  }
}
```

## Install Dependencies

After you have configured eslint to include this package, the first time you run `eslint` it will output the `npm` command to install the dependancies required for your project. Cut'n'paste this command into the console, and you are then ready to start linting.

## Plugins

### Base Plugins

The following esLint plugins are always loaded in this configuration:

- [eslint-plugin-array-func](https://github.com/freaktechnik/eslint-plugin-array-func)
- [eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)
- [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
- [eslint-plugin-json-format](https://github.com/Bkucera/eslint-plugin-json-format)
- [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)
- [eslint-plugin-no-constructor-bind](https://github.com/markalfred/eslint-plugin-no-constructor-bind)
- [eslint-plugin-no-use-extend-native](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native)
- [eslint-plugin-no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [eslint-plugin-optimize-regex](https://github.com/BrainMaestro/eslint-plugin-optimize-regex)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-plugin-switch-case](https://github.com/lukeapage/eslint-plugin-switch-case)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

### Library Plugins

These plugins will be loaded in based on your project `dependencies` in `package.json`. If a supported library is part of your project then it's related esLint plugins will be loaded. The following packages are supported:

- [eslint-plugin-fsa](https://github.com/joseph-galindo/eslint-plugin-fsa) - Flux Standard Action
- [eslint-plugin-lodash](https://github.com/wix/eslint-plugin-lodash)
- [eslint-plugin-lodash-fp](https://github.com/jfmengels/eslint-plugin-lodash-fp)
- [eslint-plugin-ramda](https://github.com/ramda/eslint-plugin-ramda)
- [eslint-plugin-react-redux](https://github.com/DianaSuvorova/eslint-plugin-react-redux#readme)
- [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)

### Prettier

If prettier is installed, any rules that may conflict with Prettier will be disabled. The plugin should read you Prettier config from your projects route.

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

### Test Libraries

Test plugins are loaded based on which testing tools you have listed in `devDependencies` of `package.json`. The following test plugins are supported:

- [eslint-plugin-jasmine](https://github.com/tlvince/eslint-plugin-jasmine)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [eslint-plugin-jest-async](https://www.npmjs.com/package/eslint-plugin-jest-async)
- [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha)

## Rules

In the most part the default rules are used for the plugins listed above, with the following exceptions.

### Markdown

When linting code snippets in Markdown files, a few rules relating to globals and unused vars are disabled.

### Switch-Case

Adds the `fallthrough: 'never'` option to the the `newlint-between-switch-case` rule.

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

The following rules are disabled due to them being considered unduely restrictive or unhelpful.

- jest/no-disabled-tests
- react-redux/prefer-separate-component-file
- redux-saga/no-unhandled-errors

## License

Copyright &copy; 2019-20 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
