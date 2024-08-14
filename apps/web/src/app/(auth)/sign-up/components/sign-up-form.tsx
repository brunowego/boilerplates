'use client'

import type { HTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { signUpSchema } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import toast from '@acme/ui/lib/toast'
import Form from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { User, AtSign, Lock, Loader2 } from '@acme/ui/components/icon'

import api from '@/lib/api'
import { handleError } from '@/utils'

const formSchema = signUpSchema

type FormValues = z.infer<typeof formSchema>

type SignInFormProps = HTMLAttributes<HTMLFormElement>

export default function SignInForm({
  className,
  ...props
}: SignInFormProps): JSX.Element {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
      },
      resolver: zodResolver(formSchema),
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

      toast.success('Welcome! Your account has been created successfully.')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      await mutateAsync(values)
    } catch (err) {
      console.error(err)
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
          <Form.Field
            control={control}
            name='fullName'
            render={({ field }) => (
              <Form.Item>
                <Form.Label className='sr-only'>Full name</Form.Label>

                <Form.Control>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-3 flex'>
                      <User className='size-4 self-center' />
                    </div>

                    <Input
                      className='h-12 pl-10'
                      placeholder='Full name'
                      type='text'
                      {...field}
                    />
                  </div>
                </Form.Control>

                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            name='email'
            render={({ field }) => (
              <Form.Item>
                <Form.Label className='sr-only'>Email</Form.Label>

                <Form.Control>
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
                </Form.Control>

                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            name='password'
            render={({ field }) => (
              <Form.Item>
                <Form.Label className='sr-only'>Password</Form.Label>

                <Form.Control>
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
                </Form.Control>

                <Form.Message />
              </Form.Item>
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
