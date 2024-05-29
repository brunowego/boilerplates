'use client'

import { type JSX, useState, useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import { pageview, pagevisit } from '@/lib/fpixel'

type FacebookPixelScriptProps = {
  fbPixelId?: string
}

export default function FacebookPixelScript({
  fbPixelId,
}: FacebookPixelScriptProps): JSX.Element | null {
  if (!fbPixelId) {
    return null
  }

  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) {
      return
    }

    pageview()
    pagevisit(pathname)
  }, [pathname, loaded])

  return (
    <Script
      id='fb-pixel'
      src='/scripts/pixel.js'
      strategy='afterInteractive'
      onLoad={() => setLoaded(true)}
      data-pixel-id={fbPixelId}
    />
  )
}
