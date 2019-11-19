# eslint-config-adjunct



> _A mildly opinionated collection of the best *esLint plugins* to use alongside your main eslint configuration._

This config is designed to be used alongside any of the major esLint configs, such as [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/standard/eslint-config-standard) or [eslint:recommended](https://eslint.org/docs/rules/). It provides a range of extra rules to enhance the linting of your code.

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

## Library Plugins

These plugins will be loaded in based on your project `dependencies` in `package.json`. If a supported library is part of your project then it's related esLint plugin will be loaded. The following packages are supported:

 -

### Test Libraries

Test plugins are loaded based on which testing tools you have listed in `devDependencies` of `package.json`. The following test plugins are supported:

 -

## Rules

In the most part the default rules are used for the plugins listed above, with the following exceptions.

### Markdown

When linting code snippets in Markdown files, a few rules relating to globals and unused vars are disabled.

### Switch-Case

Adds thes `fallthrough: 'never'` option to the the `newlint-between-switch-case` rule.

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

## License

Copyright &copy; 2019 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
