"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

export default function HydrateUser({ token }: { token: string | null }) {
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);

  useEffect(() => {
    const getUser = async () => {
      if (!token) return clearUser();
      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
        clearUser();
      }
    };
    getUser();
  }, [token]);

  return null;
}
