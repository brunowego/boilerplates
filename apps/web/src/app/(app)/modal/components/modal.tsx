'use client'

import type { JSX } from 'react'

import Modal from '@acme/ui/components/modal'
import Button from '@acme/ui/components/button'

export default function _Modal(): JSX.Element {
  return (
    <Modal>
      <Modal.Trigger>Open</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Are you absolutely sure?</Modal.Title>

          <Modal.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>TBD</Modal.Body>

        <Modal.Footer>
          <Button type='submit'>Confirm</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
