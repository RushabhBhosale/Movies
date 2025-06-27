import { Genre } from "@/types/tmdb";
import { fetchTmdbData } from "./useTmdb";

export async function fetchTmdbGenres(): Promise<Genre[]> {
  const movieGenresResponse = await fetchTmdbData("/genre/movie/list");
  const tvGenresResponse = await fetchTmdbData("/genre/tv/list");

  const movieGenres = movieGenresResponse.genres || [];
  const tvGenres = tvGenresResponse.genres || [];

  const combined = [...movieGenres, ...tvGenres];

  const uniqueGenres: Genre[] = Array.from(
    new Map(combined.map((g: Genre) => [g.id, g])).values()
  );

  return uniqueGenres;
}
