'use client'

import { createContext, type ReactNode, useState } from 'react'

import Cookies from '../lib/js-cookie'
import ClientOnly from './client-only'
import { AnimatePresence } from '../lib/framer-motion'

type PopupContextType = {
  hidePopup: () => void
}

const PopupContext = createContext<PopupContextType>({
  hidePopup: () => {},
})

type PopupProps = {
  children: ReactNode
  hiddenCookieId: string
}

const Popup = ({ children, hiddenCookieId }: PopupProps) => {
  const [hidden, setHidden] = useState(Cookies.get(hiddenCookieId) === '1')

  const hidePopup = () => {
    setHidden(true)

    Cookies.set(hiddenCookieId, '1')
  }

  return (
    <ClientOnly>
      <PopupContext.Provider value={{ hidePopup }}>
        <AnimatePresence>{!hidden && children}</AnimatePresence>
      </PopupContext.Provider>
    </ClientOnly>
  )
}

export { Popup as default, Popup, PopupContext }
