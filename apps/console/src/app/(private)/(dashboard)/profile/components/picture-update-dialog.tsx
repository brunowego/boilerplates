import { type JSX, useRef, useState, type ChangeEvent } from 'react'

import type { User } from '@acme/auth'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Icon,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@acme/ui'

import PictureForm from './picture-form'

type PictureDialogFormProps = {
  user: User | undefined
}

export default function PictureDialogForm({
  user,
}: PictureDialogFormProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileClick = () => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = ''
    }

    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files?.[0]) {
      setSelectedFile(files[0])
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div className='border border-dashed rounded-sm p-1 w-28 h-28'>
        <input
          accept='image/jpg, image/jpeg, image/png, image/webp'
          aria-label='File upload'
          className='hidden'
          onChange={handleFileChange}
          ref={fileInputRef}
          type='file'
        />

        <Avatar
          className='w-full h-full cursor-pointer'
          onClick={handleFileClick}
        >
          <AvatarImage src={user?.picture as string} />

          <AvatarFallback>
            <Icon.plus className='w-6 h-6' />
          </AvatarFallback>
        </Avatar>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit picture</DialogTitle>

            <DialogDescription>
              Make changes to your profile picture here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <PictureForm
            selectedFile={selectedFile}
            onOpenChange={setIsModalOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
