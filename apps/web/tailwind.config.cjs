/**
 * @type { import('tailwindcss/tailwind-config').TailwindConfig }
 */
const tailwindConfig = {
  content: ['./src/app/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = tailwindConfig
