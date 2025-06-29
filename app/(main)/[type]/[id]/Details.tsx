"use client";
import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { StarIcon, Bookmark } from "lucide-react";
import Image from "next/image";
import {
  CastMember,
  Genre,
  MTV,
  ProductionCompany,
} from "../../../../types/tmdb";
import { getGenreById } from "@/utils/getGenre";
import TrailerButton from "@/components/trailerButton";

interface DetailsPageClientProps {
  type: "movie" | "tv";
  id: string;
  initialData: {
    movie: MTV;
    credits: any;
    videos: any[];
    reviews: any;
    recommendations: any[];
    collection: any;
  };
  genres: Genre[];
}

export default function DetailsPageClient({
  type,
  id,
  initialData,
  genres,
}: DetailsPageClientProps) {
  const { movie, credits, videos, reviews, recommendations, collection } =
    initialData;
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

  const [showFull, setShowFull] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const trailerUrl = videos?.find((video: any) => video.type === "Trailer");
  const title = movie?.name || movie?.title;
  const minSize = 1.75;
  const maxSize = 4.5;
  const titleShrink = title?.length ? title.length * 0.05 : 0;
  const adjustedMax = Math.max(maxSize - titleShrink, minSize);

  const isLongOverview = movie?.overview?.length > 200;
  const displayedOverview = showFull
    ? movie?.overview
    : movie?.overview?.slice(0, 200) + (isLongOverview ? "..." : "");

  const mainCast = credits?.cast?.slice(0, 8) || [];
  const director = credits?.crew?.find(
    (person: any) => person.job === "Director"
  );
  const producers =
    credits?.crew
      ?.filter((person: any) => person.job === "Producer")
      .slice(0, 2) || [];
  const topReviews = reviews?.results?.slice(0, 3) || [];

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative bg-gradient-to-br from-black/90 via-gray-900 to-black">
        {movie?.backdrop_path && (
          <div className="absolute inset-0 opacity-50">
            <Image
              src={`${imageBaseUrl}/original/${movie?.backdrop_path}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>
        )}
        <div className="relative items-center z-10 container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row gap-8">
          <div className="w-[320px] sm:w-[350px] md:w-[600px] lg:w-80 flex-shrink-0">
            {movie?.poster_path ? (
              <div className="aspect-[6/5] md:aspect-[6/2] lg:aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl w-full">
                <Image
                  src={`${imageBaseUrl}/w500/${movie?.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[2/3] w-full bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="text-white/70 text-lg">
              {movie?.first_air_date || movie?.release_date
                ? new Date(
                    movie?.first_air_date || movie?.release_date
                  ).getFullYear()
                : "N/A"}
            </div>
            <h1
              className="font-bold text-white leading-tight"
              style={{
                fontSize: `clamp(${minSize}rem, 2.5vw, ${adjustedMax}rem)`,
              }}
            >
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {movie?.genres
                  ?.slice(0, 3)
                  ?.map((genre: Genre, index: number) => (
                    <span key={index} className="text-white/80 text-sm">
                      {getGenreById(genre.id, genres)}
                      {index < (movie?.genres.length < 3 ? 1 : 2) && ","}
                    </span>
                  ))}
              </div>
              <span className="text-white/80 text-sm">
                {movie?.runtime || movie?.episode_run_time?.[0]} mins
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center text-sm gap-2">
                <span className="text-white/60">RATING</span>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">
                    {Math.round(movie?.vote_average * 10 || 0) / 10}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm gap-2">
                <span className="text-white/60">VOTES</span>
                <span className="text-white font-semibold">
                  {movie?.vote_count?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="text-white/80 text-sm leading-relaxed">
                {displayedOverview}
                {isLongOverview && (
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-white/60 hover:text-white ml-2 underline"
                  >
                    {showFull ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleWatchlistToggle}
                className={`${
                  isInWatchlist
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-white/10 hover:bg-white/20"
                } text-white px-6 py-2 rounded-full border border-white/20 transition-colors duration-300 flex items-center justify-center gap-2`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isInWatchlist ? "fill-current" : ""}`}
                />
                {isInWatchlist ? "In Watchlist" : "Add To Watchlist"}
              </button>
              <TrailerButton trailerUrl={trailerUrl} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {director && (
            <div>
              <h3 className="text-white font-semibold mb-4">Director</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  {director.profile_path ? (
                    <Image
                      src={`${imageBaseUrl}/w500/${director.profile_path}`}
                      alt={director.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{director.name}</p>
                  <p className="text-white/60 text-sm">Director</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4">Details</h3>
            {producers.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-white/60 text-sm w-full sm:w-20 mb-1 sm:mb-0">
                  Producers
                </span>
                <span className="text-white text-sm flex-1">
                  {producers.map((p: any) => p.name).join(", ")}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-white/60 text-sm w-full sm:w-20 mb-1 sm:mb-0">
                Type
              </span>
              <span className="text-white text-sm capitalize flex-1">
                {type}
              </span>
            </div>
            {movie?.production_companies?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-white/60 text-sm w-full sm:w-20 mb-1 sm:mb-0">
                  Studio
                </span>
                <span className="text-white text-sm flex-1">
                  {movie?.production_companies[0].name}
                </span>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-white font-semibold mb-4">Main Cast</h3>
        <div className="flex overflow-x-auto gap-10">
          {mainCast.map((actor: any) => (
            <div key={actor.id} className="text-center flex-shrink-0">
              <div className="relative size-16 md:size-24 lg:size-32 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                {actor.profile_path ? (
                  <Image
                    src={`${imageBaseUrl}/original/${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    sizes="500px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <p className="text-white text-xs font-medium mb-1 leading-tight max-w-[80px]">
                  {actor.name}
                </p>
                <p className="text-white/60 text-xs leading-tight max-w-[80px]">
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-white font-semibold mb-4">You Might Also Like</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {recommendations?.length > 0 ? (
              recommendations
                .slice(0, 10)
                .map((item: any) => <MovieCard key={item.id} movie={item} />)
            ) : (
              <div className="text-white/60">No recommendations available</div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-white font-semibold mb-4">Reviews</h3>
        {topReviews.length > 0 ? (
          <div className="space-y-4 lg:space-y-6">
            {topReviews.map((review: any) => (
              <div key={review.id} className="bg-white/5 rounded-lg p-4 lg:p-6">
                <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                    {review.author_details?.avatar_path ? (
                      <Image
                        src={
                          review.author_details.avatar_path.startsWith("/https")
                            ? review.author_details.avatar_path.slice(1)
                            : `${imageBaseUrl}/w500/${review.author_details.avatar_path}`
                        }
                        alt={review.author}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <p className="text-white font-medium truncate">
                        {review.author}
                      </p>
                      {review.author_details?.rating && (
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white/60 text-sm">
                            {review.author_details.rating}/10
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mb-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {review.content.length > 300
                        ? review.content.slice(0, 300) + "..."
                        : review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white/60">No reviews available</div>
        )}
      </section>

      {type === "tv" && movie?.seasons && (
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-white font-semibold mb-4">Seasons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movie?.seasons.map((season: any) => (
              <div key={season.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="relative w-12 h-18 lg:w-16 lg:h-24 flex-shrink-0 rounded overflow-hidden bg-gray-700">
                    {season.poster_path ? (
                      <Image
                        src={`${imageBaseUrl}/w500${season.poster_path}`}
                        alt={season.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-2 leading-tight">
                      {season.name}
                    </p>
                    <p className="text-white/60 text-sm mb-1">
                      {season.episode_count} episodes
                    </p>
                    {season.air_date && (
                      <p className="text-white/60 text-sm">
                        {new Date(season.air_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {type === "movie" && collection && (
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-white font-semibold mb-4">{collection.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {collection.parts
              ?.sort(
                (a: any, b: any) =>
                  new Date(a.release_date).getTime() -
                  new Date(b.release_date).getTime()
              )
              .map((item: any) => (
                <MovieCard key={item.id} movie={movie} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
