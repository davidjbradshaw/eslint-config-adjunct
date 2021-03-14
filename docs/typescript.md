## TypeScript

All of the packages in _eslint-config-adjuct_ should work with TypeScript. The following is an example config using the AirBnB ruleset with Adjunct and TypeScript-Eslint.

```json
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-typescript",
    "airbnb/hooks",
    "adjunct"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```
