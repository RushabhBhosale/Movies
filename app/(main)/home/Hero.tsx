"use client";
import React, { useEffect, useState } from "react";
import {
  Film,
  CheckCircle,
  PauseCircle,
  Ban,
  Star,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { InsightCard, StatCard } from "@/components/StatCard";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/user/stats?userId=${user.id}`);
        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Late night watching";
  };

  const getPersonalizedMessage = () => {
    if (!apiData?.data) {
      return "Welcome to your movie tracking journey! 🎬";
    }

    const stats = apiData.data.stats;
    const totalMovies =
      stats.watching + stats.completed + stats.dropped + stats.onHold;

    if (stats.watching > 5) {
      return `🔥 ${stats.watching} movies in your watchlist! You're on fire!`;
    }
    if (stats.completed >= 10) {
      return "🎯 Movie completion champion! Keep watching!";
    }
    if (totalMovies === 0) {
      return "🍿 Ready to start your cinematic journey? Add your first movie!";
    }
    return `📈 ${totalMovies} movies tracked so far. Keep it up!`;
  };

  const hasStats =
    apiData?.data?.stats &&
    Object.values(apiData.data.stats).some((val: any) => val > 0);

  // Get join date (you might want to get this from user data or API)
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="relative w-full md:h-80 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-40 blur-sm transition-all duration-500"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-indigo-900/60" />

      <div className="relative z-10 p-4 md:p-8 text-white h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              {getTimeBasedGreeting()},{" "}
              {user?.name?.split(" ")[0] || "Movie Buff"} 🎬
            </h1>
            <div className="text-right text-sm opacity-90 hidden md:block">
              <div className="font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs">Member since {joinDate}</div>
            </div>
          </div>

          <p className="text-lg opacity-90 max-w-2xl my-2 md:my-0">
            {getPersonalizedMessage()}
          </p>
        </div>

        {loading ? (
          <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
            <p className="text-center text-lg">Loading your stats... 🍿</p>
          </div>
        ) : hasStats ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <StatCard
                icon={<Film size={18} />}
                label="Watching"
                value={apiData.data.stats.watching}
                color="bg-blue-500/20 border-blue-400/30"
              />
              <StatCard
                icon={<CheckCircle size={18} />}
                label="Completed"
                value={apiData.data.stats.completed}
                color="bg-green-500/20 border-green-400/30"
              />
              <StatCard
                icon={<PauseCircle size={18} />}
                label="On-Hold"
                value={apiData.data.stats.onHold}
                color="bg-yellow-500/20 border-yellow-400/30"
              />
              <StatCard
                icon={<Ban size={18} />}
                label="Dropped"
                value={apiData.data.stats.dropped}
                color="bg-red-500/20 border-red-400/30"
              />
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <InsightCard
                icon={<Star size={16} />}
                text={`${apiData.data.avgRating}/10 avg rating`}
              />
              <InsightCard
                icon={<Clock size={16} />}
                text={`${Math.round(apiData.data.totalHoursWatched)}h watched`}
              />
              <InsightCard
                icon={<TrendingUp size={16} />}
                text={`${apiData.data.completionRate} completion rate`}
              />
              <InsightCard
                icon={<Zap size={16} />}
                text={`Loves ${apiData.data.mostViewedGenre}`}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
            <p className="text-center text-lg">
              🍿 Ready to start your cinematic journey? Add your first movie!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
