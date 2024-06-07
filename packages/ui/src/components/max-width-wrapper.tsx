import type { ReactNode, JSX } from 'react'

import cn from '../utils/cn'

type MaxWidthWrapperProps = {
  className?: string
  children: ReactNode
}

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps): JSX.Element {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 lg:px-20',
        className,
      )}
    >
      {children}
    </div>
  )
}
