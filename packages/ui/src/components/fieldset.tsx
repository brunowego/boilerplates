import type { ReactNode, JSX } from 'react'

import cn from '../utils/cn'

type FieldsetProps = {
  className?: string
  title: ReactNode | string
  description?: ReactNode | string
  children: ReactNode
}

export default function Fieldset({
  className,
  title,
  description,
  children,
}: FieldsetProps): JSX.Element {
  return (
    <div
      className={cn(
        'grid items-start gap-4 xl:grid-cols-7 xl:gap-x-8',
        className,
      )}
    >
      <div className='xl:col-span-3'>
        <h2 className='font-medium'>{title}</h2>

        {description ? (
          <p className='mt-2 text-muted-foreground text-sm leading-6'>
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  )
}
