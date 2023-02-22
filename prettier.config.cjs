/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  plugins: [require('prettier-plugin-prisma')],
  semi: false,
  singleQuote: true,
}

module.exports = prettierConfig
