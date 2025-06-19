"use client";
import { useTmdb } from "@/hooks/useTmdb";

const Home = () => {
  const { data, isLoading, error } = useTmdb("/trending/movie/week");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.map((movie: any) => (
        <div key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
