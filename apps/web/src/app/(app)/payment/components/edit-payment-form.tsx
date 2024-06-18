'use client'

import { type HTMLAttributes, type JSX, useMemo } from 'react'

import { insertPaymentSchema } from '@acme/db/schemas'
import { type z, zodResolver } from '@acme/ui/lib/zod'
import type { PaymentMethod } from '@acme/db/types'
import { useForm, type SubmitHandler } from '@acme/ui/hooks/use-form'
// import toast from '@acme/ui/lib/toast'
import Form from '@acme/ui/components/form'
import cn from '@acme/ui/utils/cn'
import Page from '@acme/ui/components/page'
import Button from '@acme/ui/components/button'
import Fieldset from '@acme/ui/components/fieldset'
import Card from '@acme/ui/components/card'
// import Label from '@acme/ui/components/label'
// import Switch from '@acme/ui/components/switch'
// import Badge from '@acme/ui/components/badge'
import { Loader2, CreditCard, Gift } from '@acme/ui/components/icon'

import HookFormDevtool from '@/components/hookform-devtool'

import Dynamic from './dynamic'
// import Delivery from './delivery'
// import SelfPickUp from './self-pick-up'
// import WhatsAppBot from './whatsapp-bot'

const formSchema = insertPaymentSchema

type FormValues = z.infer<typeof formSchema>

interface EditPaymentFormProps extends HTMLAttributes<HTMLFormElement> {
  payment?: {
    methods: PaymentMethod[]
  }
  isLoading?: boolean
}

export default function EditPaymentForm({
  payment,
  isLoading,
  className,
  ...props
}: EditPaymentFormProps): JSX.Element {
  const defaultValues = useMemo(
    () => ({
      methods: payment?.methods ?? [],
    }),
    [payment],
  )

  const { formState, reset, handleSubmit, control, ...form } =
    useForm<FormValues>({
      // defaultValues,
      resolver: zodResolver(formSchema),
    })

  const cancel = () => {
    reset(defaultValues)
  }

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    // try {
    //   // @ts-ignore
    //   const modifiedFields: FormValues = Object.fromEntries(
    //     Object.keys(formState.dirtyFields).map((key) => [
    //       key,
    //       values[key as keyof FormValues],
    //     ]),
    //   )
    //   await mutateAsync(modifiedFields)
    //   reset(modifiedFields)
    // } catch (err) {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.error(err)
    //   }
    // }
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
            <Page.Header className='justify-between'>
              <Page.Title>Payment</Page.Title>

              {formState.isDirty ? (
                <div className='flex items-center gap-x-4'>
                  <h2 className='text-muted-foreground text-xs'>
                    Unsaved changes
                  </h2>

                  <div className='flex gap-x-2'>
                    <Button onClick={cancel} variant='outline'>
                      Cancel
                    </Button>

                    <Button
                      className='gap-x-2'
                      disabled={!formState.isValid}
                      type='submit'
                      variant='secondary'
                    >
                      <span>Salvar</span>

                      {formState.isSubmitting ? (
                        <Loader2 className='size-4 animate-spin' />
                      ) : null}
                    </Button>
                  </div>
                </div>
              ) : null}
            </Page.Header>

            <Page.Content className='divide-y *:py-5 first:*:pt-0 last:*:pb-0'>
              <Fieldset
                title='Methods'
                description='Customers will choose one of following payment methods to make payment.'
              >
                <Card className='divide-y xl:col-span-4 *:space-y-4'>
                  {payment?.methods?.map(({ type, ...props }) => (
                    <Card.Content key={type}>
                      {type ? <Dynamic type={type} {...props} /> : null}
                    </Card.Content>
                  ))}

                  {/* <Card.Content>
                    <div className='flex items-center space-x-4'>
                      <Label
                        className='grow space-x-1.5 font-medium'
                        htmlFor='card-payments'
                      >
                        <div className='p-1'>
                          <CreditCard className='size-6' />
                        </div>

                        <span className='font-medium text-base'>
                          Card payments
                        </span>

                        <Badge className='!rounded-full uppercase'>
                          Premium
                        </Badge>
                      </Label>

                      <Switch disabled id='card-payments' />
                    </div>
                  </Card.Content> */}
                </Card>
              </Fieldset>

              {/* <Fieldset
                title='Advanced features'
                description="Optimize your business's operations."
              >
                <Card className='divide-y xl:col-span-4 *:space-y-4'>
                  <Card.Content>
                    <Delivery enabled={false} />
                  </Card.Content>

                  <Card.Content>
                    <SelfPickUp enabled={false} />
                  </Card.Content>

                  <Card.Content>
                    <WhatsAppBot enabled={false} />
                  </Card.Content>

                  <Card.Content>
                    <div className='flex items-center space-x-4'>
                      <Label
                        className='grow space-x-1.5 font-medium'
                        htmlFor='loyalty-rewards'
                      >
                        <div className='p-1'>
                          <Gift className='size-6' />
                        </div>

                        <span className='font-medium text-base'>
                          Loyalty & Rewards
                        </span>

                        <Badge className='!rounded-full uppercase'>
                          Premium
                        </Badge>
                      </Label>

                      <Switch disabled id='loyalty-rewards' />
                    </div>
                  </Card.Content>
                </Card>
              </Fieldset> */}
            </Page.Content>
          </Page>
        </form>
      </Form>
    </>
  )
}
