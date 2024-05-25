import type { ReactNode, JSX } from 'react'

import type { DefaultRootProps } from '@acme/puck'
import Button from '@acme/ui/components/button'
import {
  Play,
  FilePenLine,
  Target,
  BookOpenCheck,
  Check,
} from '@acme/ui/components/icon'
import Accordion from '@acme/ui/components/accordion'

type RootProps = DefaultRootProps & {
  children: ReactNode
}

export default function Root({ children, colors }: RootProps): JSX.Element {
  return (
    // <div
    //   className='h-full'
    //   style={{ background: colors?.background, color: colors?.foreground }}
    // >
    //   <main>{children}</main>

    //   <footer className='container text-center'>
    //     <p className='font-medium leading-10'>
    //       Powered by <strong>Acme</strong>
    //     </p>
    //   </footer>
    // </div>

    <main style={{ background: colors?.background, color: colors?.foreground }}>
      {children}
    </main>
  )
}
