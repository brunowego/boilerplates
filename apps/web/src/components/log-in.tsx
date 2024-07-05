'use client'

import type { ReactNode, JSX } from 'react'

import Modal from '@acme/ui/components/modal'
import Button, { type ButtonProps } from '@acme/ui/components/button'
import { LogIn as Icon } from '@acme/ui/components/icon'

type LogInProps = ButtonProps & {
  body: ReactNode
}

export default function LogIn({ className, body }: LogInProps): JSX.Element {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <Button className={className} variant='link'>
          <Icon className='size-5 shrink-0' />

          <span className='sr-only'>Log In</span>
        </Button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Are you absolutely sure?</Modal.Title>

          <Modal.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>{body}</Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
