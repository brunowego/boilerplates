/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  importOrder: ['^next/(.*)$', '^@acme/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
}

module.exports = prettierConfig
