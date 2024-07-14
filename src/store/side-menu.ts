import { create } from 'zustand'

interface SideMenuStoreState {
  isSideMenuOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
}

export const useSideMenuStore = create<SideMenuStoreState>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false })
}))
