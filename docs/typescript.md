## TypeScript

All of the packages in *eslint-config-adjuct* should work with TypeScript. The following is an example config using the AirBnB ruleset with Adjunct and TypeScript-Eslint.


```json
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
    "airbnb/hooks",
    "adjunct",
    "prettier/@typescript-eslint",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  "rules": {
    "react/prop-types": 0,
    "@typescript-eslint/interface-name-prefix": 0
  }
}
```
