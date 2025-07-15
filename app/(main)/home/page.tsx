import { getWatchlist } from "@/lib/db/getWatchlist";
import Home from "./home";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { getUserFromToken } from "@/lib/getUserFromToken";
import axios from "axios";
import { fetchTmdbGenres } from "@/hooks/useTmdbGenres";
import { time } from "@/utils/time";

const HomePage = async () => {
  const user = await time("getUserFromToken", () => getUserFromToken());

  const [trendingRes, upcoming, popular] = await time(
    "fetchTmdbData (trending, upcoming, popular)",
    () =>
      Promise.all([
        fetchTmdbData("/trending/all/day"),
        fetchTmdbData("/movie/upcoming"),
        fetchTmdbData("/movie/popular"),
      ])
  );

  const genres = await time("fetchTmdbGenres", () => fetchTmdbGenres());
  const watchlist = await time("getWatchlist", () => getWatchlist(user._id));

  let recRes;
  let latest;
  const completed: any = watchlist.filter((m: any) => m.status === "Completed");

  if (completed[0]?.details?.id && completed[0]?.type) {
    recRes = await time("fetchTmdbData (recommendations)", () =>
      fetchTmdbData(
        `/${completed[0].type}/${completed[0].details.id}/recommendations`
      )
    );
    latest = completed[0];
  }

  return (
    <Home
      latest={latest}
      recs={recRes}
      trending={trendingRes.filter((i: any) => i.media_type !== "person")}
      upcoming={upcoming}
      popular={popular}
      watchlist={watchlist}
      user={user}
      genres={genres}
    />
  );
};

export default HomePage;
