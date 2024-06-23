'use client'

import type { JSX } from 'react'

import DropdownMenu from '@acme/ui/components/dropdown-menu'

export default function _DropdownMenu(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>

      <DropdownMenu.Content align='start' className='max-w-40'>
        <DropdownMenu.Label>My Account</DropdownMenu.Label>

        <DropdownMenu.Separator />

        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Billing</DropdownMenu.Item>
        <DropdownMenu.Item>Team</DropdownMenu.Item>
        <DropdownMenu.Item>Subscription</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
