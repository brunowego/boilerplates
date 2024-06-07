const { join } = require('node:path')

/**
 * @type { import('postcss').ProcessOptions }
 */
const postcssConfig = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.ts'),
    },
    autoprefixer: {},
  },
}

module.exports = postcssConfig
