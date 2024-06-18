'use client'

import { type HTMLAttributes, type JSX, useMemo } from 'react'
import Link from 'next/link'

import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import cn from '@acme/ui/lib/cn'
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

import { insertPersonalSchema } from '@/schemas'
import HookFormDevtool from '@/components/hookform-devtool'
import Fieldset from '@/components/fieldset'

const formSchema = insertPersonalSchema

type FormValues = z.infer<typeof formSchema>

interface EditPersonalFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function EditPersonalForm({
  className,
  ...props
}: EditPersonalFormProps): JSX.Element {
  const defaultValues = useMemo(
    () => ({
      firstName: 'Bruno',
      lastName: 'Wego',
      language: 'en',
      timezone: 'America/Sao_Paulo',
    }),
    [],
  )

  const { register, control, handleSubmit, setValue, formState } =
    useForm<FormValues>({
      defaultValues,
      resolver: zodResolver(formSchema),
    })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      console.log(values)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <HookFormDevtool control={control} />

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

                    <p className='text-[0.8rem] text-muted-foreground leading-5'>
                      .png, .jpeg, .gif files up to 8MB. Recommended size is
                      256x256px.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardContent className='border-b'>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>First name</Label>

                    <Input type='text' {...register('firstName')} />
                  </div>

                  <div className='space-y-2'>
                    <Label>First name</Label>

                    <Input type='text' {...register('lastName')} />
                  </div>
                </div>

                <p className='mt-2 text-[0.8rem] text-muted-foreground leading-5'>
                  Use your first and last name as they appear on your
                  government-issued ID.
                </p>
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
                <div className='space-y-2'>
                  <Label>Language</Label>

                  <Select
                    defaultValue={defaultValues.language}
                    {...register('language')}
                    onValueChange={(v) => setValue('language', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a language' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='pt'>Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <div className='space-y-2'>
                  <Label>Timezone</Label>

                  <Select
                    defaultValue={defaultValues.timezone}
                    {...register('timezone')}
                    onValueChange={(v) => setValue('timezone', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a timezone' />
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

                  <p className='mt-2 text-[0.8rem] text-muted-foreground leading-5'>
                    This is the timezone for your account. To set the timezone
                    for your Shopify admin, go to the General section in
                    Settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Fieldset>
        </div>

        {formState.isDirty ? (
          <div className='sticky bottom-0 z-50 mt-4 flex h-16 justify-end bg-gradient-to-r from-transparent to-background'>
            <div className='flex items-center gap-x-4'>
              <h2 className='text-muted-foreground text-xs'>Unsaved changes</h2>

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
    </>
  )
}
