'use client'

import { useRef } from 'react'
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import Button from '@acme/ui/components/button'

type ImageCropperProps = {
  image: File | null | string
  setCroppedImage: (image: string | null) => void
  handleSubmit?: (croppedDataUrl: string) => void
  setCurrentPage?: (page: number) => void
  setOpen?: (open: boolean) => void
  className?: string
}

export default function ImageCropper({
  image,
  setCroppedImage,
  handleSubmit,
  setCurrentPage,
  setOpen,
  className,
}: ImageCropperProps) {
  interface CropperImageElement extends HTMLImageElement {
    cropper?: Cropper
  }

  const cropperRef = useRef<CropperImageElement>(null)

  const cropImage = () => {
    if (cropperRef.current && cropperRef.current !== null) {
      const imageElement: CropperImageElement | null = cropperRef.current
      const cropper: Cropper | undefined = imageElement.cropper

      if (cropper) {
        const croppedDataUrl = cropper.getCroppedCanvas().toDataURL()
        setCroppedImage(croppedDataUrl)
        handleSubmit ? handleSubmit(croppedDataUrl) : null
      }
    }
  }

  const completeCrop = () => {
    cropImage()
    setCurrentPage ? setCurrentPage(1) : null
  }

  const cancelCrop = () => {
    setCurrentPage ? setCurrentPage(1) : null
    setOpen ? setOpen(false) : null
  }

  return (
    <div className={className}>
      {image && (
        <>
          <Cropper
            aspectRatio={1}
            // guides
            ref={cropperRef}
            src={image instanceof File ? URL.createObjectURL(image) : image}
            // style={{ height: '100%', width: '100%' }}
          />

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
