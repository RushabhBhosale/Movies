import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { _id: string; email: string; username: string };
  } catch {
    return null;
  }
};
