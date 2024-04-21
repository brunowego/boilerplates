'use client'

import type { HTMLAttributes, JSX } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@acme/ui/components/form'
import cn from '@acme/ui/lib/cn'
import Button from '@acme/ui/components/button'
import { X, Image, Loader2 } from '@acme/ui/components/icon'
import Gauge from '@acme/ui/components/gauge'

import { api } from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'
import Upload from '@/components/upload'

type Gallery = {
  images: string[]
}

export const gallerySchema = z.object({
  images: z.array(z.string()).refine((images) => images.length > 0),
})

const formSchema = gallerySchema

type FormValues = z.infer<typeof formSchema>

interface SignUpFormProps extends HTMLAttributes<HTMLFormElement> {
  gallery: Gallery | undefined
}

export default function SignUpForm({
  className,
  gallery,
  ...props
}: SignUpFormProps): JSX.Element {
  const {
    register,
    formState,
    reset,
    handleSubmit,
    control,
    setError,
    setValue,
    ...form
  } = useForm<FormValues>({
    defaultValues: {
      images: gallery?.images || [],
    },
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/', values)
    },
    // onError(err) {
    //   toast.error(
    //     handleError(
    //       err,
    //       'Profile update is currently not available, please try again later :(',
    //     ),
    //   )
    // },
    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    // @ts-ignore
    const modifiedFields: FormValues = Object.fromEntries(
      Object.keys(formState.dirtyFields).map((key) => [
        key,
        values[key as keyof FormValues],
      ]),
    )

    void mutation.mutate(modifiedFields)

    reset(modifiedFields)
  }

  return (
    <>
      <HookFormDevtool control={control} />

      <Form
        {...{
          register,
          formState,
          reset,
          handleSubmit,
          control,
          setError,
          setValue,
          ...form,
        }}
      >
        <form
          className={cn('grid space-y-2', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Images{' '}
                  <span className='text-muted-foreground'>(up to 6)</span>
                </FormLabel>

                <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3'>
                  <Upload
                    accept={{ 'image/*': [] }}
                    maxFiles={6}
                    notAcceptedErrorMessage='Only images are allowed'
                    onChange={field.onChange}
                    value={field.value}
                    render={({
                      getInputProps,
                      getRootProps,
                      isDragActive,
                      files,
                    }) => (
                      <>
                        {field.value.map((image, index) => (
                          <div
                            className='group relative h-full w-full overflow-hidden rounded-lg border shadow-sm'
                            // biome-ignore lint/suspicious/noArrayIndexKey: This is a controlled input
                            key={index}
                          >
                            <img
                              alt=''
                              className='aspect-[2/3] h-full w-full object-cover'
                              draggable={false}
                              src={image}
                            />

                            <button
                              className='absolute top-0 right-0 rounded-bl-lg bg-neutral-100 p-2 text-neutral-600 opacity-0 shadow-sm transition-all duration-200 hover:bg-neutral-200 group-hover:opacity-100'
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((i) => i !== image),
                                )
                              }}
                              type='button'
                            >
                              <X className='size-4' />
                            </button>
                          </div>
                        ))}

                        {files.map((file) => (
                          <div
                            className='relative aspect-[2/3] h-full w-full overflow-hidden rounded-lg border shadow-sm'
                            key={file.file.name}
                          >
                            <img
                              alt=''
                              className='h-full w-full object-cover'
                              draggable={false}
                              src={URL.createObjectURL(file.file)}
                            />

                            <div className='absolute inset-0 flex w-full items-center justify-center bg-neutral-800/50'>
                              {file.progress === 100 ? (
                                <>
                                  <span className='text-neutral-100 text-sm'>
                                    File uploaded!
                                  </span>
                                </>
                              ) : (
                                <Gauge
                                  size='medium'
                                  value={file.progress}
                                  showValue
                                />
                              )}
                            </div>
                          </div>
                        ))}

                        {field.value.length < 6 && (
                          <div
                            className={cn(
                              'aspect-[2/3] h-full w-full rounded-lg border-2 border-dashed p-4 shadow-sm transition-colors duration-200 dark:hover:border-neutral-200/20 hover:border-neutral-900/20',
                              isDragActive && 'border-primary',
                            )}
                            {...getRootProps()}
                          >
                            <FormControl>
                              <input {...getInputProps()} />
                            </FormControl>

                            <div className='flex h-full items-center justify-center'>
                              <div className='flex flex-col items-center gap-y-2 text-muted-foreground'>
                                <Image className='size-8' />

                                <p className='text-balance text-center text-sm'>
                                  Drag & drop images here <br />
                                  <span className='cursor-pointer font-medium text-foreground hover:underline'>
                                    Select a file
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                <FormDescription>
                  Add images to produce the quality of your product.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex'>
            <Button
              disabled={!formState.isDirty || !formState.isValid}
              type='submit'
              variant='secondary'
            >
              {formState.isSubmitting ? (
                <Loader2 className='w-5 animate-spin' />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
