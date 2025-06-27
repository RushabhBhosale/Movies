import Carousel from "@/components/Carousel";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { fetchTmdbGenres } from "@/hooks/useTmdbGenres";

const Home = async () => {
  const data: any = await fetchTmdbData("/trending/movie/week");
  const genres: any = await fetchTmdbGenres();

  return (
    <div className="p-4">
      {data && data.length > 0 ? (
        <Carousel tv={data} genres={genres} />
      ) : (
        <div className="p-6">
          <p className="text-gray-400">No movies found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
