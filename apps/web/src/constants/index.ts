export const SUPPORTED_LOCALES = ['en', 'pt']

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en'
