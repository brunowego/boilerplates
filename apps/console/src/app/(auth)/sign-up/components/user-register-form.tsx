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
  cn,
  Input,
  Button,
  Icons,
  toast,
} from '@acme/ui'

import { signUpSchema } from '@/schemas'
import { api } from '@/lib/api'
import { handleError } from '@/utils'

export const formSchema = signUpSchema

type FormValues = z.infer<typeof formSchema>

interface UserRegisterFormProps extends HTMLAttributes<HTMLFormElement> {}

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      resolver: zodResolver(formSchema),
    })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/auth/sign-up', values)
    },

    onError(error) {
      toast.error(
        handleError(
          error,
          'Signup is currently not available, please try again later :(',
        ),
      )
    },

    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
      <form
        className={cn('grid space-y-2', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className='grid'>
          <div className='grid grid-cols-2 space-x-2'>
            <FormField
              control={control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
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
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>Last name</FormLabel>

                  <FormControl>
                    <Input
                      className='h-12'
                      placeholder='Last name'
                      type='text'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
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

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='sr-only'>Password</FormLabel>

                <FormControl>
                  <Input
                    className='h-12'
                    placeholder='Password'
                    type='password'
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
            <span>Continue</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
