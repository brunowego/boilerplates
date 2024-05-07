import type { JSX } from 'react'
import Link from 'next/link'

import { buttonVariants } from '@acme/ui/components/button'

import type { StepProps } from '@/utils/step'

type AvatarProps = StepProps

export default function Avatar({ control }: AvatarProps): JSX.Element {
  return (
    <>
      <h1>Avatar</h1>

      <Link className={buttonVariants()} href={`/onboard/${control.next}`}>
        Continue
      </Link>
    </>
  )
}
