'use client'

import {
  type HTMLAttributes,
  type Dispatch,
  type SetStateAction,
  type JSX,
  useEffect,
} from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { insertDomainSchema } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
import toast from '@acme/ui/lib/toast'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

import useHookFormDevtool from '@/store/use-hook-form-devtool'
import api from '@/lib/api'
import { handleError } from '@/utils'

const formSchema = insertDomainSchema.pick({ domain: true })

type FormValues = z.infer<typeof formSchema>

interface AddDomainFormProps extends HTMLAttributes<HTMLFormElement> {
  setShowAddDomainModal: Dispatch<SetStateAction<boolean>>
}

export default function AddDomainForm({
  setShowAddDomainModal,
  className,
  ...props
}: AddDomainFormProps): JSX.Element {
  const { open, close } = useHookFormDevtool()
  const queryClient = useQueryClient()

  const { formState, handleSubmit, control, ...form } = useForm<FormValues>({
    // mode: 'onChange',
    defaultValues: {
      domain: '',
    },
    resolver: zodResolver(formSchema),
  })

  // @ts-ignore
  useEffect(() => open(control), [control])

  useEffect(() => {
    return function cleanup() {
      close()
    }
  }, [])

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) => {
      return api.post('/domains', values)
    },
    onError(error) {
      toast.error(
        handleError(
          error,
          'Add domain is currently not available, please try again later :(',
        ),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] })

      setShowAddDomainModal(false)
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      void mutateAsync(values)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form {...{ formState, handleSubmit, control, ...form }}>
      <form
        className={cn('space-y-4', className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={control}
          name='domain'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>

              <FormControl>
                <Input type='text' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button
            disabled={!formState.isDirty || !formState.isValid}
            size='lg'
            type='submit'
          >
            {formState.isSubmitting ? (
              <Loader2 className='size-5 animate-spin' />
            ) : (
              <>Add domain</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
