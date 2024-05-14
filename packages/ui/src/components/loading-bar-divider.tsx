import { useAnimate, usePresence, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

type LoadingBarDividerProps = {
  isLoading: boolean
}

export default function LoadingBarDivider({
  isLoading,
}: LoadingBarDividerProps) {
  return (
    <div className='relative h-px w-full bg-border'>
      <AnimationDivider isLoading={isLoading} />
    </div>
  )
}

export function AnimationDivider({ isLoading }: LoadingBarDividerProps) {
  const [scope, animate] = useAnimate()
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          [
            [
              scope.current,
              { width: '30%', left: '35%' },
              { duration: 1, ease: 'easeIn' },
            ],
            [
              scope.current,
              { width: 0, left: '100%' },
              { duration: 1, ease: 'easeOut' },
            ],
          ],
          { repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' },
        )
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0 })

        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent, isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <div
          className='width-0 absolute top-0 left-0 h-full bg-gradient-to-r from-5% from-transparent via-green-500 to-95% to-transparent'
          ref={scope}
        />
      )}
    </AnimatePresence>
  )
}
