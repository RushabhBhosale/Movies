import { getWatchlist } from "@/lib/db/getWatchlist";
import Home from "./home";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { getUserFromToken } from "@/lib/getUserFromToken";
import axios from "axios";
import { fetchTmdbGenres } from "@/hooks/useTmdbGenres";

const HomePage = async () => {
  const user: any = await getUserFromToken();
  const [trendingRes, upcoming, popular] = await Promise.all([
    fetchTmdbData("/trending/all/day"),
    fetchTmdbData("/movie/upcoming"),
    fetchTmdbData("/movie/popular"),
  ]);

  const genres = await fetchTmdbGenres();

  const trending = (trendingRes || []).filter(
    (item: any) => item.media_type !== "person"
  );

  const watchlist = await getWatchlist(user._id);

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/stats?userId=${user._id}`
  );

  const recRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommendations`,
    { watchlist }
  );

  return (
    <Home
      recs={recRes.data}
      trending={trending}
      upcoming={upcoming}
      popular={popular}
      watchlist={watchlist}
      stats={res.data.data}
      user={user}
      genres={genres}
    />
  );
};

export default HomePage;
