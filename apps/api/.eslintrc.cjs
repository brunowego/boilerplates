/**
 * @type { import('@types/eslint').Linter.Config }
 */
const eslintRC = {
  root: true,
  extends: ['@acme/eslint-config-custom/nestjs'],
}

module.exports = eslintRC
