import dynamic from 'next/dynamic'

import type { PaymentMethod } from '@acme/db/types'

import Loading from './loading'

type DynamicProps = PaymentMethod & {
  control: any
  index: number
}

export default function Dynamic({ ...props }: DynamicProps) {
  if (typeof window !== 'undefined') {
    const DynamicImportedComponent = dynamic(() => import(`./${props.type}`), {
      loading: () => <Loading />,
      ssr: false,
    })

    // @ts-ignore
    return <DynamicImportedComponent {...props} />
  }
}
