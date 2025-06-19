"use client";
import Link from "next/link";
import { Home, Search, Bookmark } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#111] text-white h-14 border-t border-neutral-800 sm:hidden">
      <Link href="/" className="flex flex-col items-center text-xs">
        <Home className="w-5 h-5" />
        Home
      </Link>
      <Link href="/browse" className="flex flex-col items-center text-xs">
        <Search className="w-5 h-5" />
        Search
      </Link>
      <Link href="/watchlist" className="flex flex-col items-center text-xs">
        <Bookmark className="w-5 h-5" />
        Watchlist
      </Link>
    </div>
  );
}
