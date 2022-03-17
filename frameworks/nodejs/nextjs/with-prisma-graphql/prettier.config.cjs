/**
 * @type {import('prettier').Options}
 */
const prettierConfig = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  tailwindConfig: './tailwind.config.cjs',
  plugins: [require('prettier-plugin-prisma'), require('prettier-plugin-tailwindcss')],
}

module.exports = prettierConfig
