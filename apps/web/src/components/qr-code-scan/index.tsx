import {
  type QrcodeSuccessCallback,
  type QrcodeErrorCallback,
  Html5QrcodeScanner,
} from 'html5-qrcode'
import type { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner'
import { type JSX, useRef, useEffect } from 'react'

const scanRegionId = 'html5qr-code-full-region'

type QRCodeScanProps = Html5QrcodeScannerConfig & {
  qrCodeSuccessCallback: QrcodeSuccessCallback
  verbose?: boolean
  qrCodeErrorCallback?: QrcodeErrorCallback
}

export default function QRCodeScan(props: QRCodeScanProps): JSX.Element {
  const { qrCodeSuccessCallback, verbose, qrCodeErrorCallback } = props
  const ref = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    if (ref.current === null)
      ref.current = new Html5QrcodeScanner(
        scanRegionId,
        {
          videoConstraints: {
            width: 1920,
            height: 1080,
            facingMode: 'environment',
          },
          ...props,
        },
        verbose,
      )

    const html5QrcodeScanner = ref.current

    setTimeout(() => {
      const container = document.getElementById(scanRegionId)

      if (html5QrcodeScanner && container?.innerHTML === '')
        html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback)
    }, 0)

    return () => {
      if (html5QrcodeScanner) html5QrcodeScanner.clear()
    }
  }, [])

  return <div className='container !border-transparent' id={scanRegionId} />
}
