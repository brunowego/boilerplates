'use client'

import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'
// biome-ignore lint/suspicious/noShadowRestrictedNames: This is a Next.js component
import Error from 'next/error'

export default function GlobalError({ error }) {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html lang='en'>
      <body>
        <Error />
      </body>
    </html>
  )
}
