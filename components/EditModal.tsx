import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Edit, Star, StarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { MTV } from "@/types/tmdb";
import { STATUSES } from "@/utils/options";
import Image from "next/image";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface EditModalProps {
  movie: any;
  onSave?: (data: any) => void;
}

const EditModal = ({ movie, onSave }: EditModalProps) => {
  const item = movie.details;
  const isMobile = useIsMobile();
  const title = item.title || movie?.details.name;

  // State management
  const [selectedStatus, setSelectedStatus] = useState(movie.status || "");
  const [progress, setProgress] = useState(
    movie.watchedEpisodes?.toString() || ""
  );
  const [rating, setRating] = useState(movie.rating || 0);
  const [review, setReview] = useState(movie.review || "");
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : "/placeholder-poster.jpg";

  const handleSave = async () => {
    if (!movie._id) {
      return;
    }

    setIsLoading(true);
    try {
      const updatePayload: any = {
        id: movie._id,
        status: selectedStatus,
      };

      if (item.number_of_episodes) {
        updatePayload.watchedEpisodes = parseInt(progress) || 0;
      }

      const response = await fetch("/api/watchlist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update watchlist item");
      }

      const result = await response.json();

      const fullUpdateData = {
        ...result.data,
        rating,
        review,
        updatedAt: new Date().toISOString(),
      };

      onSave?.(fullUpdateData);

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating watchlist item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, size = "w-6 h-6" }: any) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-colors hover:scale-110 transform"
          >
            <Star
              className={`${size} ${
                star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
        )}
      </div>
    );
  };

  const EpisodeProgress = () => {
    const totalEpisodes = item.number_of_episodes || 0;
    const watchedEpisodes = parseInt(progress) || 0;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min="0"
            max={totalEpisodes}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-24"
            placeholder="0"
          />
          <span className="text-sm text-muted-foreground">
            / {totalEpisodes} episodes
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round((watchedEpisodes / totalEpisodes) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(watchedEpisodes / totalEpisodes) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
          {Array.from({ length: totalEpisodes }).map((_, i) => (
            <div
              key={i}
              onClick={() => setProgress(String(i + 1))}
              className={`aspect-square flex items-center justify-center text-xs cursor-pointer rounded transition-colors ${
                i < watchedEpisodes
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DesktopContent = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[800px] max-h-[90vh] overflow-hidden p-0">
        {/* Header with backdrop */}
        <div className="relative">
          {item.backdrop_path && (
            <div className="absolute inset-0 opacity-20">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="relative bg-gradient-to-t from-background to-transparent p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {title}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {item.release_date || item.first_air_date} •{" "}
                {item.runtime || `${item.number_of_episodes} episodes`}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Movie poster and basic info */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={posterUrl}
                alt={title}
                width={120}
                height={180}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold mb-2">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <Badge
                      key={status.id}
                      variant={
                        selectedStatus === status.name ? "default" : "outline"
                      }
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStatus(status.name)}
                    >
                      {status.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
            </div>
          </div>

          {/* Progress tracking */}
          <div>
            <h3 className="font-semibold mb-3">
              {item.number_of_episodes ? "Episode Progress" : "Duration"}
            </h3>
            {item.number_of_episodes ? (
              <EpisodeProgress />
            ) : (
              <div className="text-sm text-muted-foreground">
                Runtime: {item.runtime} minutes
              </div>
            )}
          </div>

          {/* Review section */}
          <div>
            <h3 className="font-semibold mb-3">Review</h3>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this movie/show..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Overview */}
          {item.overview && (
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.overview}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/50">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const MobileContent = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">{title}</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Status */}
            <div>
              <h3 className="font-semibold mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((status) => (
                  <Badge
                    key={status.id}
                    variant={
                      selectedStatus === status.name ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus(status.name)}
                  >
                    {status.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-2">Rating</h3>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="w-5 h-5"
              />
            </div>

            {/* Progress */}
            <div>
              <h3 className="font-semibold mb-2">
                {item.number_of_episodes ? "Progress" : "Duration"}
              </h3>
              {item.number_of_episodes ? (
                <EpisodeProgress />
              ) : (
                <div className="text-sm text-muted-foreground">
                  Runtime: {item.runtime} minutes
                </div>
              )}
            </div>

            {/* Review */}
            <div>
              <h3 className="font-semibold mb-2">Review</h3>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="p-4 border-t bg-muted/50">
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return isMobile ? <MobileContent /> : <DesktopContent />;
};

export default EditModal;
