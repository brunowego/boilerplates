'use client'

import type { HTMLAttributes, JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { type z, zodResolver } from '@acme/ui/lib/zod'
import { type InsertProfile, insertProfileSchema } from '@acme/db/schemas'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@acme/ui/components/form'
import Input from '@acme/ui/components/input'
import Button, { buttonVariants } from '@acme/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@acme/ui/components/avatar'
import { Loader2, MoveRight } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import api from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'

const formSchema = insertProfileSchema

type FormValues = z.infer<typeof formSchema>

interface UpdateProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  profile?: InsertProfile
}

export default function UpdateProfileForm({
  className,
  profile,
  ...props
}: UpdateProfileFormProps): JSX.Element {
  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        image: '',
        firstName: profile?.firstName,
        lastName: profile?.lastName ?? '',
      },
      resolver: zodResolver(formSchema),
    })

  const { push } = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.patch('/profile', values)
    },
    // onError(error) {
    //   toast.error(
    //     handleError(
    //       error,
    //       'Profile update is currently not available, please try again later :(',
    //     ),
    //   )
    // },
    onSuccess: () => {
      push('/onboard/password')
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
          className={cn('grid space-y-6', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Profile image
                  <span className='text-muted-foreground text-xs'>
                    (optional)
                  </span>
                </FormLabel>

                <FormControl>
                  <div className='flex gap-x-5'>
                    <Avatar className='size-20 text-4xl'>
                      <AvatarImage src='' />

                      <AvatarFallback className='bg-green-100 text-green-400 dark:bg-green-600 dark:text-green-200'>
                        +
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col items-start justify-center space-y-2'>
                      <label
                        aria-disabled='false'
                        className={buttonVariants({
                          variant: 'secondary',
                        })}
                      >
                        <Input
                          accept='image/png, image/jpeg'
                          className='hidden'
                          type='file'
                          {...field}
                        />
                        Upload image
                      </label>

                      <p className='text-muted-foreground text-sm'>
                        .png, .jpeg, .gif files up to 8MB. Recommended size is
                        256x256px.
                      </p>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-x-3'>
            <FormField
              control={control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>

                  <FormControl>
                    <Input className='h-12' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last name{' '}
                    <span className='text-muted-foreground text-xs'>
                      (optional)
                    </span>
                  </FormLabel>

                  <FormControl>
                    {/* @ts-ignore */}
                    <Input className='h-12' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex'>
            <Button
              className='ml-auto gap-x-3'
              disabled={!formState.isValid}
              size='lg'
              type='submit'
              variant='secondary'
            >
              Continue
              {formState.isSubmitting ? (
                <Loader2 className='size-5 animate-spin' />
              ) : (
                <MoveRight className='size-4' />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
