'use client'

import type { JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import { Search } from '@acme/ui/components/icon'
import Input from '@acme/ui/components/input'
import Avatar from '@acme/ui/components/avatar'

export default function Header(): JSX.Element {
  return (
    <div className='flex items-center gap-x-4 max-md:flex-wrap'>
      <div className='flex grow items-center space-x-4'>
        <Link href='/'>
          <LogoMark className='h-8' />
        </Link>

        <div className='relative flex w-full max-w-[11rem] sm:max-w-sm'>
          <Search className='absolute inset-y-1 left-3 size-5 self-center text-muted-foreground' />

          <Input className='!rounded-full pl-10' placeholder='Search...' />
        </div>
      </div>

      <nav className='flex h-14 items-center space-x-4 max-md:order-last max-md:w-full md:justify-end'>
        <div className='max-md:w-full'>
          <Link href='/'>Home</Link>
        </div>

        <Link href='/'>Contact</Link>
      </nav>

      <Avatar>
        <Avatar.Image src='https://i.pravatar.cc/80' />
        <Avatar.Fallback />
      </Avatar>

      {/* <Menu className='size-7' /> */}
    </div>
  )
}
