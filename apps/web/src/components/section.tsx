import { cn } from '@acme/ui'
import type { ReactNode, CSSProperties } from 'react'

export type SectionProps = {
  className?: string
  children: ReactNode
  padding?: string
  maxWidth?: string
  style?: CSSProperties
}

export default function Section({
  children,
  className,
  padding = '0px',
  maxWidth = '1280px',
  style = {},
}: SectionProps) {
  return (
    <div
      className={cn('', className)}
      style={{
        ...style,
        paddingTop: padding,
        paddingBottom: padding,
      }}
    >
      <div className='' style={{ maxWidth }}>
        {children}
      </div>
    </div>
  )
}
