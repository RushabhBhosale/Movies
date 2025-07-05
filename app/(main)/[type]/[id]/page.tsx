import { Suspense } from "react";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { fetchTmdbGenres } from "@/hooks/useTmdbGenres";
import DetailsPageClient from "./Details";

interface PageProps {
  params: Promise<{ type: "movie" | "tv"; id: string }>;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row gap-8">
        <div className="w-80 flex-shrink-0">
          <div className="aspect-[2/3] w-full bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
          <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DetailsPage({ params }: PageProps) {
  const { type, id } = await params;
  const genres = await fetchTmdbGenres();
  const movie = await fetchTmdbData(
    `/${type}/${id}?append_to_response=credits,videos,reviews,recommendations`
  );

  const credits = movie.credits;
  const videos = movie.videos.results;
  const reviews = movie.reviews.results;
  const recommendations = movie.recommendations.results;

  let collection = null;
  if (movie?.belongs_to_collection?.id) {
    const collectionId = movie.belongs_to_collection.id;
    collection = await fetchTmdbData(`/collection/${collectionId}`);
  }
  console.log("movie", movie);

  const initialData = {
    movie: movie,
    credits,
    videos,
    reviews,
    recommendations,
    collection,
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DetailsPageClient
        type={type}
        id={id}
        initialData={initialData}
        genres={genres}
      />
    </Suspense>
  );
}
