import type { LinguiConfig } from '@lingui/conf'

import { locales } from '@acme/i18n'

if (process.env.NODE_ENV !== 'production') {
  locales.push('pseudo')
}

export default {
  catalogs: [
    {
      path: '<rootDir>/packages/i18n/src/locales/{locale}/messages',
      include: [
        '<rootDir>/apps/web/src/app',
        '<rootDir>/apps/web/src/components',
      ],
    },
  ],
  fallbackLocales: {
    'en-US': 'en',
    'pt-BR': 'pt',
  },
  format: 'po',
  formatOptions: { lineNumbers: false },
  locales,
  rootDir: './',
} satisfies LinguiConfig
