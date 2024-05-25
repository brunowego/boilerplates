import { type ReactNode, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import getClassNameFactory from '../../lib/get-class-name-factory'
import styles from './styles.module.css'

const getClassName = getClassNameFactory('Modal', styles)

export const Modal = ({
  children,
  onClose,
  isOpen,
}: {
  children: ReactNode
  onClose: () => void
  isOpen: boolean
}) => {
  const [rootEl, setRootEl] = useState<any>(null)

  useEffect(() => {
    setRootEl(document.getElementById('puck-portal-root'))
  }, [])

  if (!rootEl) {
    return <div />
  }

  return createPortal(
    <div className={getClassName({ isOpen })} onClick={onClose}>
      <div
        className={getClassName('inner')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    rootEl,
  )
}
