import type { JSX } from 'react'

import QRCode from '@/components/qr-code'

export default function Page(): JSX.Element {
  return (
    <main>
      <QRCode value='http://localhost:3000/product/scan' />
    </main>
  )
}
