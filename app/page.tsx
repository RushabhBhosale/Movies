import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookmarkPlus,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  Pause,
  Eye,
  Sparkles,
  ArrowRight,
  Film,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border backdrop-blur-md bg-sidebar/50 z-50 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                CineTrack
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sidebar-foreground hover:text-primary"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 hero-grad py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Beta Launch
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Watchlist,
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Reimagined 🎬
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Track movies and shows, rate your favorites, and uncover insights
            about your viewing habits—all in one sleek dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground px-8 py-4 text-lg font-semibold group"
              >
                Start Tracking
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted/50 px-8 py-4 text-lg"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Entertainment,
              <span className="block text-primary">Perfectly Organized</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Say goodbye to scattered lists. CineTrack brings your watchlist,
              reviews, and stats into one intuitive platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-border hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <BookmarkPlus className="h-12 w-12 text-primary group-hover:scale-110 transition-transform mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Curated Watchlists
                </h3>
                <p className="text-muted-foreground">
                  Add and organize movies and shows into custom watchlists with
                  ease.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-accent group-hover:scale-110 transition-transform mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Smart Progress
                </h3>
                <p className="text-muted-foreground">
                  Track episodes and seasons with auto-updates for your watching
                  status.
                </p>
                <div className="flex space-x-2 mt-3">
                  <Badge className="bg-muted text-muted-foreground">
                    Watching
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground">
                    Completed
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground">
                    On Hold
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-chart-3 group-hover:scale-110 transition-transform mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Rate & Reflect
                </h3>
                <p className="text-muted-foreground">
                  Rate your favorites and jot down reviews to capture your
                  thoughts.
                </p>
                <div className="flex space-x-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-chart-3 text-chart-3"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-chart-2 group-hover:scale-110 transition-transform mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Viewing Insights
                </h3>
                <p className="text-muted-foreground">
                  Discover trends in your watch history with personalized stats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Watchlist in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Preview how CineTrack organizes your viewing with intuitive status
              tracking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border hover:bg-card/80">
              <CardContent className="p-6 text-center">
                <Eye className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Watching
                </h3>
                <p className="text-muted-foreground mb-4">Your current binge</p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  In Progress
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:bg-card/80">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-16 w-16 text-chart-2 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Completed
                </h3>
                <p className="text-muted-foreground mb-4">Ready to rate</p>
                <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                  Done
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:bg-card/80">
              <CardContent className="p-6 text-center">
                <Pause className="h-16 w-16 text-chart-3 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Dropped
                </h3>
                <p className="text-muted-foreground mb-4">
                  Set aside for later
                </p>
                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                  Paused
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Viewing Stats
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a snapshot of your watch history with insightful metrics.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                  Watch Time
                </h3>
                <p className="text-4xl font-bold text-primary">120</p>
                <p className="text-muted-foreground">Movies Watched</p>
                <p className="text-4xl font-bold text-accent mt-4">400</p>
                <p className="text-muted-foreground">Episodes Watched</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                  Average Rating
                </h3>
                <p className="text-4xl font-bold text-chart-3">7.9</p>
                <p className="text-muted-foreground">Based on your reviews</p>
                <div className="flex justify-center space-x-1 mt-4">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 fill-chart-3 text-chart-3"
                    />
                  ))}
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 hero-grad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Master
            <span className="block text-primary">Your Watchlist?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of cinephiles who’ve simplified their viewing with
            CineTrack’s smart tracking.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground px-10 py-4 text-xl font-semibold group"
            >
              Join Now
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6">
            Free forever • No credit card needed • Set up in minutes
          </p>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-sidebar/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                CineTrack
              </span>
            </div>
            <div className="flex space-x-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2025 CineTrack. All rights reserved. Powered by TMDB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
