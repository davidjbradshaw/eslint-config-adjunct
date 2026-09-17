import html from 'eslint-plugin-html'

// eslint-plugin-html v8 exposes no processor; it patches ESLint's Linter when
// loaded, so registering the plugin against HTML files is all that is required.
export default [
  {
    files: ['**/*.html'],
    plugins: { html },
  },
]
