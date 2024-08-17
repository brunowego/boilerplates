'use client'

import type { JSX } from 'react'

import DropdownMenu from '@acme/ui/components/dropdown-menu'
import Button from '@acme/ui/components/button'

export default function _DropdownMenu(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button>Open</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align='start' className='w-48'>
        <DropdownMenu.Label>My Account</DropdownMenu.Label>

        <DropdownMenu.Separator />

        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Billing</DropdownMenu.Item>
        <DropdownMenu.Item>Team</DropdownMenu.Item>
        <DropdownMenu.Item>Subscription</DropdownMenu.Item>

        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
