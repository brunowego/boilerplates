import type { JSX } from 'react'
import Link from 'next/link'

import { buttonVariants } from '@acme/ui/components/button'

import type { StepProps } from '@/utils/step'

type UsernameProps = StepProps

export default function Username({ control }: UsernameProps): JSX.Element {
  return (
    <>
      <h1>Username</h1>

      <Link className={buttonVariants()} href={`/onboard/${control.next}`}>
        Continue
      </Link>
    </>
  )
}
