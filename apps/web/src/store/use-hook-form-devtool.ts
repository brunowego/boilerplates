import { create } from 'zustand'

import type { Control } from '@acme/ui/lib/form'

type HookFormDevtool = {
  isOpen: boolean
  control: Control | null
  open: (control: Control) => void
  close: () => void
}

const useHookFormDevtool = create<HookFormDevtool>((set) => ({
  isOpen: false,
  control: null,
  open: (control: Control) => set({ control, isOpen: true }),
  close: () => set({ control: null, isOpen: false }),
}))

export { useHookFormDevtool as default }
