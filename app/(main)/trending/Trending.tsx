"use client";
import MovieCard from "@/components/MovieCard";
import React from "react";

export default function Trending({ items }: { items: any[] }) {
  return (
    <div className="p-3">
      <div className="text-2xl font-bold">Trending Now </div>
      <div className="flex flex-wrap gap-3 justify-evenly lg:justify-start">
        {items.map((movie, index) => (
          <div className="my-0.5" key={index}>
            <MovieCard movie={movie} rank={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
