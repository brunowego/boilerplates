/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  extends: ['@rocketseat/eslint-config/node', 'plugin:drizzle/all'],
  plugins: ['drizzle'],
  root: true,
}

module.exports = eslintRC
