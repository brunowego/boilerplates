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
}

module.exports = prettierConfig
