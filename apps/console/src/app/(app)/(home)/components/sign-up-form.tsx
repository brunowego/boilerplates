'use client'

import { type HTMLAttributes, type JSX, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
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
import { Loader2 } from '@acme/ui/components/icon'

import { api } from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'
import PasswordStrengthMeter from '@/components/password-strength-meter'

type User = {
  email: string
  password: string
}

export const addressSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const formSchema = addressSchema

type FormValues = z.infer<typeof formSchema>

interface SignUpFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User | undefined
}

export default function SignUpForm({
  className,
  user,
  ...props
}: SignUpFormProps): JSX.Element {
  const {
    register,
    formState,
    reset,
    handleSubmit,
    control,
    setError,
    setValue,
    ...form
  } = useForm<FormValues>({
    defaultValues: {
      email: user?.email || '',
      password: user?.password || '',
    },
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/', values)
    },
    // onError(err) {
    //   toast.error(
    //     handleError(
    //       err,
    //       'Profile update is currently not available, please try again later :(',
    //     ),
    //   )
    // },
    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    // @ts-ignore
    const modifiedFields: FormValues = Object.fromEntries(
      Object.keys(formState.dirtyFields).map((key) => [
        key,
        values[key as keyof FormValues],
      ]),
    )

    void mutation.mutate(modifiedFields)

    reset(modifiedFields)
  }

  return (
    <>
      <HookFormDevtool control={control} />

      <Form
        {...{
          register,
          formState,
          reset,
          handleSubmit,
          control,
          setError,
          setValue,
          ...form,
        }}
      >
        <form
          className={cn('grid space-y-2', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-96'>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input className='h-12 px-10' type='email' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-96'>
                <FormLabel className='flex'>
                  Password <PasswordStrengthMeter password={field.value} />
                </FormLabel>

                <FormControl>
                  <Input className='h-12 px-10' type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex'>
            <Button
              disabled={!formState.isDirty || !formState.isValid}
              type='submit'
              variant='secondary'
            >
              {formState.isSubmitting ? (
                <Loader2 className='w-5 animate-spin' />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
