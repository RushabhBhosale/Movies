import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { PlayIcon } from "lucide-react";

export default function TrailerButton({ trailerUrl }: { trailerUrl: any }) {
  const url = `https://www.youtube.com/embed/${trailerUrl?.key}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
          <PlayIcon className="w-4 h-4" />
          Play Trailer
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full aspect-video p-0 overflow-hidden rounded-xl border border-white/10 shadow-xl bg-black">
        <DialogHeader className="sr-only">
          <DialogTitle>Trailer</DialogTitle>
        </DialogHeader>
        <iframe
          src={url}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      </DialogContent>
    </Dialog>
  );
}
