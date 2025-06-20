"use client";
import { use } from "react";
import { useTmdb } from "@/hooks/useTmdb";
import MovieCard from "@/components/MovieCard";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import {
  CastMember,
  Genre,
  Movie,
  MTV,
  ProductionCompany,
} from "../../../../types/tmdb";

export default function DetailsPage({
  params,
}: {
  params: Promise<{ type: "movie" | "tv"; id: string }>;
}) {
  const { type, id } = use(params);
  const {
    data: recommendations,
    error: recommendationError,
    isLoading: recommendationLoading,
  } = useTmdb(`/${type}/${id}/recommendations`);

  const {
    data: movie,
    isLoading: loadingDetails,
    error: errorDetails,
  } = useTmdb(`/${type}/${id}`);

  const {
    data: credits,
    isLoading: loadingCredits,
    error: errorCredits,
  } = useTmdb(`/${type}/${id}/credits`);

  const {
    data: videos,
    isLoading: loadingVideos,
    error: errorVideos,
  } = useTmdb(`/${type}/${id}/videos`);

  return (
    <>
      <div className="w-full relative overflow-auto pages bg-black">
        {movie && (
          <Image
            className="hidden sm:block z-0 relative object-cover rounded-tl-3xl"
            alt="backdrop"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            fill
          />
        )}
        <div className="absolute z-0 w-full h-full hidden sm:block gradient"></div>
        <div className="sm:flex flex-col sm:flex-row sm:h-full z-20 m-5">
          <div className="sm:w-2/3 w-full">
            {movie && (
              <Image
                className="rounded-3xl sticky w-[24rem] top-[4.3rem]"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="poster"
                width={344}
                height={512}
              />
            )}
          </div>
          <div className="z-30">
            <div className="sm:px-10 px-2 mt-6">
              <div className="sm:text-5xl text-3xl font-bold">
                {(movie && movie.title) || (movie && movie.name)}
              </div>
              <div className="my-5 flex text-[#918f90e2] text-lg gap-5 items-center">
                <div className="flex gap-2 items-center">
                  <StarIcon width={18} color="#fcb900" height={18} />
                  {movie && movie.vote_average.toFixed(1)}
                </div>
                <div className="flex">
                  {movie &&
                    (movie.runtime
                      ? `${movie.runtime}`
                      : movie.episode_run_time
                      ? `${
                          movie.episode_run_time && movie.episode_run_time > 0
                            ? `${movie.episode_run_time}m`
                            : ""
                        }`
                      : "")}
                </div>
                <div className="flex">
                  {(movie && movie.release_date) ||
                  (movie && movie.first_air_date)
                    ? new Date(
                        (movie && movie.release_date) ||
                          (movie && movie.first_air_date)
                      ).getFullYear()
                    : "N/A"}
                </div>
                <div className="text-xs py-1 px-2 rounded-md bg-[#313036]">
                  R
                </div>
              </div>
              <div className="flex flex-wrap my-8 sm:my-1 sm:flex-nowrap text-[#918f90e2] gap-2">
                {movie &&
                  movie.genres.map((genre: Genre, index: number) => (
                    <p key={index}>{genre.name}</p>
                  ))}
              </div>
              {movie && movie.number_of_seasons && (
                <div className="flex gap-4 mt-4 text-[#918f90e2]">
                  <p>
                    Seasons:{" "}
                    <span className="text-white">
                      {movie.number_of_seasons}
                    </span>
                  </p>
                  <p>
                    Episodes:{" "}
                    <span className="text-white">
                      {movie.number_of_episodes}
                    </span>
                  </p>
                </div>
              )}

              {movie && movie.status && (
                <div className="text-[#918f90e2] mt-4">
                  Status: <span className="text-white">{movie.status}</span>
                </div>
              )}
              <div className="mt-5 text-lg text-[#fffffff3]">
                {movie && movie.overview.slice(0, 350)}...
              </div>
              <div className="sm:flex mt-6 text-lg">
                <div className="sm:w-1/4 text-[#918f90e2]">Starring: </div>
                <div className="sm:w-3/4 flex flex-wrap">
                  {credits &&
                    credits.cast
                      .slice(0, 10)
                      .map((cast: CastMember, index: number) => (
                        <p key={index}>{cast.name} ,</p>
                      ))}
                </div>
              </div>
              <div className="sm:flex mt-6 text-lg">
                <div className="ms:w-1/4 text-[#918f90e2]">Production : </div>
                <div className="sm:w-3/4 flex flex-wrap">
                  {movie &&
                    movie.production_companies.map(
                      (prod: ProductionCompany, index: number) => (
                        <p key={index}>{prod.name} ,</p>
                      )
                    )}
                </div>
              </div>
            </div>
            <div className="mt-8 px-4">
              <div className="text-3xl my-5 font-bold">Trailers & Clips</div>
              {videos && videos.results.length > 0 ? (
                <div className="flex gap-4 h-[10rem] overflow-auto overflow-y-hidden">
                  {videos.results
                    .slice(0, 6)
                    .map((video: any, index: number) => (
                      <iframe
                        key={index}
                        className="youtube-video inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ))}
                </div>
              ) : (
                <div className="text-3xl sm:mx-72 text-red-700 my-20">
                  No Videos Available
                </div>
              )}
              <div className="text-4xl ps-40 mt-6 hidden sm:block text-white">
                {" "}
                You may also like
              </div>
            </div>
          </div>
        </div>
        <div className="text-4xl ps-2 sm:hidden text-white">
          {" "}
          You may also like
        </div>
        <div className="overflow-auto px-4">
          <div className="flex gap-5 mt-6 sm:mt-44">
            {recommendations &&
              recommendations.results.map(
                (recommendation: any, index: number) => (
                  <MovieCard key={index} movie={recommendation} />
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}
