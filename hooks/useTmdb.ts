const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_BASE_URL;
export async function fetchTmdbData(
  endpoint: string,
  retries: number = 2
): Promise<any> {
  if (!endpoint || !apiKey || !baseUrl) {
    throw new Error("Missing endpoint, API key, or base URL");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${baseUrl}${endpoint}${separator}api_key=${apiKey}`;

  let lastError: any = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (attempt > 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 2), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        console.log(
          `Retrying TMDB request (attempt ${attempt}/${retries}) after ${delay}ms delay`
        );
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "MovieApp/1.0",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("TMDB response text:", errText);

        if (response.status === 429) {
          throw new Error(`Rate limit exceeded. Status: ${response.status}`);
        }
        if (response.status >= 500) {
          throw new Error(`Server error. Status: ${response.status}`);
        }
        if (response.status === 401) {
          throw new Error(`Authentication failed. Check your API key.`);
        }
        throw new Error(
          `HTTP error ${response.status} - ${response.statusText}`
        );
      }

      const text = await response.text();
      if (!text) throw new Error("Empty response body");

      let data;
      try {
        data = JSON.parse(text);
      } catch (err: any) {
        console.error("Invalid JSON:", err, "\nRaw response:", text);
        throw new Error("Failed to parse JSON");
      }

      if (data.success === false) {
        throw new Error(data.status_message || "API request failed");
      }

      if (attempt > 1) {
        console.log(`TMDB request succeeded on attempt ${attempt}`);
      }

      return data.results || data;
    } catch (error: any) {
      lastError = error;

      console.error("TMDB API Error Details:", {
        endpoint,
        attempt: `${attempt}/${retries}`,
        error: error.message,
        code: error.code,
        cause: error.cause?.message || error.cause,
        timestamp: new Date().toISOString(),
      });

      const isRetryableError =
        error.message?.includes("fetch failed") ||
        error.code === "ECONNRESET" ||
        error.code === "ENOTFOUND" ||
        error.code === "ETIMEDOUT" ||
        error.name === "AbortError" ||
        (error.message?.includes("HTTP error") && error.message?.includes("5"));

      if (
        error.message?.includes("Authentication failed") ||
        error.message?.includes("HTTP error 4")
      ) {
        throw error;
      }

      if (attempt === retries || !isRetryableError) {
        break;
      }

      console.log(`Retryable error encountered, will retry...`);
    }
  }

  console.error(`All ${retries} attempts failed for endpoint: ${endpoint}`);

  if (lastError?.name === "AbortError") {
    throw new Error(
      "Request timed out after multiple attempts. Please try again later."
    );
  }

  if (
    lastError?.code === "ECONNRESET" ||
    lastError?.message?.includes("fetch failed")
  ) {
    throw new Error(
      "Connection to movie database failed. Please check your internet connection and try again."
    );
  }

  if (lastError?.code === "ENOTFOUND") {
    throw new Error(
      "Unable to reach movie database servers. Please try again later."
    );
  }

  throw new Error(
    "Movie database is temporarily unavailable. Please try again later."
  );
}

export async function getMediaDetails(mediaId: string, type: "movie" | "tv") {
  try {
    const res = await fetch(
      `${baseUrl}/${type}/${mediaId}?api_key=${apiKey}&language=en-US`
    );
    const data = await res.json();

    let runtime = 0;

    if (type === "movie") {
      runtime = data.runtime || 0;
    } else {
      // For TV series, we need to calculate total runtime more accurately
      const episodeRuntime = data.episode_run_time || [];
      const numberOfEpisodes = data.number_of_episodes || 0;
      const numberOfSeasons = data.number_of_seasons || 0;

      // Calculate average episode runtime
      let avgEpisodeRuntime = 0;
      if (episodeRuntime.length > 0) {
        avgEpisodeRuntime =
          episodeRuntime.reduce((sum: any, time: any) => sum + time, 0) /
          episodeRuntime.length;
      } else {
        // Fallback to common TV episode lengths by genre/type
        const genres = data.genres || [];
        const isComedy = genres.some((genre: any) =>
          genre.name.toLowerCase().includes("comedy")
        );
        const isDrama = genres.some((genre: any) =>
          ["drama", "crime", "thriller"].includes(genre.name.toLowerCase())
        );

        if (isComedy) {
          avgEpisodeRuntime = 22; // Typical sitcom length
        } else if (isDrama) {
          avgEpisodeRuntime = 45; // Typical drama length
        } else {
          avgEpisodeRuntime = 30; // Default fallback
        }
      }

      runtime = avgEpisodeRuntime * numberOfEpisodes;

      // Add some logging to debug
      console.log(`TV Show: ${data.name || "Unknown"}`);
      console.log(`Episodes: ${numberOfEpisodes}, Seasons: ${numberOfSeasons}`);
      console.log(`Episode runtime array:`, episodeRuntime);
      console.log(`Average episode runtime: ${avgEpisodeRuntime} minutes`);
      console.log(
        `Total calculated runtime: ${runtime} minutes (${(runtime / 60).toFixed(
          1
        )} hours)`
      );
    }

    return {
      runtime,
      genres: data.genres || [],
      vote_average: data.vote_average || 0,
    };
  } catch (err) {
    console.error("TMDB fetch error", err);
    return {
      runtime: 0,
      genres: [],
      vote_average: 0,
    };
  }
}

// Alternative function for more detailed TV series runtime calculation
export async function getDetailedTVRuntime(mediaId: string) {
  try {
    // First get the main TV series data
    const mainRes = await fetch(
      `${baseUrl}/tv/${mediaId}?api_key=${apiKey}&language=en-US`
    );
    const mainData = await mainRes.json();

    let totalRuntime = 0;
    const numberOfSeasons = mainData.number_of_seasons || 0;

    // If we have seasons, try to get more detailed information
    if (numberOfSeasons > 0) {
      console.log(
        `Fetching detailed season data for ${numberOfSeasons} seasons...`
      );

      // Get season details for more accurate episode counts and runtimes
      const seasonPromises = [];
      for (let seasonNum = 1; seasonNum <= numberOfSeasons; seasonNum++) {
        seasonPromises.push(
          fetch(
            `${baseUrl}/tv/${mediaId}/season/${seasonNum}?api_key=${apiKey}&language=en-US`
          )
            .then((res) => res.json())
            .catch((err) => {
              console.warn(`Failed to fetch season ${seasonNum}:`, err);
              return null;
            })
        );
      }

      const seasonData = await Promise.all(seasonPromises);

      // Calculate runtime from season data
      for (const season of seasonData) {
        if (season && season.episodes) {
          for (const episode of season.episodes) {
            totalRuntime += episode.runtime || 0;
          }
        }
      }

      // If we couldn't get detailed episode data, fall back to estimation
      if (totalRuntime === 0) {
        const episodeRuntime = mainData.episode_run_time || [];
        const avgEpisodeRuntime =
          episodeRuntime.length > 0
            ? episodeRuntime.reduce((sum: any, time: any) => sum + time, 0) /
              episodeRuntime.length
            : 45; // Default to 45 minutes for dramas

        totalRuntime = avgEpisodeRuntime * (mainData.number_of_episodes || 0);
      }

      console.log(
        `Detailed calculation - Total runtime: ${totalRuntime} minutes (${(
          totalRuntime / 60
        ).toFixed(1)} hours)`
      );
    }

    return {
      runtime: totalRuntime,
      genres: mainData.genres || [],
      vote_average: mainData.vote_average || 0,
    };
  } catch (err) {
    console.error("Detailed TV runtime fetch error", err);
    // Fall back to the simpler method
    return getMediaDetails(mediaId, "tv");
  }
}
