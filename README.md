# eslint-config-misc
_An opinionated collection of the best lesser known esLint plugins that every project should include_

## Install

To run this config you will need to install it along with it's `peerDependancies`.

```
npx install-peerdeps --dev eslint-config-misc
```

If you have problems with the above command, then you will need to run `install-peerdeps` locally.

```
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-misc
```

## Configure

Add the following to your `.eslintrc`
```
{
  "extends": ["misc"]
}
```

Or to turn all the warnings into errors
```
{
  "extends": ["misc/strict"]
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
