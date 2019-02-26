# eslint-config-adjunct

_A mildly opinionated collection of the best lesser known esLint plugins that every project can benefit from.

This config is designed to be used alongside any of the major esLint configs, such as `airbnb`, `standard` or `xo`. It provides a range of extra rules to enhance the linting of your code.

## Install

To run this config you will need to install it along with it's `peerDependancies`.

```sh
npx install-peerdeps --dev eslint-config-adjunct
```

If you have problems with the above command, then you will need to run `install-peerdeps` locally.

```sh
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-adjunct
```

## Configure

Extend your `.eslintrc`, with `adjunct`, which should be the last item in the `extends` array. For example if your using `eslint-config-airbnb` as your main rule set, your `.eslintrc` should look like this:

```json
{
  "extends": ["airbnb", "adjunct"]
}
```

You can now include `html` and `markdown` in the list of files passed to esLint to have any contained JavaScript linted.

## Plugins

This configuration contains the following esLint plugins.

* eslint-plugin-eslint-comments
* eslint-plugin-html
* eslint-plugin-markdown
* eslint-plugin-no-constructor-bind
* eslint-plugin-no-use-extend-native
* eslint-plugin-promise
* eslint-plugin-simple-import-sort
* eslint-plugin-sonarjs
* eslint-plugin-switch-case
* eslint-plugin-unicon

## Rules

In the most part the default rules are used for the plugins listed above, with the following exceptions.

### Markdown

When linting code snippets in Markdown files, a few rules to relating to globals and unused vars are disabled.

### Switch-Case

Enforces a blank line between case blocks.

```js
// Good

switch (foo) {
  case: 1
    something()
    break

  case: 2
  case: 3
    somethingElse()

  default:
    anotherThing()
}
```

## License
Copyright &copy; 2019 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
