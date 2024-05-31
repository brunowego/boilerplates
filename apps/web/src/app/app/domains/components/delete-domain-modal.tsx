import {
  type Dispatch,
  type SetStateAction,
  type JSX,
  useState,
  type FormEvent,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'

import toast from '@acme/ui/lib/toast'
import Modal from '@acme/ui/components/modal'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

import api from '@/lib/api'

import type { DomainProps } from '../hooks/use-delete-domain-modal'

type DeleteDomainModalProps = {
  showDeleteDomainModal: boolean
  setShowDeleteDomainModal: Dispatch<SetStateAction<boolean>>
  props: DomainProps
  className?: string
}

export default function DeleteDomainModal({
  showDeleteDomainModal,
  setShowDeleteDomainModal,
  props,
  className,
}: DeleteDomainModalProps): JSX.Element {
  const [deleting, setDeleting] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    setDeleting(true)

    try {
      api
        .delete(`/domains/${props.domain}`)
        .then(() => {
          toast.success('Domain deleted successfully')

          setShowDeleteDomainModal(false)

          queryClient.invalidateQueries({ queryKey: ['domains'] })
        })
        .catch((err) => {
          console.error(err)
        })

      setDeleting(false)
    } catch (err) {
      console.error(err)
    }
  }

  const pattern = `confirm delete ${props.domain}`

  return (
    <Modal open={showDeleteDomainModal} onOpenChange={setShowDeleteDomainModal}>
      <Modal.Content className={className}>
        <form onSubmit={handleSave}>
          <Modal.Header>
            <Modal.Title>Delete {props.domain}</Modal.Title>

            <Modal.Description>
              Warning: Deleting this user will delete all associated data as
              well as their analytics, permanently. This action cannot be undone
              &ndash; proceed with caution.
            </Modal.Description>
          </Modal.Header>

          <Modal.Body>
            <div className='space-y-2'>
              <Label className='font-normal'>
                To verify, type <strong>{pattern}</strong> below
              </Label>

              <Input
                autoComplete='off'
                name='verification'
                pattern={pattern}
                required
                type='text'
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='destructive'>
              {deleting ? <Loader2 className='size-5 animate-spin' /> : null}

              <span>Confirm delete</span>
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  )
}
