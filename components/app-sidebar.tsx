import * as React from "react";
import { RefreshCcw } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Movies",
      url: "#",
      items: [
        { title: "Now Playing", url: "/movies/now-playing" },
        { title: "Top Rated", url: "/movies/top-rated" },
        { title: "Genres", url: "/movies/genres" },
      ],
    },
    {
      title: "TV Shows",
      url: "#",
      items: [
        { title: "Trending", url: "/tv/trending", isActive: true },
        { title: "K-Dramas", url: "/tv/kdramas" },
        { title: "Anime", url: "/tv/anime" },
      ],
    },
    {
      title: "Watchlist",
      url: "#",
      items: [
        { title: "Plan to Watch", url: "/watchlist/plan-to-watch" },
        { title: "Watching", url: "/watchlist/watching" },
        { title: "Completed", url: "/watchlist/completed" },
        { title: "Dropped", url: "/watchlist/dropped" },
      ],
    },
    {
      title: "Reviews",
      url: "#",
      items: [
        { title: "My Reviews", url: "/reviews/mine" },
        { title: "All Reviews", url: "/reviews/all" },
      ],
    },
    {
      title: "Discover",
      url: "#",
      items: [
        { title: "Upcoming", url: "/discover/upcoming" },
        { title: "Genres", url: "/discover/genres" },
        { title: "Random Pick", url: "/discover/random" },
      ],
    },
    {
      title: "Profile",
      url: "#",
      items: [
        { title: "Stats", url: "/profile/stats" },
        { title: "Settings", url: "/profile/settings" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <RefreshCcw className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Show Sync</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
