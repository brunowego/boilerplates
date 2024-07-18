'use client'

import {
  type JSX,
  useState,
  useCallback,
  type ChangeEvent,
  useEffect,
} from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Avatar from '@acme/ui/components/avatar'
import { ImageUp } from '@acme/ui/components/icon'
import { buttonVariants } from '@acme/ui/components/button'
import Input from '@acme/ui/components/input'

import useCropImageModal from '../hooks/use-crop-image.modal'

export default function EditPersonal(): JSX.Element {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { setShowCropImageModal, CropImageModal } = useCropImageModal({
    setCroppedImage,
    props: { file },
  })

  useEffect(() => {
    if (file) {
      setShowCropImageModal(true)
    }
  }, [file])

  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size / 1024 / 1024 > 4) {
      console.log('File size too big (max 4MB).')

      return
    }

    if (!acceptedFileTypes.includes(selectedFile.type)) {
      console.log('File type not supported.')

      return
    }

    setFile(selectedFile)
  }

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0]

      if (!file) {
        return
      }

      handleFile(file)
      event.target.value = ''
    },
    [handleFile],
  )

  return (
    <>
      <Page>
        <Page.Header>
          <h1 className={typographyVariants({ variant: 'title' })}>Profile</h1>
        </Page.Header>

        <Page.Content>
          <div className='flex gap-x-4'>
            <Avatar className='size-20 text-4xl'>
              <Avatar.Image src={croppedImage as string} />

              <Avatar.Fallback className='bg-secondary'>
                <ImageUp className='size-10 stroke-muted-foreground' />
              </Avatar.Fallback>
            </Avatar>

            <div className='flex flex-col items-start justify-center space-y-2'>
              <label
                aria-disabled='false'
                className={buttonVariants({
                  className: 'cursor-pointer',
                  variant: 'secondary',
                })}
              >
                <Input
                  accept={acceptedFileTypes.join(',')}
                  className='sr-only'
                  onChange={onChangePicture}
                  // ref={fileInputRef}
                  type='file'
                />
                Select image
              </label>

              <p className='text-muted-foreground text-sm'>
                .png, .jpeg, files up to 8MB. Recommended size is 256x256px.
              </p>
            </div>
          </div>
        </Page.Content>
      </Page>

      <CropImageModal />
    </>
  )
}
