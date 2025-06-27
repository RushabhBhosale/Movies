// app/movie/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <Skeleton className="h-10 w-1/2 bg-gray-800" />
      <Skeleton className="h-96 w-full bg-gray-800" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3 bg-gray-700" />
        <Skeleton className="h-4 w-3/4 bg-gray-700" />
        <Skeleton className="h-4 w-full bg-gray-700" />
      </div>
    </div>
  );
}
