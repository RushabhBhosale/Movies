import { getUserFromToken } from "@/lib/getUserFromToken";
import React from "react";
import Watchlist from "./watchlist";
import axiosInstance from "@/lib/axios";

const WatchlistPage = async () => {
  const user: any = await getUserFromToken();

  const res = await axiosInstance.get(`/api/watchlist?userId=${user?.id}`);

  return <Watchlist initialData={res.data.watchlist} />;
};

export default WatchlistPage;
