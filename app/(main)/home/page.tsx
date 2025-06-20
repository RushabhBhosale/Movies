"use client";
import Carousel from "@/components/Carousel";
import { useTmdb } from "@/hooks/useTmdb";

const Home = () => {
  const { data, isLoading, error } = useTmdb("/trending/movie/week");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching</p>;

  return <div>{data && <Carousel tv={data.results} />}</div>;
};

export default Home;
