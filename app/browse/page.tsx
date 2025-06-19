"use client";
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

  return (
    <div className="p-6">
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
        <div className={`absolute flex flex-col w-full`}>
          {movies &&
            movies.slice(0, 6).map((movie, index) => (
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
                  <div className="w-8 my-2 sm:w-[4.5rem]">
                    <Image
                      width={70}
                      alt="poster"
                      height={60}
                      src={`${imageBaseUrl}/${movie?.poster_path}`}
                    />
                  </div>
                  <div className="sm:py-4 my-2 w-full">
                    <p className="font-semibold text-[0.6rem] sm:text-base mb-1">
                      {(movie?.name || movie?.title).slice(0, 36)}
                    </p>
                    <div className="justify-between hidden sm:flex">
                      <span className="pe-4">
                        {movie?.release_date || movie?.first_air_date
                          ? new Date(
                              movie.release_date || movie.first_air_date
                            ).getFullYear()
                          : "N/A"}
                      </span>
                      <span className="bg-[#313036] text-white text-xs rounded-sm px-2 py-1 font-semibold">
                        {movie?.vote_average && movie?.vote_average.toFixed(1)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
