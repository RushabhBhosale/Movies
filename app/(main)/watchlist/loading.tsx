"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function WatchlistSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 text-white bg-zinc-900 min-h-screen">
      {/* Header: Tabs and Controls */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Tabs */}
        <div className="w-full md:max-w-[420px] lg:max-w-[550px]">
          <div className="flex overflow-x-auto no-scrollbar">
            <div className="flex gap-2 bg-zinc-800 rounded-lg p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-20 bg-zinc-700 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sort and Grid/List Controls */}
        <div className="flex shrink-0 items-center gap-4 w-full md:w-auto">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 bg-zinc-800 hidden lg:block rounded-lg" />
            <Skeleton className="h-10 w-10 bg-zinc-800 hidden md:block rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full md:w-48 bg-zinc-800 hidden md:block rounded-lg" />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mb-4">
        <Skeleton className="h-10 w-full bg-zinc-800 rounded-lg" />
      </div>

      {/* Mobile Sort Dropdown */}
      <div className="md:hidden mb-4">
        <Skeleton className="h-10 w-full bg-zinc-800 rounded-lg" />
      </div>

      {/* Desktop List View */}
      <div className="hidden lg:block bg-zinc-900 rounded-lg border border-zinc-700">
        {/* Header Row */}
        <div className="bg-zinc-800 px-6 py-4 border-b border-zinc-700 min-w-[800px]">
          <div className="grid grid-cols-12 gap-4 items-center">
            <Skeleton className="col-span-4 h-4 bg-zinc-700" />
            <Skeleton className="col-span-2 h-4 bg-zinc-700" />
            <Skeleton className="col-span-1 h-4 bg-zinc-700" />
            <Skeleton className="col-span-1 h-4 bg-zinc-700" />
            <Skeleton className="col-span-2 h-4 bg-zinc-700" />
            <Skeleton className="col-span-1 h-4 bg-zinc-700" />
            <Skeleton className="col-span-1 h-4 bg-zinc-700" />
          </div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-zinc-700 min-w-[800px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="w-12 h-16 rounded-md bg-zinc-700" />
                  <div className="min-w-0">
                    <Skeleton className="h-4 w-40 bg-zinc-700 mb-2" />
                    <Skeleton className="h-3 w-52 bg-zinc-700" />
                  </div>
                </div>
                <Skeleton className="col-span-2 h-4 bg-zinc-700" />
                <Skeleton className="col-span-1 h-4 bg-zinc-700" />
                <Skeleton className="col-span-1 h-4 bg-zinc-700" />
                <div className="col-span-2 flex flex-col gap-2">
                  <Skeleton className="h-4 w-24 bg-zinc-700" />
                  <Skeleton className="h-1.5 w-full bg-zinc-700 rounded-full" />
                </div>
                <Skeleton className="col-span-1 h-4 w-16 bg-zinc-700 rounded-full" />
                <div className="col-span-1 flex items-center gap-1">
                  <Skeleton className="h-8 w-8 bg-zinc-700 rounded-md" />
                  <Skeleton className="h-8 w-8 bg-zinc-700 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile List View */}
      <div className="lg:hidden space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-3 p-4 bg-zinc-800 rounded-lg">
            <Skeleton className="w-16 h-24 rounded-md bg-zinc-700" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-40 bg-zinc-700 mb-2" />
              <Skeleton className="h-3 w-24 bg-zinc-700 mb-2" />
              <Skeleton className="h-2 w-full bg-zinc-700 rounded-full mb-2" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16 bg-zinc-700" />
                <Skeleton className="h-4 w-20 bg-zinc-700" />
              </div>
            </div>
            <div className="flex flex-col justify-start gap-2">
              <Skeleton className="h-8 w-8 bg-zinc-700 rounded-md" />
              <Skeleton className="h-8 w-8 bg-zinc-700 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
