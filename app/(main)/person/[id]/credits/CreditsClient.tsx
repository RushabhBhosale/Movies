"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreditsClient({
  person,
  movieCredits,
  tvCredits,
}: any) {
  const [showFullBio, setShowFullBio] = useState(false);
  const toggleBio = () => setShowFullBio(!showFullBio);
  const profileImage = person?.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : "/no-image.png";

  const bioPreview =
    person?.biography?.slice(0, 300) || "No biography available.";
  const hasLongBio = person?.biography?.length > 300;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Person Info */}
        <Card className="bg-zinc-900 border-none mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <Image
              src={profileImage}
              alt={person?.name || "Profile"}
              width={150}
              height={225}
              className="rounded-lg object-cover"
              unoptimized
            />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {person?.name || "Unknown Person"}
              </h1>
              <p className="text-sm text-gray-400 mb-3">
                {person?.known_for_department || "Unknown Department"}
              </p>
              <p className="text-sm text-zinc-300">
                {showFullBio
                  ? person?.biography || bioPreview
                  : `${bioPreview}${hasLongBio ? "..." : ""}`}
              </p>
              {hasLongBio && (
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 mt-2"
                  onClick={toggleBio}
                >
                  {showFullBio ? "Show Less" : "Read More"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-none mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              Movies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {movieCredits?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-300 text-sm md:text-base mb-4">
                  No movie credits available. Explore more movies to discover
                  related content!
                </p>
                <Link
                  href="/explore"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Explore Movies
                </Link>
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
                {movieCredits.slice(0, 20).map((movie: any) => (
                  <div key={movie.id} className=" text-sm">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              Tv Shows
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tvCredits?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-300 text-sm md:text-base mb-4">
                  No TV credits available. Explore more TV shows to discover
                  related content!
                </p>
                <Link
                  href="/explore"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Explore TV Shows
                </Link>
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
                {tvCredits.slice(0, 20).map((movie: any) => (
                  <div key={movie.id} className="text-sm">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
