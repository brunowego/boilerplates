/**
 * @type { import('@types/eslint').Linter.Config }
 */
const eslintRC = {
  root: true,
  extends: ['custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}

module.exports = eslintRC
