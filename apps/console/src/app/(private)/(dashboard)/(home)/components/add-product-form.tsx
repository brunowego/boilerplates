'use client'

import type { HTMLAttributes, JSX } from 'react'

import { insertProductSchema } from '@/schemas'
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
import Icon from '@acme/ui/components/icon'
import cn from '@acme/ui/lib/cn'

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
        handle: '',
        price: '',
      },
      resolver: zodResolver(formSchema),
    })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <Form {...{ register, formState, reset, handleSubmit, control, ...form }}>
      <form
        className={cn('grid space-y-2', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={control}
            name='title'
            render={({ field }) => (
              <FormItem>
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
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>

                <FormControl>
                  <Input className='h-12' type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex'>
          <Button
            className='ml-auto'
            disabled={!formState.isDirty || !formState.isValid}
            size='lg'
            type='submit'
            variant='secondary'
          >
            {formState.isSubmitting ? (
              <Icon.loader2 className='size-5 animate-spin' />
            ) : (
              <span>Add</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
