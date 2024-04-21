'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { upload } from '@/lib/s3-upload'

import cn from '@acme/ui/lib/cn'
import Button from '@acme/ui/components/button'
import { Upload, Loader2 } from '@acme/ui/components/icon'

type Props = {
  onChange?: (value: string | undefined) => void
}

export default function UploadInput({ onChange }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]

      if (!file) {
        return
      }

      setIsLoading(true)

      const url = await upload({
        file,
        onProgress: (progress) => setProgress(progress),
      })

      setIsLoading(false)
      setProgress(0)

      // console.log('url', url)

      if (onChange && url) {
        onChange(url)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isLoading,
  })

  return (
    <div
      className={cn(
        'relative flex h-14 items-center gap-x-3 overflow-hidden rounded-lg border-2 border-dashed px-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:outline-primary',
        isDragActive && 'border-primary',
      )}
      {...getRootProps()}
    >
      <div
        className={cn(
          'absolute top-0 left-0 h-full bg-green-700/20 text-green-700 transition-all duration-200 dark:bg-green-700/20 dark:text-green-500/80',
          !isLoading && 'hidden w-0',
        )}
        style={{ width: `${progress}%` }}
      />

      <Button className='h-8' size={'sm'} type='button' variant={'outline'}>
        Select File
      </Button>

      <div className='flex w-full items-center justify-between gap-1.5'>
        <div className='flex w-full items-center gap-1.5'>
          <Upload className='size-5' />

          <span className='font-medium text-muted-foreground text-xs'>
            {isLoading ? 'Uploading...' : 'Drop Files here...'}
          </span>
        </div>

        {isLoading && (
          <div className='pr-2'>
            <Loader2 className='size-5 animate-spin text-primary' />
          </div>
        )}
      </div>

      <input {...getInputProps()} />
    </div>
  )
}
