"use client";
import { fetchDataFromApi } from "@/utils/api";
import { useEffect, useState } from "react";
import CardList from "@/components/CardList";
import Featured from "@/components/Featured";
import Carousel from "@/components/Carousel";

export default function Home() {
  const [tv, setTv] = useState();
  const [genre, setGenre] = useState<any>();
  const [popularMovie, setPopularMovie] = useState();
  const [list, setList] = useState();
  const [list2, setList2] = useState();
  const [list3, setList3] = useState();
  const [list4, setList4] = useState();
  const [kage, setKage] = useState();

  useEffect(() => {
    fetchTopTv();
    fetchTvGenres();
    fetchPopularMovie();
    fetchList2();
    fetchList3();
    fetchList4();
    fetchList();
    fetchKage();
  }, []);

  const fetchList = async () => {
    fetchDataFromApi("/list/8289873").then((res) => {
      setList2(res);
    });
  };

  const fetchList2 = async () => {
    fetchDataFromApi("/list/8289851").then((res) => {
      setList(res);
    });
  };

  const fetchList3 = async () => {
    fetchDataFromApi("/list/8289875").then((res) => {
      setList3(res);
    });
  };

  const fetchList4 = async () => {
    fetchDataFromApi("/list/8289877").then((res) => {
      setList4(res);
    });
  };

  const fetchTopTv = async () => {
    fetchDataFromApi("/tv/top_rated").then((res) => setTv(res));
  };

  const fetchTvGenres = async () => {
    fetchDataFromApi("/genre/tv/list").then((res) => setGenre(res));
  };

  const getGenreById = (genreId: any) => {
    if (genre && genre.genres) {
      for (let i = 0; i < genre.genres.length; i++) {
        const id = genre.genres[i].id;
        const name = genre.genres[i].name;

        if (id == genreId) {
          return name;
        }
      }
    }
  };

  const fetchPopularMovie = async () => {
    fetchDataFromApi("/movie/popular").then((res) => setPopularMovie(res));
  };

  const fetchKage = async () => {
    fetchDataFromApi("/tv/119495").then((res) => setKage(res));
  };

  return (
    <div className="pages p-4 sm:ps-6 sm:pt-6 sm:pb-6 pb-16 sm:pe-3 overflow-auto">
      {tv && list && <Carousel tv={list} getGenreById={getGenreById} />}

      <p className="text-2xl my-2 sm:mt-6 font-bold">Popular Movie</p>
      {popularMovie && <CardList popularMovie={popularMovie} />}

      <p className="text-2xl my-2 mt-0 sm:mt-6 font-bold">
        Top Rated Tv Series
      </p>
      {popularMovie && <CardList popularMovie={tv} />}

      <Featured kage={kage} />

      <p className="text-2xl my-2 mt-0 sm:mt-6 font-bold">Bollywood</p>
      {popularMovie && <CardList popularMovie={list2} />}

      <p className="text-2xl my-2 mt-0 sm:mt-6 font-bold">Korean</p>
      {popularMovie && <CardList popularMovie={list3} />}

      <p className="text-2xl my-2 mt-0 sm:mt-6 font-bold">Japanese</p>
      {popularMovie && <CardList popularMovie={list4} />}
    </div>
  );
}
