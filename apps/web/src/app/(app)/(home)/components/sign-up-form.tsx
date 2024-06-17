'use client'

import type { HTMLAttributes, JSX } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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
import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

import { api } from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'
import PhoneInput from '@/components/phone-input'

type User = {
  phoneNumber: string
}

export const signUpSchema = z.object({
  phoneNumber: z.string(),
})

const formSchema = signUpSchema

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
      phoneNumber: user?.phoneNumber || '',
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
          className={cn('space-y-4', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-96'>
                <FormLabel>Phone number</FormLabel>

                <FormControl>
                  <PhoneInput
                    aria-autocomplete='none'
                    autoComplete={'false'}
                    autoCorrect='false'
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </>
  )
}
