'use client'

import type { HTMLAttributes, JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { insertUserSchema, type User } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import toast from '@acme/ui/lib/toast'
import { Form } from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Button, { buttonVariants } from '@acme/ui/components/button'
import { Card, CardContent } from '@acme/ui/components/card'
import { Avatar, AvatarImage, AvatarFallback } from '@acme/ui/components/avatar'
import Input from '@acme/ui/components/input'
import { Upload, Trash2, Loader2 } from '@acme/ui/components/icon'

import api from '@/lib/api'
import { handleError } from '@/utils'
import HookFormDevtool from '@/components/hookform-devtool'
import Fieldset from '@/components/fieldset'

const formSchema = insertUserSchema

type FormValues = z.infer<typeof formSchema>

interface EditPersonalFormProps extends HTMLAttributes<HTMLFormElement> {
  user?: User
}

export default function EditPersonalForm({
  user,
  className,
  ...props
}: EditPersonalFormProps): JSX.Element {
  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        fullName: user?.fullName,
        image: user?.image,
      },
      resolver: zodResolver(formSchema),
    })

  const { refresh } = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.patch('/profile', values)
    },
    onError(error) {
      toast.error(
        handleError(
          error,
          'User update is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      // @ts-ignore
      const modifiedFields: FormValues = Object.fromEntries(
        Object.keys(formState.dirtyFields).map((key) => [
          key,
          values[key as keyof FormValues],
        ]),
      )

      void mutateAsync(modifiedFields)

      reset(modifiedFields)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <HookFormDevtool control={control} />

      <Form {...{ formState, reset, handleSubmit, control, ...form }}>
        <form
          className={cn('', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <div className='divide-y *:py-5 first:*:pt-0 last:*:pb-0'>
            <Fieldset title='Details'>
              <Card>
                <CardContent>
                  <div className='flex gap-x-4'>
                    <Avatar className='size-20'>
                      <AvatarImage src='' />
                      <AvatarFallback className='border-dashed'>
                        BW
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col items-start justify-center space-y-2'>
                      <div className='flex space-x-2'>
                        <label
                          aria-disabled='false'
                          className={buttonVariants({ size: 'sm' })}
                        >
                          <Input
                            accept='image/png, image/jpeg'
                            className='hidden'
                            type='file'
                          />
                          <Upload className='mr-2 size-4' />
                          Upload image
                        </label>

                        <Button size='sm' variant='ghost'>
                          <Trash2 className='size-4' />

                          <span className='sr-only'>Remove image</span>
                        </Button>
                      </div>

                      <p className='text-muted-foreground text-sm'>
                        .png, .jpeg files up to 8MB. Recommended size is
                        256x256px.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Fieldset>
          </div>

          {formState.isDirty ? (
            <div className='sticky bottom-0 z-50 mt-4 flex h-16 justify-end bg-gradient-to-r from-transparent to-background'>
              <div className='flex items-center gap-x-4'>
                <h2 className='text-muted-foreground text-xs'>
                  Unsaved changes
                </h2>

                <div className='flex gap-x-2'>
                  <Button size='lg' variant='secondary'>
                    Cancel
                  </Button>

                  <Button disabled={!formState.isValid} size='lg' type='submit'>
                    {formState.isSubmitting ? (
                      <Loader2 className='size-5 animate-spin' />
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  )
}
