import { create } from 'zustand';

export const useUIStore = create((set) => ({
  cartOpen: false,
  searchOpen: false, 
  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
}));
