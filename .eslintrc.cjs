/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  ignorePatterns: ['apps/**', 'packages/**', 'tooling/**'],
  extends: ['@acme/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}

module.exports = eslintRC
