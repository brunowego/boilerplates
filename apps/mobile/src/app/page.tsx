'use client'

import { Result } from '@zxing/library'
import { Howl } from 'howler'
import { type JSX } from 'react'

import { Icons } from '@acme/ui'

import { BarcodeScanner } from '@/components'

const BARCODE_SCAN_BEEP = new Howl({
  src: '/barcode-scan.wav',
  html5: true,
})

const constraints = {
  video: {
    aspectRatio: 1,
    facingMode: { ideal: 'environment' },
  },
} satisfies MediaStreamConstraints

export default function Page(): JSX.Element {
  const onCapture = (result: Result) => {
    BARCODE_SCAN_BEEP.play()

    console.log('result', result)

    alert(result.getText())
  }

  return (
    <main className='container max-w-lg p-4'>
      <Icons.logo className='mx-auto h-12 w-12 fill-orange-500' />

      <div className='pt-6' />

      <BarcodeScanner onResult={onCapture} constraints={constraints} />

      <div className='pt-6' />

      <p className='text-center text-sm text-muted-foreground lg:text-base'>
        Capture the product barcode with your camera.
      </p>
    </main>
  )
}
