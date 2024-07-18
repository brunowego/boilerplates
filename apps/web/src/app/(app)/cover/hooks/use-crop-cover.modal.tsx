import { useState, useCallback, useMemo } from 'react'

import CropCoverModal from '../components/crop-cover-modal'

type FileProps = {
  file: File | null
}

type useCropCoverModalProps = {
  props?: FileProps
  setCroppedCover: (image: string | null) => void
}

export default function useCropCoverModal({
  props,
  setCroppedCover,
}: useCropCoverModalProps) {
  const [showCropCoverModal, setShowCropCoverModal] = useState(false)

  const CropCoverModalCallback = useCallback(() => {
    return props ? (
      <CropCoverModal
        showCropCoverModal={showCropCoverModal}
        setShowCropCoverModal={setShowCropCoverModal}
        setCroppedCover={setCroppedCover}
        props={props}
      />
    ) : null
  }, [showCropCoverModal, setShowCropCoverModal])

  return useMemo(
    () => ({
      setShowCropCoverModal,
      CropCoverModal: CropCoverModalCallback,
    }),
    [setShowCropCoverModal, CropCoverModalCallback],
  )
}
