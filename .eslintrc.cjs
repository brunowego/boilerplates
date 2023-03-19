/**
 * @type { import('@types/eslint').Linter.Config }
 */
const eslintRC = {
  root: true,
  extends: ['@acme/eslint-config-custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}

module.exports = eslintRC
