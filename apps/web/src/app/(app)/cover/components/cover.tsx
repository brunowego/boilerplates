'use client'

import {
  type JSX,
  useState,
  useCallback,
  type ChangeEvent,
  useEffect,
} from 'react'
import Image from 'next/image'

import Page from '@acme/ui/components/page'
import { Edit, CloudUpload } from '@acme/ui/components/icon'
import Input from '@acme/ui/components/input'
import Button, { buttonVariants } from '@acme/ui/components/button'
import cn from '@acme/ui/utils/cn'

import useCropCoverModal from '../hooks/use-crop-cover.modal'

export default function Cover(): JSX.Element {
  const [croppedCover, setCroppedCover] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  // const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { setShowCropCoverModal, CropCoverModal } = useCropCoverModal({
    setCroppedCover,
    props: { file },
  })

  useEffect(() => {
    if (file) {
      setShowCropCoverModal(true)
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
          <Page.Title>Cover</Page.Title>
        </Page.Header>

        <Page.Content>
          <div className='relative mx-auto aspect-video max-h-[36rem]'>
            {croppedCover ? (
              <Image
                alt=''
                className='rounded-lg'
                fill={true}
                src={croppedCover as string}
                style={{
                  objectFit: 'cover',
                }}
              />
            ) : null}

            <label
              className={cn(
                'cursor-pointer',
                croppedCover
                  ? buttonVariants({
                      className: 'absolute top-3 right-3 z-10',
                      size: 'icon',
                    })
                  : 'flex size-full flex-col items-center justify-center rounded-lg border-2 border-dashed',
              )}
            >
              {croppedCover ? (
                <>
                  <Edit className='size-5' />

                  <span className='sr-only'>Change cover</span>
                </>
              ) : (
                <div className='space-y-3 text-center'>
                  <CloudUpload className='inline-block size-10 stroke-muted-foreground' />

                  <div className='space-y-1'>
                    <h2 className='text-sm'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </h2>

                    <p className='text-muted-foreground text-xs'>
                      PNG, JPG or WebP (MAX. 1024x576px)
                    </p>
                  </div>
                </div>
              )}

              <Input
                accept={acceptedFileTypes.join(',')}
                className='sr-only'
                onChange={onChangePicture}
                // ref={fileInputRef}
                type='file'
              />
            </label>
          </div>
        </Page.Content>
      </Page>

      <CropCoverModal />
    </>
  )
}
