'use client'

import { type HTMLAttributes, type JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { type z, zodResolver } from '@acme/ui/lib/zod'
import { userPasswordSchema } from '@acme/db/schemas'
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
import Button from '@acme/ui/components/button'
import { Eye, EyeOff, Loader2, MoveRight } from '@acme/ui/components/icon'
import cn from '@acme/ui/utils/cn'

import api from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'

const formSchema = userPasswordSchema

type FormValues = z.infer<typeof formSchema>

interface SetUserPasswordFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function SetUserPasswordForm({
  className,
  ...props
}: SetUserPasswordFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)

  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        password: '',
      },
      resolver: zodResolver(formSchema),
    })

  const { push } = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/password', values)
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
      push('/')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      void mutateAsync(values)

      reset(values)
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <div className='relative'>
                    <Input
                      className='h-12 pr-12'
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />

                    <button
                      className='absolute inset-y-1 right-1 p-3'
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='size-4' />
                      ) : (
                        <Eye className='size-4' />
                      )}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
