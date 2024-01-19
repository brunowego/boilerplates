/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  ...require('../../prettier.config.cjs'),
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@acme/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript'],
  importOrderSeparation: true,
  overrides: [
    {
      files: ['tsconfig.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
}

module.exports = prettierConfig
