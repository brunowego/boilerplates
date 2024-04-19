'use client'

import { type HTMLAttributes, type JSX, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
// import { useDebounceCallback } from 'usehooks-ts'

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
import { AtSign, Check, X, Loader2 } from '@acme/ui/components/icon'

import { api } from '@/lib/api'
import useDebouncedUsernameAvailability from '@/hooks/use-debounced-username-avaibility'
import HookFormDevtool from '@/components/hookform-devtool'

type User = {
  username: string
}

export const signUpSchema = z.object({
  username: z.string().min(2).optional(),
})

export const usernameSchema = z.preprocess(
  (value: unknown) => (typeof value === 'string' ? value.trim() : value),
  z.string().min(2).max(15),
)

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
  // const [usernameFound, setUsernameFound] = useState<boolean | null>(null)

  const {
    register,
    formState,
    reset,
    handleSubmit,
    control,
    setError,
    ...form
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: user?.username || '',
    },
    resolver: zodResolver(formSchema),
  })

  // const fetchUsername = useDebounceCallback(
  //   (username: string) =>
  //     api
  //       .get(`/check/username?q=${username}`)
  //       .then((res) => res.data)
  //       .then((data) => {
  //         setUsernameFound(data.found)
  //       }),
  //   200,
  // )

  const {
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvailability,
  } = useDebouncedUsernameAvailability()

  const queryClient = useQueryClient()
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
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })

      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    if (availability !== 'success')
      return setError('username', {
        message: 'Username not available.',
      })

    const modifiedFields = Object.fromEntries(
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
          ...form,
        }}
      >
        <form
          className={cn('grid space-y-2', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <div className='grid grid-cols-3'>
            <FormField
              control={control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <div className='relative'>
                      <div className='pointer-events-none absolute inset-y-0 left-4 flex'>
                        <AtSign className='size-4 self-center' />
                      </div>

                      <Input
                        aria-invalid={
                          availability === 'invalid' ? 'true' : 'false'
                        }
                        className='h-12 px-10'
                        type='text'
                        {...field}
                        // onChange={(event) => {
                        //   field.onChange(event)
                        //   fetchUsername(event.target.value)
                        // }}
                        onChange={(event) => {
                          field.onChange(event)

                          const value = event.target.value
                          const { success } = usernameSchema.safeParse(value)

                          if (success) {
                            onStartCheckAvailability()

                            return onCheckAvailability(value)
                          }

                          if (availability !== 'idle') {
                            onResetAvailability()
                          }
                        }}
                      />

                      <div className='pointer-events-none absolute inset-y-0 right-4 flex'>
                        {availability === 'loading' && (
                          <Loader2 className='size-4 animate-spin self-center' />
                        )}

                        {availability === 'success' && (
                          <Check className='size-4 self-center' />
                        )}

                        {availability === 'invalid' && (
                          <X className='size-4 self-center' />
                        )}
                      </div>
                    </div>
                  </FormControl>

                  <FormDescription>
                    {availability === 'invalid'
                      ? 'Username not available.'
                      : 'You can edit it once a month.'}
                  </FormDescription>

                  {/* <FormDescription>
                  {usernameFound
                    ? 'Username not available.'
                    : 'You can edit it once a month.'}
                </FormDescription> */}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
