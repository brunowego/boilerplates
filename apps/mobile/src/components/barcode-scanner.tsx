import { Result } from '@zxing/library'
import { useEffect, useState } from 'react'

import { cn, Icons } from '@acme/ui'

import { useZxing } from '@/hooks/use-zxing'

interface BarcodeScannerProps {
  className?: string
  constraints?: MediaStreamConstraints
  // eslint-disable-next-line no-unused-vars
  onResult?: (result: Result) => void
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error) => void
}

export function BarcodeScanner({
  className,
  constraints,
  onResult = () => {},
  onError = () => {},
}: BarcodeScannerProps) {
  const { ref } = useZxing({ constraints, onResult, onError })
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <div className='relative aspect-square overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-900'>
      <Icons.camera
        className={cn(
          'absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-0 transform stroke-neutral-300 transition-all duration-300 dark:stroke-neutral-500',
          !isLoaded && 'scale-100',
        )}
      />

      <video
        className={cn('rounded-xl object-cover', className)}
        ref={ref}
        onLoadStart={() => setIsLoaded(true)}
      />

      {/* <div
        className={cn(
          'absolute left-0 top-0 h-full w-full bg-green-200 opacity-50 transition-opacity duration-1000',
          // captured && 'opacity-100',
        )}
      /> */}
    </div>
  )
}
