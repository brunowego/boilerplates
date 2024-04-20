'use client'

import { type HTMLAttributes, type JSX, useEffect } from 'react'
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
  FormDescription,
  FormMessage,
} from '@acme/ui/components/form'
import cn from '@acme/ui/lib/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { Loader2, Check, X } from '@acme/ui/components/icon'
import { withMask } from 'use-mask-input'

import { api } from '@/lib/api'
import useDebouncedZipCodeAddress from '@/hooks/use-debounced-zip-code-address'
import HookFormDevtool from '@/components/hookform-devtool'

type Address = {
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  reference?: string
}

// const zipCodeRegex = /^\d{8}$/

export const addressSchema = z.object({
  // zipCode: z
  //   .string()
  //   .regex(zipCodeRegex)
  //   .transform((val) => Number(val)),
  zipCode: z.string().min(8),
  state: z.string().min(2),
  city: z.string().min(1),
  neighborhood: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  reference: z.string().optional(),
})

const zipCodeSchema = z.preprocess(
  (value: unknown) => (typeof value === 'string' ? value.trim() : value),
  z.string().min(8),
)

const formSchema = addressSchema

type FormValues = z.infer<typeof formSchema>

interface SignUpFormProps extends HTMLAttributes<HTMLFormElement> {
  address: Address | undefined
}

export default function SignUpForm({
  className,
  address,
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
    // mode: 'onChange',
    defaultValues: {
      zipCode: address?.zipCode || '',
      state: address?.state || '',
      city: address?.city || '',
      neighborhood: address?.neighborhood || '',
      street: address?.street || '',
      number: address?.number || '',
      reference: address?.reference || '',
    },
    resolver: zodResolver(formSchema),
  })

  const zipCodeRef = withMask(['99.999-999'], {
    autoUnmask: true,
    showMaskOnFocus: false,
    showMaskOnHover: false,
  })

  const {
    data,
    validation,
    onStartCheckValidation,
    onCheckValidation,
    onResetValidation,
  } = useDebouncedZipCodeAddress()

  useEffect(() => {
    if (data) {
      setValue('state', data.state)
      setValue('city', data.city)
      setValue('neighborhood', data.neighborhood)
      setValue('street', data.street)
      setValue('number', '')
      setValue('reference', '')
    }
  }, [data, setValue])

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
            name='zipCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>

                <FormControl>
                  <div className='relative w-40'>
                    <Input
                      className='h-12 px-10'
                      type='text'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)

                        const value = event.target.value.replace(/\D/g, '')
                        const { success } = zipCodeSchema.safeParse(value)

                        if (success) {
                          onStartCheckValidation()

                          return onCheckValidation(value)
                        }

                        if (validation !== 'idle') {
                          onResetValidation()
                        }
                      }}
                      // @ts-ignore
                      ref={zipCodeRef}
                    />

                    <div className='pointer-events-none absolute inset-y-0 right-4 flex'>
                      {validation === 'loading' && (
                        <Loader2 className='size-4 animate-spin self-center' />
                      )}

                      {validation === 'success' && (
                        <Check className='size-4 self-center' />
                      )}

                      {validation === 'invalid' && (
                        <X className='size-4 self-center' />
                      )}
                    </div>
                  </div>
                </FormControl>

                {validation === 'invalid' && (
                  <FormDescription>Zip code not found.</FormDescription>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex space-x-3'>
            <FormField
              control={control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>

                  <FormControl>
                    <div className='w-56'>
                      <Input className='h-12 px-10' type='text' {...field} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>

                  <FormControl>
                    <div className='w-80'>
                      <Input className='h-12 px-10' type='text' {...field} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name='neighborhood'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Neighborhood</FormLabel>

                <FormControl>
                  <div className='w-96'>
                    <Input className='h-12 px-10' type='text' {...field} />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex space-x-3'>
            <FormField
              control={control}
              name='street'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>

                  <FormControl>
                    <div className='w-96'>
                      <Input className='h-12 px-10' type='text' {...field} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>

                  <FormControl>
                    <div className='w-40'>
                      <Input className='h-12 px-10' type='text' {...field} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name='reference'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference</FormLabel>

                <FormControl>
                  <div className='w-96'>
                    <Input className='h-12 px-10' type='text' {...field} />
                  </div>
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
