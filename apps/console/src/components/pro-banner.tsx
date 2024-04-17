import type { Dispatch, SetStateAction } from 'react'
import { useParams } from 'next/navigation'
// import va from '@vercel/analytics'

import Button from '@acme/ui/components/button'
import Cookies from '@acme/ui/lib/js-cookie'

import useRouterStuff from '@/hooks/use-router-stuff'

type ProBannerProps = {
  setShowProBanner: Dispatch<SetStateAction<boolean>>
}

export default function ProBanner({ setShowProBanner }: ProBannerProps) {
  const { slug } = useParams() as { slug: string }
  const { queryParams } = useRouterStuff()

  return (
    <div className='fixed bottom-5 z-10 mx-5 flex flex-col space-y-3 rounded-lg border bg-secondary p-5 shadow-lg sm:right-5 sm:mx-auto sm:max-w-sm'>
      <h3 className='font-semibold text-lg'>Upgrade to Pro</h3>

      <p className='text-muted-foreground text-sm'>
        It looks like you're currently on our Free plan. Please consider
        upgrading to Pro to enjoy higher limits and extra features.
      </p>

      <div className='flex space-x-5'>
        <Button
          onClick={() => {
            setShowProBanner(false)

            // va.track('Hid Pro Banner')

            Cookies.set('hideProBanner', slug, { expires: 7 })
          }}
          variant='ghost'
        >
          Don't show again
        </Button>

        <Button
          className='w-full'
          onClick={() => {
            // va.track('Clicked on Pro Banner')

            queryParams({
              set: {
                upgrade: 'pro',
              },
            })
          }}
        >
          Upgrade
        </Button>
      </div>
    </div>
  )
}
