'use client'

import validbarcode from 'barcode-validator'
import type { JSX } from 'react'

import { useRouter } from 'next/navigation'

import QRCodeScan from '@/components/qr-code-scan'

export default function Page(): JSX.Element {
  const router = useRouter()
  const qrCodeSuccessCallback = (code: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- ignore
    const isValid = validbarcode(code) as boolean

    if (isValid) router.push(`/product/${code}/new`)
  }

  return (
    <main>
      <h1>Scan Product</h1>

      <QRCodeScan
        fps={30}
        qrCodeSuccessCallback={(code) => {
          qrCodeSuccessCallback(code)
        }}
      />
    </main>
  )
}
