import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-800 md:pt-4">
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-semibold text-white">CineTrack</h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Your personal movie and series watchlist manager. Built by Rushabh
            with clean code and a love for cinema.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://github.com/rushabh-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Powered By</h3>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline block text-sm"
          >
            The Movie Database (TMDB)
          </a>
          <p className="mt-2 text-xs text-zinc-500">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-800 text-center py-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} CineTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
