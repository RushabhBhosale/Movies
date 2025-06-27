"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Home, Film, BookmarkIcon, Heart, Search } from "lucide-react";
import { NavUser } from "@/components/nav-user";

const navItems = [
  {
    group: "Explore",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Browse", url: "/browse", icon: Film },
      { title: "Watchlist", url: "/watchlist", icon: BookmarkIcon },
      { title: "Favorites", url: "/favorites", icon: Heart },
      { title: "Search", url: "/search", icon: Search },
    ],
  },
];

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mt-2" />
      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
