import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect } from "react";
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
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { MTV } from "@/types/tmdb";
import { STATUSES } from "@/utils/options";
import Image from "next/image";
import { Input } from "./ui/input";

interface EditModalProps {
  movie: any;
}

const EditModal = ({ movie }: EditModalProps) => {
  const item = movie.details;
  const isMobile = useIsMobile();
  const title = item.title || movie?.details.name;
  const isActive = movie.status;
  const progress = item.number_of_episodes || item.runtime;

  const TriggerButton = (
    <Button variant="outline" title="Edit">
      <Edit className="w-4 h-4" />
    </Button>
  );

  return !isMobile ? (
    <Dialog>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="w-full !max-w-[900px] max-h-[70vh] overflow-auto p-0">
        <div className="sticky top-0 z-10 bg-background px-6 py-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>Status: {item.status}</div>

          <div className="flex flex-wrap gap-3 my-3">
            {STATUSES.map((status) => (
              <div
                key={status.id}
                className={`p-2 shrink-0 font-medium border border-white/10 cursor-pointer ${
                  isActive === status.name ? "bg-white text-black" : ""
                }`}
              >
                {status.name}
              </div>
            ))}
          </div>

          <div className="overflow-hidden ">
            <Input placeholder="progress" />
            <div className="flex ">
              {Array.from({ length: progress }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-white/10 text-xs text-center"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Sheet>
      <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditModal;
