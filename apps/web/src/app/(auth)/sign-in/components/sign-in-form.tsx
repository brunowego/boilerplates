'use client'

import type { HTMLAttributes } from 'react'
import { signIn } from 'next-auth/react'

import { signInSchema } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { AtSign, Loader2 } from '@acme/ui/components/icon'

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
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      await signIn('resend', {
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
