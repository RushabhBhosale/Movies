"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="p-3 bg-zinc-900">
      <div className="px-4 pt-2 pb-1 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48 md:w-64 bg-zinc-800" />
            <Skeleton className="h-4 w-32 md:w-48 bg-zinc-800 mt-2" />
          </div>
          <div className="hidden md:block">
            <Skeleton className="h-10 w-64 bg-zinc-800 rounded-full" />
          </div>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-zinc-800/50 p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 bg-zinc-700" />
                <Skeleton className="h-5 w-16 bg-zinc-700" />
              </div>
            </div>
            <Skeleton className="h-4 w-24 bg-zinc-700" />
          </div>
        ))}
      </div>

      <div className="md:hidden px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-4 py-2 bg-zinc-800/50"
            >
              <Skeleton className="h-5 w-5 bg-zinc-700" />
              <Skeleton className="h-4 w-12 bg-zinc-700" />
              <Skeleton className="h-4 w-16 bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="md:flex-[80%] overflow-hidden">
          <div className="flex flex-col gap-6">
            <div>
              <Skeleton className="h-64 md:h-96 w-full bg-zinc-800 rounded-xl" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <Skeleton className="h-6 w-48 bg-zinc-800" />
                <Skeleton className="flex-1 h-px bg-zinc-700" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Skeleton className="h-64 w-40 bg-zinc-800 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <Skeleton className="h-6 w-64 bg-zinc-800" />
                <Skeleton className="flex-1 h-px bg-zinc-700" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Skeleton className="h-64 w-40 bg-zinc-800 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <Skeleton className="h-6 w-48 bg-zinc-800" />
                <Skeleton className="flex-1 h-px bg-zinc-700" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Skeleton className="h-64 w-40 bg-zinc-800 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block md:flex-[20%] overflow-hidden">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50"
              >
                <div className="p-4 border-b border-zinc-700/50">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 bg-zinc-700" />
                    <Skeleton className="h-5 w-32 bg-zinc-700" />
                  </div>
                </div>
                <div className="p-2 space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-3 p-2">
                      <Skeleton className="h-14 w-10 bg-zinc-700 rounded-lg" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-40 bg-zinc-700" />
                        <Skeleton className="h-3 w-32 bg-zinc-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
