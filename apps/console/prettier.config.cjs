/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  ...require('../../prettier.config.cjs'),
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  jsxSingleQuote: true,
  importOrder: ['^@acme/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['jsx', 'typescript'],
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
