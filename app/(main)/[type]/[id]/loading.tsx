import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black/90 via-gray-900 to-black">
        <div className="absolute inset-0 opacity-50">
          <Skeleton className="w-full h-full bg-gray-800" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-[320px] sm:w-[350px] md:w-[600px] lg:w-80 flex-shrink-0">
            <div className="aspect-[6/5] md:aspect-[6/2] lg:aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl w-full">
              <Skeleton className="w-full h-full bg-gray-700" />
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-6">
            {/* Year */}
            <Skeleton className="h-6 w-20 bg-gray-700" />

            {/* Title */}
            <Skeleton className="h-12 w-3/4 bg-gray-700" />

            {/* Genres and Runtime */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-20 bg-gray-700" />
                <Skeleton className="h-4 w-18 bg-gray-700" />
              </div>
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>

            {/* Rating and Votes */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12 bg-gray-700" />
                <Skeleton className="h-4 w-8 bg-gray-700" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
            </div>

            {/* Overview */}
            <div className="max-w-2xl space-y-2">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-40 bg-gray-700 rounded-full" />
              <Skeleton className="h-10 w-32 bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Director and Details Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Director */}
          <div>
            <Skeleton className="h-6 w-20 bg-gray-700 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-700" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-700" />
                <Skeleton className="h-3 w-20 bg-gray-700" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-16 bg-gray-700 mb-4" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Skeleton className="h-4 w-20 bg-gray-700" />
              <Skeleton className="h-4 w-40 bg-gray-700" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Skeleton className="h-4 w-12 bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Skeleton className="h-4 w-16 bg-gray-700" />
              <Skeleton className="h-4 w-32 bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Main Cast */}
        <Skeleton className="h-6 w-24 bg-gray-700 mb-4" />
        <div className="flex overflow-x-auto gap-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="text-center flex-shrink-0">
              <Skeleton className="size-16 md:size-24 lg:size-32 mx-auto mb-2 rounded-full bg-gray-700" />
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-3 w-16 bg-gray-700" />
                <Skeleton className="h-3 w-12 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-40 bg-gray-700 mb-4" />
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <Skeleton className="w-40 h-60 bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-20 bg-gray-700 mb-4" />
        <div className="space-y-4 lg:space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 lg:p-6">
              <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-700 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <Skeleton className="h-4 w-24 bg-gray-700" />
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                  <Skeleton className="h-3 w-20 bg-gray-700" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-4 w-2/3 bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasons Section (TV Shows) */}
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-20 bg-gray-700 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex gap-4">
                <Skeleton className="w-12 h-18 lg:w-16 lg:h-24 flex-shrink-0 rounded bg-gray-700" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                  <Skeleton className="h-3 w-24 bg-gray-700" />
                  <Skeleton className="h-3 w-16 bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Section (Movies) */}
      <section className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-40 bg-gray-700 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Skeleton className="w-full aspect-[2/3] bg-gray-700 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
