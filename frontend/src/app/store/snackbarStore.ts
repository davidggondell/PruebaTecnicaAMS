import { create } from 'zustand'

export type SnackbarVariant = 'success' | 'error' | 'info' | 'warning'

interface SnackbarState {
  open: boolean
  message: string
  variant: SnackbarVariant
  show: (message: string, variant?: SnackbarVariant) => void
  hide: () => void
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: '',
  variant: 'info',
  show: (message: string, variant: SnackbarVariant = 'info') =>
    set({ open: true, message, variant }),
  hide: () => set({ open: false }),
}))
