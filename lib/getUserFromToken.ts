import { cookies } from "next/headers";

export const getUserFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  [];
  const data = await res.json();
  return data.user;
};
