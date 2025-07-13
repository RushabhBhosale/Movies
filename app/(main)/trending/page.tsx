import { fetchTmdbData } from "@/hooks/useTmdb";
import Trending from "./Trending";

export default async function TrendingPage() {
  const data = await fetchTmdbData("/trending/all/day");
  return <Trending items={data || []} />;
}
