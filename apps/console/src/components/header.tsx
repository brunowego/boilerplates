'use client'

import type { JSX } from 'react'

import { useGetProfile } from '@/hooks/api/use-profile'
import {
  TeamSwitcher,
  MainNav,
  Search,
  UserNav,
  ThemeToggle,
} from '@/components'

export default function Header(): JSX.Element {
  const { data: user } = useGetProfile()

  return (
    <div className='container flex items-center h-16'>
      <TeamSwitcher />

      <MainNav className='mx-6' />

      <div className='flex items-center ml-auto space-x-4'>
        <Search />

        <UserNav user={user} />

        <ThemeToggle />
      </div>
    </div>
  )
}
