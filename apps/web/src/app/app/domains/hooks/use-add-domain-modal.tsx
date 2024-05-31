import { useState, useCallback, useMemo } from 'react'

import AddDomainModal from '../components/add-domain-modal'

export default function useAddDomainModal() {
  const [showAddDomainModal, setShowAddDomainModal] = useState(false)

  const AddDomainModalCallback = useCallback(() => {
    return (
      <AddDomainModal
        showAddDomainModal={showAddDomainModal}
        setShowAddDomainModal={setShowAddDomainModal}
      />
    )
  }, [showAddDomainModal, setShowAddDomainModal])

  return useMemo(
    () => ({
      setShowAddDomainModal,
      AddDomainModal: AddDomainModalCallback,
    }),
    [setShowAddDomainModal, AddDomainModalCallback],
  )
}
