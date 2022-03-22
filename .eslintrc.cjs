/**
 * @type {import('@types/eslint').Linter.Config}
 */
const eslintRC = {
  extends: ['next/core-web-vitals', 'plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss'],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    semi: ['warn', 'never'],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'tailwindcss/classnames-order': 'off',
  },
}

module.exports = eslintRC
