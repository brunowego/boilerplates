import type { Dispatch, SetStateAction, JSX } from 'react'

import Modal from '@acme/ui/components/modal'

import AddDomainForm from './add-domain-form'

type AddDomainModalProps = {
  showAddDomainModal: boolean
  setShowAddDomainModal: Dispatch<SetStateAction<boolean>>
  className?: string
}

export default function AddDomainModal({
  showAddDomainModal,
  setShowAddDomainModal,
  className,
}: AddDomainModalProps): JSX.Element {
  return (
    <Modal open={showAddDomainModal} onOpenChange={setShowAddDomainModal}>
      <Modal.Content className={className}>
        <Modal.Header>
          <Modal.Title>Add domain</Modal.Title>

          <Modal.Description>TBD</Modal.Description>
        </Modal.Header>

        <Modal.Body>
          <AddDomainForm setShowAddDomainModal={setShowAddDomainModal} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
