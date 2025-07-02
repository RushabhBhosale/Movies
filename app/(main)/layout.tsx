// SERVER-ONLY LAYOUT WRAPPER
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProtectedLayoutUI from "./ServerLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");

  return <ProtectedLayoutUI>{children}</ProtectedLayoutUI>;
}
