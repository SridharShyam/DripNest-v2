import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === product.id && item.size === size && item.color === color
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1, size, color }],
          });
        }
      },
      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          ),
        });
      },
      updateQuantity: (id, size, color, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'dripnest-cart',
    }
  )
);
