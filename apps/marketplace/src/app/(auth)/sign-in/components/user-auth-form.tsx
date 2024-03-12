'use client'

import type { z } from 'zod'
import type { HTMLAttributes } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

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

import { signInSchema } from '@/schemas'
import { api } from '@/lib/api'
import { handleError } from '@/utils'

const formSchema = signInSchema

type FormValues = z.infer<typeof formSchema>

interface UserAuthFormProps extends HTMLAttributes<HTMLFormElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: zodResolver(formSchema),
    })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/auth/sign-in', values)
    },
    onError(error) {
      toast.error(
        handleError(
          error,
          'Login is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
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
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='sr-only'>Email</FormLabel>

                <FormControl>
                  <Input
                    className='h-12'
                    placeholder='Enter your email'
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
                    placeholder='Enter your password'
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
            <span>Sign In</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
