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
    <div className="sm:h-12 flex sm:my-2 mt-5 sm:mt-2 items-center justify-between px-6 lg:pr-4 lg:pl-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
