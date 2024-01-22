const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  plugins: ['only-warn'],
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['dist/', 'node_modules/', '.*.cjs'],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      files: ['*.ts?(x)'],
      rules: {
        curly: [2, 'multi'],
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
  ],
}
