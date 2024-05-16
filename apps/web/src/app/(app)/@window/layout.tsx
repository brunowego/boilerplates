import { memo, type PropsWithChildren } from 'react'

import _Window from '@acme/ui/components/window'

const Window = memo<PropsWithChildren>(({ children }) => {
  return <_Window>{children}</_Window>
})

export default Window
