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
import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'
import cn from '@acme/ui/lib/cn'
import RichTextEditor from '@acme/ui/components/rich-text-editor'

import { insertProductSchema } from '@/schemas'
import HookFormDevtool from '@/components/hookform-devtool'

const formSchema = insertProductSchema

type FormValues = z.infer<typeof formSchema>

interface AddProductFormProps extends HTMLAttributes<HTMLFormElement> {}

export default function AddProductForm({
  className,
  ...props
}: AddProductFormProps): JSX.Element {
  const { register, formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        title: '',
        description: '',
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
          className={cn('grid space-y-2', className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name='title'
            render={({ field }) => (
              <FormItem className='max-w-md'>
                <FormLabel>Title</FormLabel>

                <FormControl>
                  <Input className='h-12' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='description'
            render={({ field: { onBlur, onChange, value } }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <RichTextEditor
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='test'
                    value={value}
                  />
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
                <span>Add</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
