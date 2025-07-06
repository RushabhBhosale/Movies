"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Star,
  Edit,
  Plus,
  Clock,
  Tv,
  ChevronDown,
  ArrowUpDown,
  Grid,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import EditModal from "@/components/EditModal";
import { SORTOPTIONS, STATUSES } from "@/utils/options";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { MTV } from "@/types/tmdb";
import MovieCard from "@/components/MovieCard";
import { useIsMobile } from "@/hooks/use-mobile";

const Watchlist = () => {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [grid, setGrid] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (session?.user.id) fetchData();
  }, [session]);

  useEffect(() => {
    let data = [...watchlist];
    if (activeTab !== "All") data = data.filter((w) => w.status === activeTab);
    if (search) {
      data = data.filter(
        (w) =>
          w.details?.title?.toLowerCase().includes(search.toLowerCase()) ||
          w.details?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "rating":
          aValue = a.details?.vote_average || 0;
          bValue = b.details?.vote_average || 0;
          break;
        case "title":
          aValue = (a.details?.title || a.details?.name || "").toLowerCase();
          bValue = (b.details?.title || b.details?.name || "").toLowerCase();
          break;
        case "year":
          aValue = parseInt(
            a.details?.release_date?.slice(0, 4) ||
              a.details?.first_air_date?.slice(0, 4) ||
              "0"
          );
          bValue = parseInt(
            b.details?.release_date?.slice(0, 4) ||
              b.details?.first_air_date?.slice(0, 4) ||
              "0"
          );
          break;
        case "dateAdded":
        default:
          aValue = new Date(a.dateAdded || a.createdAt || 0);
          bValue = new Date(b.dateAdded || b.createdAt || 0);
          break;
      }
      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
    setFiltered(data);
  }, [watchlist, activeTab, search, sortBy, sortOrder]);

  const fetchData = async () => {
    const res = await fetch(`/api/watchlist?userId=${session?.user.id}`);
    const data = await res.json();
    setWatchlist(data.watchlist || []);
  };

  const formatRuntime = (minutes: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressInfo = (movie: any) => {
    const isTV = !!movie.details.name;
    if (isTV) {
      const watchedEpisodes = movie.watchedEpisodes || 0;
      const totalEpisodes = movie.details.number_of_episodes || 0;
      const percent =
        totalEpisodes > 0 ? (watchedEpisodes / totalEpisodes) * 100 : 0;
      return {
        text: `${watchedEpisodes}/${totalEpisodes} episodes`,
        percent,
        icon: <Tv size={14} className="text-blue-400" />,
        showProgress: true,
      };
    } else {
      return {
        text: formatRuntime(movie.details.runtime),
        icon: <Clock size={14} className="text-green-400" />,
        showProgress: false,
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 text-white">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <Tabs
          className="w-full"
          defaultValue="All"
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto no-scrollbar">
            <TabsList className="flex w-max bg-zinc-800">
              {STATUSES.map((status) => (
                <TabsTrigger
                  key={status.id}
                  value={status.name}
                  className="text-sm px-4 py-3 whitespace-nowrap"
                >
                  {status.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        <Toggle
          className="hidden sm:block"
          size="lg"
          pressed={grid}
          onPressedChange={setGrid}
        >
          <Grid />
        </Toggle>
        <div className="flex flex-col shrink-0 md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors w-full md:w-auto"
            >
              <ArrowUpDown size={16} />
              <span className="text-sm">
                Sort by {SORTOPTIONS.find((opt) => opt.value === sortBy)?.label}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showSortDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 min-w-48">
                {SORTOPTIONS.map((option) => (
                  <Button
                    variant="ghost"
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full justify-start ${
                      sortBy === option.value ? "bg-zinc-700" : "text-gray-300"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
                <div className="border-t border-zinc-700 mt-1 pt-1">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      setShowSortDropdown(false);
                    }}
                    className="w-full justify-start"
                  >
                    {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-900 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-zinc-700 focus:outline-none focus:border-zinc-500"
              placeholder="Search by title..."
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg">No items found.</p>
        </div>
      ) : (
        <>
          {grid && !isMobile ? (
            <div className="flex flex-wrap gap-4 my-4">
              {filtered.map((movie: any, index) => (
                <MovieCard movie={movie.details} status={movie.status} />
              ))}
            </div>
          ) : (
            <div className="hidden lg:block bg-zinc-900 rounded-lg border border-zinc-700 overflow-x-auto">
              <div className="bg-zinc-800 px-6 py-4 border-b border-zinc-700 min-w-[800px]">
                <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-300">
                  <div className="col-span-4">Title</div>
                  <div className="col-span-2">Genre</div>
                  <div className="col-span-1">Rating</div>
                  <div className="col-span-1">Year</div>
                  <div className="col-span-2">Runtime/Episodes</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>

              <div className="divide-y divide-zinc-700 min-w-[800px]">
                {filtered.map((movie) => {
                  const progressInfo = getProgressInfo(movie);
                  return (
                    <div
                      key={movie._id}
                      className="px-6 py-4 hover:bg-zinc-800 transition-colors duration-200"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <Link
                            href={`/${movie.details.name ? "tv" : "movie"}/${
                              movie.details.id
                            }`}
                          >
                            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                              <img
                                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w92/${movie.details.poster_path}`}
                                alt="poster"
                                className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h3 className="font-semibold text-white truncate">
                                  {movie.details.title || movie.details.name}
                                </h3>
                                <p className="text-xs text-gray-400 truncate max-w-52">
                                  {movie.details.tagline ||
                                    movie.details.overview}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col-span-2 text-sm text-gray-300 truncate">
                          {movie.details.genres
                            ?.slice(0, 2)
                            .map((g: any) => g.name)
                            .join(", ") || "N/A"}
                        </div>
                        <div className="col-span-1 flex items-center gap-1 text-sm text-gray-300">
                          <Star className="text-yellow-400" size={14} />
                          {movie.details.vote_average?.toFixed(1) || "N/A"}
                        </div>
                        <div className="col-span-1 text-sm text-gray-300">
                          {movie.details.release_date?.slice(0, 4) ||
                            movie.details.first_air_date?.slice(0, 4) ||
                            "N/A"}
                        </div>
                        <div className="col-span-2 flex flex-col">
                          <div className="text-sm flex items-center gap-2 text-gray-300">
                            {progressInfo.icon}
                            {progressInfo.text}
                          </div>
                          {progressInfo.showProgress && (
                            <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progressInfo.percent}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-span-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium bg-white/10`}
                          >
                            {movie.status}
                          </span>
                        </div>
                        <div className="col-span-1 flex items-center gap-1">
                          <EditModal movie={movie} />
                          {!movie.details.runtime && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="size-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="lg:hidden space-y-0">
            {filtered.map((movie) => {
              const isTV = !!movie.details.name;
              const watchedEpisodes = movie.watchedEpisodes || 0;
              const totalEpisodes = movie.details.number_of_episodes || 0;
              const progressPercent =
                isTV && totalEpisodes > 0
                  ? (watchedEpisodes / totalEpisodes) * 100
                  : 0;

              return (
                <div
                  key={movie._id}
                  className="flex gap-3 my-4 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w92/${movie.details.poster_path}`}
                      alt="poster"
                      className="w-16 h-full rounded-md object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-medium text-white text-sm leading-tight mb-1">
                            {movie.details.title || movie.details.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {isTV ? "TV" : "Movie"},{" "}
                            {movie.details.release_date?.slice(0, 4) ||
                              movie.details.first_air_date?.slice(0, 4) ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-400" size={14} />
                            <span className="text-sm text-gray-300">
                              {movie.details.vote_average?.toFixed(1) || "N/A"}
                            </span>
                          </div>

                          {isTV ? (
                            <span className="text-sm text-gray-300">
                              {watchedEpisodes} / {totalEpisodes || "??"} ep
                            </span>
                          ) : (
                            <span className="text-sm text-gray-300">
                              {formatRuntime(movie.details.runtime)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex flex-col ${
                      movie.details.runtime ? "justify-start" : "justify-around"
                    }`}
                  >
                    <EditModal movie={movie} />
                    {!movie.details.runtime && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
