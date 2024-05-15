'use client'

import type { HTMLAttributes, JSX } from 'react'
import Link from 'next/link'

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
import cn from '@acme/ui/lib/cn'
import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'
import { Card, CardContent } from '@acme/ui/components/card'
import { Avatar, AvatarImage, AvatarFallback } from '@acme/ui/components/avatar'
import Separator from '@acme/ui/components/separator'
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
import { Page, PageHeader, PageContent } from '@/components/page'
import Fieldset from '@/components/fieldset'

const formSchema = insertPersonalSchema

type FormValues = z.infer<typeof formSchema>

interface EditPersonalFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function EditPersonalForm({
  className,
  ...props
}: EditPersonalFormProps): JSX.Element {
  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        firstName: 'Bruno',
        lastName: 'Wego',
        language: 'en',
        timezone: 'America/Sao_Paulo',
      },
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

      <Form {...{ formState, reset, handleSubmit, control, ...form }}>
        <form
          className={cn('relative', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <Page>
            <PageHeader>
              <h1 className={typographyVariants({ variant: 'title' })}>
                Profile
              </h1>

              {formState.isDirty ? (
                <div className='flex items-center gap-x-4'>
                  <h2 className='text-muted-foreground text-xs'>
                    Unsaved changes
                  </h2>

                  <div className='flex gap-x-2'>
                    <Button variant='outline'>Cancel</Button>

                    <Button
                      disabled={!formState.isValid}
                      type='submit'
                      variant='secondary'
                    >
                      {formState.isSubmitting ? (
                        <Loader2 className='size-5 animate-spin' />
                      ) : (
                        <>Save</>
                      )}
                    </Button>
                  </div>
                </div>
              ) : null}
            </PageHeader>

            <PageContent>
              <Fieldset title='Details'>
                <Card className='xl:col-span-4'>
                  <CardContent className='border-b'>
                    <div className='flex gap-x-4'>
                      <Avatar className='size-16'>
                        <AvatarImage src='' />
                        <AvatarFallback>BW</AvatarFallback>
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
                          <Check className='size-4 text-green-400' />
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

              <Separator className='my-4 xl:my-5' />

              <Fieldset
                title='Login service'
                description='Connect an external login service to quickly and securely access your Shopify account.'
              >
                <Card className='col-span-4'>
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
                        className='text-green-400 underline-offset-4 hover:underline'
                        href='/'
                      >
                        brunowego@gmail.com
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </Fieldset>

              <Separator className='my-4 xl:my-5' />

              <Fieldset
                title='Preferred language'
                description="When you're logged in to Shopify, this is the language you will see. It doesn't affect the language your customers see on your online store."
              >
                <Card className='col-span-4'>
                  <CardContent className='border-b'>
                    <FormField
                      control={control}
                      name='language'
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>

                          <FormControl>
                            <Select
                              defaultValue={value}
                              onValueChange={onChange}
                            >
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

              <Separator className='my-4 xl:my-5' />

              <Fieldset title='Timezone'>
                <Card className='col-span-4'>
                  <CardContent>
                    <FormField
                      control={control}
                      name='timezone'
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>

                          <FormControl>
                            <Select
                              defaultValue={value}
                              onValueChange={onChange}
                            >
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
            </PageContent>
          </Page>
        </form>
      </Form>
    </>
  )
}
