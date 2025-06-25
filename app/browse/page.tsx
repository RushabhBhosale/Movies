"use client";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { MTV, TMDBListResponse } from "@/types/tmdb";
import { fetchDataFromApi } from "@/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Browse = () => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<MTV[]>([]);
  const [tv, setTv] = useState<MTV[]>([]);
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;
  const isKeyboardVisible = useKeyboardVisible();

  useEffect(() => {
    fetchMovie();
    fetchTv();
  }, [search]);

  const fetchMovie = () => {
    fetchDataFromApi(`/search/movie?query=${search}`).then(
      (res: TMDBListResponse) => {
        setMovies(res.results);
      }
    );
  };
  const fetchTv = () => {
    fetchDataFromApi(`/search/tv?query=${search}`).then(
      (res: TMDBListResponse) => {
        setTv(res.results);
      }
    );
  };

  const handleClick = () => {
    setSearch("");
  };
  console.log("hjgesdvfes", isKeyboardVisible);

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
          className={`relative h-8 w-full ring-0 bg-[#313036] outline-none border border-neutral-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500  focus:border-gray-500 block focus:px-3 transition-all px-6`}
          placeholder="Search anything..."
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute top-[6px] right-3" />
        {movies.length > 0 && (
          <div
            className={`mt-2 flex flex-col w-full ${
              isKeyboardVisible ? "max-h-[264px]" : "max-h-[530px]"
            } overflow-y-auto rounded-md bg-[#1a1a1a] border border-neutral-700 z-50 no-scrollbar transition-all duration-300`}
          >
            {movies &&
              movies.slice(0, 10).map((movie, index) => (
                <Link
                  onClick={handleClick}
                  key={index}
                  href={`/detail/${movie?.id}${
                    movie?.title ? `movie${movie?.title}` : `tv${movie?.name}`
                  }`}
                >
                  <div
                    className={`flex gap-2 px-3 ${
                      index % 2 === 0 ? "bg-[#161616]" : "bg-[#0f1115]"
                    }`}
                  >
                    <div className="relative w-[40px] my-2 h-[50px]">
                      {movie?.poster_path ? (
                        <Image
                          fill
                          alt="poster"
                          src={`${imageBaseUrl}/${movie?.poster_path}`}
                          className="object-cover object-center rounded"
                        />
                      ) : (
                        <Image
                          fill
                          alt="poster"
                          src="/no-image.png"
                          className="object-cover object-center rounded"
                        />
                      )}
                    </div>

                    <div className="my-2 w-full flex justify-between items-center">
                      <div>
                        <p className="font-semibold truncate max-w-[210px]">
                          {(movie?.name || movie?.title).slice(0, 36)}
                        </p>
                        <div>
                          <span className="pe-4 text-xs">
                            {movie?.release_date || movie?.first_air_date
                              ? new Date(
                                  movie.release_date || movie.first_air_date
                                ).getFullYear()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <span className="bg-[#313036] text-white text-xs rounded-sm px-2 py-1 font-semibold">
                        {movie?.vote_average !== 0
                          ? movie?.vote_average &&
                            movie?.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
