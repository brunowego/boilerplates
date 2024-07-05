'use client'

import { type JSX, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface RouterModalProps {
  path?: string
  children: React.ReactNode
  closeButtonView?: boolean
}

export default function RouterModal({
  path,
  children,
  // closeButtonView = true,
}: RouterModalProps): JSX.Element {
  const { push, back } = useRouter()
  const overlayRef = useRef(null)

  const handleRouter = () => (path ? push(path) : back())

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') {
      return
    }

    handleRouter()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run once
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <div
      className='fixed inset-0 z-50 bg-background/60'
      onClick={(e) => {
        if (overlayRef.current !== e.target) {
          return
        }

        handleRouter()
      }}
      onKeyUp={(e) => {
        if (e.key !== 'Enter') {
          return
        }

        handleRouter()
      }}
      ref={overlayRef}
    >
      <div className='data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg'>
        {/* {closeButtonView && (
          <button onClick={handleRouter} className='absolute right-6 top-5'>
            <CloseSVG
              width='24'
              height='24'
              className='stroke-gray-500 stroke-2'
            />
          </button>
        )} */}

        {children}
      </div>
    </div>
  )
}
