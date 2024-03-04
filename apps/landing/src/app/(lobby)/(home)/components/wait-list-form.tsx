'use client'

import { z } from 'zod'
import { type HTMLAttributes } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  toast,
  cn,
  Input,
  Button,
  Icons,
} from '@acme/ui'

import { waitListSchema } from '@/schemas'
import { api, AxiosError } from '@/lib/api'
import { handleError } from '@/utils'

export const formSchema = waitListSchema

type FormValues = z.infer<typeof formSchema>

interface WaitListFormProps extends HTMLAttributes<HTMLFormElement> {}

export function WaitListForm({ className, ...props }: WaitListFormProps) {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      defaultValues: {
        firstName: '',
        email: '',
      },
      resolver: zodResolver(formSchema),
    })

  const router = useRouter()

  async function waitlist(values: FormValues) {
    try {
      await api.post('/v1/waitlist', values)

      toast.success('Thanks for signing up to our waitlist! 🎉')
      reset()
      router.refresh()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          handleError(
            error,
            'Wait list is currently not available, please try again later :(',
          ),
        )
      }
    }
  }

  const { mutateAsync: subscribe } = useMutation({ mutationFn: waitlist })

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) =>
    subscribe(values)

  return (
    <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
      <form
        className={cn('grid space-y-2', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className='grid grid-cols-6 space-x-2'>
          <FormField
            control={control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className='sr-only'>First name</FormLabel>

                <FormControl>
                  <Input
                    className='h-12'
                    placeholder='First name'
                    type='text'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='col-span-4'>
                <FormLabel className='sr-only'>Email</FormLabel>

                <FormControl>
                  <Input
                    className='h-12'
                    placeholder='Email'
                    type='email'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={!formState.isValid} size='lg' type='submit'>
          {formState.isSubmitting ? (
            <Icons.loader2 className='w-5' />
          ) : (
            <span>Subscribe</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
