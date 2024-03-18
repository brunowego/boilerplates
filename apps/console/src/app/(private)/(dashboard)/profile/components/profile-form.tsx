'use client'

import type { z } from 'zod'
import type { HTMLAttributes, JSX } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

import { profileSchema } from '@/schemas'
import type { User } from '@acme/auth'
import { api } from '@/lib/api'
import { handleError } from '@/utils'

const formSchema = profileSchema

type FormValues = z.infer<typeof formSchema>

interface PersonalDataFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User | undefined
}

export default function PersonalDataForm({
  className,
  user,
  ...props
}: PersonalDataFormProps): JSX.Element {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        firstName: user?.first_name,
        lastName: user?.last_name ?? '',
      },
      resolver: zodResolver(formSchema),
    })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return api.patch('/profile', values)
    },
    onError(error) {
      toast.error(
        handleError(
          error,
          'Profile update is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
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
    <Card className='max-w-2xl'>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Configure your profile.</CardDescription>
      </CardHeader>

      <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
        <form
          className={cn('grid space-y-2', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <CardContent>
            <div className='grid grid-cols-2 gap-x-4'>
              <FormField
                control={control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>

                    <FormControl>
                      <Input className='h-12' type='text' {...field} />
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
                    <FormLabel>Last Name</FormLabel>

                    <FormControl>
                      <Input className='h-12' type='text' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className='flex justify-end'>
            <Button
              disabled={!formState.isDirty || !formState.isValid}
              size='lg'
              type='submit'
              variant='secondary'
            >
              {formState.isSubmitting ? (
                <Icon.loader2 className='animate-spin w-5' />
              ) : (
                <span>Update Profile</span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
