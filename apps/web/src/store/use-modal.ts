import { create } from 'zustand'

import type { Modal } from '@/components/modals'

type ModalState = {
  isOpen: boolean
  modal: Modal | null
  open: (modal: Modal) => void
  close: () => void
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  modal: null,
  open: (modal: Modal) => set({ modal, isOpen: true }),
  close: () => set({ modal: null, isOpen: false }),
}))

export { useModal as default }
