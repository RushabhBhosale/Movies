import {
  BookmarkIcon,
  ChartNoAxesCombined,
  Film,
  Heart,
  Home,
  Search,
  Upload,
  User,
} from "lucide-react";

export const STATUSES = [
  { id: 1, name: "Watching" },
  { id: 2, name: "Completed" },
  { id: 3, name: "Dropped" },
  { id: 4, name: "On-hold" },
  { id: 5, name: "Watch Later" },
];

export const SORTOPTIONS = [
  { value: "dateAdded", label: "Date Added" },
  { value: "rating", label: "Rating" },
  { value: "title", label: "Title" },
  { value: "year", label: "Year" },
];

export const NAVITEMS = [
  {
    items: [
      { title: "Home", url: "/home", icon: Home },
      { title: "Stats", url: "/stats", icon: ChartNoAxesCombined },
      { title: "Watchlist", url: "/watchlist", icon: BookmarkIcon },
      { title: "Favorites", url: "/favorites", icon: Heart },
      { title: "Search", url: "/browse", icon: Search, mobile: true },
      { title: "Bulk Upload", url: "/bulk-upload", icon: Upload },
      { title: "Profile", url: "/profile", icon: User },
    ],
  },
];

export const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;
