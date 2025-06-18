import Image from "next/image";
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Search from "./Search";

const Navbar = ({ toggle }: any) => {
  return (
    <div className="sm:h-12 flex sm:my-2 mt-5 sm:mt-2 items-center justify-between px-6 lg:px-16">
      <button className="toggle-btn sm:hidden" onClick={toggle}>
        <Bars3Icon className="w-6 h-6" />
      </button>
      <Link href="/">
        <Image src={`/logo.png`} alt="logo" width={120} height={45} />
      </Link>
      <div className="relative">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
