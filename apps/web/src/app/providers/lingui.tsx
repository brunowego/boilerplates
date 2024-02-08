'use client'

import { type ReactNode, useState, useEffect } from 'react'
import { i18n } from '@lingui/core'
import { detect, fromStorage, fromNavigator } from '@lingui/detect-locale'
import { I18nProvider } from '@lingui/react'

import { defaultLocale } from '@acme/i18n'

export const dynamicActivate = async (locale: string) => {
  const { messages } = await import(`@acme/i18n/src/locales/${locale}/messages`)

  i18n.load(locale, messages)
  i18n.activate(locale)
  localStorage.setItem('lang', locale)
}

type LinguiProviderProps = {
  children: ReactNode
}

export default function LinguiProvider({ children }: LinguiProviderProps) {
  const locale = detect(fromStorage('lang'), fromNavigator) ?? defaultLocale
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    Promise.all([dynamicActivate(locale)]).then(() => {
      document.documentElement.lang = locale

      setIsReady(true)
    }, console.error)
  }, [locale])

  return isReady ? <I18nProvider i18n={i18n}>{children}</I18nProvider> : <></>
}
