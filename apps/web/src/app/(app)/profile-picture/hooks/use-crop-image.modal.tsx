import { useState, useCallback, useMemo } from 'react'

import CropImageModal from '../components/crop-image-modal'

type FileProps = {
  file: File | null
}

type useCropImageModalProps = {
  props?: FileProps
  setCroppedImage: (image: string | null) => void
}

export default function useCropImageModal({
  props,
  setCroppedImage,
}: useCropImageModalProps) {
  const [showCropImageModal, setShowCropImageModal] = useState(false)

  const CropImageModalCallback = useCallback(() => {
    return props ? (
      <CropImageModal
        showCropImageModal={showCropImageModal}
        setShowCropImageModal={setShowCropImageModal}
        setCroppedImage={setCroppedImage}
        props={props}
      />
    ) : null
  }, [showCropImageModal, setShowCropImageModal])

  return useMemo(
    () => ({
      setShowCropImageModal,
      CropImageModal: CropImageModalCallback,
    }),
    [setShowCropImageModal, CropImageModalCallback],
  )
}
