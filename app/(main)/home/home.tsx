"use client";
import Carousel from "@/components/Carousel";
import MovieCard from "@/components/MovieCard";
import { MTV } from "@/types/tmdb";
import { imageBaseUrl } from "@/utils/options";
import {
  CheckCheck,
  Clock,
  Pause,
  Play,
  Star,
  TrendingUp,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomeProps {
  trending: MTV[];
  upcoming: MTV[];
  popular: MTV[];
  watchlist: any;
  stats: any;
  user: any;
  genres: any;
  recs: any;
  latest: any;
}

export default function Home({
  trending,
  upcoming,
  popular,
  watchlist,
  stats,
  user,
  genres,
  recs,
  latest,
}: HomeProps) {
  const [watching, setWatching] = useState<any>([]);
  const stat = stats.stats;
  const statsData = [
    {
      icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Hours",
      fullLabel: "Total Hours",
      value: stats.totalHoursWatched,
      color: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      gradient: "from-blue-500/20 to-blue-600/5",
    },
    {
      icon: <Star className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Avg",
      fullLabel: "Avg Rating",
      value: stats.avgRating,
      color: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      gradient: "from-purple-500/20 to-purple-600/5",
    },
    {
      icon: <Play className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Watching",
      fullLabel: "Currently Watching",
      value: stat.watching,
      color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      gradient: "from-indigo-500/20 to-indigo-600/5",
    },
    {
      icon: <CheckCheck className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Done",
      fullLabel: "Completed",
      value: stat.completed,
      color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      gradient: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: <Pause className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Hold",
      fullLabel: "On Hold",
      value: stat.onHold,
      color: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      gradient: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: <XCircleIcon className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Dropped",
      fullLabel: "Dropped",
      value: stat.dropped,
      color: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      gradient: "from-rose-500/20 to-rose-600/5",
    },
  ];

  useEffect(() => {
    if (watchlist) {
      const res = watchlist.filter((movie: MTV) => movie.status === "Watching");
      setWatching(res);
    }
  }, [watchlist]);
  return (
    <div className="p-3 bg-zinc-900">
      <div className="px-4 pt-2 pb-1 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, {user?.username || "User"}
            </h1>
            <p className="text-zinc-400 mt-1">
              Continue your entertainment journey
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-zinc-700/50">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">
                {stats.totalHoursWatched}h watched this month
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4  mb-3">
        {statsData.map((item, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${item.color}  cursor-pointer group`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0`}
            />
            <div className="relative p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-base font-semibold">{item.value}</span>
                </div>
              </div>
              <div className="text-xs text-accent-foreground font-bold">
                {item.fullLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
          {statsData.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 border ${item.color} backdrop-blur-sm rounded-full px-4 py-2 text-sm whitespace-nowrap shadow-lg`}
            >
              {item.icon}
              <span className="font-bold">{item.value}</span>
              <span className="opacity-70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="md:flex-[80%] overflow-hidden">
          <div className="flex flex-col gap-6">
            <div>
              <Carousel tv={popular} genres={genres} />
            </div>
            <div>
              <div className="flex gap-3 no-scrollbar overflow-auto">
                {watching.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                      <h2 className="text-2xl font-bold text-white">
                        Continue Watching
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-2 px-2">
                      {watching.map((movie: any, index: number) => (
                        <div key={index} className="flex-shrink-0">
                          <MovieCard
                            movie={movie.details}
                            status={movie.status}
                            eps={movie.globalEpisodeNo}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {recs.length > 1 && (
              <div>
                <div className="flex gap-3 no-scrollbar overflow-auto">
                  {watching.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 hidden md:block bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                        <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white truncate max-w-[330px] md:max-w-[800px] lg:max-w-[1000px]">
                          Because you watched{" "}
                          {latest.details.name || latest.details.title}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
                      </div>

                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-2 px-2">
                        {recs.map((movie: any, index: number) => (
                          <div key={index} className="flex-shrink-0">
                            <MovieCard movie={movie} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <h2 className="text-2xl font-bold text-white">
                  Upcoming Releases
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4  no-scrollbar -mx-2 px-2">
                {upcoming.map((movie: any, index: number) => (
                  <div key={index} className="flex-shrink-0">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block md:flex-[20%] overflow-hidden">
          <div className="flex flex-col gap-3">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden">
              <div className="p-4 border-b border-zinc-700/50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <h3 className="font-bold text-white">Trending Now</h3>
                </div>
              </div>

              <div className="p-2 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                {trending.slice(0, 8).map((movie, index) => (
                  <Link
                    key={index}
                    href={`/${movie.title ? "movie" : "tv"}/${movie.id}`}
                    className="flex items-center gap-3 hover:bg-zinc-700/50 rounded-lg p-2 transition-all duration-200 group"
                  >
                    <div className="relative w-10 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        fill
                        alt="poster"
                        src={
                          movie?.poster_path
                            ? `${imageBaseUrl}/w500/${movie.poster_path}`
                            : "/no-image.png"
                        }
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="40px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate leading-tight">
                        {(movie.name || movie.title)?.slice(0, 30)}
                      </p>
                      <div className="flex items-center text-xs text-zinc-400 gap-1 mt-1">
                        <span>
                          {movie.release_date || movie.first_air_date
                            ? new Date(
                                movie.release_date || movie.first_air_date
                              ).getFullYear()
                            : "N/A"}
                        </span>
                        <span>•</span>
                        <span>{movie.title ? "Movie" : "TV"}</span>
                        {movie.vote_average && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden">
              <div className="p-4 border-b border-zinc-700/50">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white">Popular This Week</h3>
                </div>
              </div>

              <div className="p-2 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                {popular.slice(0, 8).map((movie, index) => (
                  <Link
                    key={index}
                    href={`/${movie.title ? "movie" : "tv"}/${movie.id}`}
                    className="flex items-center gap-3 hover:bg-zinc-700/50 rounded-lg p-2 transition-all duration-200 group"
                  >
                    <div className="relative w-10 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        fill
                        alt="poster"
                        src={
                          movie?.poster_path
                            ? `${imageBaseUrl}/w500/${movie.poster_path}`
                            : "/no-image.png"
                        }
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="40px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate leading-tight">
                        {(movie.name || movie.title)?.slice(0, 30)}
                      </p>
                      <div className="flex items-center text-xs text-zinc-400 gap-1 mt-1">
                        <span>
                          {movie.release_date || movie.first_air_date
                            ? new Date(
                                movie.release_date || movie.first_air_date
                              ).getFullYear()
                            : "N/A"}
                        </span>
                        <span>•</span>
                        <span>{movie.title ? "Movie" : "TV"}</span>
                        {movie.vote_average && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden">
              <div className="p-4 border-b border-zinc-700/50">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white">Recently Added</h3>
                </div>
              </div>

              <div className="p-2 space-y-1  overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                {watchlist.slice(0, 10).map((movie: any, index: number) => (
                  <Link
                    key={index}
                    href={`/${movie.details.title ? "movie" : "tv"}/${
                      movie.details.id
                    }`}
                    className="flex items-center gap-3 hover:bg-zinc-700/50 rounded-lg p-2 transition-all duration-200 group"
                  >
                    <div className="relative w-10 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        fill
                        alt="poster"
                        src={
                          movie.details?.poster_path
                            ? `${imageBaseUrl}/w500/${movie.details.poster_path}`
                            : "/no-image.png"
                        }
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="40px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate leading-tight">
                        {(movie.details.name || movie.details.title)?.slice(
                          0,
                          30
                        )}
                      </p>
                      <div className="flex items-center text-xs text-zinc-400 gap-1 mt-1">
                        <span>
                          {movie.details.release_date ||
                          movie.details.first_air_date
                            ? new Date(
                                movie.details.release_date ||
                                  movie.details.first_air_date
                              ).getFullYear()
                            : "N/A"}
                        </span>
                        <span>•</span>
                        <span>{movie.details.title ? "Movie" : "TV"}</span>
                        {movie.details.vote_average && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span>
                                {movie.details.vote_average.toFixed(1)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
