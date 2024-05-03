'use client'

import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import { GitHub } from '@acme/ui/components/logo'

import { signInWithGitHub } from '../actions'

export default function GitHubButton(): JSX.Element {
  return (
    <form action={signInWithGitHub}>
      <Button className='w-full space-x-2' size='lg'>
        <GitHub className='size-6' />

        <span>Continue with GitHub</span>
      </Button>
    </form>
  )
}
