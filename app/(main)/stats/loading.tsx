"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <Skeleton className="h-8 w-48 sm:w-64 md:w-80 bg-zinc-800 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 sm:w-80 md:w-96 bg-zinc-800 mx-auto" />
        </div>

        {/* Summary Cards */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-zinc-900 border-none p-2 sm:p-3">
              <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800 mb-2" />
              <Skeleton className="h-3 w-24 bg-zinc-800 mb-1" />
              <div className="flex items-baseline gap-1">
                <Skeleton className="h-5 w-16 bg-zinc-800" />
                <Skeleton className="h-3 w-12 bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Pie Charts */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-zinc-900 border-none h-full">
              <div className="p-4">
                <Skeleton className="h-4 w-32 bg-zinc-800 mb-2" />
              </div>
              <div className="p-2">
                <Skeleton className="h-56 sm:h-64 w-full bg-zinc-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Genre Breakdown */}
        <div className="mb-6 h-full">
          <div className="bg-zinc-900 border-none h-full">
            <div className="p-4">
              <Skeleton className="h-4 w-32 bg-zinc-800 mb-2" />
            </div>
            <div className="p-2">
              <Skeleton className="h-56 sm:h-64 w-full bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
