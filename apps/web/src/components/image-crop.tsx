'use client'

import { useState, useRef } from 'react'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Button from '@acme/ui/components/button'

function cropImage(image: HTMLImageElement, crop: PixelCrop) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()

  return canvas
}

type ImageCropProps = {
  image: File | null | string
  // setCroppedImage: (image: string | null) => void
  // handleSubmit?: (croppedDataUrl: string) => void
  // setCurrentPage?: (page: number) => void
  // setOpen?: (open: boolean) => void
  className?: string
}

export default function ImageCrop({
  image,
  // setCroppedImage,
  // handleSubmit,
  // setCurrentPage,
  // setOpen,
  className,
}: ImageCropProps) {
  const [crop, setCrop] = useState<Crop>()
  const [storedCrop, setStoredCrop] = useState<PixelCrop>()
  const imageRef = useRef<HTMLImageElement>(null)

  // interface CropperImageElement extends HTMLImageElement {
  //   cropper?: Cropper
  // }

  // const cropperRef = useRef<CropperImageElement>(null)

  // const cropImage = () => {
  //   if (cropperRef.current && cropperRef.current !== null) {
  //     const imageElement: CropperImageElement | null = cropperRef.current
  //     const cropper: Cropper | undefined = imageElement.cropper

  //     if (cropper) {
  //       const croppedDataUrl = cropper.getCroppedCanvas().toDataURL()
  //       setCroppedImage(croppedDataUrl)
  //       handleSubmit ? handleSubmit(croppedDataUrl) : null
  //     }
  //   }
  // }

  // const completeCrop = () => {
  //   cropImage()
  //   setCurrentPage ? setCurrentPage(1) : null
  // }

  // const cancelCrop = () => {
  //   setCurrentPage ? setCurrentPage(1) : null
  //   setOpen ? setOpen(false) : null
  // }

  return (
    <div className={className}>
      {image && (
        <>
          {/* <Cropper
            aspectRatio={1}
            // guides
            ref={cropperRef}
            src={image instanceof File ? URL.createObjectURL(image) : image}
            // style={{ height: '100%', width: '100%' }}
          /> */}

          <ReactCrop
            aspect={1}
            crop={crop}
            onChange={(_, percent) => setCrop(percent)}
            onComplete={(c) => setStoredCrop(c)}
          >
            <img
              alt='Crop me'
              height={400}
              ref={imageRef}
              src={image as string}
            />
          </ReactCrop>

          <div className='mt-4 flex justify-end space-x-2'>
            {/* <Button onClick={cancelCrop} variant='outline'>
              Cancel
            </Button> */}

            {/* <Button onClick={completeCrop}>Crop Image</Button> */}
            <Button onClick={() => cropImage}>Crop Image</Button>
          </div>
        </>
      )}
    </div>
  )
}
