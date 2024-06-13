import type { Crop, PixelCrop } from 'react-image-crop'
import { useState, useCallback } from 'react'

// import useToggle from './use-toggle'
// import useDocumentListener from './use-document-listener'

export default function useCrop() {
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: 'px',
    x: 32,
    y: 32,
    width: 400,
    height: 400,
  })

  // const [
  //   isCropping,
  //   toggleIsCropping,
  //   toggleOnIsCropping,
  //   toggleOffIsCropping,
  // ] = useToggle()

  // const [storedCrop, setStoredCrop] = useState<PixelCrop>()

  const [storedCrop, setStoredCrop] = useState<PixelCrop>()

  const onCrop = useCallback((crop: Crop | undefined) => {
    setCrop(crop)
  }, [])

  const onCancelCrop = useCallback(() => {
    // toggleOffIsCropping(),
    onCrop(undefined)
  }, [onCrop /*, toggleOffIsCropping*/])

  const cropImage = useCallback(
    async (image: HTMLImageElement, crop: PixelCrop) => {
      if (!image || !crop) {
        return
      }

      const canvas = document.createElement('canvas')

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      canvas.width = crop.width
      canvas.height = crop.height

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }

      const pixelRatio = window.devicePixelRatio

      canvas.width = crop.width * pixelRatio
      canvas.height = crop.height * pixelRatio
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.imageSmoothingQuality = 'high'

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      )

      onCrop(undefined)

      return canvas.toDataURL('image/jpeg')
    },
    [crop, onCrop],
  )

  // useDocumentListener('keydown', (event) => {
  //   if (event.key !== 'Escape') {
  //     return
  //   }

  //   onCancelCrop()
  // })

  return {
    crop,
    setCrop,
    storedCrop,
    setStoredCrop,
    onCancelCrop,
    cropImage,
    // isCropping,
    // toggleIsCropping,
    // toggleOnIsCropping,
    // toggleOffIsCropping,
  }
}
