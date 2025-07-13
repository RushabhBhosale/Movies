"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingSkeleton() {
  return (
    <div className="p-3">
      {/* Title */}
      <Skeleton className="h-8 w-48 bg-zinc-800 mb-4" />

      {/* Movie Cards Grid */}
      <div className="flex flex-wrap gap-3 justify-evenly lg:justify-start">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="my-0.5">
            <div className="w-40 sm:w-44 md:w-48">
              <Skeleton className="h-60 sm:h-64 md:h-72 w-full bg-zinc-800 rounded-lg mb-2" />
              <Skeleton className="h-4 w-3/4 bg-zinc-800 mb-1" />
              <Skeleton className="h-3 w-1/2 bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
