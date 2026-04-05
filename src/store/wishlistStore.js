import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const isExist = get().items.find((item) => item.id === product.id);
        if (isExist) {
          set({
            items: get().items.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            items: [...get().items, product],
          });
        }
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      isInWishlist: (id) => {
        return !!get().items.find((item) => item.id === id);
      },
    }),
    {
      name: 'dripnest-wishlist',
    }
  )
);
