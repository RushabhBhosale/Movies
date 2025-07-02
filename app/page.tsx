import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  BookmarkPlus,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  Pause,
  Eye,
  Sparkles,
  ArrowRight,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="border-b border-gray-700/50 backdrop-blur-3xl bg-gray-700/20 z-50 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <PlayCircle className="h-8 w-8 text-indigo-300" />
              <span className="text-2xl font-bold text-gray-100">WatchPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-indigo-200"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative mt-16 overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-indigo-500/10 text-indigo-300 border-indigo-400/20 hover:bg-indigo-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Now in Beta
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-100 mb-6 leading-tight">
              Track Your Watchlist
              <span className="block bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                Like a Pro 🍿
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Manage your movies, TV shows, ratings, and what you're watching —
              all in one place. Never lose track of that perfect series again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-200 hover:bg-gray-700/50 px-8 py-4 text-lg"
                >
                  <User2Icon />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
              Everything You Need to
              <span className="block text-indigo-300">
                Organize Your Entertainment
              </span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Stop juggling multiple apps and scattered notes. WatchPro brings
              all your viewing habits into one beautiful dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <BookmarkPlus className="h-12 w-12 text-indigo-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Personal Watchlist
                </h3>
                <p className="text-gray-500">
                  Create and organize your must-watch movies and TV shows in
                  custom lists.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Clock className="h-12 w-12 text-blue-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Track Progress
                </h3>
                <p className="text-gray-500">
                  Monitor what you're watching, completed, or put on hold with
                  smart status tracking.
                </p>
                <div className="flex space-x-2 mt-3">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-700 text-gray-300"
                  >
                    Watching
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-700 text-gray-300"
                  >
                    Completed
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-700 text-gray-300"
                  >
                    On Hold
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Star className="h-12 w-12 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Rate & Review
                </h3>
                <p className="text-gray-500">
                  Score your favorites and write reviews to remember what made
                  them special.
                </p>
                <div className="flex space-x-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-300 text-yellow-300"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <TrendingUp className="h-12 w-12 text-green-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Smart Insights
                </h3>
                <p className="text-gray-500">
                  Get personalized stats and discover patterns in your viewing
                  habits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-900/10 to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
              Never Lose Track Again
            </h2>
            <p className="text-xl text-gray-500">
              See exactly where you left off with intuitive status indicators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Eye className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Watching
                </h3>
                <p className="text-gray-500 mb-4">Currently Binging</p>
                <Badge className="bg-blue-500/10 text-blue-300 border-blue-400/20">
                  In Progress
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Completed
                </h3>
                <p className="text-gray-500 mb-4">Finished and ready to rate</p>
                <Badge className="bg-green-500/10 text-green-300 border-green-400/20">
                  Done
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Pause className="h-16 w-16 text-orange-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  On Hold
                </h3>
                <p className="text-gray-500 mb-4">Paused for later</p>
                <Badge className="bg-orange-500/10 text-orange-300 border-orange-400/20">
                  Paused
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-100 mb-6">
            Ready to Organize Your
            <span className="block text-indigo-300">Entertainment Life?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of movie and TV enthusiasts who've already simplified
            their watchlist management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-10 py-4 text-xl font-semibold group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            No credit card required • Free forever • Setup in 2 minutes
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <PlayCircle className="h-6 w-6 text-indigo-300" />
              <span className="text-xl font-bold text-gray-100">WatchPro</span>
            </div>
            <div className="flex space-x-6 text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700/50 text-center text-gray-600">
            <p>© 2025 WatchPro. All rights reserved. Powered by TMDB</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
