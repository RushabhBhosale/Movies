"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4 py-20 hero-grad text-foreground relative z-10 rounded-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Track. Analyze. Enjoy 🎬
      </h1>
      <p className="text-lg md:text-xl max-w-2xl text-muted-foreground mb-6">
        Manage your movie watchlist, see your watching stats, and rediscover
        cinema in your own way.
      </p>
      <div className="flex gap-4">
        <Link href="/watchlist">
          <Button
            className="bg-primary text-primary-foreground hover:opacity-90"
            size="lg"
          >
            View Watchlist
          </Button>
        </Link>
        <Link href="/search">
          <Button
            variant="outline"
            className="border-muted text-foreground hover:bg--muted/10"
            size="lg"
          >
            Search Titles
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
