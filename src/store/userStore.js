import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: "Shyam",
        email: "shyam@example.com",
        addresses: [],
        orders: [],
      },
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'dripnest-user',
    }
  )
);

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      alerts: [], // [{ id, productId, productName, size, email, restocked: boolean }]
      addAlert: (alert) => set({ alerts: [...get().alerts, { ...alert, id: Date.now(), restocked: Math.random() > 0.7 }] }),
      removeAlert: (id) => set({ alerts: get().alerts.filter((a) => a.id !== id) }),
      getAlertsCount: () => get().alerts.length,
    }),
    {
      name: 'dripnest-notifications',
    }
  )
);
