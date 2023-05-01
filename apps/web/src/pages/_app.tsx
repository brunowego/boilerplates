import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Locales, Translation } from '@/i18n/i18n-types'
import { loadedLocales } from '@/i18n/i18n-util'
import { loadFormatters } from '@/i18n/i18n-util.sync'
import TypesafeI18n from '@/i18n/i18n-react'

function App({ Component, pageProps }: AppProps) {
  if (!pageProps.i18n) {
    return <Component {...pageProps} />
  }

  const locale: Locales = pageProps.i18n.locale
  const dictionary: Translation = pageProps.i18n.dictionary

  loadedLocales[locale] = dictionary as Translation
  loadFormatters(locale)

  return (
    <TypesafeI18n locale={locale}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </TypesafeI18n>
  )
}

export default App
