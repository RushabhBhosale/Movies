"use client";
import { useTmdb } from "@/hooks/useTmdb";
import { MTV, TMDBListResponse } from "@/types/tmdb";
import { fetchDataFromApi } from "@/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const shouldSearch = debouncedSearch.trim().length > 0;

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useTmdb(
    shouldSearch
      ? `/search/movie?query=${encodeURIComponent(debouncedSearch)}`
      : ""
  );

  const {
    data: tvShows,
    isLoading: TvShowsLoading,
    error: tvShowsError,
  } = useTmdb(
    shouldSearch
      ? `/search/tv?query=${encodeURIComponent(debouncedSearch)}`
      : ""
  );

  const combinedResults = [...(movies || []), ...(tvShows || [])].sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );

  const handleClick = () => {
    setSearch("");
  };

  useEffect(() => {
    if (moviesError) {
      console.error("Movies API Error:", moviesError);
    }
    if (tvShowsError) {
      console.error("TV Shows API Error:", tvShowsError);
    }
  }, [moviesError, tvShowsError]);

  return (
    <div className="relative w-[350px] mx-auto">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 px-6 pr-10"
          placeholder="Search ..."
        />
        <MagnifyingGlassIcon className="size-5 absolute top-2 right-3 text-gray-400 pointer-events-none" />
      </div>

      {shouldSearch && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="max-h-[400px] overflow-y-auto no-scrollbar">
            {(moviesLoading || TvShowsLoading) && (
              <div className="p-4 bg-[#1a1a1a] border border-neutral-700 rounded-md">
                <p className="text-gray-400 text-sm">Searching...</p>
              </div>
            )}

            {(moviesError || tvShowsError) && (
              <div className="p-4 bg-[#1a1a1a] border border-red-700 rounded-md">
                <p className="text-red-400 text-sm">
                  Error loading results. Please check your API configuration.
                </p>
              </div>
            )}

            {combinedResults.length > 0 &&
              !moviesLoading &&
              !TvShowsLoading && (
                <div className="flex flex-col w-full overflow-y-auto rounded-md bg-[#1a1a1a] border border-neutral-700 no-scrollbar transition-all duration-300">
                  {combinedResults.slice(0, 6).map((item, index) => (
                    <Link
                      onClick={handleClick}
                      key={`${item.id}-${item.title ? "movie" : "tv"}`}
                      href={`/detail/${item?.id}${
                        item?.title ? `movie${item?.title}` : `tv${item?.name}`
                      }`}
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
                              src={`${imageBaseUrl}/${item?.poster_path}`}
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

            {combinedResults.length === 0 &&
              !moviesLoading &&
              !TvShowsLoading &&
              !moviesError &&
              !tvShowsError && (
                <div className="p-4 bg-[#1a1a1a] border border-neutral-700 rounded-md">
                  <p className="text-gray-400 text-sm">
                    No results found for "{search}"
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
