import { type ReactNode, useEffect, useState } from 'react'

import { buttonVariants } from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

type ButtonProps = {
  className?: string
  children: ReactNode
  href?: string
  onClick?: (e: any) => void | Promise<void>
  variant?: 'default' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  tabIndex?: number
  newTab?: boolean
  icon?: ReactNode
  size?: 'default' | 'sm' | 'lg'
  loading?: boolean
}

export const Button = ({
  className,
  children,
  href,
  onClick,
  variant = 'default',
  type,
  disabled,
  tabIndex,
  newTab,
  icon,
  size = 'default',
  loading: loadingProp = false,
}: ButtonProps) => {
  const [loading, setLoading] = useState(loadingProp)

  useEffect(() => setLoading(loadingProp), [loadingProp])

  const ElementType = href ? 'a' : type ? 'button' : 'span'

  return (
    <ElementType
      className={buttonVariants({ className, size, variant })}
      disabled={disabled || loading}
      href={href}
      onClick={(e) => {
        if (!onClick) {
          return
        }

        setLoading(true)

        Promise.resolve(onClick(e)).then(() => {
          setLoading(false)
        })
      }}
      rel={newTab ? 'noreferrer' : undefined}
      tabIndex={tabIndex}
      target={newTab ? '_blank' : undefined}
      type={type}
    >
      {icon}

      {children}

      {loading && <Loader2 className='size-4 animate-spin' />}
    </ElementType>
  )
}
