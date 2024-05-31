import { useState, useCallback, useMemo } from 'react'

import type { Domain } from '@acme/db/schemas'

import DeleteDomainModal from '../components/delete-domain-modal'

export type DomainProps = Pick<Domain, 'id' | 'domain'>

type useDeleteDomainModalProps = {
  props?: DomainProps
}

export function useDeleteDomainModal({ props }: useDeleteDomainModalProps) {
  const [showDeleteDomainModal, setShowDeleteDomainModal] = useState(false)

  const DeleteDomainModalCallback = useCallback(() => {
    return props ? (
      <DeleteDomainModal
        showDeleteDomainModal={showDeleteDomainModal}
        setShowDeleteDomainModal={setShowDeleteDomainModal}
        props={props}
      />
    ) : null
  }, [showDeleteDomainModal, setShowDeleteDomainModal])

  return useMemo(
    () => ({
      setShowDeleteDomainModal,
      DeleteDomainModal: DeleteDomainModalCallback,
    }),
    [setShowDeleteDomainModal, DeleteDomainModalCallback],
  )
}
