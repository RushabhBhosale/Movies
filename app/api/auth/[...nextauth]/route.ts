import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ must be moved to a separate file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // ✅ ONLY export these
