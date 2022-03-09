/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
const tailwindConfig = {
  content: ['./src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

module.exports = tailwindConfig
