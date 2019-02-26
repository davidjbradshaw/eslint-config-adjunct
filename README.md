# eslint-config-adjunct

_A mildly opinionated collection of the best lesser known esLint plugins that every project should include_.

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

Extend your `.eslintrc`, with `adjunct`. For example if your using `eslint-config-airbnb` as your main rule set, your `.eslintrx` should look like this:

```json
{
  "extends": ["airbnb", "adjunct"]
}
```

## Rules

This configuration contains the following esLint plugins

* eslint-plugin-eslint-comments
* eslint-plugin-html
* eslint-plugin-json _(currently disabled)_
* eslint-plugin-markdown
* eslint-plugin-no-constructor-bind
* eslint-plugin-no-use-extend-native
* eslint-plugin-promise
* eslint-plugin-simple-import-sort
* eslint-plugin-sonarjs
* eslint-plugin-switch-case
* eslint-plugin-unicon

## License
Copyright &copy; 2019 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT License](LICENSE).
