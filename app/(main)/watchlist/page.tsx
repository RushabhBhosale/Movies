import { getUserFromToken } from "@/lib/getUserFromToken";
import React from "react";
import Watchlist from "./watchlist";
import axiosInstance from "@/lib/axios";
import { getWatchlist } from "@/lib/db/getWatchlist";

const WatchlistPage = async () => {
  const user: any = await getUserFromToken();

  const watchlist = await getWatchlist(user.id);
  console.log("watchlist", watchlist);
  return <Watchlist initialData={watchlist} />;
};

export default WatchlistPage;
