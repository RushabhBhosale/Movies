"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookmarkIcon,
  BookOpen,
  Bot,
  Clock,
  Command,
  Film,
  Flame,
  Frame,
  GalleryVerticalEnd,
  Heart,
  Home,
  Map,
  PieChart,
  Search,
  Settings2,
  Shield,
  SquareTerminal,
  Star,
  Tags,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "rushabh",
    email: "rushabh@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "My Watchlist",
      logo: BookmarkIcon,
      plan: "Personal",
    },
    {
      name: "Favorites",
      logo: Heart,
      plan: "All-time",
    },
    {
      name: "Watch Later",
      logo: Clock,
      plan: "Pending",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Trending",
      url: "/trending",
      icon: Flame,
      items: [
        {
          title: "Movies",
          url: "/trending/movie",
        },
        {
          title: "TV Shows",
          url: "/trending/tv",
        },
      ],
    },
    {
      title: "Genres",
      url: "/genres",
      icon: Tags,
      items: [
        {
          title: "Action",
          url: "/genres/action",
        },
        {
          title: "Comedy",
          url: "/genres/comedy",
        },
        {
          title: "Horror",
          url: "/genres/horror",
        },
        {
          title: "Sci-Fi",
          url: "/genres/scifi",
        },
      ],
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
      items: [],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      items: [
        {
          title: "My Watchlist",
          url: "/profile/watchlist",
        },
        {
          title: "Account Settings",
          url: "/profile/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Marvel Universe",
      url: "/collections/marvel",
      icon: Shield,
    },
    {
      name: "Christopher Nolan Films",
      url: "/collections/nolan",
      icon: Film,
    },
    {
      name: "Top IMDB Picks",
      url: "/collections/imdb",
      icon: Star,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-2">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
