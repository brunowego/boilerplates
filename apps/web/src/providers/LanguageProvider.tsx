import { i18n } from '@lingui/core'
import { detect, fromUrl, fromStorage, fromNavigator } from '@lingui/detect-locale'
import { I18nProvider } from '@lingui/react'
import { ReactNode, FC, useEffect } from 'react'
import defaultLocale from '@/locales/en/messages'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/constants'

const getLocale = (): string => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  // let locale = detect(fromUrl('lang'), fromStorage('lang'), fromNavigator()) ?? DEFAULT_LOCALE
  let locale = detect(fromStorage('lang')) ?? DEFAULT_LOCALE

  if (!SUPPORTED_LOCALES.includes(locale)) {
    locale = DEFAULT_LOCALE
  }

  return locale
}

const activateDefaultLocale = () => {
  const { messages } = defaultLocale

  i18n.load(DEFAULT_LOCALE, messages)
  i18n.activate(DEFAULT_LOCALE)
}

const dynamicActivate = async (locale: string) => {
  try {
    // const { messages } = await import(`../locales/${locale}/messages`)
    const { messages } = await import(`@lingui/loader!../locales/${locale}/messages.po`)

    i18n.load(locale, messages)
    i18n.activate(locale)
  } catch (e) {
    console.error(`Error loading locale "${locale}:"`, e)

    activateDefaultLocale()
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

// const locale = getLocale()
// dynamicActivate(locale)

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  useEffect(() => {
    const locale = getLocale()

    if (locale === DEFAULT_LOCALE) {
      return activateDefaultLocale()
    }

    dynamicActivate(locale)
  }, [])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export default LanguageProvider
