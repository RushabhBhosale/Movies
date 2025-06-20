"use client";
import Navbar from "@/components/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import BottomNav from "@/components/bottomNav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "12rem",
          } as React.CSSProperties
        }
      >
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <div className="overflow-auto">
            <div className="flex w-full py-1 bg-sidebar">
              <Navbar />
            </div>
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
