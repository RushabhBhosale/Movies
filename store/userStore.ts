"use client";

import { create } from "zustand";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get("/api/auth/me");
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user, loading: false }),

  clearUser: () => set({ user: null, loading: false }),
}));
