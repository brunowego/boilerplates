import type { ReactNode, JSX } from 'react'

type EmptyStateProps = {
  emoji?: string
  title: string
  description: string
  children?: ReactNode
}

export default function EmptyState({
  emoji = '🙂',
  title,
  description,
  children,
}: EmptyStateProps): JSX.Element {
  return (
    <div className='flex justify-center rounded-md'>
      <div className='max-w-lg'>
        <div className='grid space-y-4 p-8 text-center'>
          <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-md border bg-border/20 text-2xl'>
            {emoji}
          </div>

          <div className='grid space-y-1'>
            <h1 className='font-medium text-lg'>{title}</h1>

            <p className='text-muted-foreground text-sm'>{description}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
