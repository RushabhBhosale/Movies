import ProtectedLayoutUI from "./ServerLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutUI>{children}</ProtectedLayoutUI>;
}
