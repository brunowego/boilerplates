'use client'

import type { HTMLAttributes, JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'

import { insertProfileSchema, type InsertProfile } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Button from '@acme/ui/components/button'
import { Card, CardContent } from '@acme/ui/components/card'
import { Avatar, AvatarImage, AvatarFallback } from '@acme/ui/components/avatar'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@acme/ui/components/select'
import { Loader2, Check } from '@acme/ui/components/icon'
import { Google } from '@acme/ui/components/logo'

import api from '@/lib/api'
import HookFormDevtool from '@/components/hookform-devtool'
import Fieldset from '@/components/fieldset'

const formSchema = insertProfileSchema

type FormValues = z.infer<typeof formSchema>

interface EditPersonalFormProps extends HTMLAttributes<HTMLFormElement> {
  profile?: InsertProfile
}

export default function EditPersonalForm({
  profile,
  className,
  ...props
}: EditPersonalFormProps): JSX.Element {
  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        image: profile?.image,
        firstName: profile?.firstName,
        lastName: profile?.lastName ?? '',
        language: profile?.language,
        timezone: profile?.timezone,
      },
      resolver: zodResolver(formSchema),
    })

  const { refresh } = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.patch('/profile', values)
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
      refresh()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      // @ts-ignore
      const modifiedFields: FormValues = Object.fromEntries(
        Object.keys(formState.dirtyFields).map((key) => [
          key,
          values[key as keyof FormValues],
        ]),
      )

      void mutateAsync(modifiedFields)

      reset(modifiedFields)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <HookFormDevtool control={control} />

      <Form {...{ formState, reset, handleSubmit, control, ...form }}>
        <form
          className={cn('', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <div className='divide-y *:py-5 first:*:pt-0 last:*:pb-0'>
            <Fieldset title='Details'>
              <Card>
                <CardContent className='border-b'>
                  <div className='flex gap-x-4'>
                    <Avatar className='size-16'>
                      <AvatarImage src='' />
                      <AvatarFallback className='border-dashed'>
                        BW
                      </AvatarFallback>
                    </Avatar>

                    <div className='grid'>
                      <Link
                        className='text-sm leading-8 underline-offset-4 hover:underline'
                        href='/'
                      >
                        Upload photo
                      </Link>

                      <FormDescription>
                        .png, .jpeg, .gif files up to 8MB. Recommended size is
                        256x256px.
                      </FormDescription>
                    </div>
                  </div>
                </CardContent>

                <CardContent className='border-b'>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormField
                      control={control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>

                          <FormControl>
                            <Input type='text' {...field} />
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
                          <FormLabel>Last name</FormLabel>

                          <FormControl>
                            {/* @ts-ignore */}
                            <Input type='text' {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormDescription className='mt-2'>
                    Use your first and last name as they appear on your
                    government-issued ID.
                  </FormDescription>
                </CardContent>

                <CardContent className='border-b'>
                  <div className='flex items-center gap-x-4 text-sm'>
                    <div className='space-y-2'>
                      <Label>Email</Label>

                      <div className='flex items-center gap-x-2 text-muted-foreground leading-6'>
                        brunowego@gmail.com{' '}
                        <Check className='size-4 text-green-600 dark:text-green-400' />
                      </div>
                    </div>

                    <Link
                      className='ml-auto underline-offset-4 hover:underline'
                      href='/'
                    >
                      Update
                    </Link>
                  </div>
                </CardContent>

                <CardContent>
                  <div className='flex items-center gap-x-4 text-sm'>
                    <div className='space-y-2'>
                      <Label>
                        Phone Number{' '}
                        <span className='text-muted-foreground text-xs'>
                          (optional)
                        </span>
                      </Label>

                      <div className='flex gap-x-3 text-muted-foreground leading-6'>
                        No phone number
                      </div>
                    </div>

                    <Link
                      className='ml-auto underline-offset-4 hover:underline'
                      href='/'
                    >
                      Add
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Fieldset>

            <Fieldset
              title='Login service'
              description='Connect an external login service to quickly and securely access your Shopify account.'
            >
              <Card>
                <CardContent className='border-b'>
                  <div className='flex gap-x-4 text-sm'>
                    <Google className='size-5' />

                    <p>You can log in using Google</p>

                    <Link
                      className='ml-auto underline-offset-4 hover:underline'
                      href='/'
                    >
                      Disconnect
                    </Link>
                  </div>
                </CardContent>

                <CardContent>
                  <p className='text-sm'>
                    Connected to{' '}
                    <Link
                      className='text-green-600 underline-offset-4 dark:text-green-400 hover:underline'
                      href='/'
                    >
                      brunowego@gmail.com
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </Fieldset>

            <Fieldset
              title='Preferred language'
              description="When you're logged in to Shopify, this is the language you will see. It doesn't affect the language your customers see on your online store."
            >
              <Card>
                <CardContent className='border-b'>
                  <FormField
                    control={control}
                    name='language'
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>

                        <FormControl>
                          <Select defaultValue={value} onValueChange={onChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value='en'>English</SelectItem>
                              <SelectItem value='pt'>Portuguese</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardContent>
                  <h3 className='text-sm'>Regional format</h3>

                  <p className='mt-2 text-[0.8rem] text-muted-foreground leading-5'>
                    Your number, time, date, and currency formats are set for
                    American English. Change regional format.
                  </p>
                </CardContent>
              </Card>
            </Fieldset>

            <Fieldset title='Timezone'>
              <Card>
                <CardContent>
                  <FormField
                    control={control}
                    name='timezone'
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>

                        <FormControl>
                          <Select defaultValue={value} onValueChange={onChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value='Etc/GMT+12'>
                                (GMT-12:00) International Date Line West
                              </SelectItem>
                              <SelectItem value='America/Sao_Paulo'>
                                (GTM-03:00) Brasilia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormDescription>
                          This is the timezone for your account. To set the
                          timezone for your Shopify admin, go to the General
                          section in Settings.
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </Fieldset>
          </div>

          {formState.isDirty ? (
            <div className='sticky bottom-0 z-50 mt-4 flex h-16 justify-end bg-gradient-to-r from-transparent to-background'>
              <div className='flex items-center gap-x-4'>
                <h2 className='text-muted-foreground text-xs'>
                  Unsaved changes
                </h2>

                <div className='flex gap-x-2'>
                  <Button size='lg' variant='secondary'>
                    Cancel
                  </Button>

                  <Button disabled={!formState.isValid} size='lg' type='submit'>
                    {formState.isSubmitting ? (
                      <Loader2 className='size-5 animate-spin' />
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  )
}
