'use client'

import type { HTMLAttributes } from 'react'

import { signInSchema } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { signIn } from '@acme/auth/react'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import Form from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { AtSign, Lock, Loader2 } from '@acme/ui/components/icon'

const formSchema = signInSchema

type FormValues = z.infer<typeof formSchema>

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function SignInForm({
  className,
  ...props
}: SignInFormProps): JSX.Element {
  const { formState, handleSubmit, control, ...form } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      await signIn('credentials', {
        ...values,
      })
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err)
      }
    }
  }

  return (
    <Form {...{ formState, handleSubmit, control, ...form }}>
      <form
        className={cn('grid space-y-2', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className='grid'>
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
                      placeholder='Type your password'
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
            <>Continue with Email</>
          )}
        </Button>
      </form>
    </Form>
  )
}
