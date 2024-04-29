'use client'

import {
  type DropzoneInputProps,
  type DropzoneRootProps,
  type Accept,
  useDropzone,
} from 'react-dropzone'
import { type ReactNode, useState, useCallback } from 'react'

import type { InsertImage } from '@acme/db/schemas'
import toast from '@acme/ui/lib/toast'

import FileUpload from '@/lib/file-upload'

type Image = Pick<InsertImage, 'filename' | 'url'>

type FileInfo = {
  file: File
  progress: number
}

type RenderProps = {
  files: FileInfo[]
  onDrop: (acceptedFiles: File[]) => void
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  isDragActive: boolean
  remove: (index: number) => void
}

type UploadProps = {
  value?: Image[] | undefined
  onChange?: (value: Image[] | undefined) => void
  notAcceptedErrorMessage?: string
  maxFiles?: number
  maxSize?: number
  accept?: Accept
  render: (props: RenderProps) => ReactNode
}

export default function ImageUpload({
  value,
  onChange,
  render,
  accept,
  maxFiles,
  maxSize = 5 * 1024 * 1024, // 5 MB
  notAcceptedErrorMessage,
}: UploadProps) {
  const [files, setFiles] = useState<FileInfo[]>([])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles((prevFiles) =>
        prevFiles.concat(acceptedFiles.map((file) => ({ file, progress: 0 }))),
      )

      const images = []

      for (const file of acceptedFiles) {
        const image = await FileUpload({
          file,
          onProgress: (progress) => {
            setFiles((prevFiles) =>
              prevFiles.map((prevFile) =>
                prevFile.file === file ? { file, progress } : prevFile,
              ),
            )
          },
        })

        if (image) {
          images.push(image)
        }
      }

      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => !acceptedFiles.includes(prevFile.file)),
      )

      if (onChange) {
        onChange([...(value || []), ...images])
      }
    },
    [value, onChange],
  )

  const remove = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    onDropRejected: (files) => {
      const isTooManyFiles = files.every(
        (file) => file.errors[0]?.code === 'too-many-files',
      )

      if (isTooManyFiles) {
        toast.error(`You can only upload ${maxFiles} files`)

        return
      }

      if (notAcceptedErrorMessage) {
        toast.error(notAcceptedErrorMessage)
      }
    },
    maxFiles: maxFiles,
    maxSize: maxSize,
  })

  return render({
    files,
    remove,
    getRootProps,
    isDragActive,
    onDrop,
    getInputProps,
  })
}
