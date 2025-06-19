"use client";
import useSWR from "swr";

export const useTmdb = (url: string) => {
  const { data, error, isLoading } = useSWR(url);
  return {
    data,
    error,
    isLoading,
  };
};
