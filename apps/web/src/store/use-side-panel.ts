import { create } from 'zustand'

import type { Panel } from '@/components/panels'

type SidePanel = {
  isOpen: boolean
  panel: Panel | null
  open: (panel: Panel) => void
  close: () => void
}

const useSidePanel = create<SidePanel>((set) => ({
  isOpen: false,
  panel: null,
  open: (panel: Panel) => set({ panel, isOpen: true }),
  close: () => set({ panel: null, isOpen: false }),
}))

export { useSidePanel as default }
