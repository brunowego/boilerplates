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
import { Resume, Download, X, Loader2 } from '@acme/ui/components/icon'

import { api } from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'
import UploadInput from '@/components/upload-input'

type Document = {
  resume: string
}

export const documentSchema = z.object({
  resume: z.string(),
})

const formSchema = documentSchema

type FormValues = z.infer<typeof formSchema>

interface DocumentFormProps extends HTMLAttributes<HTMLFormElement> {
  document: Document | undefined
}

export default function DocumentForm({
  className,
  document,
  ...props
}: DocumentFormProps): JSX.Element {
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
      resume: document?.resume || '',
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
            name='resume'
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>

                <FormControl>
                  {value ? (
                    <div className='flex h-14 items-center gap-x-2 rounded-lg border px-4 text-muted-foreground shadow-sm'>
                      <Resume className='size-6 text-foreground' />

                      <span className='font-medium text-sm'>
                        {value.split('/').pop()}
                      </span>

                      <div className='ml-auto flex h-full items-center gap-2'>
                        <a
                          className='transition-colors focus-visible:border-primary hover:text-primary focus-visible:outline-none'
                          href={value}
                          rel='noreferrer noopener'
                          target='_blank'
                          type='button'
                        >
                          <Download className='size-5' />
                        </a>

                        <button
                          className='transition-colors focus-visible:border-primary hover:text-primary focus-visible:outline-none'
                          onClick={() => {
                            onChange('')
                          }}
                          type='button'
                        >
                          <X className='size-5' />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <UploadInput onChange={onChange} value={value} />
                  )}
                </FormControl>

                <FormDescription>
                  Upload your resume in PDF format. This will be visible for
                  companies you apply to.
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
