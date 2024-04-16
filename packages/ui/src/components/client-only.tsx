import { type ReactNode, useState, useEffect } from 'react'

import { motion, AnimatePresence } from '../lib/framer-motion'

type ClientOnlyProps = {
  fadeInDuration?: number
  fallback?: ReactNode
  children: ReactNode
}

export default function ClientOnly({
  fadeInDuration = 0.5,
  fallback,
  children,
}: ClientOnlyProps) {
  const [clientReady, setClientReady] = useState<boolean>(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  const Comp = fadeInDuration ? motion.div : 'div'

  return (
    <AnimatePresence>
      {clientReady ? (
        <Comp
          {...(fadeInDuration
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: fadeInDuration },
              }
            : {})}
        >
          {children}
        </Comp>
      ) : (
        fallback || null
      )}
    </AnimatePresence>
  )
}
