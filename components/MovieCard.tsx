import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
}

interface MovieCardProps {
  movie: Movie;
  status: string;
  isInWatchlist?: boolean;
  onWatchlistToggle?: (movieId: number, isAdded: boolean) => void;
  watchedEpisodes?: number;
  totalEpisodes?: number;
}

const MovieCard = ({
  movie,
  status,
  isInWatchlist = false,
  onWatchlistToggle,
  watchedEpisodes = 0,
  totalEpisodes,
}: MovieCardProps) => {
  const [isWatchlisted, setIsWatchlisted] = useState(isInWatchlist);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isWatchlisted;
    setIsWatchlisted(newState);
    onWatchlistToggle?.(movie.id, newState);
  };

  const movieTitle = movie?.title || movie?.name || "Unknown Title";
  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie?.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : "N/A";

  const isTvShow = !movie?.title && movie?.name;
  const episodes = totalEpisodes || movie?.number_of_episodes || 0;
  const progressPercentage =
    episodes > 0 ? (watchedEpisodes / episodes) * 100 : 0;

  return (
    <div className="relative w-52 rounded-lg overflow-hidden shadow-lg border-[0.5px] border-white/20">
      <Link
        href={`/${movie?.title ? "movie" : "tv"}/${movie?.id}`}
        className="block"
      >
        <img
          className="w-full h-80 object-cover"
          src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
          alt={movieTitle}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-tight">
            {movieTitle}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {movie?.vote_average?.toFixed(1) || "N/A"}
              </span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {releaseYear}
            </span>
          </div>

          {isTvShow && episodes > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Episodes</span>
                <span>
                  {watchedEpisodes}/{episodes}
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-1.5 bg-white/20"
              />
              <div className="text-xs text-center">
                {progressPercentage.toFixed(0)}% Complete
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Stickers & Buttons OUTSIDE the Link */}
      <Badge
        variant="secondary"
        className="absolute top-3 right-3 text-xs bg-black/70 text-white border-0 z-10"
      >
        {status}
      </Badge>

      <Button
        variant="secondary"
        size="icon"
        onClick={handleWatchlistClick}
        className="absolute top-3 left-3 h-8 w-8 bg-black/70 border-0 hover:bg-black/80 z-10"
        aria-label={
          isWatchlisted ? "Remove from watchlist" : "Add to watchlist"
        }
      >
        {isWatchlisted ? (
          <BookmarkCheck className="h-4 w-4 text-yellow-400" />
        ) : (
          <Bookmark className="h-4 w-4 text-white" />
        )}
      </Button>
    </div>
  );
};

export default MovieCard;
