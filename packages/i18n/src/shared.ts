import { type InitOptions } from 'i18next'

import enUS from './locales/enUS/translation.json'
import ptBR from './locales/ptBR/translation.json'

const resources = {
  'en-US': {
    translation: enUS,
  },
  'pt-BR': {
    translation: ptBR,
  },
}

export const initOptions: InitOptions = {
  resources,
  fallbackLng: 'en-US',
  detection: {
    order: ['cookie', 'localStorage', 'header'],
    lookupCookie: 'locale',
    lookupLocalStorage: 'locale',
    caches: ['cookie', 'localStorage', 'header'],
  },
}
