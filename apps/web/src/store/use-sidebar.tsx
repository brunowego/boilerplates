import type { ReactNode } from 'react'
import { create } from 'zustand'

interface TSidebarState {
  isOpen: boolean
  component: ReactNode
  close: () => void
  setSidebar: (data: ReactNode) => void
}

const useSidebar = create<TSidebarState>()((set) => ({
  isOpen: false,
  component: <></>,
  close: () =>
    set((state) => ({
      ...state,
      component: <></>,
      isOpen: false,
    })),
  setSidebar: (data) =>
    set((state) => ({
      ...state,
      component: <>{data}</>,
      isOpen: true,
    })),
}))

export default useSidebar
