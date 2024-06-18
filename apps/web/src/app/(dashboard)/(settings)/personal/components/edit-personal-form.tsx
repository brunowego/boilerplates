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
import Switch from '@acme/ui/components/switch'
import { Loader2 } from '@acme/ui/components/icon'

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
      skills: [
        {
          name: 'React',
          level: 5,
          enabled: true,
        },
        {
          name: 'TypeScript',
          level: 5,
          enabled: false,
        },
      ],
    }),
    [],
  )

  const { reset, register, control, handleSubmit, setValue, formState } =
    useForm<FormValues>({
      defaultValues,
      resolver: zodResolver(formSchema),
    })

  const cancel = () => {
    reset(defaultValues)
  }

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
            <Card className='divide-y'>
              <CardContent>
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

              <CardContent>
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

              <CardContent>
                <div className='space-y-2'>
                  <Label>Skills</Label>

                  <div className='space-y-2'>
                    {defaultValues.skills.map((_, index) => (
                      <div
                        className='flex items-center gap-x-3'
                        // biome-ignore lint/suspicious/noArrayIndexKey: This is a controlled input
                        key={index}
                      >
                        <Input
                          className='grow'
                          {...register(`skills.${index}.name`)}
                        />

                        <Input
                          className='max-w-16'
                          max={5}
                          min={1}
                          type='number'
                          {...register(`skills.${index}.level`)}
                        />

                        <Switch
                          defaultChecked={defaultValues.skills[index]?.enabled}
                          {...register(`skills.${index}.enabled`)}
                          onCheckedChange={(v) =>
                            setValue(`skills.${index}.enabled`, v)
                          }
                        />
                      </div>
                    ))}
                  </div>
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
                <Button onClick={cancel} size='lg' variant='secondary'>
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
