'use client'

import { createContext, useContext, useRef, useState } from 'react'

import { PopupContext } from '@acme/ui/components/popup'
import motion, { AnimatePresence } from '@acme/ui/lib/framer-motion'
import Icon from '@acme/ui/components/icon'
import useResizeObserver from '@acme/ui/hooks/use-resize-observer'
import toast from '@acme/ui/lib/toast'

import SurveyForm from './user-survey-form'

type UserSurveyStatus = 'idle' | 'loading' | 'success'

export const UserSurveyContext = createContext<{ status: UserSurveyStatus }>({
  status: 'idle',
})

export default function UserSurveyPopupInner() {
  const { hidePopup } = useContext(PopupContext)

  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const resizeObserverEntry = useResizeObserver(contentWrapperRef)

  const [status, setStatus] = useState<UserSurveyStatus>('idle')

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className='fixed bottom-4 z-50 mx-2 overflow-hidden rounded-lg border bg-secondary shadow-md sm:left-4 sm:mx-auto sm:max-w-sm'
      exit={{ opacity: 0, y: '100%' }}
      initial={{ opacity: 0, translateY: 50 }}
    >
      <motion.div
        animate={{
          height: resizeObserverEntry?.borderBoxSize[0]?.blockSize ?? 'auto',
        }}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        <div className='p-4' ref={contentWrapperRef}>
          <button
            className='absolute top-2.5 right-2.5 rounded-full p-1 transition-colors active:scale-90 hover:bg-border'
            onClick={hidePopup}
            type='button'
          >
            <Icon.x className='size-4 text-muted-foreground' />
          </button>

          <UserSurveyContext.Provider value={{ status }}>
            <SurveyForm
              onSubmit={async (source) => {
                setStatus('loading')

                try {
                  await fetch('/api/user', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ source }),
                  })

                  setStatus('success')

                  setTimeout(hidePopup, 3000)
                } catch (e) {
                  toast.error('Error saving response. Please try again.')

                  setStatus('idle')
                }
              }}
            />

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-secondary text-sm'
                  initial={{ opacity: 0, y: 10 }}
                >
                  <Icon.checkCircle className='size-8 text-green-500' />

                  <p className='text-muted-foreground'>
                    Thank you for your response!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </UserSurveyContext.Provider>
        </div>
      </motion.div>
    </motion.div>
  )
}
