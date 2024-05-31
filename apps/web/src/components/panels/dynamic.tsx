import dynamic from 'next/dynamic'

import Loading from './loading'

type DynamicProps = {
  name: string
}

export function Dynamic({ name }: DynamicProps) {
  if (typeof window !== 'undefined') {
    const DynamicImportedComponent = dynamic(() => import(`./${name}`), {
      loading: () => <Loading />,
      ssr: false,
    })

    return <DynamicImportedComponent />
  }
}
