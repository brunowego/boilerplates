/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  extends: ['acme/react-internal'],
  env: {
    node: true,
  },
  rules: {
    'import/no-default-export': 'off',
  },
}

module.exports = eslintRC
