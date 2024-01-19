const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  plugins: ['only-warn'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['dist/', 'node_modules/', '.*.cjs', 'env.d.ts'],
  overrides: [
    {
      files: ['*.ts?(x)'],
    },
  ],
}
