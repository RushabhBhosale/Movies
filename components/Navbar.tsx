"use client";
import React from "react";
import Search from "./Search";
import { SidebarTrigger } from "./ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { logoutUser } from "@/utils/auth";

const Navbar = () => {
  const { user, loading } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter((seg) => seg)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));

  return (
    <div className="sticky top-0 z-50 h-16 w-full flex items-center justify-between px-6 lg:pr-4 lg:pl-2 py-4 bg-sidebar">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, i) => {
              const href =
                "/" +
                segments
                  .slice(0, i + 1)
                  .join("/")
                  .toLowerCase();

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {i < segments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback>
                {user?.username?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => router.push("/watchlist")}>
              Watchlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/stats")}>
              Stats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
