"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#ec4899",
  "#64748b",
];

const Stats = ({ stats }: any) => {
  const isMobile = useIsMobile();
  const statusData = Object.entries(stats.stats || {}).map(([name, value]) => ({
    name,
    value,
  }));
  const genreData = Object.entries(stats.allGenres || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const langData = Object.entries(stats.allLanguages || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const summaryCards = [
    {
      title: "Total Hours Watched",
      value: `${stats.totalHoursWatched?.toFixed(1) || 0}`,
      unit: "Hours",
      icon: "🎬",
    },
    {
      title: "Total Minutes Watched",
      value: `${stats.totalMinutesWatched?.toLocaleString() || 0}`,
      unit: "Minutes",
      icon: "⏱️",
    },
    {
      title: "Most Viewed Genre",
      value: stats.mostViewedGenre || "N/A",
      unit: "",
      icon: "🎭",
    },
    {
      title: "Average Rating",
      value: `${stats.avgRating || 0}`,
      unit: "/ 10",
      icon: "⭐",
    },
    {
      title: "Completion Rate",
      value: stats.completionRate || "N/A",
      unit: "",
      icon: "✅",
    },
    {
      title: "Total Items",
      value: `${stats.totalItems || 0}`,
      unit: "Items",
      icon: "📊",
    },
    {
      title: "TV Shows",
      value: `${stats.tvCount || 0}`,
      unit: "Shows",
      icon: "📺",
    },
    {
      title: "Movies",
      value: `${stats.movieCount || 0}`,
      unit: "Movies",
      icon: "🎥",
    },
  ];

  const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-1 text-xs">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-300 truncate max-w-[80px] sm:max-w-none">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  const renderPie = (title: string, data: any[], key: string) => {
    console.log("jkdghsc", data, key);
    return (
      <Card className="bg-zinc-900 text-white border-none h-full">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-62 sm:h-64 p-2">
          {data.reduce((acc, cur) => acc + cur.value, 0) > 0 ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={35}
                  paddingAngle={2}
                  label={false}
                  labelLine={false}
                >
                  {data.map((_, i) => (
                    <Cell
                      key={`${key}-${i}`}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => {
                      const total = data.reduce(
                        (acc, cur) => acc + cur.value,
                        0
                      );
                      const percent = ((value / total) * 100).toFixed(1);
                      return [`${value} (${percent}%)`, name];
                    }}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "0.375rem",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  />
                  <Legend content={<CustomLegend />} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-zinc-300 text-sm">
                No data available yet. Start watching to see your{" "}
                {title.toLowerCase()}!
              </p>
              <Button className="mt-4">Add now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderList = (title: string, data: any[]) => (
    <Card className="bg-zinc-900 text-white border-none h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
        {data.length > 0 ? (
          data
            .sort((a, b) => b.value - a.value)
            .map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm bg-zinc-800 px-3 py-2 rounded-md"
              >
                <span className="truncate max-w-[65%]">{item.name}</span>
                <span className="text-gray-400">{item.value}</span>
              </div>
            ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-zinc-300 text-sm">
              No genre data available yet. Add some movies or shows to your
              watchlist!
            </p>
            <Button className="mt-4">Add now</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
            📊 Viewing Statistics
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Your entertainment journey at a glance
          </p>
        </div>

        {/* Fallback for No Activity */}
        {stats.totalHoursWatched === 0 && stats.totalItems === 0 ? (
          <Card className="bg-zinc-900 text-white border-none">
            <CardContent className="p-6 text-center">
              <p className="text-zinc-300 text-sm md:text-base">
                It looks like you haven't started watching yet! Add some movies
                or TV shows to your watchlist to track your viewing stats.
              </p>
              <Button className="mt-4">Add now</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-6">
              {summaryCards.map((item, index) => (
                <Card
                  key={index}
                  className="bg-zinc-900 text-white border-none hover:scale-[1.02] transition-all duration-300"
                >
                  <CardContent className="p-2 sm:p-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800 flex items-center justify-center mb-2 text-base sm:text-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-[11px] font-medium text-gray-400 mb-1 truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm sm:text-base font-bold">
                        {item.value}
                      </span>
                      {item.unit && (
                        <span className="text-[10px] sm:text-xs text-gray-400">
                          {item.unit}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pie Charts */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
              {renderPie("📈 Status Distribution", statusData, "status")}
              {renderPie("🌍 Language Distribution", langData, "lang")}
            </div>

            {/* Genre Pie/List */}
            <div className="mb-6 h-full">
              {isMobile
                ? renderList("🎭 Genre Breakdown", genreData)
                : renderPie("🎭 Genre Breakdown", genreData, "genre")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
