'use client'

import type { z } from 'zod'
import { type HTMLAttributes, type JSX, useRef } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import type ReCAPTCHA from 'react-google-recaptcha'

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
  Icon,
  toast,
} from '@acme/ui'

import { signInSchema } from '@/schemas'
import { api } from '@/lib/api'
import { handleError } from '@/utils'
import Captcha from '@/components/captcha'

const formSchema = signInSchema

type FormValues = z.infer<typeof formSchema>

interface UserAuthFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps): JSX.Element {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    register,
    formState,
    reset,
    handleSubmit,
    control,
    setValue,
    ...form
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      recaptcha: '',
    },
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/auth/sign-in', values)
    },
    onError(err) {
      toast.error(
        handleError(
          err,
          'Login is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      recaptchaRef.current?.reset()

      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Form
      {...{
        register,
        formState,
        reset,
        handleSubmit,
        control,
        setValue,
        ...form,
      }}
    >
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

          <FormItem>
            <FormLabel className='sr-only'>Recaptcha</FormLabel>

            <FormControl>
              <Captcha
                error={formState.errors.recaptcha}
                recaptchaRef={recaptchaRef}
                setValue={setValue}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </div>

        <Button disabled={!formState.isValid} size='lg' type='submit'>
          {formState.isSubmitting ? (
            <Icon.loader2 className='animate-spin w-5' />
          ) : (
            <span>Sign In</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
