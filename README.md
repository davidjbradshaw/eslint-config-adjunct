# eslint-config-adjunct
_An opinionated collection of the best lesser known esLint plugins that every project should include_

## Install

To run this config you will need to install it along with it's `peerDependancies`.

```
npx install-peerdeps --dev eslint-config-adjunct
```

If you have problems with the above command, then you will need to run `install-peerdeps` locally.

```
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-adjunct
```

## Configure

Add the following to your `.eslintrc`
```
{
  "extends": ["adjunct"]
}
```

## Rules

This configuration contains the following esLint plugins

 - eslint-plugin-eslint-comments
 - eslint-plugin-html
 - eslint-plugin-json _(currently disabled)_
 - eslint-plugin-markdown
 - eslint-plugin-no-constructor-bind
 - eslint-plugin-no-use-extend-native
 - eslint-plugin-promise
 - eslint-plugin-simple-import-sort
 - eslint-plugin-sonarjs
 - eslint-plugin-switch-case
 - eslint-plugin-unicon
