'use client'

import type { HTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { signUpSchema } from '@acme/db/schemas'
import { type Output, valibotResolver } from '@acme/ui/lib/valibot'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import toast from '@acme/ui/lib/toast'
// import toast from '@acme/ui/lib/toast'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@acme/ui/components/form'
import cn from '@acme/ui/lib/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { User, AtSign, Lock, Loader2 } from '@acme/ui/components/icon'

import api from '@/lib/api'
import handleError from '@/utils/handle-error'

const formSchema = signUpSchema

type FormValues = Output<typeof formSchema>

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function SignInForm({
  className,
  ...props
}: SignInFormProps): JSX.Element {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      resolver: valibotResolver(formSchema),
    })

  const { push } = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/auth/sign-up', values)
    },
    onError(err) {
      toast.error(
        handleError(
          err,
          'Registration is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      push('/')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      await mutateAsync(values)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err)
      }
    }
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
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-3 flex'>
                        <User className='size-4 self-center' />
                      </div>

                      <Input
                        className='h-12 pl-10'
                        placeholder='First name'
                        type='text'
                        {...field}
                      />
                    </div>
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
                      value={field.value ?? ''}
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
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-3 flex'>
                      <AtSign className='size-4 self-center' />
                    </div>

                    <Input
                      className='h-12 pl-10'
                      placeholder='Type your email'
                      type='email'
                      {...field}
                    />
                  </div>
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
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-3 flex'>
                      <Lock className='size-4 self-center' />
                    </div>

                    <Input
                      className='h-12 pl-10'
                      placeholder='Enter your password'
                      type='password'
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={!formState.isValid} size='lg' type='submit'>
          {formState.isSubmitting ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <>Continue</>
          )}
        </Button>
      </form>
    </Form>
  )
}
