import i18next from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next, I18nextProvider } from 'react-i18next'

import { initOptions } from './shared'

i18next.use(detector).use(initReactI18next).init(initOptions)

export { I18nextProvider, i18next }
