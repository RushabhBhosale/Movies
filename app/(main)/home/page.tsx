"use client";
import Carousel from "@/components/Carousel";
import { useTmdb } from "@/hooks/useTmdb";

const Home = () => {
  const { data, isLoading, error } = useTmdb("/trending/movie/week");

  if (isLoading)
    return (
      <div className="p-6">
        <p className="text-white">Loading...</p>
      </div>
    );
  if (error) {
    console.error("Home component error:", error);
    return (
      <div className="p-6">
        <p className="text-red-400">Error fetching movies: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {data && data.length > 0 ? (
        <Carousel tv={data} />
      ) : (
        <div className="p-6">
          <p className="text-gray-400">No movies found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
