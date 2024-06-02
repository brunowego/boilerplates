'use client'

import type { JSX } from 'react'

import Dialog from '@acme/ui/components/dialog'

export default function _Dialog(): JSX.Element {
  return (
    <Dialog>
      <Dialog.Trigger>Open</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>

          <Dialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </Dialog.Description>
        </Dialog.Header>
      </Dialog.Content>
    </Dialog>
  )
}
