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

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 h-12 w-full flex items-center justify-between px-6 lg:pr-4 lg:pl-2 py-4 bg-black">
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
        <div className="relative hidden sm:block bg-transparent">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
