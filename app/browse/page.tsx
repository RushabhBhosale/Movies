"use client";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { MTV } from "@/types/tmdb";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Browse = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;
  const isKeyboardVisible = useKeyboardVisible();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const shouldSearch = debouncedSearch.trim().length > 0;
  useEffect(() => {
    if (!debouncedSearch.trim()) return;

    const fetchData = async () => {
      const movieData: any = await fetchTmdbData(
        `/search/movie?query=${debouncedSearch}`
      );
      const tvData: any = await fetchTmdbData(
        `/search/tv?query=${debouncedSearch}`
      );

      setMovies(movieData?.results || []);
      setTvShows(tvData?.results || []);
    };

    fetchData();
  }, [debouncedSearch]);

  const combinedResults: MTV[] = [...movies, ...tvShows].sort(
    (a: MTV, b: MTV) => (b.popularity || 0) - (a.popularity || 0)
  );
  const handleClick = () => {
    setSearch("");
  };

  return (
    <div className="p-6 overflow-hidden fixed inset-0 bg-[#121212] z-40">
      <h1 className="text-2xl font-semibold text-white mb-4 tracking-wide">
        Looking for something to watch?
      </h1>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`relative h-8 w-full ring-0 bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block focus:px-3 transition-all px-6`}
          placeholder="Search movies and TV shows..."
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute top-[6px] right-3 text-gray-400" />

        {shouldSearch && combinedResults.length > 0 && (
          <div
            className={`mt-2 flex flex-col w-full ${
              isKeyboardVisible ? "max-h-[264px]" : "max-h-[530px]"
            } overflow-y-auto rounded-md bg-[#1a1a1a] border border-neutral-700 z-50 no-scrollbar transition-all duration-300`}
          >
            {combinedResults.slice(0, 10).map((item: MTV, index: number) => (
              <Link
                onClick={handleClick}
                key={`${item.id}-${item.title ? "movie" : "tv"}`}
                href={`/${item.title ? "movie" : "tv"}/${item.id}`}
              >
                <div
                  className={`flex gap-2 px-3 hover:bg-[#252525] transition-colors ${
                    index % 2 === 0 ? "bg-[#161616]" : "bg-[#0f1115]"
                  }`}
                >
                  <div className="relative w-[40px] my-2 h-[50px] flex-shrink-0">
                    {item?.poster_path ? (
                      <Image
                        fill
                        alt="poster"
                        src={`${imageBaseUrl}/original/${item?.poster_path}`}
                        className="object-cover object-center rounded"
                        sizes="40px"
                      />
                    ) : (
                      <Image
                        fill
                        alt="poster"
                        src="/no-image.png"
                        className="object-cover object-center rounded"
                        sizes="40px"
                      />
                    )}
                  </div>

                  <div className="my-2 w-full flex justify-between items-center min-w-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-white">
                        {(item?.name || item?.title)?.slice(0, 36)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {item?.release_date || item?.first_air_date
                            ? new Date(
                                item.release_date || item.first_air_date
                              ).getFullYear()
                            : "N/A"}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {item?.title ? "Movie" : "TV"}
                        </span>
                      </div>
                    </div>
                    <span className="bg-[#313036] text-white text-xs rounded-sm px-2 py-1 font-semibold ml-2 flex-shrink-0">
                      {item?.vote_average && item?.vote_average !== 0
                        ? item?.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {shouldSearch && combinedResults.length === 0 && (
          <div className="mt-2 p-4 bg-[#1a1a1a] border border-neutral-700 rounded-md">
            <p className="text-gray-400 text-sm">
              No results found for "{search}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
