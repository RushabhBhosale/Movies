"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { MTV } from "@/types/tmdb";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Edit, Star, Calendar, Clock, Trophy } from "lucide-react";
import Image from "next/image";
import { STATUSES } from "@/utils/options";
import { Button } from "./ui/button";
import PlainModal from "./PlainModal";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

const EditModal = ({ movie, onSave }: { movie: any; onSave?: () => void }) => {
  const item: MTV = movie.details;
  const isMovie = !!item?.title;
  const user = useUserStore();
  const isMobile = useIsMobile();
  const [rating, setRating] = useState(movie.userRating);
  const [open, setOpen] = useState(false);
  const [selectedSeasonId, setSelectedSeasonId] = useState(movie.lastSeasonId);
  const [selectedEpisode, setSelectedEpisode] = useState(
    movie.lastEpisodeId || 1
  );
  const [globalEpNumber, setGlobalEpNumber] = useState(movie.globalEpisodeNo);
  const [review, setReview] = useState(movie.review);
  const [selectedStatus, setSelectedStatus] = useState(movie.status);

  useEffect(() => {
    if (!item?.seasons || !movie.lastSeasonId || !movie.lastEpisodeId) return;

    setSelectedSeasonId(movie.lastSeasonId.toString());
    setSelectedEpisode(movie.lastEpisodeId);
    const season = getSortedSeasons(item?.seasons).find(
      (s) => s.id.toString() === movie.lastSeasonId.toString()
    );
    const global = getGlobalEpisodeNumber(
      item?.seasons,
      season?.season_number || 1,
      movie.lastEpisodeId
    );
    setGlobalEpNumber(global);
  }, [open]);

  const getSortedSeasons = (seasons: any[]) => {
    return seasons
      ?.filter((s) => s.name !== "Specials")
      .sort((a, b) => a.season_number - b.season_number);
  };

  const getGlobalEpisodeNumber = (
    seasons: { season_number: number; episode_count: number }[],
    targetSeasonNumber: number,
    targetEpisode: number
  ) => {
    const sorted = getSortedSeasons(seasons);
    let globalEp = 0;

    for (const season of sorted) {
      if (season.season_number === targetSeasonNumber) {
        return globalEp + targetEpisode;
      }
      globalEp += season.episode_count;
    }

    return null;
  };

  const getSeasonAndEpisode = (
    globalEp: number,
    seasons: { season_number: number; episode_count: number }[]
  ) => {
    const sorted = getSortedSeasons(seasons);
    let count = 0;

    for (const season of sorted) {
      const { episode_count, season_number } = season;
      if (globalEp <= count + episode_count) {
        return {
          season_number,
          episode: globalEp - count,
        };
      }
      count += episode_count;
    }

    return null;
  };

  const handleSeasonChange = (id: string) => {
    setSelectedSeasonId(id);
    setSelectedEpisode(1);

    const season = getSortedSeasons(item?.seasons).find(
      (s) => s.id.toString() === id
    );

    if (season) {
      const global = getGlobalEpisodeNumber(
        item?.seasons,
        season.season_number,
        1
      );
      setGlobalEpNumber(global);
    }
  };

  const handleEpisodeChange = (ep: string) => {
    const epNum = Number(ep);
    setSelectedEpisode(epNum);

    const selectedSeason = getSortedSeasons(item?.seasons)?.find(
      (season) => season.id.toString() === selectedSeasonId
    );
    const selectedSeasonNumber = selectedSeason?.season_number;

    if (selectedSeasonNumber != null) {
      const global = getGlobalEpisodeNumber(
        item?.seasons,
        selectedSeasonNumber,
        epNum
      );
      setGlobalEpNumber(global);
    }
  };

  const handleGlobalEpisodeChange = (val: number) => {
    setGlobalEpNumber(val);

    const result = getSeasonAndEpisode(val, item?.seasons);
    if (result) {
      const season = getSortedSeasons(item?.seasons).find(
        (s) => s.season_number === result.season_number
      );
      if (season) {
        setSelectedSeasonId(season.id.toString());
        setSelectedEpisode(result.episode);
      }
    }
  };

  const selectedSeasonData = getSortedSeasons(item?.seasons)?.find(
    (season) => season.id.toString() === selectedSeasonId
  );

  const handleSaveReview = async () => {
    try {
      await axios.post("/api/review/add", {
        userId: user.user?._id,
        mediaId: String(item.id),
        type: movie.type,
        review,
        rating: rating / 2,
      });
    } catch (err) {
      console.error("Review API error", err);
    }
  };

  const handleSaveChanges = async () => {
    const payload = {
      id: movie._id,
      status: selectedStatus,
      userRating: rating ?? null,
      globalEpisodeNo: globalEpNumber ?? null,
      lastEpisodeId: selectedEpisode || null,
      lastSeasonId:
        selectedSeasonId !== "none" ? Number(selectedSeasonId) : null,
      review: review,
    };

    try {
      const res = await axios.put("/api/watchlist/update-status", payload);
      await handleSaveReview();
      toast.success(res.data.message);
      onSave?.();
      setOpen(false);
    } catch (err: any) {
      console.error("API error", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/watchlist/delete`, {
        params: { watchlistItemId: movie._id },
      });
      onSave?.();
      setOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="icon"
        className="w-9 h-8 border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background hover:border-border transition-all duration-200"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <PlainModal size="lg" isOpen={open} onClose={() => setOpen(false)}>
        <div className="w-full !max-w-[900px] max-h-[90vh] h-[90vh] sm:h-[95vh] flex flex-col rounded-2xl bg-background border border-border/50 shadow-2xl overflow-hidden">
          <div className="relative h-32 flex-shrink-0 overflow-hidden">
            {item?.backdrop_path && (
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${item?.backdrop_path}`}
                alt=""
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {item?.name || item?.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {moment(item?.first_air_date || item?.release_date).year()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isMovie
                      ? `${item?.runtime} mins`
                      : `${item?.number_of_episodes} eps`}
                  </div>
                  {item?.vote_average && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {item?.vote_average.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              <div className="flex gap-3 flex-wrap">
                {STATUSES.map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => setSelectedStatus(status.name)}
                    className={`px-3 py-1 border border-white/50 rounded-md transition-all ${
                      selectedStatus === status.name
                        ? "bg-white/70 text-black font-semibold"
                        : "text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {status.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item?.overview?.slice(0, isMobile ? 100 : 300)}
                  {item?.overview?.length > 300 && "..."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Your Rating
                  </h2>
                </div>
                <div className="flex gap-2 overflow-x-auto py-2">
                  {Array.from({ length: 19 }).map((_, i) => {
                    const val: any = 1 + i * 0.5;
                    return (
                      <button
                        key={val}
                        onClick={() => setRating(val)}
                        className={`size-7 text-xs px-3 flex items-center justify-center rounded-lg border-2 cursor-pointer  ${
                          rating === val
                            ? "bg-white/70 text-black border-white/70 shadow-lg"
                            : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>

              {!isMovie && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      Progress
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <select
                        value={selectedSeasonId}
                        onChange={(e) => handleSeasonChange(e.target.value)}
                        className="w-full border border-border/50 bg-background text-foreground rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="none">Choose Season</option>
                        {getSortedSeasons(item?.seasons)?.map((season) => (
                          <option key={season.id} value={season.id}>
                            {season.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="number"
                      min={1}
                      value={globalEpNumber || ""}
                      max={item?.number_of_episodes}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        const max = item?.number_of_episodes;
                        if (val > max) val = max;
                        handleGlobalEpisodeChange(val);
                      }}
                      className="w-full border border-border/50 bg-background text-foreground rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Enter episode number"
                    />
                  </div>

                  <div className="space-y-2">
                    <select
                      value={selectedEpisode}
                      onChange={(e) => handleEpisodeChange(e.target.value)}
                      className="w-full md:w-1/2 border border-border/50 bg-background text-foreground rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      {selectedEpisode ? (
                        Array.from({
                          length: selectedSeasonData?.episode_count,
                        }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Episode {i + 1}
                          </option>
                        ))
                      ) : (
                        <option>Choose episode</option>
                      )}
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Review
                </h2>
                <Textarea
                  value={review}
                  onChange={(e: any) => setReview(e.target.value)}
                  placeholder="Share your thoughts about this show..."
                  className="min-h-[120px] resize-none border border-border/50 bg-background text-foreground rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              <Button className="bg-primary" onClick={() => handleDelete()}>
                Delete from watchlist
              </Button>

              <div className="flex mb-12 justify-end gap-3 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSaveChanges()}
                  className="px-6 bg-primary hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PlainModal>
    </div>
  );
};

export default EditModal;
