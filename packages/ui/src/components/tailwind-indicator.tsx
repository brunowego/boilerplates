import type { JSX } from 'react'

interface TailwindIndicatorProps {
  env?: string
}

export default function TailwindIndicator({
  env,
}: TailwindIndicatorProps): JSX.Element | null {
  if (env === 'production') return null

  return (
    <div className='flex fixed right-4 bottom-4 z-50 justify-center items-center p-3 w-6 h-6 text-xs font-semibold rounded-full bg-foreground text-background'>
      <div className='block sm:hidden'>xs</div>
      <div className='hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>
        sm
      </div>
      <div className='hidden md:block lg:hidden xl:hidden 2xl:hidden'>md</div>
      <div className='hidden lg:block xl:hidden 2xl:hidden'>lg</div>
      <div className='hidden xl:block 2xl:hidden'>xl</div>
      <div className='hidden 2xl:block'>2xl</div>
    </div>
  )
}
