'use client'

import { QRCodeCanvas } from 'qrcode.react'
import type { JSX } from 'react'

interface QRCodeProps {
  value: string
}

export default function QRCode({ value }: QRCodeProps): JSX.Element {
  return <QRCodeCanvas value={value} />
}
