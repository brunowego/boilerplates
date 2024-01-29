'use client'

import { type ReactNode, type JSX, useState, useEffect } from 'react'

import { I18nextProvider, i18next } from '@acme/i18n'

interface ProvidersProps {
  children: ReactNode
}

export function I18nProvider({ children }: ProvidersProps): JSX.Element {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <>
      {hydrated && <I18nextProvider i18n={i18next}>{children}</I18nextProvider>}
    </>
  )
}
