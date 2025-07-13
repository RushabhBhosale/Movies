import { useUserStore } from "@/store/userStore";
import axios from "axios";
import React from "react";
import Stats from "./Stats";
import { getUserFromToken } from "@/lib/getUserFromToken";

const StatsPage = async () => {
  const user: any = await getUserFromToken();
  console.log("dejc", user);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/stats?userId=${user._id}`
  );
  console.log("res12", res.data);
  return <Stats stats={res.data.data} />;
};

export default StatsPage;
