import React from "react";
import MovieCard from "./MovieCard";
import { TMDBListResponse } from "@/types/tmdb";

const CardList = ({ movies }: { movies: TMDBListResponse }) => {
  return (
    <div className="sm:mt-5 popular list overflow-x-auto">
      <div className="flex gap-5">
        {movies &&
          movies.results.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
      </div>
    </div>
  );
};

export default CardList;
