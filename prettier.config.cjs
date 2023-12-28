/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  importOrder: ['^@medusajs/(.*)$', '^@acme/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
}

module.exports = prettierConfig
