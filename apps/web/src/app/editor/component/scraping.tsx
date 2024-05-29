import type { JSX } from 'react'

import FacebookPixelScript from '@/components/facebook-pixel-script'

export default async function Scraping(): Promise<JSX.Element> {
  const html = await fetch('https://thiago-bastos.my.canva.site', {
    mode: 'no-cors',
  }).then((response) => {
    switch (response.status) {
      case 200:
        return response.text()
      case 404:
        throw response
    }
  })

  return (
    <>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a safe use of dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: html as string }}
      />

      <FacebookPixelScript
        fbPixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
      />
    </>
  )
}
