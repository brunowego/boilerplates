'use client'

import { useRef } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Button from '@acme/ui/components/button'

import useCrop from '@/hooks/use-crop'

type ImageCropProps = {
  image: File | null | string
  setCroppedImage: (image: string | null) => void
  handleSubmit?: (croppedDataUrl: string) => void
  // setCurrentPage?: (page: number) => void
  // setOpen?: (open: boolean) => void
  className?: string
}

export default function ImageCrop({
  image,
  setCroppedImage,
  handleSubmit,
  // setCurrentPage,
  // setOpen,
  className,
}: ImageCropProps) {
  const { storedCrop, cropImage, crop, setCrop, setStoredCrop, onCancelCrop } =
    useCrop()

  const imageRef = useRef<HTMLImageElement>(null)

  const completeCrop = async () => {
    if (!imageRef.current || !storedCrop) {
      return
    }

    const canvas = await cropImage(imageRef.current, storedCrop)

    if (canvas) {
      setCroppedImage(canvas)
      handleSubmit ? handleSubmit(canvas) : null
    }

    // setCurrentPage ? setCurrentPage(1) : null
  }

  const cancelCrop = () => {
    onCancelCrop()

    // setCurrentPage ? setCurrentPage(1) : null
    // setOpen ? setOpen(false) : null
  }

  return (
    <div className={className}>
      {image && (
        <>
          <ReactCrop
            aspect={1}
            crop={crop}
            onChange={(_, percent) => setCrop(percent)}
            onComplete={(crop) => setStoredCrop(crop)}
          >
            <img alt='Crop me' ref={imageRef} src={image as string} />
          </ReactCrop>

          <div className='mt-4 flex justify-end space-x-2'>
            <Button onClick={cancelCrop} variant='outline'>
              Cancel
            </Button>

            <Button onClick={completeCrop}>Crop Image</Button>
          </div>
        </>
      )}
    </div>
  )
}
