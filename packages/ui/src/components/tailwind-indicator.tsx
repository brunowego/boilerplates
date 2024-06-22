import type { JSX } from 'react'

interface TailwindIndicatorProps {
  env?: string
}

export default function TailwindIndicator({
  env,
}: TailwindIndicatorProps): JSX.Element | null {
  if (env === 'production') {
    return null
  }

  return (
    <div className='fixed right-4 bottom-4 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-foreground p-3 font-semibold text-background text-xs'>
      <div className='block sm:hidden'>xs</div>
      <div className='hidden sm:block 2xl:hidden lg:hidden md:hidden xl:hidden'>
        sm
      </div>
      <div className='hidden md:block 2xl:hidden lg:hidden xl:hidden'>md</div>
      <div className='hidden lg:block 2xl:hidden xl:hidden'>lg</div>
      <div className='hidden xl:block 2xl:hidden'>xl</div>
      <div className='hidden 2xl:block'>2xl</div>
    </div>
  )
}
