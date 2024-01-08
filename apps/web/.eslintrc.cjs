/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  root: true,
  extends: ['@acme/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['mockServiceWorker.js'],
  env: {
    vitest: true,
  },
}

module.exports = eslintRC
