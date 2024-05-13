'use client'

import type { HTMLAttributes, JSX } from 'react'

import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@acme/ui/components/form'
import Input from '@acme/ui/components/input'
import Button, { buttonVariants } from '@acme/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@acme/ui/components/avatar'
import { Loader2 } from '@acme/ui/components/icon'
import cn from '@acme/ui/lib/cn'

import { insertWorkspaceSchema } from '@/schemas'
import HookFormDevtool from '@/components/hookform-devtool'

const formSchema = insertWorkspaceSchema

type FormValues = z.infer<typeof formSchema>

interface AddWorkspaceFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function AddWorkspaceForm({
  className,
  ...props
}: AddWorkspaceFormProps): JSX.Element {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        logo: '',
        name: '',
        handle: '',
        teamSize: 0,
        companyIndustry: 0,
      },
      resolver: zodResolver(formSchema),
    })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <>
      <HookFormDevtool control={control} />

      <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
        <form
          className={cn('grid space-y-6', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='logo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Workspace Logo{' '}
                  <span className='ml-1 text-muted-foreground'>(optional)</span>
                </FormLabel>

                <FormControl>
                  <div className='flex gap-x-5'>
                    <Avatar className='size-20 text-4xl'>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-green-100 text-green-400 dark:bg-green-600 dark:text-green-200'>
                        L
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col items-start justify-center space-y-2'>
                      <label
                        aria-disabled='false'
                        className={buttonVariants({
                          variant: 'secondary',
                        })}
                      >
                        <Input
                          accept='image/png,image/gif,image/jpeg'
                          className='hidden'
                          type='file'
                          {...field}
                        />
                        Upload image
                      </label>

                      <p className='text-muted-foreground text-sm'>
                        .png, .jpeg, .gif files up to 8MB. Recommended size is
                        256x256px.
                      </p>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace name</FormLabel>

                <FormControl>
                  <Input className='h-12' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='handle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handle</FormLabel>

                <FormControl>
                  <div className='relative'>
                    <Input className='h-12 pl-[150px]' type='text' {...field} />

                    <span className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'>
                      https://acme.com/
                    </span>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='teamSize'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Team size{' '}
                  <span className='ml-1 text-muted-foreground'>(optional)</span>
                </FormLabel>

                <FormControl>
                  <Input className='h-12' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='companyIndustry'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Industry{' '}
                  <span className='ml-1 text-muted-foreground'>(optional)</span>
                </FormLabel>

                <FormControl>
                  <Input className='h-12' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex'>
            <Button
              className='ml-auto'
              disabled={!formState.isDirty || !formState.isValid}
              size='lg'
              type='submit'
              variant='secondary'
            >
              {formState.isSubmitting ? (
                <Loader2 className='size-5 animate-spin' />
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
