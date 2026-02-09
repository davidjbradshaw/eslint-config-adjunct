# Changelog

## 5.0.0 (2026-02-09)

Breaking: migrate to ESLint v9 Flat Config.

- Switch entry to return Flat Config via `FlatCompat`, preserving dynamic plugin selection
- Replace legacy Markdown processor with `@eslint/markdown` flat config
- Load JSON preset in flat mode and maintain repo-specific relaxations
- Normalize plugin exports (ESM default) and co-locate plugin registration with preset rules
- Filter duplicate plugin registrations to avoid conflicts
- Update docs for Flat Config (README, TypeScript, Vue)
- Require Node >= 18; ESLint pinned to ^9 for `@typescript-eslint` compatibility

Notes:

- If you relied on `.eslintrc`, migrate to `eslint.config.js` per README
- Remove legacy markdown plugin in your project and add `@eslint/markdown` if linting Markdown
