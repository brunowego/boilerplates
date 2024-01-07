/**
 * @type { import('prettier').Options }
 */
const prettierConfig = {
  ...require('../../prettier.config.cjs'),
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  jsxSingleQuote: true,
  tailwindConfig: './tailwind.config.ts',
}

module.exports = prettierConfig
