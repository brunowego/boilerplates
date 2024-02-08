export const supportedLocales: Record<string, string> = {
  en: 'English',
  'en-US': 'English (United States)',
  pt: 'Portuguese',
  'pt-BR': 'Portuguese (Brazil)',
}

export const locales = Object.keys(supportedLocales)

export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
