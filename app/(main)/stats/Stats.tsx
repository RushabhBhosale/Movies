"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { LANGUAGEMAP } from "@/utils/options";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Cell,
  LabelList,
} from "recharts";

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

const StatsHorizontalBarChart = ({
  title,
  data,
}: {
  title: string;
  data: any[];
}) => {
  return (
    <div className="bg-zinc-900 text-white border border-zinc-800 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {data?.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-center text-sm text-zinc-400">
          No data available yet
        </div>
      ) : (
        <div style={{ height: `${data.length * 40}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, "dataMax + 5"]} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#ccc", fontSize: 12 }}
              />
              <Legend />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                <LabelList
                  dataKey="value"
                  position="right"
                  fill="#fff"
                  fontSize={12}
                />
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default function Stats({ stats }: any) {
  const genreData = Object.entries(stats.allGenres).map(([name, value]) => ({
    name,
    value,
  }));
  const langData = Object.entries(stats.allLanguages).map(([code, value]) => ({
    name: LANGUAGEMAP[code] || code,
    value,
  }));

  const summaryCards = [
    {
      title: "Total Hours Watched",
      value: `${stats.totalHoursWatched.toFixed(1)}`,
      unit: "Hours",
      icon: "🎬",
    },
    {
      title: "Total Minutes Watched",
      value: `${stats.totalMinutesWatched.toLocaleString()}`,
      unit: "Minutes",
      icon: "⏱️",
    },
    {
      title: "Most Viewed Genre",
      value: stats.mostViewedGenre,
      unit: "",
      icon: "🎭",
    },
    {
      title: "Average Rating",
      value: `${stats.avgRating}`,
      unit: "/ 10",
      icon: "⭐",
    },
    {
      title: "Completion Rate",
      value: stats.completionRate,
      unit: "",
      icon: "✅",
    },
    {
      title: "Total Items",
      value: `${stats.totalItems}`,
      unit: "Items",
      icon: "📊",
    },
    { title: "TV Shows", value: `${stats.tvCount}`, unit: "Shows", icon: "📺" },
    {
      title: "Movies",
      value: `${stats.movieCount}`,
      unit: "Movies",
      icon: "🎥",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
          📊 Viewing Statistics
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          Your entertainment journey at a glance
        </p>
      </div>

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
      <StatsHorizontalBarChart title="🎭 Genre Distribution" data={genreData} />
      <StatsHorizontalBarChart
        title="🌍 Language Distribution"
        data={langData}
      />
    </main>
  );
}
