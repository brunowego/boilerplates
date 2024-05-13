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
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}

module.exports = postcssConfig
