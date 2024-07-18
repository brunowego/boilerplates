import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {
  type Dispatch,
  type SetStateAction,
  type JSX,
  useState,
  useRef,
  useCallback,
} from 'react'

import Modal from '@acme/ui/components/modal'
import cn from '@acme/ui/utils/cn'
import Separator from '@acme/ui/components/separator'
import Button from '@acme/ui/components/button'

// import useCrop from '@/hooks/use-crop'

// function centerAspectCrop(
//   mediaWidth: number,
//   mediaHeight: number,
//   aspect: number,
// ) {
//   return centerCrop(
//     makeAspectCrop(
//       {
//         unit: '%',
//         width: 80,
//       },
//       aspect,
//       mediaWidth,
//       mediaHeight,
//     ),
//     mediaWidth,
//     mediaHeight,
//   )
// }

type FileProps = {
  file: File | null
}

type CropCoverModalProps = {
  showCropCoverModal: boolean
  setShowCropCoverModal: Dispatch<SetStateAction<boolean>>
  setCroppedCover: (image: string | null) => void
  props: FileProps
  className?: string
}

export default function CropCoverModal({
  showCropCoverModal,
  setShowCropCoverModal,
  setCroppedCover,
  props,
  className,
}: CropCoverModalProps): JSX.Element {
  const [crop, setCrop] = useState<Crop | undefined>(
    // {
    //   x: 0,
    //   y: 0,
    //   width: 400,
    //   height: 400,
    //   unit: 'px',
    // }
  )
  const [storedCrop, setStoredCrop] = useState<PixelCrop>()

  const onCrop = useCallback((crop: Crop | undefined) => {
    setCrop(crop)
  }, [])

  // const onCancelCrop = useCallback(() => {
  //   onCrop(undefined)
  // }, [onCrop])

  const imageRef = useRef<HTMLImageElement>(null)

  // const { cropCover, storedCrop, crop, setCrop, setStoredCrop } = useCrop()

  // const cancelCrop = () => {
  //   onCancelCrop()

  //   setShowCropCoverModal(false)
  // }

  // const onCoverLoad = (event: SyntheticEvent<HTMLImageElement>) => {
  //   const { width, height } = event.currentTarget

  //   onCrop(centerAspectCrop(width, height, 1))
  // }

  const cropCover = useCallback(
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

  const completeCrop = async () => {
    if (!imageRef.current || !storedCrop) {
      return
    }

    const canvas = await cropCover(imageRef.current, storedCrop)

    if (canvas) {
      setCroppedCover(canvas)
      setShowCropCoverModal(false)
    }
  }

  return (
    <Modal open={showCropCoverModal} onOpenChange={setShowCropCoverModal}>
      <Modal.Content className={cn('max-w-5xl', className)}>
        <Modal.Header>
          <Modal.Title>Crop your new cover image</Modal.Title>
        </Modal.Header>

        <Modal.Body className='space-y-4'>
          <ReactCrop
            aspect={16 / 9}
            crop={crop}
            minWidth={1024}
            minHeight={576}
            onChange={(_, percentageCrop) => setCrop(percentageCrop)}
            onComplete={(crop) => setStoredCrop(crop)}
          >
            <img
              alt='Crop me'
              // onLoad={onCoverLoad}
              ref={imageRef}
              src={props.file ? URL.createObjectURL(props.file) : undefined}
            />
          </ReactCrop>

          <Separator />

          {/* <Button onClick={cancelCrop} variant='outline'>
            Cancel
          </Button> */}

          <Button
            className='w-full'
            disabled={!crop}
            onClick={completeCrop}
            variant='secondary'
          >
            Crop new cover image
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
