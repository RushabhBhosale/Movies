import Navbar from "@/components/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import BottomNav from "@/components/bottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
