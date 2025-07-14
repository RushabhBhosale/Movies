"use client";

import * as React from "react";
import { useUserStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Home,
  Film,
  BookmarkIcon,
  Heart,
  Search,
  User,
  FilmIcon,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { NAVITEMS } from "@/utils/options";

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { user, loading }: any = useUserStore();
  const pathname = usePathname();

  const profile = {
    name: user?.username || "Guest",
    email: user?.email || "",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 mt-2">
          <FilmIcon />
          CineTrack
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        {NAVITEMS.map((group) => (
          <SidebarMenu key={group.items[0].title}>
            {group.items.map((item) => {
              const isActive = pathname.startsWith(item.url);
              return (
                <SidebarMenuItem
                  className={`py-1 ${item.mobile ? "md:hidden" : ""}`}
                  key={item.title}
                >
                  <SidebarMenuButton asChild className="p-5">
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 px-2 rounded-md ${
                        isActive
                          ? "bg-muted text-white"
                          : "text-muted-foreground"
                      } `}
                    >
                      <item.icon className={`w-4 h-4 mt-0.5`} />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
