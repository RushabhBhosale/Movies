"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

type Props = {
  user: any;
};

export const UserProvider = ({ user }: Props) => {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  return null;
};
