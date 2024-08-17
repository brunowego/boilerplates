'use client'

import type { JSX } from 'react'

import Dialog from '@acme/ui/components/dialog'
import Button from '@acme/ui/components/button'

export default function _Dialog(): JSX.Element {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open</Button>
      </Dialog.Trigger>

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
