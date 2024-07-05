'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '@acme/ui/components/modal'

import SignIn from '@/app/(auth)/sign-in/components/sign-in'

export default function SignInModal(): JSX.Element {
  const { back } = useRouter()

  return (
    <Modal
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          back()
        }
      }}
    >
      <Modal.Content>
        {/* <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header> */}

        <Modal.Body className='space-y-6'>
          <SignIn />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
