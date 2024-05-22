import type { ReactNode, CSSProperties, JSX, ElementType } from 'react'

import cn from '@acme/ui/lib/cn'

export type HeadingProps = {
  rank?: 1 | 2 | 3 | 4 | 5 | 6
  align?: 'text-left' | 'text-center' | 'text-right'
  size?:
    | 'text-9xl'
    | 'text-8xl'
    | 'text-7xl'
    | 'text-6xl'
    | 'text-5xl'
    | 'text-4xl'
    | 'text-3xl'
    | 'text-2xl'
    | 'text-xl'
    | 'text-lg'
    | 'text-base'
    | 'text-sm'
    | 'text-xs'
  style?: CSSProperties
  children: ReactNode
}

export default function Heading({
  rank,
  align = 'text-left',
  size = 'text-base',
  style,
  children,
}: HeadingProps): JSX.Element {
  const Tag: ElementType = rank ? `h${rank}` : 'span'

  return (
    <Tag className={cn(align, size)} style={style}>
      {children}
    </Tag>
  )
}
