"use client";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { MTV, TMDBListResponse } from "@/types/tmdb";
import { fetchDataFromApi } from "@/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState<MTV[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shouldSearch = debouncedSearch.trim().length > 0;
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

  const currentRequestRef = useRef<AbortController | null>(null);
  const lastRequestTimeRef = useRef<number>(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 600);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearch) {
        setResults([]);
        setError(null);
        return;
      }

      if (currentRequestRef.current) {
        currentRequestRef.current.abort();
      }

      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTimeRef.current;
      const minInterval = 300;

      if (timeSinceLastRequest < minInterval) {
        await new Promise((resolve) =>
          setTimeout(resolve, minInterval - timeSinceLastRequest)
        );
      }

      const abortController = new AbortController();
      currentRequestRef.current = abortController;

      setIsLoading(true);
      setError(null);
      lastRequestTimeRef.current = Date.now();

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedSearch)}`,
          {
            signal: abortController.signal,
            headers: {
              "Cache-Control": "max-age=60",
            },
          }
        );

        if (abortController.signal.aborted) {
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResults(data.results || []);
        setError(null);
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }

        console.error("Search error", err);
        setResults([]);
        setError("Search temporarily unavailable. Please try again.");
      } finally {
        setIsLoading(false);
        currentRequestRef.current = null;
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  const handleClick = () => {
    setSearch("");
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (currentRequestRef.current) {
        currentRequestRef.current.abort();
      }
    };
  }, []);

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

        {isLoading && (
          <div className="absolute top-2 right-10">
            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {shouldSearch && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="max-h-[400px] overflow-y-auto no-scrollbar">
            {error && (
              <div className="p-4 bg-[#1a1a1a] border border-red-500 rounded-md">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {!error && results.length > 0 && (
              <div className="flex flex-col w-full max-h-[400px] overflow-y-auto rounded-md bg-[#1a1a1a] border border-neutral-700 no-scrollbar transition-all duration-300">
                {results.map((item, index) => (
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
                            src={`${imageBaseUrl}/w500/${item?.poster_path}`}
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

            {!error &&
              !isLoading &&
              results.length === 0 &&
              debouncedSearch && (
                <div className="p-4 bg-[#1a1a1a] border border-neutral-700 rounded-md">
                  <p className="text-gray-400 text-sm">
                    No results found for "{debouncedSearch}"
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
