import { useTmdb } from "@/hooks/useTmdb";
import { Genre } from "@/types/tmdb";

export const useTmdbGenres = () => {
  const { data: movieGenres } = useTmdb("/genre/movie/list");
  const { data: tvGenres } = useTmdb("/genre/tv/list");

  const combined = [
    ...(movieGenres?.genres || []),
    ...(tvGenres?.genres || []),
  ];

  const uniqueGenres: Genre[] = Array.from(
    new Map(combined.map((g) => [g.id, g])).values()
  );

  return uniqueGenres;
};
