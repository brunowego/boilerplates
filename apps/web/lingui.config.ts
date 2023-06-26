import type { LinguiConfig } from '@lingui/conf'
// import { formatter } from '@lingui/format-po'

const locales = ['en', 'pt']

if (process.env.NODE_ENV !== 'production') {
  locales.push('pseudo')
}

const config: LinguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src/components', '<rootDir>/src/pages'],
    },
  ],
  // compileNamespace: 'cjs',
  // fallbackLocales: {
  //   default: 'en',
  // },
  // format: formatter({ origins: false }),
  // formatOptions: {
  //   lineNumbers: false,
  // },
  locales,
  // orderBy: 'messageId',
  rootDir: './',
  // runtimeConfigModule: ['@lingui/core', 'i18n'],
  // sourceLocale: 'en',
  // pseudoLocale: 'pseudo',
}

export default config
