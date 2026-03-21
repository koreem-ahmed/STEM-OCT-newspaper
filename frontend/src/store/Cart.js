import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newspaper) => {
        const existing = get().items.find((i) => i._id === newspaper._id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i._id === newspaper._id ? { ...i, quantity: i.quantity + 1 } : i
            )
          }));
        } else {
          set((state) => ({ items: [...state.items, { ...newspaper, quantity: 1 }] }));
        }
      },

      removeFromCart: (id) => {
        set((state) => ({ items: state.items.filter((i) => i._id !== id) }));
      },

      decreaseQty: (id) => {
        set((state) => ({
          items: state.items
            .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0)
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    }),
    { name: "newspaper-cart" }
  )
);
