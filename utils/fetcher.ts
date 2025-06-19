// utils/fetcher.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL!;
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN!;

export const fetcher = (url: string) =>
  axios
    .get(BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    })
    .then((res) => res.data);
