/**
 * @type { import('eslint').Linter.Config }
 */
const eslintRC = {
  extends: ['acme/next'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
  },
}

module.exports = eslintRC
