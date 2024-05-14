import type { ReactNode, JSX } from 'react'

type FieldsetProps = {
  title: ReactNode | string
  description?: ReactNode | string
  children: ReactNode
}

export default function Fieldset({
  title,
  description,
  children,
}: FieldsetProps): JSX.Element {
  return (
    <div className='grid items-start gap-4 xl:grid-cols-7 xl:gap-x-8'>
      <div className='xl:col-span-3'>
        <h2 className='font-medium'>{title}</h2>

        {description ? (
          <p className='mt-2 text-muted-foreground text-sm leading-relaxed'>
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  )
}
