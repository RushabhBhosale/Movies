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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navItems = [
  {
    items: [
      { title: "Home", url: "/home", icon: Home },
      { title: "Browse", url: "/browse", icon: Film },
      { title: "Watchlist", url: "/watchlist", icon: BookmarkIcon },
      { title: "Favorites", url: "/favorites", icon: Heart },
      { title: "Search", url: "/search", icon: Search },
      { title: "Profile", url: "/profile", icon: User },
    ],
  },
];

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { user, loading }: any = useUserStore();
  const pathname = usePathname();

  const profile = {
    name: user?.name || "Guest",
    email: user?.email || "",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 mt-2">
          <FilmIcon />
          Watch Pro
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        {navItems.map((group) => (
          <SidebarMenu key={group.items[0].title}>
            {group.items.map((item) => {
              const isActive = pathname.startsWith(item.url);
              return (
                <SidebarMenuItem className="py-1" key={item.title}>
                  <SidebarMenuButton asChild className="p-5">
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 px-2 rounded-md ${
                        isActive
                          ? "bg-muted text-white"
                          : "text-muted-foreground"
                      }`}
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
