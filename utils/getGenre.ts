import { Genre } from "@/types/tmdb";

export const getGenreById = (genreId: number, genres: Genre[]) =>
  genres.find((g) => g.id === genreId)?.name || "Unknown";
