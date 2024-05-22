import { type ComponentConfig, DropZone } from '@measured/puck'
import { useState, useRef, type ChangeEvent } from 'react'

import Input, { inputVariants } from '@acme/ui/components/input'
import { buttonVariants } from '@acme/ui/components/button'
import { Loader2, Upload } from '@acme/ui/components/icon'

import FileUpload from './file-upload'

export type BackgroundImageProps = {
  image?: {
    url?: string
  }
}

export const BackgroundImage: ComponentConfig<BackgroundImageProps> = {
  label: 'Background Image',
  fields: {
    image: {
      label: 'Image',
      type: 'object',
      objectFields: {
        url: {
          label: 'URL',
          type: 'custom',
          render: ({ name, onChange, value }) => {
            const [loading, setLoading] = useState(false)
            const inputRef = useRef<HTMLInputElement>(null)

            function handleChange(event: ChangeEvent<HTMLInputElement>) {
              setLoading(true)

              const file = event.target.files?.[0]

              if (!file) {
                return
              }

              FileUpload({ file }).then((url) => {
                if (inputRef.current?.value) {
                  inputRef.current.value = url as string
                }

                // @ts-ignore
                onChange(url as string)

                setLoading(false)
              })
            }

            return (
              <div className='flex gap-x-2'>
                <input
                  className={inputVariants()}
                  defaultValue={value}
                  name={name}
                  // @ts-ignore
                  onChange={(e): void => onChange(e.currentTarget.value)}
                  ref={inputRef}
                  type='text'
                />

                <label
                  aria-disabled='false'
                  className={buttonVariants({
                    className: 'cursor-pointer',
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
          },
        },
      },
    },
  },
  defaultProps: {
    image: {
      url: '/static/img/bg.jpg',
    },
  },
  render: ({ image }) => {
    return (
      <div
        className='bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: `url('${image?.url}')` }}
      >
        <DropZone
          zone='children'
          // allow={['Heading', 'Paragraph', 'VerticalSpace']}
        />
      </div>
    )
  },
}
