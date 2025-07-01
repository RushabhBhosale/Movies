"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Grid3X3, Search, Star } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const statuses = [
  "All",
  "Watching",
  "Completed",
  "Plan to Watch",
  "On-Hold",
  "Dropped",
];

const Watchlist = () => {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [view, setView] = useState("grid");
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (session?.user.id) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    let data = [...watchlist];
    if (activeTab !== "All") data = data.filter((w) => w.status === activeTab);
    if (search) {
      data = data.filter((w) =>
        w.details?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(data);
  }, [watchlist, activeTab, search]);

  const fetchData = async () => {
    const res = await fetch(`/api/watchlist?userId=${session?.user.id}`);
    const data = await res.json();
    setWatchlist(data.watchlist || []);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Watchlist</h1>
        <div className="flex gap-2 items-center">
          <button
            className={`p-2 rounded-md border ${
              view === "grid" ? "bg-white text-black" : "border-white"
            }`}
            onClick={() => setView("grid")}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            className={`p-2 rounded-md border ${
              view === "list" ? "bg-white text-black" : "border-white"
            }`}
            onClick={() => setView("list")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Tabs defaultValue="All" onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-800">
            {statuses.map((status) => (
              <TabsTrigger key={status} value={status} className="text-sm">
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 text-white pl-8 pr-2 py-1.5 rounded-md w-full border border-zinc-700 focus:outline-none"
            placeholder="Search by title..."
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No items found.</p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((movie) => (
            <MovieCard key={movie._id} movie={movie.details} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((movie) => (
            <div
              key={movie._id}
              className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w92/${movie.details.poster_path}`}
                  alt="poster"
                  className="w-16 h-24 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {movie.details.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {movie.details.genres?.map((g: any) => g.name).join(", ")}
                  </p>
                  <div className="flex gap-2 items-center text-sm mt-1">
                    <Star className="text-yellow-400" size={14} />
                    {movie.details.vote_average?.toFixed(1)}
                    <span className="ml-4">
                      {movie.details.release_date?.slice(0, 4)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/${movie.details.title ? "movie" : "tv"}/${
                  movie.mediaId
                }`}
                className="text-sm bg-white text-black px-3 py-1.5 rounded-md font-medium"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
