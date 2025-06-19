"use client";
import React from "react";
import Search from "./Search";
import { SidebarTrigger } from "./ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="sm:h-12 flex sm:my-2 mt-5 sm:mt-2 items-center justify-between px-6 lg:pr-4 lg:pl-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden lg:block">
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search width={96} />
        </div>

        <Button
          variant="outline"
          className="text-sm"
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
