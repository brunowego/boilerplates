'use client'

import { type JSX, useState, type ChangeEvent } from 'react'

import Input, { inputVariants } from '@acme/ui/components/input'
import { buttonVariants } from '@acme/ui/components/button'
import { Loader2, Upload } from '@acme/ui/components/icon'

import _FileUpload from '@/lib/file-upload'

export default function FileUpload(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    _FileUpload({ file }).then((url) => {
      setValue(url as string)
      setLoading(false)
    })
  }

  return (
    <div className='flex max-w-lg space-x-3'>
      <input className={inputVariants()} type='text' value={value} readOnly />

      <label
        aria-disabled='false'
        className={buttonVariants({
          className: 'cursor-pointer',
          variant: 'secondary',
        })}
      >
        <Input
          accept='image/png,image/jpeg'
          className='hidden'
          type='file'
          onChange={handleChange}
        />

        {loading ? (
          <Loader2 className='size-5 animate-spin' />
        ) : (
          <Upload className='size-5' />
        )}

        <span className='sr-only'>Upload image</span>
      </label>
    </div>
  )
}
