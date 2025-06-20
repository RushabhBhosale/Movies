"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const buildUrl = (path: string, params?: Record<string, any>) => {
  const base = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const query = new URLSearchParams({
    api_key: apiKey || "",
    language: "en-US",
    ...params,
  }).toString();
  return `${base}${path}?${query}`;
};

export const useTmdb = (path: string, params?: Record<string, any>) => {
  const url = buildUrl(path, params);
  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading };
};
