/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  extends: ['@acme/eslint-config/library.js'],
  // rules: {
  //   'import/no-default-export': 'off',
  //   'import/no-cycle': 'off',
  //   'import/order': [
  //     2,
  //     {
  //       'newlines-between': 'always-and-inside-groups',
  //     },
  //   ],
  // },
}

module.exports = eslintRC
