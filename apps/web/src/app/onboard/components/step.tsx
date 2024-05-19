import type { ReactNode, JSX } from 'react'

type StepProps = {
  step: string
  title: string
  description: string
  children: ReactNode
}

export default function Step({
  step,
  title,
  description,
  children,
}: StepProps): JSX.Element {
  return (
    <div className='mx-auto max-w-xl'>
      <p className='mb-2 text-muted-foreground'>{step}</p>

      <h2 className='mb-4 font-medium text-3xl'>{title}</h2>

      <p className='text-muted-foreground'>{description}</p>

      {children}
    </div>
  )
}
