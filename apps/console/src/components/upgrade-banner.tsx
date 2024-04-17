'use client'

import { /* useEffect, */ useState } from 'react'

// import { Badge, useRouterStuff } from '@acme/ui'
// import Cookies from 'js-cookie'
// import { useParams } from 'next/navigation'

// import useWorkspace from '@/lib/swr/use-workspace'

import ProBanner from './pro-banner'

export default function UpgradeBanner() {
  // const { slug } = useParams() as { slug?: string }
  // const { id, name, plan, stripeId, createdAt } = useWorkspace()
  const [showProBanner, setShowProBanner] = useState<boolean | null>(null)

  // useEffect(() => {
  //   if (plan) {
  //     if (
  //       plan === 'free' &&
  //       Cookies.get('hideProBanner') !== slug &&
  //       createdAt &&
  //       Date.now() - new Date(createdAt).getTime() > 24 * 60 * 60 * 1000
  //     ) {
  //       setShowProBanner(true)
  //     } else {
  //       setShowProBanner(false)
  //     }
  //   } else {
  //     setShowProBanner(false)
  //   }
  // }, [plan, id, name, slug, stripeId, createdAt])

  // const { queryParams } = useRouterStuff()

  return (
    <>
      {/* {showProBanner && <ProBanner setShowProBanner={setShowProBanner} />} */}
      <ProBanner setShowProBanner={setShowProBanner} />

      {/* {plan === 'free' && showProBanner === false && (
        <button
          className='mb-1 ml-3 hidden sm:block'
          onClick={() =>
            queryParams({
              set: {
                upgrade: 'pro',
              },
            })
          }
          type='button'
        >
          <Badge variant='rainbow' className='px-3 py-1'>
            Upgrade
          </Badge>
        </button>
      )} */}
    </>
  )
}
