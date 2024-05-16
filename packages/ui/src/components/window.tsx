import type { ReactNode, JSX } from 'react'

type WindowProps = {
  children: ReactNode
}

export default function Window({ children }: WindowProps): JSX.Element {
  return (
    <>
      <div className='fixed inset-0 z-50 bg-background/50' />

      <div className='absolute inset-y-0 top-0 z-50 m-4 w-full max-w-7xl overflow-y-scroll rounded-md border bg-card'>
        {children}
      </div>
    </>
  )
}
