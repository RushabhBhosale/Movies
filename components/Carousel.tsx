"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/modules";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MTV } from "@/types/tmdb";
import { getGenreById } from "@/utils/getGenre";
import { BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { fetchTmdbGenres } from "@/hooks/useTmdbGenres";

interface CarouselInterface {
  tv: MTV[];
  genres: any;
}

const Carousel = ({ tv, genres }: CarouselInterface) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper w-full h-[28rem] rounded-xl shadow-xl/10"
    >
      {tv &&
        tv.map((movie, index) => (
          <SwiperSlide className="slides w-full relative mb-10" key={index}>
            <Image
              alt="backdrop"
              fill
              className="object-cover z-10"
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
            />
            <div className="absolute z-20 w-full h-full bg-black opacity-40"></div>
            <div className="absolute z-30 w-full h-full flex flex-col sm:justify-center justify-end px-6 sm:px-16">
              <h3 className="sm:text-5xl drop-shadow-lg text-3xl mb-1 text-white font-bold">
                {movie.name || movie.title}
              </h3>
              <div className="flex gap-6">
                <p className="text-gray-200 text-lg font-bold my-1 sm:my-4">
                  {movie.first_air_date || movie.release_date
                    ? new Date(
                        movie.first_air_date || movie.release_date
                      ).getFullYear()
                    : "N/A"}
                </p>
                <p className=" text-white text-sm font-bold my-1 sm:my-4 px-2 py-1 rounded-sm bg-[#313036e7] bg-opacity-85">
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
              <div className="mb-3">
                {movie.genre_ids.map((genre: number, index: number) => (
                  <span
                    className="mx-1 text-xs font-semibold text-white"
                    key={index}
                  >
                    {getGenreById(genre, genres)}
                  </span>
                ))}
              </div>
              <div className="sm:w-2/4">
                <div className="hidden sm:block">
                  {movie.overview.slice(0, 200)}...
                </div>
                <div className="sm:hidden text-xs">
                  {movie.overview.slice(0, 100)}...
                </div>
              </div>
              <div className="flex gap-7 my-6">
                <Link href={`/${movie.title ? "movie" : "tv"}/${movie.id}`}>
                  <Button
                    className="!bg-white/10 cursor-pointer"
                    variant="outline"
                  >
                    <BookmarkIcon className="w-full h-full" />
                    Add to Watchlist
                  </Button>
                </Link>
                <Link href={`/${movie.title ? "movie" : "tv"}/${movie.id}`}>
                  <Button className="cursor-pointer">
                    <InformationCircleIcon className="w-full h-full" />
                    More Info
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
