"use client";

import Navbar from "@/components/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import BottomNav from "@/components/bottomNav";

export default function ProtectedLayoutUI({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "12rem" } as React.CSSProperties}
    >
      <div className="flex h-screen overflow-hidden w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-auto no-scrollbar">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <BottomNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
