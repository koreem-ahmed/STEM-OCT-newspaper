import { create } from "zustand";

export const useNewspaperStore = create((set) => ({
  newspapers: [],

  setNewspapers: (newspapers) => set({ newspapers }),

  createNewspaper: async (newNewspaper) => {
    try {
      const res = await fetch("/api/products/newspapers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNewspaper)
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({ newspapers: [...state.newspapers, data.newspaper] }));
      return { success: true, message: "Newspaper created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to connect to server." };
    }
  },

  fetchNewspaper: async () => {
    try {
      const res = await fetch("/api/products/newspapers");
      const data = await res.json();
      set({ newspapers: data.newspapers || [] });
    } catch (error) {
      set({ newspapers: [] });
    }
  },

  deleteNewspaper: async (id) => {
    try {
      const res = await fetch(`/api/products/newspapers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({ newspapers: state.newspapers.filter((n) => n._id !== id) }));
      return { success: true, message: "Newspaper deleted" };
    } catch (error) {
      return { success: false, message: "Failed to connect to server." };
    }
  },

  updateNewspaper: async (id, updated) => {
    try {
      const res = await fetch(`/api/products/newspapers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: "Update failed" };
      set((state) => ({
        newspapers: state.newspapers.map((n) => (n._id === id ? data.data : n))
      }));
      return { success: true, message: "Newspaper updated" };
    } catch (error) {
      return { success: false, message: "Failed to connect to server." };
    }
  }
}));
