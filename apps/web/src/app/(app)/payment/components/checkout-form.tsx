import { type JSX, useState, useEffect, type FormEvent } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

import Button from '@acme/ui/components/button'

import api from '@/lib/api'
import { convertToSubcurrency } from '@/utils'
// import Label from '@acme/ui/components/label'
// import Skeleton from '@acme/ui/components/skeleton'

type CheckoutFormProps = {
  amount: number
}

export default function CheckoutForm({
  amount,
}: CheckoutFormProps): JSX.Element {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    api
      .post('/payment/intent', {
        amount: convertToSubcurrency(amount),
      })
      .then(({ data }) => setClientSecret(data.clientSecret))
  }, [amount])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsLoading(true)

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setIsLoading(false)

      return
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?amount=${amount}`,
      },
    })

    if (paymentError) {
      setErrorMessage(paymentError.message)
      setIsLoading(false)

      return
    }

    setIsLoading(false)
  }

  // if (!clientSecret || !stripe || !elements) {
  //   return (
  //     <div className='grid grid-cols-4 gap-2'>
  //       <Skeleton className='col-span-2 h-16' />

  //       <Skeleton className='col-span-2 h-16' />

  //       <div className='col-span-2'>
  //         <Label>Card number</Label>

  //         <Skeleton className='h-12' />
  //       </div>

  //       <div>
  //         <Label>Expiration date</Label>

  //         <Skeleton className='h-12' />
  //       </div>

  //       <div>
  //         <Label>Security code</Label>

  //         <Skeleton className='h-12' />
  //       </div>

  //       <div className='col-span-4'>
  //         <Label>Country</Label>

  //         <Skeleton className='h-12' />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {clientSecret ? <PaymentElement /> : null}

        {errorMessage ? <div>{errorMessage}</div> : null}

        <Button className='w-full' disabled={!stripe || isLoading} size='lg'>
          {!isLoading ? `Pay ${amount}` : 'Processing...'}
        </Button>
      </form>
    </>
  )
}
